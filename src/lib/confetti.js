import confetti from 'canvas-confetti'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function heartShape() {
  try {
    return confetti.shapeFromText({ text: '❤️', scalar: 2.4 })
  } catch {
    return undefined
  }
}

/** A big soft burst of hearts and rose petals from a point. */
export function burstHearts(x = 0.5, y = 0.55) {
  if (prefersReducedMotion()) return
  const shape = heartShape()

  confetti({
    particleCount: 42,
    spread: 100,
    startVelocity: 42,
    origin: { x, y },
    scalar: 1.5,
    ticks: 220,
    gravity: 0.7,
    colors: ['#ff8fb1', '#ffd1dd', '#d98bff', '#ffffff'],
    shapes: shape ? [shape] : undefined,
  })

  confetti({
    particleCount: 30,
    spread: 70,
    startVelocity: 28,
    origin: { x, y },
    scalar: 0.9,
    ticks: 260,
    gravity: 0.5,
    colors: ['#ff6f9c', '#ffe3ec', '#c084fc'],
  })
}

/** Continuous romantic celebration for the YES screen. */
export function celebrate(durationMs = 5200) {
  if (prefersReducedMotion()) return () => {}

  const shape = heartShape()
  const end = Date.now() + durationMs
  let frame = 0

  const tick = () => {
    const remaining = end - Date.now()
    if (remaining <= 0) return
    frame = requestAnimationFrame(tick)

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.9 },
      colors: ['#ff8fb1', '#ffd1dd', '#d98bff', '#fff'],
      scalar: 1.1,
      shapes: shape ? [shape] : undefined,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.9 },
      colors: ['#ff8fb1', '#ffd1dd', '#d98bff', '#fff'],
      scalar: 1.1,
      shapes: shape ? [shape] : undefined,
    })
  }

  tick()
  burstHearts(0.5, 0.4)

  return () => cancelAnimationFrame(frame)
}
