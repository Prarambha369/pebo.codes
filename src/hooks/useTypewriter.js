import { useEffect, useRef, useState } from 'react'

/**
 * Typewriter effect: types each phrase, pauses, deletes, moves to the next.
 * Returns the current visible text. Falls back to the first phrase (static)
 * when disabled, when reduced motion is requested, or when there's one phrase.
 */
export function useTypewriter(phrases, { enabled = true, typeMs = 55, deleteMs = 28, holdMs = 1600 } = {}) {
  const list = Array.isArray(phrases) ? phrases.filter(Boolean) : []
  const fallback = list[0] || ''

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const active = enabled && !prefersReduced && list.length > 1

  const [text, setText] = useState(fallback)
  const timer = useRef(null)

  useEffect(() => {
    if (!active) {
      setText(fallback)
      return undefined
    }

    let phrase = 0
    let pos = 0
    let deleting = false
    setText('')

    const tick = () => {
      const current = list[phrase]
      if (!deleting) {
        pos += 1
        setText(current.slice(0, pos))
        if (pos === current.length) {
          deleting = true
          timer.current = window.setTimeout(tick, holdMs)
          return
        }
        timer.current = window.setTimeout(tick, typeMs)
      } else {
        pos -= 1
        setText(current.slice(0, pos))
        if (pos === 0) {
          deleting = false
          phrase = (phrase + 1) % list.length
        }
        timer.current = window.setTimeout(tick, deleting ? deleteMs : typeMs)
      }
    }

    timer.current = window.setTimeout(tick, typeMs)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, fallback, holdMs, typeMs, deleteMs])

  return { text, animating: active }
}
