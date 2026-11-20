import { useEffect, useRef, useState } from 'react'

/** Types `text` out once `active` becomes true. Returns the typed text plus controls. */
export function useTypewriter(text, active, speed = 26) {
  const [count, setCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!active) return
    if (skipped) {
      setCount(text.length)
      return
    }
    if (count >= text.length) return

    timer.current = setTimeout(() => {
      setCount((c) => Math.min(text.length + 1, c + 1))
    }, text[count] === '\n' ? speed * 6 : speed)

    return () => clearTimeout(timer)
  }, [active, count, text, speed, skipped])

  return {
    typed: text.slice(0, count),
    done: count >= text.length,
    skip: () => setSkipped(true),
  }
}
