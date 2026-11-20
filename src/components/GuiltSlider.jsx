import { motion } from 'framer-motion'
import { Heart, Scale } from 'lucide-react'
import { useState } from 'react'
import { scrollToId } from '../lib/scroll'

const LEVELS = [
  { max: 10, text: 'Really? You are too sweet! ❤️', emoji: '🥰' },
  { max: 35, text: 'Okay, I admit I made a mistake.', emoji: '🥺' },
  { max: 60, text: 'I know I hurt you, and I am sorry.', emoji: '💔' },
  { max: 85, text: 'I deserve this anger. Please hear me out.', emoji: '🙏' },
  { max: 100, text: 'I accept my mistake. I am genuinely sorry. 💔', emoji: '😞' },
]

const levelFor = (value) => LEVELS.find((l) => value <= l.max) ?? LEVELS[LEVELS.length - 1]

export default function GuiltSlider() {
  const [value, setValue] = useState(50)
  const level = levelFor(value)

  return (
    <section id="guilt" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="glass relative overflow-hidden px-6 py-12 sm:px-14 sm:py-16"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-glow/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="eyebrow">
            <Scale className="h-3.5 w-3.5" />
            honesty, just between us
          </div>
          <h2 className="display">
            How Much Am I <span className="script text-[1.15em]">Guilty?</span> 🥺
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
            Be completely honest with me. Slide it wherever your heart says.
          </p>

          <div className="mt-10">
            <div className="mb-7 flex items-end justify-center gap-2">
              <motion.span
                key={value}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-[4.5rem] leading-none text-cream text-glow sm:text-[5.5rem]"
              >
                {value}
              </motion.span>
              <span className="pb-3 font-serif text-2xl text-rose-glow">%</span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="guilt-range"
              style={{ '--fill': `${value}%` }}
              aria-label="How much am I guilty? Choose a percentage"
              aria-valuetext={`${value} percent — ${level.text}`}
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/35">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <motion.div
            key={level.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-9 flex min-h-[92px] max-w-lg items-center justify-center gap-3 rounded-2xl border border-white/10 bg-plum-800/40 px-5 py-4"
          >
            <span className="text-2xl">{level.emoji}</span>
            <p className="font-serif text-lg italic leading-snug text-cream/90 sm:text-xl">
              {level.text}
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToId('letter')}
            className="btn-primary mt-10"
          >
            Continue <Heart className="h-4 w-4 fill-plum-900/80" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
