import { motion, useInView } from 'framer-motion'
import { MailOpen, PenLine } from 'lucide-react'
import { useRef } from 'react'
import { HER_NAME } from '../config'
import { useTypewriter } from '../hooks/useTypewriter'

const LETTER = `I know that I made a mistake, and I know that my actions may have hurt you. I cannot undo what happened, but I genuinely want you to know how sorry I am.

You are important to me, and your feelings matter. I never want you to feel that your emotions are being ignored.

I am not asking you to forget everything immediately. I just want a chance to understand where I went wrong, learn from it, and become better.

I am truly sorry, my love. ❤️`

export default function Letter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const { typed, done, skip } = useTypewriter(LETTER, inView, 22)

  return (
    <section id="letter" className="section-shell">
      <div className="mb-12 text-center">
        <div className="eyebrow">
          <MailOpen className="h-3.5 w-3.5" />
          straight from the heart
        </div>
        <h2 className="display">
          A Letter From <span className="script text-[1.2em]">My Heart</span> 💌
        </h2>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mx-auto max-w-3xl"
        style={{ perspective: 1200 }}
      >
        <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-rose-glow/25 via-transparent to-lilac/20 blur-2xl" />

        <article className="relative overflow-hidden rounded-[1.75rem] bg-[#fff8f4] px-6 py-10 text-[#3a1524] shadow-soft sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply noise-overlay" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-glow/0 via-rose-glow to-rose-glow/0" />

          <p className="font-script text-3xl text-rose-deep/90">To {HER_NAME},</p>

          <div className="relative mt-6 min-h-[280px] whitespace-pre-line font-serif text-[17px] leading-[1.85] text-[#43202f] sm:min-h-[260px] sm:text-[19px]">
            {typed}
            {!done && inView && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-rose-deep align-middle" />
            )}
            {!inView && <span className="opacity-0">{LETTER}</span>}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-rose-deep/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-script text-2xl text-rose-deep/85">Yours, always ❤️</p>
            {!done && (
              <button
                onClick={skip}
                className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.2em] text-rose-deep/60 transition hover:text-rose-deep sm:self-auto"
              >
                <PenLine className="h-3.5 w-3.5" />
                Show full letter
              </button>
            )}
          </div>
        </article>
      </motion.div>
    </section>
  )
}
