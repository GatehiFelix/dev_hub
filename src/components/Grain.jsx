// src/components/Grain.jsx
export default function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.08] mix-blend-overlay"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}