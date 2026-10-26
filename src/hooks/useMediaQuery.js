import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query and re-renders only when it flips. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True on devices with a mouse or trackpad (hover-capable, precise pointer). */
export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
