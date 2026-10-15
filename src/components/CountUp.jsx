// src/components/CountUp.jsx
import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals, prefix, suffix, duration])

  return (
    <span ref={ref}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}