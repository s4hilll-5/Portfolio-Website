import { motion } from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1]

/** Fades and lifts its children into view once, when scrolled to. */
export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  amount = 0.25,
  className,
  ...props
}) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  )
}
