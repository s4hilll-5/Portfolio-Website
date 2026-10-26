import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

const variants = {
  primary:
    'bg-fg text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset] hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.65),0_0_0_1px_rgba(255,255,255,0.6)_inset]',
  ghost:
    'border border-line-strong bg-white/[0.03] text-fg backdrop-blur-md hover:border-white/30 hover:bg-white/[0.06]',
}

/**
 * Link-styled button that leans gently toward the cursor on desktop.
 * Falls back to a normal button on touch devices and with reduced motion.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  strength = 0.28,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (event) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-medium transition-[background-color,border-color,box-shadow] duration-500 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  )
}
