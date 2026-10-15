import nodemailer from 'nodemailer'

const { EMAIL_HOST = 'smtp.gmail.com', EMAIL_PORT = 587, EMAIL_USER, EMAIL_PASS, MAIL_TO } = process.env

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const clean = (s = '', max = 200) => String(s).replace(/[\r\n]+/g, ' ').trim().slice(0, max)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: Number(EMAIL_PORT) === 465,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const { name, email, phone, services, message, website } = req.body ?? {}
  if (website) return res.json({ ok: true }) // honeypot

  const n = clean(name, 100)
  const e = clean(email, 150)
  const p = clean(phone, 30)
  const msg = String(message ?? '').trim().slice(0, 5000)
  const svc = Array.isArray(services) ? services.map((s) => clean(s, 50)).slice(0, 6) : []

  if (!n || !emailRe.test(e) || msg.length < 5) {
    return res.status(400).json({ ok: false, error: 'Invalid input' })
  }

  const text = [`Name: ${n}`, `Email: ${e}`, `Phone: ${p || '-'}`, `Interested in: ${svc.join(', ') || '-'}`, '', msg].join('\n')

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
      replyTo: `"${n.replace(/"/g, '')}" <${e}>`,
      subject: `New enquiry from ${n}`,
      text,
      html,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('sendMail failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Could not send message' })
  }
}