import { useEffect, useState } from 'react'

/**
 * Tracks which section is in the middle band of the viewport.
 * Pass a stable array of element ids (defined outside the component).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        // The band is thin, so normally only one section intersects at a time.
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[visible.length - 1].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
