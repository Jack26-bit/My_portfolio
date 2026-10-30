import { useEffect, useRef } from 'react'

/** Returns a ref whose `.current` is always 0..1 representing scroll progress. */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const top = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      progress.current = height > 0 ? Math.min(top / height, 1) : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}
