import { useEffect, useRef } from 'react'

/** Returns a ref with normalised mouse position { x: -1..1, y: -1..1 }. */
export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const update = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', update, { passive: true })
    return () => window.removeEventListener('mousemove', update)
  }, [])

  return mouse
}
