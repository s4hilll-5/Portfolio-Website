import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'
import { EASE } from '../ui/Reveal'

/**
 * Short intro curtain (~1.6s): wordmark, a 000→100 counter and a hairline
 * progress bar, then the curtain lifts. It never blocks clicks
 * (pointer-events: none) and is skipped entirely with reduced motion.
 */
export default function PageReveal() {
  const reduceMotion = useReducedMotion()
  const [done, setDone] = useState(false)
  const counterRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (reduceMotion) return undefined
    const controls = animate(0, 100, {
      duration: 0.95,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(value)).padStart(3, '0')
        if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`
      },
    })
    return () => controls.stop()
  }, [reduceMotion])

  if (reduceMotion || done) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-ink"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 1.25, times: [0, 0.8, 1] }}
      >
        <div className="flex items-center justify-between text-eyebrow text-subtle">
          <span>Portfolio</span>
          <span>Mumbai, India</span>
        </div>

        <motion.div
          className="flex items-center gap-3 self-center font-display text-lg font-semibold tracking-[0.3em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_16px_rgba(139,92,246,0.9)]" />
          SAHIL.DEV
        </motion.div>

        <div>
          <div className="flex items-end justify-between">
            <span className="text-eyebrow text-subtle">Loading experience</span>
            <span ref={counterRef} className="font-mono text-[clamp(2.5rem,7vw,5rem)] font-light leading-none tracking-tight text-fg/90">
              000
            </span>
          </div>
          <div className="mt-4 h-px w-full bg-white/10">
            <span ref={barRef} className="block h-full origin-left bg-gradient-to-r from-violet via-violet-soft to-cyan" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
