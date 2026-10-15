import { motion } from 'motion/react'

// Mock data. Set `image` to a URL/import (laptop mockup, screenshot...) to replace the gradient.
const projects = [
  {
    name: 'Nova',
    type: 'Web Design',
    desc: 'Modern interface built for speed and clarity. Focused on structure, usability and scale.',
    gradient: 'from-emerald-400/40 via-teal-600/30 to-slate-900',
    image: null,
    reverse: false,
  },
  {
    name: 'Echo',
    type: 'Brand Identity + Development',
    desc: 'Full brand system with product direction. Visual language aligned with the product strategy.',
    gradient: 'from-indigo-400/40 via-violet-600/30 to-slate-900',
    image: null,
    reverse: false,
  },
  {
    name: 'Atlas',
    type: 'Brand Identity',
    desc: 'Bold identity system for digital retail. Clear visual code built for recognition.',
    gradient: 'from-amber-300/40 via-orange-500/30 to-slate-900',
    image: null,
    reverse: true,
  },
  {
    name: 'Meridian',
    type: 'Web Design',
    desc: 'Corporate website built for clarity and trust. Structured layout, optimized for growth.',
    gradient: 'from-sky-400/40 via-blue-600/30 to-slate-900',
    image: null,
    reverse: true,
  },
]

function Project({ p, index }) {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex items-start gap-5 md:gap-6 ${p.reverse ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className="relative aspect-[4/5] w-[48%] shrink-0 overflow-hidden rounded-[40px] border border-white/10">
        <div
          className={`absolute inset-0 bg-linear-to-br ${p.gradient} bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110`}
          style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
        />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white/10 to-transparent" />
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-semibold text-white">{p.name}</h3>
        <p className="mt-0.5 text-sm italic text-white/70">{p.type}</p>
        <p className={`mt-4 max-w-[13rem] text-xs leading-relaxed text-white/50 ${p.reverse ? 'ml-auto' : ''}`}>
          {p.desc}
        </p>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-14">
      <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-medium uppercase leading-[1.05] tracking-tight text-white">
        Selected work
        <br />
        &amp; <em className="italic">Brand*</em> systems
      </h2>

      <div className="mt-20 grid gap-x-[6%] gap-y-20 md:grid-cols-2">
        {projects.map((p, i) => (
          <div key={p.name} className={i >= 2 ? 'md:mt-6' : ''}>
            <Project p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}