import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], label, summary'

/**
 * Two-part cursor for mouse users: a precise dot plus a trailing ring that
 * fills in over links and buttons, and becomes a labelled disc over elements
 * with data-cursor="…" (e.g. project previews). Positions are written straight
 * to the DOM in requestAnimationFrame, so moving the mouse never re-renders React.
 * App renders it only for fine pointers without reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return undefined

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let frame = 0
    let visible = false
    let mode = 'default' // default | hover | label | text

    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`
      frame = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const setMode = (next, text = '') => {
      if (next !== mode) {
        mode = next
        ring.dataset.mode = next
      }
      if (label.textContent !== text) label.textContent = text
      dot.style.opacity = visible && mode === 'default' ? '1' : '0'
    }

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      x = event.clientX
      y = event.clientY
      if (!visible) {
        visible = true
        rx = x
        ry = y
        ring.style.opacity = '1'
      }

      const target = event.target instanceof Element ? event.target : null
      const labelled = target?.closest('[data-cursor]')
      if (target?.closest('input, textarea')) setMode('text')
      else if (labelled) setMode('label', labelled.getAttribute('data-cursor'))
      else if (target?.closest(INTERACTIVE)) setMode('hover')
      else setMode('default')

      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-mode="default"
        className="group/cursor pointer-events-none fixed left-0 top-0 z-[95] h-10 w-10 opacity-0 mix-blend-difference transition-opacity duration-300 data-[mode=label]:mix-blend-normal"
        style={{ willChange: 'transform' }}
      >
        <span className="absolute inset-0 rounded-full border border-white/70 transition-[transform,background-color,border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[mode=hover]/cursor:scale-[1.6] group-data-[mode=hover]/cursor:border-white group-data-[mode=hover]/cursor:bg-white group-data-[mode=label]/cursor:scale-[2.3] group-data-[mode=label]/cursor:border-transparent group-data-[mode=label]/cursor:bg-fg group-data-[mode=text]/cursor:scale-50 group-data-[mode=text]/cursor:opacity-0" />
        <span
          ref={labelRef}
          className="absolute inset-0 grid place-items-center font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink opacity-0 transition-opacity duration-300 group-data-[mode=label]/cursor:opacity-100"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
