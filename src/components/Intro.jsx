import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { HER_NAME } from '../config'
import { scrollToId } from '../lib/scroll'

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-8"
    >
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="eyebrow justify-center"
      >
        <Sparkles className="h-3.5 w-3.5" />
        a little something, just for you
        <Sparkles className="h-3.5 w-3.5" />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
        className="display mt-5 max-w-3xl text-balance"
      >
        <span className="block font-script text-[3.4rem] leading-[1.05] text-rose-glow text-glow sm:text-[5.5rem] lg:text-[6.5rem]">
          Hey {HER_NAME}
        </span>
        <span className="mt-2 inline-block text-2xl sm:text-3xl">❤️</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="mt-7 max-w-md text-[15px] leading-relaxed text-cream/75 sm:text-base"
      >
        I made something special for you. Please take a little moment to go through it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: 0.9 }}
        className="mt-10 flex flex-col items-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.035 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToId('guilt')}
          className="btn-primary group animate-breathe text-[15px]"
        >
          <Heart className="h-4 w-4 fill-plum-900/80" />
          Open My Heart
          <span aria-hidden="true" className="transition-transform group-hover:scale-125">
            ❤️
          </span>
        </motion.button>

        <div className="flex items-center gap-3 text-white/30" aria-hidden="true">
          <span className="h-px w-10 bg-white/20" />
          <span className="text-[9px] uppercase tracking-[0.4em]">scroll gently</span>
          <span className="h-px w-10 bg-white/20" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" />
          <circle cx="10" cy="8" r="2.2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  )
}
