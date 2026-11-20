import { AnimatePresence, motion } from 'framer-motion'
import { Flower2, Gift, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { burstHearts, celebrate } from '../lib/confetti'

const SURPRISE =
  'You are my favourite part of every ordinary day. Thank you for being exactly who you are — and for letting me love you, even when I get things wrong. 🌹'

export default function SendLove() {
  const [shown, setShown] = useState(false)
  const [petals, setPetals] = useState([])

  const send = () => {
    setShown(true)
    burstHearts(0.5, 0.6)
    celebrate(3800)
    setPetals(
      Array.from({ length: 22 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        duration: 4 + Math.random() * 4,
        size: 12 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 160,
        emoji: ['🌹', '🌸', '❤️', '💕'][Math.floor(Math.random() * 4)],
      })),
    )
  }

  return (
    <section id="send" className="section-shell">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-rose-glow/20 bg-gradient-to-br from-[#3d1126]/80 via-[#2a0b19]/90 to-[#3a1230]/80 px-6 py-16 text-center shadow-soft backdrop-blur-xl sm:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow/15 blur-[80px]" />
        </div>

        <div className="relative">
          <p className="eyebrow">
            <Gift className="h-3.5 w-3.5" />
            a little extra love
          </p>
          <h2 className="display">
            Virtual Roses &amp; <span className="script text-[1.2em]">A Surprise</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/65">
            Because you deserve flowers on a random evening too.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={send}
            className="btn-primary mt-9 text-[15px]"
          >
            <Flower2 className="h-4 w-4" />
            Send Me Some Love 🌹
          </motion.button>

          <AnimatePresence>
            {shown && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mx-auto mt-10 max-w-lg rounded-3xl border border-rose-glow/25 bg-white/[0.07] px-6 py-8 backdrop-blur-lg"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-glow/15 text-rose-soft">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="mt-4 font-script text-3xl text-rose-soft">For you, always</p>
                <p className="mt-3 font-serif text-[17px] leading-relaxed text-cream/85">
                  {SURPRISE}
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-white/35">
                  press it as many times as you like
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* falling petals for this section */}
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
        {petals.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: '-15vh', opacity: 0, rotate: 0 }}
            animate={{ y: '115vh', opacity: [0, 1, 1, 0], rotate: p.drift > 0 ? 320 : -320 }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
            className="absolute top-0"
            style={{ left: `${p.left}%`, fontSize: p.size }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
