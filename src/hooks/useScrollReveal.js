import { useEffect } from 'react'

/**
 * Reveals elements marked with [data-reveal] as they scroll into view.
 *
 * Fail-open contract: elements are visible by default in CSS. This hook only
 * *arms* them (adds `.reveal-armed`, which hides them) once the observer is
 * actually attached, then reveals them. If JS never runs, nothing hides.
 */
export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined

    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!nodes.length) return undefined

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-revealed'))
      return undefined
    }

    // Arm now that we can observe — avoids a flash of hidden content on no-JS.
    nodes.forEach((node) => node.classList.add('reveal-armed'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [enabled])
}
