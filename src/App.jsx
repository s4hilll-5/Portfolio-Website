import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { sectionIds } from './data/profile'
import { useActiveSection } from './hooks/useActiveSection'
import { useFinePointer } from './hooks/useMediaQuery'
import { initSmoothScroll } from './lib/smoothScroll'
import CustomCursor from './components/ui/CustomCursor'
import AnimatedBackground, { GrainOverlay } from './components/background/AnimatedBackground'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import SectionIndicator from './components/layout/SectionIndicator'
import PageReveal from './components/layout/PageReveal'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

export default function App() {
  const activeSection = useActiveSection(sectionIds)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()

  // Inertial smooth scrolling (skipped automatically for reduced motion)
  useEffect(() => initSmoothScroll(), [])

  return (
    // reducedMotion="user": transform animations are skipped for visitors
    // who ask their OS for reduced motion.
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <AnimatedBackground activeSection={activeSection} />
        <ScrollProgress />
        <Navbar active={activeSection} />
        <SectionIndicator active={activeSection} />

        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
        <GrainOverlay />
        {finePointer && !reduceMotion ? <CustomCursor /> : null}
        <PageReveal />
      </div>
    </MotionConfig>
  )
}
