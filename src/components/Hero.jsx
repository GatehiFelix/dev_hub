// src/components/Hero.jsx
import { motion } from 'motion/react'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }
const line = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

function Line({ children, className = '' }) {
  return (
    <span className={`block overflow-hidden pb-2 ${className}`}>
      <motion.span variants={line} className="block">
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-14">
      {/* Light streak */}
      <motion.div
        aria-hidden
        animate={{ x: [-30, 30, -30], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[15%] top-[38%] -z-10 h-24 w-[55%] rounded-full bg-linear-to-r from-transparent via-white/40 to-transparent blur-3xl"
      />

      {/* RGB scan lines */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-[34%] h-px bg-linear-to-r from-transparent via-red-500/70 to-transparent mix-blend-screen" />
        <div className="absolute inset-x-0 top-[35%] h-px bg-linear-to-r from-transparent via-green-500/70 to-transparent mix-blend-screen" />
        <div className="absolute inset-x-0 top-[36%] h-px bg-linear-to-r from-transparent via-blue-500/70 to-transparent mix-blend-screen" />
        <div className="absolute inset-x-0 top-[28%] h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent mix-blend-screen" />
        <div className="absolute inset-x-0 top-[56%] h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent mix-blend-screen" />
      </div>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="text-[clamp(2.75rem,8.5vw,8rem)] font-medium uppercase leading-[1.02] tracking-tight text-white"
      >
        <Line className="text-center">We'll make your</Line>
        <Line className="text-left">Brand</Line>
        <Line className="pl-[8%]">Stand out</Line>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="ml-auto mt-16 max-w-xs text-right text-sm leading-relaxed text-white/60"
      >
        We build fast, scalable products and the brands around them. Strategy, design and engineering under one roof.
      </motion.p>
    </section>
  )
}