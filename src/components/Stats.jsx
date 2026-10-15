import { motion } from 'motion/react'
import { ArrowUpLeft } from 'lucide-react'
import CountUp from './CountUp'

// Mock data. Set `image` to a URL/import to replace the gradient.
// `size` = width + aspect ratio, `offset` = vertical stagger (desktop only), matched to the mockup.
const stats = [
  {
    to: 2.5, decimals: 1, suffix: 'x',
    label: 'Higher Conversion With Strong Design Language',
    gradient: 'from-fuchsia-500/40 via-indigo-500/30 to-cyan-400/40',
    size: 'md:w-[19%] aspect-[3/4]', offset: 'md:mt-[9.5vw]', image: null,
  },
  {
    to: 23, prefix: '+', suffix: '%',
    label: 'Average Revenue Lift After Brand Refresh',
    gradient: 'from-teal-400/30 via-emerald-500/30 to-green-600/40',
    size: 'md:w-[22%] aspect-[2/3]', offset: 'md:mt-[2vw]', image: null,
  },
  {
    to: 68, prefix: '+', suffix: '%',
    label: 'Trust Score With Clear Visual Systems',
    gradient: 'from-orange-400/40 via-red-500/40 to-rose-700/50',
    size: 'md:w-[23%] aspect-[2/3]', offset: 'md:mt-0', image: null,
  },
  {
    to: 3, suffix: 'X',
    label: 'Faster Brand Recall With Consistent Identity',
    gradient: 'from-sky-400/30 via-cyan-500/30 to-teal-600/40',
    size: 'md:w-[19%] aspect-[3/4]', offset: 'md:mt-[14vw]', image: null,
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
      <div
        className={`absolute inset-0 bg-linear-to-b ${stat.gradient} bg-cover bg-center`}
        style={stat.image ? { backgroundImage: `url(${stat.image})` } : undefined}
      />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
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
        <p className="max-w-[16rem] text-sm leading-relaxed text-white/70">
          Let us bring your vision to life
          <br />
          <span className="text-white/40">from abstract ideas to vivid, stunning visuals.</span>
        </p>

        <h2 className="text-right text-[clamp(2rem,5.5vw,5rem)] font-medium uppercase leading-[1.05] tracking-tight text-white">
          Branding that
          <br />
          <em className="italic">*Moves</em> numbers
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
        <p className="text-white/90">We design brands</p>
        <p className="bg-linear-to-b from-white/70 to-transparent bg-clip-text text-transparent">People believe</p>
      </div>
    </section>
  )
}