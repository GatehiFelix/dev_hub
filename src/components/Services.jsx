// src/components/Services.jsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Mock data. The first two categories are placeholders, the last two come from your screenshot.
const categories = [
  {
    title: 'Brand & Design',
    items: ['Brand identity', 'Logo & visual systems', 'Graphic design', 'Brand guidelines'],
  },
  {
    title: 'Web & App Development',
    items: ['Websites & landing pages', 'Web applications', 'Mobile apps', 'E-commerce'],
  },
  {
    title: 'Blockchain & Web3',
    items: ['DeFi & token models', 'Blockchain products', 'Smart contracts', 'Blockchain development'],
  },
  {
    title: 'Infrastructure & Scale',
    items: ['Cloud & DevOps', 'CI / CD pipelines', 'Monitoring & Optimization', 'Tech consulting'],
  },
]

// Desktop placement: left column is the intro, categories fill columns 2 and 3
const placement = [
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
]

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative overflow-hidden px-6 py-32 md:px-14">
      {/* Giant faint title, swaps with the hovered category */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 select-none whitespace-nowrap px-6 md:px-0 md:left-[-1vw]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,11vw,12rem)] font-light uppercase leading-none tracking-tight text-white/[0.06] blur-[1px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          >
            {categories[active].title}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-[10vw] grid gap-x-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:col-start-1 lg:row-span-2 lg:mb-0"
        >
          <p className="max-w-[16rem] text-sm leading-relaxed text-white/70">
            What we do
            <br />
            <span className="text-white/40">
              From first sketch to production. One team for brand, product and infrastructure.
            </span>
          </p>
        </motion.div>

        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className={`${placement[i]} group border-t border-white/10 pb-14 pt-6 outline-none`}
          >
            <h3
              className={`text-base font-medium transition-colors ${
                active === i ? 'text-white' : 'text-white/70'
              }`}
            >
              {c.title}
            </h3>
            <ul className="mt-5 space-y-1.5">
              {c.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}