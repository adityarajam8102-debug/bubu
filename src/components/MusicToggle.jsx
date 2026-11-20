import { motion } from 'framer-motion'
import { Music2, Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * A soft, generated ambient pad — no external audio file, no autoplay.
 * It only starts after she taps the button.
 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const nodesRef = useRef([])
  const timerRef = useRef(null)

  const stop = () => {
    const ctx = ctxRef.current
    if (!ctx) return
    const master = masterRef.current
    if (master) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.5)
    }
    clearInterval(timerRef.current)
    setTimeout(() => {
      nodesRef.current.forEach((n) => {
        try {
          n.stop?.()
          n.disconnect?.()
        } catch {
          /* already stopped */
        }
      })
      nodesRef.current = []
      ctx.close().catch(() => {})
      ctxRef.current = null
      masterRef.current = null
    }, 900)
    setPlaying(false)
  }

  const start = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0
    master.gain.setTargetAtTime(0.075, ctx.currentTime, 1.6)
    master.connect(ctx.destination)
    masterRef.current = master

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 950
    filter.Q.value = 0.6
    filter.connect(master)

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 260
    lfo.connect(lfoGain).connect(filter.frequency)
    lfo.start()
    nodesRef.current.push(lfo, lfoGain, filter)

    // gentle romantic chord: F major add9, spread across octaves
    const notes = [174.61, 220.0, 261.63, 329.63, 392.0]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = i < 2 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      osc.detune.value = (i - 2) * 4

      const gain = ctx.createGain()
      gain.gain.value = 0.16 - i * 0.02
      const swell = ctx.createOscillator()
      const swellGain = ctx.createGain()
      swell.frequency.value = 0.045 + i * 0.017
      swellGain.gain.value = 0.06
      swell.connect(swellGain).connect(gain.gain)
      swell.start()

      osc.connect(gain).connect(filter)
      osc.start()
      nodesRef.current.push(osc, gain, swell, swellGain)
    })

    // sparse, soft chimes
    const chime = () => {
      if (!ctxRef.current) return
      const c = ctxRef.current
      const osc = c.createOscillator()
      const gain = c.createGain()
      osc.type = 'sine'
      osc.frequency.value = 523.25 * (Math.random() > 0.5 ? 1 : 1.5)
      gain.gain.setValueAtTime(0, c.currentTime)
      gain.gain.linearRampToValueAtTime(0.05, c.currentTime + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 4.5)
      osc.connect(gain).connect(master)
      osc.start()
      osc.stop(c.currentTime + 4.8)
    }
    chime()
    timerRef.current = setInterval(chime, 7000)
    setPlaying(true)
  }

  useEffect(() => () => {
    clearInterval(timerRef.current)
    nodesRef.current.forEach((n) => {
      try {
        n.stop?.()
      } catch {
        /* ignore */
      }
    })
    ctxRef.current?.close().catch(() => {})
  }, [])

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.6 }}
      onClick={() => (playing ? stop() : start())}
      aria-label={playing ? 'Pause background music' : 'Play soft background music'}
      aria-pressed={playing}
      className="group fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-plum-800/70 text-rose-soft shadow-glow backdrop-blur-xl transition hover:border-rose-glow/60 hover:text-white sm:bottom-7 sm:right-6 sm:h-14 sm:w-14"
    >
      {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
      {playing && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full border border-rose-glow/30" />
      )}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-plum-900/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cream/70 group-hover:block">
        {playing ? 'music on' : 'music off'}
      </span>
    </motion.button>
  )
}
