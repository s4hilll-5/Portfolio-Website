import { useEffect, useRef } from 'react'

/**
 * A soft light that trails the mouse. Position is written straight to the DOM
 * inside requestAnimationFrame, so moving the mouse never re-renders React.
 */
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 3
    let x = targetX
    let y = targetY
    let animating = false

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      el.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        frame = requestAnimationFrame(tick)
      } else {
        animating = false
      }
    }

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      el.style.opacity = '1'
      if (!animating) {
        animating = true
        frame = requestAnimationFrame(tick)
      }
    }

    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-700"
      style={{
        background:
          'radial-gradient(circle at center, rgba(139,92,246,0.13) 0%, rgba(103,232,249,0.05) 35%, transparent 65%)',
        willChange: 'transform',
      }}
    />
  )
}
