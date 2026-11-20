import { motion } from 'framer-motion'
import { Heart, Quote } from 'lucide-react'
import { PROMISES } from '../config'

export default function Promises() {
  return (
    <section id="promises" className="section-shell">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-plum-800/40 px-5 py-16 backdrop-blur-xl sm:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-rose-glow/20 blur-[90px]" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-lilac/15 blur-[80px]" />
          <div className="absolute bottom-10 right-6 h-52 w-52 rounded-full bg-rose-deep/25 blur-[80px]" />
        </div>

        <div className="relative text-center">
          <div className="eyebrow">
            <Quote className="h-3.5 w-3.5" />
            not words, but intentions
          </div>
          <h2 className="display">
            My Promises <span className="script text-[1.2em]">To You</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
            Not promises to make you feel better tonight — promises I intend to keep.
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {PROMISES.map((promise, i) => (
            <motion.div
              key={promise}
              initial={{ opacity: 0, x: i % 2 ? 28 : -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:border-rose-glow/35 hover:bg-white/[0.08]"
            >
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-glow/30 bg-rose-glow/10 text-rose-soft shadow-[0_0_18px_rgba(255,143,177,.35)]"
              >
                <Heart className="h-3.5 w-3.5 fill-current" />
              </motion.span>
              <p className="font-serif text-[17px] leading-snug text-cream/90">{promise}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative mt-12 text-center font-script text-2xl text-rose-soft/90 sm:text-3xl"
        >
          and I will keep choosing you, every single day.
        </motion.p>
      </div>
    </section>
  )
}
