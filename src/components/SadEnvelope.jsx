import { AnimatePresence, motion } from 'framer-motion'
import { HeartHandshake, Mail } from 'lucide-react'
import { useState } from 'react'

export default function SadEnvelope() {
  const [open, setOpen] = useState(false)

  return (
    <section id="sad" className="section-shell">
      <div className="mb-14 text-center">
        <div className="eyebrow">
          <Mail className="h-3.5 w-3.5" />
          for the days that feel heavy
        </div>
        <h2 className="display text-balance">
          Open This Whenever <span className="script text-[1.2em]">You Feel Sad</span>
        </h2>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="relative w-full" style={{ perspective: 1400 }}>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close the envelope' : 'Open the envelope'}
            className="group relative block w-full focus-visible:outline-none"
          >
            <div
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-rose-glow/25 bg-gradient-to-br from-[#4a1228] to-[#2a0913] shadow-soft transition duration-500 group-hover:shadow-glow"
              style={{ aspectRatio: '3 / 2' }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay noise-overlay" />

              {/* body folds */}
              <div className="absolute inset-0">
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-tr from-[#5a1830]/70 via-transparent to-[#3a1020]/60" />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-[#52152c]"
                  style={{ clipPath: 'polygon(0 100%, 50% 22%, 100% 100%)' }}
                />
                <div
                  className="absolute inset-y-0 left-0 w-full bg-[#5d1a33]/70"
                  style={{ clipPath: 'polygon(0 0, 50% 55%, 0 100%)' }}
                />
                <div
                  className="absolute inset-y-0 right-0 w-full bg-[#5d1a33]/70"
                  style={{ clipPath: 'polygon(100% 0, 50% 55%, 100% 100%)' }}
                />
              </div>

              {/* flap */}
              <motion.div
                className="envelope-flap absolute inset-x-0 top-0 z-20 h-[62%] origin-top"
                animate={{ rotateX: open ? 168 : 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="h-full w-full bg-gradient-to-b from-[#6b1e3a] to-[#4a1126]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </motion.div>

              {/* heart seal */}
              <motion.div
                animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
                transition={{ duration: 0.35 }}
                className="absolute left-1/2 top-[46%] z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose-glow/50 bg-gradient-to-br from-rose-glow to-rose-deep text-xl shadow-glow"
              >
                ❤️
              </motion.div>

              <div className="absolute inset-x-0 bottom-4 z-30 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/60">
                  {open ? 'tap to close' : 'tap to open'}
                </span>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                className="relative z-10 mx-auto -mt-10 w-full max-w-md rounded-2xl border border-rose-glow/25 bg-[#fff7f3] px-6 py-8 text-center shadow-soft sm:px-9"
              >
                <span className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-rose-glow text-plum-900 shadow-glow">
                  <HeartHandshake className="h-4 w-4" />
                </span>
                <p className="mt-2 font-script text-2xl text-rose-deep">Read this slowly…</p>
                <p className="mt-3 font-serif text-[17px] leading-[1.85] text-[#43202f] sm:text-[18px]">
                  Even on difficult days, please remember that you matter. You deserve happiness,
                  kindness, patience, and genuine love. I am always willing to listen.
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-rose-deep/50">
                  keep this one, always
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
