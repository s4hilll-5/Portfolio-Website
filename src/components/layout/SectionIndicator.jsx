import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { navLinks } from '../../data/profile'

/**
 * Vertical HUD on the right edge (wide screens only): current section number,
 * a scroll-progress rail and the section name.
 */
export default function SectionIndicator({ active }) {
  const { scrollYProgress } = useScroll()
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const index = Math.max(0, navLinks.findIndex((link) => link.id === active))
  const label = navLinks[index]?.label ?? ''

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 min-[1400px]:flex"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-subtle [writing-mode:vertical-rl]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="inline-block text-fg/70"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
          >
            0{index + 1}
          </motion.span>
        </AnimatePresence>{' '}
        / 0{navLinks.length}
      </span>

      <span className="relative h-28 w-px overflow-hidden bg-white/10">
        <motion.span className="absolute inset-0 origin-top bg-gradient-to-b from-fg/80 to-violet-soft" style={{ scaleY: fill }} />
      </span>

      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle [writing-mode:vertical-rl]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}
