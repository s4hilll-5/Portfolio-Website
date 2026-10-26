import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const GLYPHS = '#%&*+=-_/\\<>[]{}0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * "Decoding" text: characters cycle through glyphs, then settle left to right.
 * trigger: 'view' (once, when scrolled into view) | 'hover' (every mouse enter) | 'mount'
 * Best with monospace text so the width doesn't jump.
 */
export default function ScrambleText({ text, trigger = 'view', duration = 750, delay = 0, className = '' }) {
  const ref = useRef(null)
  const frame = useRef(0)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.9 })
  const [display, setDisplay] = useState(text)

  const run = useCallback(() => {
    if (reduceMotion) return
    cancelAnimationFrame(frame.current)
    let start = 0
    let last = 0
    const tick = (now) => {
      if (!start) start = now + delay
      const progress = Math.max(0, (now - start) / duration)
      if (now - last > 40 || progress >= 1) {
        last = now
        const settled = Math.floor(progress * text.length)
        let out = ''
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i]
          out += ch === ' ' || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        setDisplay(out)
      }
      if (progress < 1) frame.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    frame.current = requestAnimationFrame(tick)
  }, [delay, duration, reduceMotion, text])

  useEffect(() => {
    if (trigger === 'mount' || (trigger === 'view' && inView)) run()
  }, [trigger, inView, run])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === 'hover' ? run : undefined}
      onFocus={trigger === 'hover' ? run : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
