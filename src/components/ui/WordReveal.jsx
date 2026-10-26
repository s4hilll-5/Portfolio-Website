import { motion } from 'motion/react'
import { EASE } from './Reveal'

/**
 * Splits lines into words that slide up from a clipping mask.
 * - `lines`: array of strings or { text, className } objects; each renders as its own line.
 * - `trigger`: 'mount' animates immediately, 'view' waits until scrolled into view.
 * The parent heading should carry an aria-label with the full sentence,
 * since the split words are hidden from assistive tech.
 */
export default function WordReveal({
  lines,
  trigger = 'view',
  delay = 0,
  stagger = 0.06,
  lineClassName = 'block',
}) {
  let wordIndex = 0

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { y: '108%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE } },
  }

  const animationProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.5 } }

  return (
    <motion.span aria-hidden="true" className="block" variants={container} {...animationProps}>
      {lines.map((line, lineIdx) => {
        const { text, className = '' } = typeof line === 'string' ? { text: line } : line
        const words = text.split(' ')
        return (
          <span key={lineIdx} className={lineClassName}>
            {words.map((w, i) => {
              wordIndex += 1
              return (
                <span key={`${w}-${wordIndex}`}>
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <motion.span variants={word} className={`inline-block will-change-transform ${className}`}>
                      {w}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? ' ' : null}
                </span>
              )
            })}
          </span>
        )
      })}
    </motion.span>
  )
}
