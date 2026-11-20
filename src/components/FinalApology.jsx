import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, HeartCrack, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HER_NAME } from '../config'

const MARGIN = 14

export default function FinalApology({ onYes }) {
  const reduce = useReducedMotion()
  const arenaRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dodges, setDodges] = useState(0)
  const [tease, setTease] = useState(false)
  const [showNo, setShowNo] = useState(false)
  const lastDodge = useRef(0)
  const teaseTimer = useRef(null)

  const tired = dodges >= 6

  useEffect(() => {
    const reset = () => setOffset({ x: 0, y: 0 })
    window.addEventListener('resize', reset)
    return () => {
      window.removeEventListener('resize', reset)
      clearTimeout(teaseTimer.current)
    }
  }, [])

  const dodge = useCallback(() => {
    if (reduce || tired) return
    const now = Date.now()
    if (now - lastDodge.current < 320) return
    lastDodge.current = now

    const el = arenaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const baseLeft = rect.left - offset.x
    const baseTop = rect.top - offset.y

    const radius = 110 + Math.random() * 90
    const angle = Math.random() * Math.PI * 2
    const targetLeft = rect.left + Math.cos(angle) * radius
    const targetTop = rect.top + Math.sin(angle) * radius * 0.6

    const maxLeft = window.innerWidth - rect.width - MARGIN
    const maxTop = window.innerHeight - rect.height - MARGIN
    const clampedLeft = Math.min(Math.max(targetLeft, MARGIN), Math.max(MARGIN, maxLeft))
    const clampedTop = Math.min(Math.max(targetTop, MARGIN), Math.max(MARGIN, maxTop))

    setOffset({ x: clampedLeft - baseLeft, y: clampedTop - baseTop })
    setDodges((d) => d + 1)
    setTease(true)
    clearTimeout(teaseTimer.current)
    teaseTimer.current = setTimeout(() => setTease(false), 1600)
  }, [offset.x, offset.y, reduce, tired])

  const onMouseMove = (e) => {
    if (reduce || tired) return
    const rect = arenaRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
    if (dist < 72) dodge()
  }

  return (
    <section id="final" className="section-shell !max-w-4xl pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-glow/25 bg-gradient-to-b from-[#360d21]/85 via-[#22070f]/90 to-[#2c0a1c]/90 px-5 py-16 text-center shadow-soft backdrop-blur-2xl sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-glow/25 blur-[90px]" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-lilac/10 blur-[100px]" />
        </div>

        {/* glowing heart */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-rose-glow/30"
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: i * 1.13, ease: 'easeOut' }}
            />
          ))}
          <div className="absolute inset-6 rounded-full bg-rose-glow/25 blur-2xl" />
          <motion.div
            animate={{ scale: [1, 1.07, 1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative text-7xl drop-shadow-[0_0_38px_rgba(255,120,160,1)] sm:text-8xl"
          >
            ❤️
          </motion.div>
        </div>

        <div className="relative mt-8">
          <p className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            the part that matters most
          </p>
          <h2 className="display text-balance">
            One Last <span className="script text-[1.2em]">Thing…</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-[17px] leading-relaxed text-cream/80 sm:text-xl">
            I know a website cannot undo my mistake, but I hope it can show you how much I care.
          </p>

          <h3 className="mt-10 font-serif text-[1.8rem] leading-tight text-cream text-glow sm:text-[2.6rem]">
            {HER_NAME}, will you please
            <span className="block font-script text-[1.35em] text-rose-glow">
              forgive me?
            </span>
            <span className="mt-1 inline-block text-2xl">🥺❤️</span>
          </h3>
        </div>

        <div
          onMouseMove={onMouseMove}
          className="relative mt-12 flex min-h-[11rem] flex-col items-center justify-center gap-6 sm:min-h-[8rem] sm:flex-row sm:gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onYes}
            className="btn-primary min-w-[9rem] text-base shadow-glow-lg"
          >
            YES ❤️
          </motion.button>

          <div className="relative h-14 w-40 shrink-0">
            <motion.button
              ref={arenaRef}
              animate={{ x: offset.x, y: offset.y, rotate: offset.x === 0 ? 0 : offset.x > 0 ? 6 : -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              onMouseEnter={dodge}
              onTouchStart={(e) => {
                if (tired) return
                e.preventDefault()
                dodge()
              }}
              onClick={() => setShowNo(true)}
              className="absolute inset-0 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-cream/80 backdrop-blur-md transition hover:border-rose-glow/50 hover:text-white"
              aria-label="No, I am not ready to forgive yet"
            >
              NO 💔
            </motion.button>
          </div>

          <AnimatePresence>
            {tease && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-rose-glow/25 bg-plum-900/80 px-3 py-1.5 text-[11px] text-cream/70"
              >
                {tired ? 'okay, okay… I will stay right here 🥺' : 'that one is a little shy 🥺'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="relative mt-2 text-[11px] leading-relaxed text-cream/40">
          {tired
            ? 'You can tap NO whenever you are ready — your choice matters more than my button.'
            : 'It may run away playfully. Your answer is always yours to make.'}
        </p>

        <button
          onClick={() => setShowNo(true)}
          className="relative mt-5 text-xs text-cream/55 underline decoration-white/20 underline-offset-4 transition hover:text-rose-soft"
        >
          I need more time — I want to say no
        </button>

        <AnimatePresence>
          {showNo && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 28 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative overflow-hidden"
            >
              <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-white/[0.06] px-6 py-7 backdrop-blur-xl">
                <HeartCrack className="mx-auto h-6 w-6 text-rose-glow/80" />
                <p className="mt-4 font-serif text-lg leading-relaxed text-cream/90">
                  I hear you, and I am not going to rush you. You do not owe me forgiveness.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  Take all the time you need. I will be here, and I will keep trying to be better —
                  whether you are ready today or someday.
                </p>
                <button
                  onClick={() => setShowNo(false)}
                  className="btn-ghost mt-6 text-xs"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Thank you for telling me honestly
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
