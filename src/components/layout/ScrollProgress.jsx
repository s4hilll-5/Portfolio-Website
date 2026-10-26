import { motion, useScroll, useSpring } from 'motion/react'

/** Thin gradient bar at the very top that fills as the page is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet via-violet-soft to-cyan"
      style={{ scaleX }}
    />
  )
}
