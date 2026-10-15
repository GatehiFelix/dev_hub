// src/components/Navbar.jsx
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('Home')

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-6 z-40 flex items-center justify-between px-6 md:px-14"
    >
      {/* Logo (swap for your SVG) */}
      <a href="#home" className="text-xl font-bold tracking-tight text-white">
        dev<span className="text-white/50">.hub</span>
      </a>

      {/* Glass pill */}
      <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md md:flex">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setActive(label)}
            className="relative rounded-full px-5 py-2 text-xs font-medium text-white/80 transition-colors hover:text-white"
          >
            {active === label && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-white/15"
              />
            )}
            <span className="relative">{label}</span>
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-5 pr-1.5 text-xs font-medium text-white backdrop-blur-md"
      >
        Get Started
        <span className="grid size-8 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-black">
          <ArrowUpRight size={14} />
        </span>
      </a>
    </motion.header>
  )
}