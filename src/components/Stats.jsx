import { motion } from 'motion/react'
import { ArrowUpLeft } from 'lucide-react'
import CountUp from './CountUp'

import workingP from '../assets/working_P.avif'
import ownCode from '../assets/own_code.avif'
import reply24h from '../assets/24h.webp'
import lighthouse from '../assets/lighthouse.webp'

// Every card is a commitment or a measurable fact about how we work, not a client result.
// Swap in real client metrics once you have them (and permission to share them).
// Set `image` to a URL/import (e.g. a device mockup of your own work) to replace the gradient.
// `size` = width + aspect ratio, `offset` = vertical stagger (desktop only).
const stats = [
  {
    to: 2, suffix: ' wks',
    label: 'From Kickoff To A Working Prototype',
    gradient: 'from-fuchsia-500/40 via-indigo-500/30 to-cyan-400/40',
    size: 'md:w-[19%] aspect-[3/4]', offset: 'md:mt-[9.5vw]', image: workingP,
  },
  {
    to: 100, suffix: '%',
    label: 'Code Ownership Stays With You',
    gradient: 'from-teal-400/30 via-emerald-500/30 to-green-600/40',
    size: 'md:w-[22%] aspect-[2/3]', offset: 'md:mt-[2vw]', image: ownCode,
  },
  {
    to: 24, suffix: 'h',
    label: 'Maximum Reply Time On Every Message',
    gradient: 'from-orange-400/40 via-red-500/40 to-rose-700/50',
    size: 'md:w-[23%] aspect-[2/3]', offset: 'md:mt-0', image: reply24h,
  },
  {
    to: 95, suffix: '+',
    label: 'Lighthouse Score Target On Every Build',
    gradient: 'from-sky-400/30 via-cyan-500/30 to-teal-600/40',
    size: 'md:w-[19%] aspect-[3/4]', offset: 'md:mt-[14vw]', image: lighthouse,
  },
]

function StatCard({ stat, index }) {
  return (
   <motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-10% 0px' }}
  transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
  className={`${stat.size} ${stat.offset} relative w-[48%] overflow-hidden rounded-[40px] border border-white/10`}
>
  {/* 1. Photo (falls back to nothing if no image, gradient shows below) */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={stat.image ? { backgroundImage: `url(${stat.image})` } : undefined}
  />

  {/* 2. Color gradient tint over the photo */}
  <div
    className={`absolute inset-0 bg-linear-to-b ${stat.gradient} ${
      stat.image ? 'opacity-90 mix-blend-multiply' : ''
    }`}
  />

  {/* 3. Dark scrim so the white text stays readable */}
  <div className={`absolute inset-0 ${stat.image ? 'bg-black/30' : ''}`} />

  {/* 4. Content */}
  <div className="relative flex h-full flex-col items-center justify-center px-5 text-center text-white">
    <div className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-none tracking-tight">
      <CountUp to={stat.to} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
    </div>
    <p className="mt-4 max-w-[85%] text-[clamp(0.75rem,1.1vw,1.1rem)] font-medium leading-snug text-white/85">
      {stat.label}
    </p>
  </div>
</motion.div>
  )
}

export default function Stats() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-14">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <p className="max-w-[16rem] text-md leading-relaxed text-white/70">
          Let us bring your vision to life
          <br />
          <span className="text-white/40 text-md">from abstract ideas to fast, working products.</span>
        </p>

        <h2 className="text-right text-[clamp(2rem,5.5vw,5rem)] font-medium uppercase leading-[1.05] tracking-tight text-white">
          Websites that
          <br />
          <em className="italic">*Earn</em> trust
        </h2>
      </div>

      <div className="relative mt-16 flex flex-wrap items-start justify-between gap-4 md:flex-nowrap md:gap-0">
        <div className="absolute -left-2 top-[6vw] hidden size-16 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md lg:grid">
          <ArrowUpLeft size={20} className="text-white/80" />
        </div>
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      <div className="mt-24 text-center text-[clamp(1.5rem,3.5vw,3rem)] font-light uppercase leading-tight tracking-tight">
        <p className="text-white/90">We build products</p>
        <p className="bg-linear-to-b from-white/70 to-transparent bg-clip-text text-transparent">People rely on</p>
      </div>
    </section>
  )
}