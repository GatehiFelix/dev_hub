import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Must run BEFORE reading process.env below
dotenv.config({ path: path.join(__dirname, '../.env') })

const {
  PORT = 5000,
  EMAIL_HOST = 'smtp.gmail.com',
  EMAIL_PORT = 587,
  EMAIL_USER,
  EMAIL_PASS,
  MAIL_TO,
  CLIENT_ORIGIN = 'http://localhost:3000',
} = process.env

if (!EMAIL_USER || !EMAIL_PASS || !MAIL_TO) {
  console.error('Missing EMAIL_USER, EMAIL_PASS or MAIL_TO in .env')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: Number(EMAIL_PORT) === 465, // 587 = STARTTLS, 465 = implicit TLS
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
})

transporter
  .verify()
  .then(() => console.log('SMTP ready'))
  .catch((e) => console.error('SMTP error:', e.message))

const app = express()
app.set('trust proxy', 1)
app.use(express.json({ limit: '20kb' }))
app.use(cors({ origin: CLIENT_ORIGIN.split(',').map((s) => s.trim()) }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipFailedRequests: true, 
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests, try again later.' },
})

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const clean = (s = '', max = 200) => String(s).replace(/[\r\n]+/g, ' ').trim().slice(0, max)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', limiter, async (req, res) => {
  const { name, email, phone, services, message, website } = req.body ?? {}

  // Honeypot: real users never fill this hidden field
  if (website) return res.json({ ok: true })

  const n = clean(name, 100)
  const e = clean(email, 150)
  const p = clean(phone, 30)
  const msg = String(message ?? '').trim().slice(0, 5000)
  const svc = Array.isArray(services) ? services.map((s) => clean(s, 50)).slice(0, 6) : []

  if (!n || !emailRe.test(e) || msg.length < 5) {
    return res.status(400).json({ ok: false, error: 'Invalid input' })
  }

  const text = [
    `Name: ${n}`,
    `Email: ${e}`,
    `Phone: ${p || '-'}`,
    `Interested in: ${svc.join(', ') || '-'}`,
    '',
    msg,
  ].join('\n')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${esc(n)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${esc(e)}">${esc(e)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${esc(p) || '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Interested in</td><td>${esc(svc.join(', ')) || '-'}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="white-space:pre-wrap;line-height:1.5">${esc(msg)}</p>
    </div>`

  try {
    await transporter.sendMail({
      from: `"dev.hub website" <${EMAIL_USER}>`,
      to: MAIL_TO,
      replyTo: `"${n.replace(/"/g, '')}" <${e}>`, // hitting Reply goes to the visitor
      subject: `New enquiry from ${n}`,
      text,
      html,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('sendMail failed:', err.message)
    res.status(500).json({ ok: false, error: 'Could not send message' })
  }
})

// Serve the built frontend (after all API routes)
const dist = path.join(__dirname, '../dist')
app.use(express.static(dist))
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ ok: false, error: 'Not found' })
  }
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => console.log(`Running on :${PORT}`))