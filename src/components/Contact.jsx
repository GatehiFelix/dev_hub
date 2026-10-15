// src/components/Contact.jsx
import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Phone, MessageCircle, Mail, MapPin } from 'lucide-react'

// Point this at your Express route
const ENDPOINT = import.meta.env.VITE_CONTACT_URL || '/api/contact'

const team = [
  {
    name: 'Felix',
    phone: '+254748872776',
    phoneDisplay: '0748 872 776',
    email: 'felixnyoike894@gmail.com',
  },
  {
    name: 'Brownmark',
    phone: '+254702480881',
    phoneDisplay: '0702 480 881',
    email: 'brownmarksimiyu@gmail.com',
  },
]
const location = 'Nairobi, Kenya'
const serviceOptions = ['Web Development', 'Branding', 'UI/UX', 'Other']

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}
const view = { once: true, margin: '-10% 0px' }

const inputCls =
  'w-full border-b border-white/20 bg-transparent pb-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white'
const labelCls = 'mb-2 block text-[11px] font-medium uppercase tracking-widest text-white/50'

function Field({ label, name, type = 'text', required, placeholder }) {
  return (
    <label className="block flex-1">
      <span className={labelCls}>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className={inputCls} />
    </label>
  )
}

// Grows with its content, scrolls after max height
function AutoTextarea({ value, onChange, ...props }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      rows={2}
      value={value}
      onChange={onChange}
      className={`${inputCls} max-h-80 resize-none overflow-y-auto`}
      {...props}
    />
  )
}

function Detail({ icon: Icon, label, children, href }) {
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper
      {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}
      className="group flex items-center gap-4"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors group-hover:bg-white group-hover:text-black">
        <Icon size={16} />
      </span>
      <span>
        <span className="block text-[11px] uppercase tracking-widest text-white/40">{label}</span>
        <span className="block text-sm text-white">{children}</span>
      </span>
    </Wrapper>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [message, setMessage] = useState('')
  const [picked, setPicked] = useState([])

  const toggle = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))

  async function onSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget
  const payload = { ...Object.fromEntries(new FormData(form)), message, services: picked }
  setStatus('sending')
  setErrorMsg('')
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      setErrorMsg(
        res.status === 429
          ? 'Too many messages. Please try again in a few minutes.'
          : res.status === 400
          ? 'Please check your details. The project details need at least 5 characters.'
          : 'Something went wrong. Try again.'
      )
      setStatus('error')
      return
    }

    form.reset()
    setMessage('')
    setPicked([])
    setStatus('sent')
  } catch {
    setErrorMsg('Could not reach the server. Check your connection and try again.')
    setStatus('error')
  }
}

  return (
    <section id="contact" className="relative px-6 pb-16 pt-32 md:px-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={view}
        className="flex items-center justify-between"
      >
        <h2 className="bg-linear-to-b from-white to-white/40 bg-clip-text text-[clamp(2rem,4vw,3.5rem)] font-light uppercase tracking-tight text-transparent">
          Contact us
        </h2>

        <a
          href={`mailto:${team.map((m) => m.email).join(',')}`}
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-5 pr-1.5 text-xs font-medium text-white backdrop-blur-md"
        >
          Get Started
          <span className="grid size-8 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={14} />
          </span>
        </a>
      </motion.div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        {/* Details */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={view}>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Bringing digital products to life through design and engineering. Available for freelance projects and
            collaborations.
          </p>

          <p className={`${labelCls} mt-12`}>Call or WhatsApp</p>
          <div className="space-y-5">
            {team.map((m) => (
              <div key={m.name} className="flex items-center justify-between gap-4">
                <Detail icon={Phone} label={m.name} href={`tel:${m.phone}`}>
                  {m.phoneDisplay}
                </Detail>
                <a
                  href={`https://wa.me/${m.phone.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${m.name}`}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white hover:text-black"
                >
                  <MessageCircle size={14} />
                </a>
              </div>
            ))}
          </div>

          <p className={`${labelCls} mt-10`}>Email</p>
          <div className="space-y-5">
            {team.map((m) => (
              <Detail key={m.email} icon={Mail} label={m.name} href={`mailto:${m.email}`}>
                {m.email}
              </Detail>
            ))}
            <Detail icon={MapPin} label="Based in">
              {location}
            </Detail>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={view}
          onSubmit={onSubmit}
          className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-10"
        >
          {/* Honeypot: bots fill this, humans never see it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <Field label="Name" name="name" required placeholder="Jane Doe" />
            <Field label="Email" name="email" type="email" required placeholder="jane@company.com" />
          </div>

          <div className="mt-8">
            <Field label="Phone (optional)" name="phone" type="tel" placeholder="+254 700 000 000" />
          </div>

          <div className="mt-8">
            <span className={labelCls}>What do you need?</span>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((s) => {
                const on = picked.includes(s)
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s)}
                    className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                      on
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 bg-white/5 text-white/70 hover:border-white/40'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          <label className="mt-8 block">
            <span className={labelCls}>Project details</span>
            <AutoTextarea
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, timeline and budget..."
            />
          </label>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-5 pr-1.5 text-xs font-medium text-white backdrop-blur-md transition-opacity disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              <span className="grid size-8 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={14} />
              </span>
            </button>

            {status === 'sent' && <p className="text-xs text-emerald-400">Sent. We'll be in touch.</p>}
            {status === 'error' && <p className="text-xs text-red-400">{errorMsg}</p>}
          </div>
        </motion.form>
      </div>

      <p className="mt-24 text-xs text-white/30">© {new Date().getFullYear()} dev.hub. All rights reserved.</p>
    </section>
  )
}