import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Grain from './components/Grain'
import Contact from './components/Contact'
import Work from './components/Work'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, anchors: true })
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-bg font-sans text-white antialiased">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Work />
        <Contact />
      </main>
    </div>
  )
}