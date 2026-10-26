import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Renders fixed-size artwork (the project mockups) and scales it to fit the
 * container width. The aspect-ratio box reserves space, so there's no layout shift.
 */
export default function ScaleBox({ width, height, className = '', children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const update = () => setScale(el.clientWidth / width)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  )
}
