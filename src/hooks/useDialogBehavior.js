import { useEffect, useRef } from 'react'
import { setScrollLocked } from '../lib/smoothScroll'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared behaviour for overlays (mobile menu, project modal):
 * - locks page scroll (compensating for the scrollbar width)
 * - closes on Escape
 * - keeps Tab focus inside the overlay
 * - moves focus in on open and restores it on close
 */
export function useDialogBehavior({ open, containerRef, onClose, initialFocusRef }) {
  // Keep the latest onClose without re-running the effect on every render.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const { body, documentElement } = document
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight

    body.style.overflow = 'hidden'
    setScrollLocked(true)
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    const focusFrame = requestAnimationFrame(() => {
      const target =
        initialFocusRef?.current || containerRef.current?.querySelector(FOCUSABLE)
      target?.focus({ preventScroll: true })
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !containerRef.current) return

      const focusable = [...containerRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = prevOverflow
      setScrollLocked(false)
      body.style.paddingRight = prevPadding
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [open, containerRef, initialFocusRef])
}
