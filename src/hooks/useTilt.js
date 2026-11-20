import { useEffect } from 'react'

/**
 * Subtle 3D tilt toward the pointer. Desktop / fine-pointer only, and disabled
 * under prefers-reduced-motion. Applies an inline transform on pointer move and
 * clears it on leave so it never fights the reveal animation at rest.
 */
export function useTilt(ref, { enabled = true, max = 5 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || typeof window === 'undefined' || !window.matchMedia) return undefined

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined

    let frame = null

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`
      })
    }
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }
  }, [ref, enabled, max])
}
