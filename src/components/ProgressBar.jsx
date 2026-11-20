import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const left = useTransform(smooth, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/5">
      <motion.div
        style={{ scaleX: smooth }}
        className="h-full origin-left bg-gradient-to-r from-rose-soft via-rose-glow to-lilac shadow-[0_0_18px_rgba(255,143,177,.9)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ left }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] drop-shadow-[0_0_8px_rgba(255,143,177,1)]"
      >
        ❤️
      </motion.div>
    </div>
  )
}
