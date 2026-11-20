import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useEffect } from 'react'
import { HER_NAME } from '../config'
import { celebrate } from '../lib/confetti'

const ROSES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 4 + ((i * 37) % 92),
  delay: i * 0.22,
  duration: 5 + (i % 4),
  size: 20 + (i % 3) * 8,
}))

export default function Celebration({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const stop = celebrate(7000)
    document.body.style.overflow = 'hidden'
    return () => {
      stop?.()
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden px-5"
          role="dialog"
          aria-modal="true"
          aria-label="Celebration"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,143,177,.35),rgba(28,7,16,.97)_55%)] backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b0a1a]/60 via-[#1c0710]/70 to-[#2b0a1a]/80" />

          {ROSES.map((r) => (
            <motion.span
              key={r.id}
              aria-hidden="true"
              initial={{ y: '-15vh', opacity: 0, rotate: -20 }}
              animate={{ y: '115vh', opacity: [0, 1, 1, 0.6], rotate: 340 }}
              transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0"
              style={{ left: `${r.left}%`, fontSize: r.size }}
            >
              🌹
            </motion.span>
          ))}

          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="relative z-10 w-full max-w-2xl rounded-[2.5rem] border border-rose-glow/30 bg-white/[0.07] px-6 py-14 text-center shadow-glow-lg backdrop-blur-2xl sm:px-12"
          >
            <button
              onClick={onClose}
              aria-label="Close celebration"
              className="absolute right-5 top-5 rounded-full p-2 text-cream/50 transition hover:bg-white/10 hover:text-cream"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-rose-glow/30 blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <motion.span
                animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="relative text-7xl drop-shadow-[0_0_40px_rgba(255,120,160,1)]"
              >
                ❤️
              </motion.span>
            </div>

            <p className="mt-6 font-script text-3xl text-rose-soft">{HER_NAME},</p>
            <h2 className="mt-3 font-serif text-[1.7rem] font-semibold uppercase leading-tight tracking-wide text-cream text-glow sm:text-4xl">
              Thank you for giving me a chance! ❤️
            </h2>

            <p className="mx-auto mt-7 max-w-lg font-serif text-[17px] leading-relaxed text-cream/85 sm:text-xl">
              Your feelings matter to me, and I promise to keep working on becoming better.
              I love you! ❤️
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="btn-primary mt-10"
            >
              <Heart className="h-4 w-4 fill-plum-900/80" />
              I love you too ❤️
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
