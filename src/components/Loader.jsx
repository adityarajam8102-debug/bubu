import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setVisible(false)
    }

    const img = new Image()
    img.src = '/assets/background.jpg'

    const timer = setTimeout(finish, 2100)
    if (img.complete) {
      setTimeout(finish, 900)
    } else {
      img.onload = () => setTimeout(finish, 500)
      img.onerror = () => setTimeout(finish, 500)
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum-900"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,143,177,.22),transparent_60%)]" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.95, 1.08, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="relative text-5xl drop-shadow-[0_0_30px_rgba(255,143,177,.9)]"
          >
            ❤️
          </motion.div>
          <p className="mt-7 font-script text-2xl text-rose-soft/90">just a moment…</p>
          <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-to-r from-transparent via-rose-glow to-transparent"
            />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/35">
            made with love
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
