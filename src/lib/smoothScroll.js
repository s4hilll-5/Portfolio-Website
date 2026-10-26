import Lenis from 'lenis'

// One shared Lenis instance for inertial smooth scrolling.
// Skipped entirely for visitors who prefer reduced motion (native scroll is used).

let lenis = null

export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    anchors: true, // in-page links (#about, #work…) glide instead of jumping
  })

  let frame = 0
  const loop = (time) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Scroll to an element or selector, using Lenis when it's running. */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

/** Pause/resume smooth scrolling while an overlay (menu, modal) is open. */
export function setScrollLocked(locked) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}
