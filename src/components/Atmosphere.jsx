import { useMemo } from 'react'

let seed = 7
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}

function build(count, factory) {
  return Array.from({ length: count }, (_, i) => factory(i))
}

function Petal({ style }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="petal absolute top-0 h-4 w-4 sm:h-5 sm:w-5"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`petal-${style.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd6e3" />
          <stop offset="55%" stopColor="#ff8fb1" />
          <stop offset="100%" stopColor="#c2185b" />
        </linearGradient>
      </defs>
      <path
        d="M20 2C31 6 38 15 36 25c-2 10-12 14-20 11C7 33 2 24 5 15 7 8 13 4 20 2Z"
        fill={`url(#petal-${style.id})`}
        opacity="0.9"
      />
      <path d="M20 5c6 5 11 12 12 20" stroke="rgba(255,255,255,.45)" strokeWidth="1" fill="none" />
    </svg>
  )
}

export default function Atmosphere() {
  seed = 11
  const petals = useMemo(
    () =>
      build(16, (i) => ({
        id: i,
        left: `${rand() * 100}%`,
        '--duration': `${18 + rand() * 20}s`,
        '--delay': `${-rand() * 34}s`,
        '--drift': `${(rand() - 0.5) * 260}px`,
        '--spin': `${(rand() > 0.5 ? 1 : -1) * (200 + rand() * 420)}deg`,
        '--petal-opacity': 0.3 + rand() * 0.5,
        animationDuration: `${18 + rand() * 20}s`,
        animationDelay: `${-rand() * 34}s`,
      })),
    [],
  )

  seed = 29
  const hearts = useMemo(
    () =>
      build(11, (i) => ({
        id: i,
        left: `${rand() * 100}%`,
        bottom: `${-10 - rand() * 20}%`,
        '--duration': `${22 + rand() * 22}s`,
        '--delay': `${-rand() * 40}s`,
        '--drift': `${(rand() - 0.5) * 180}px`,
        '--scale': 0.5 + rand() * 0.8,
        animationDuration: `${22 + rand() * 22}s`,
        animationDelay: `${-rand() * 40}s`,
      })),
    [],
  )

  seed = 51
  const sparkles = useMemo(
    () =>
      build(30, (i) => ({
        id: i,
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        size: 1 + rand() * 2.5,
        '--duration': `${3 + rand() * 5}s`,
        '--delay': `${-rand() * 6}s`,
        animationDuration: `${3 + rand() * 5}s`,
        animationDelay: `${-rand() * 6}s`,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* soft colour glows */}
      <div className="absolute -left-24 top-[8%] h-[38rem] w-[38rem] rounded-full bg-rose-deep/25 blur-[130px]" />
      <div className="absolute -right-32 top-[52%] h-[34rem] w-[34rem] rounded-full bg-lilac/15 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-rose-glow/10 blur-[120px]" />

      {sparkles.map((s) => (
        <span
          key={`s-${s.id}`}
          className="sparkle absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 8px rgba(255,255,255,.9)',
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
          }}
        />
      ))}

      {hearts.map((h) => (
        <span
          key={`h-${h.id}`}
          className="heart-float absolute text-rose-glow/60"
          style={{
            left: h.left,
            bottom: h.bottom,
            fontSize: `${10 + (h['--scale'] || 1) * 14}px`,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
          }}
        >
          ❤
        </span>
      ))}

      {petals.map((p) => (
        <Petal key={`p-${p.id}`} style={p} />
      ))}
    </div>
  )
}
