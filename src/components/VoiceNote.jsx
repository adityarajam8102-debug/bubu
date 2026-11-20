import { motion } from 'framer-motion'
import { AlertCircle, Mic, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../config'

const BARS = 44
const HEIGHTS = Array.from({ length: BARS }, (_, i) => 18 + Math.abs(Math.sin(i * 0.72)) * 44)

const fmt = (time) => {
  if (!Number.isFinite(time) || time < 0) return '0:00'
  const m = Math.floor(time / 60)
  const s = Math.floor(time % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function VoiceNote() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => setCurrent(audio.currentTime)
    const onMeta = () => {
      setDuration(audio.duration)
      setLoaded(true)
    }
    const onEnd = () => {
      setPlaying(false)
      setCurrent(0)
    }
    const onError = () => {
      setError(true)
      setPlaying(false)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('durationchange', onMeta)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('durationchange', onMeta)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || error) return
    if (audio.paused) {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setError(true)
      }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    const next = Number(e.target.value)
    audio.currentTime = next
    setCurrent(next)
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <section id="voice" className="section-shell">
      <div className="mb-12 text-center">
        <div className="eyebrow">
          <Mic className="h-3.5 w-3.5" />
          recorded only for you
        </div>
        <h2 className="display text-balance">
          A Message From <span className="script text-[1.2em]">My Heart</span> 🎙️❤️
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/65">
          Sometimes words are not enough, so I recorded something just for you.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="glass relative mx-auto max-w-2xl overflow-hidden p-6 sm:p-10"
      >
        <div className="absolute -left-14 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-rose-glow/20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative shrink-0">
            <span className="absolute inset-0 rounded-full bg-rose-glow/30 blur-2xl" />
            <motion.div
              animate={playing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={playing ? { duration: 1.6, repeat: Infinity } : {}}
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-rose-soft/30 to-lilac/20 backdrop-blur-xl sm:h-24 sm:w-24"
            >
              <Mic className="h-8 w-8 text-rose-soft" strokeWidth={1.4} />
              {playing && (
                <span className="absolute inset-0 animate-ping rounded-full border border-rose-glow/40" />
              )}
            </motion.div>
          </div>

          <div className="w-full flex-1">
            <div className="flex h-16 items-center justify-center gap-[3px] sm:justify-start" aria-hidden="true">
              {HEIGHTS.map((h, i) => {
                const active = progress > (i / BARS) * 100
                return (
                  <span
                    key={i}
                    className={`audio-bar w-[3px] rounded-full sm:w-[4px] ${playing ? 'is-playing' : ''}`}
                    style={{
                      height: `${h}px`,
                      animationDelay: `${(i % 9) * 0.09}s`,
                      animationDuration: `${0.85 + (i % 5) * 0.12}s`,
                      background: active
                        ? 'linear-gradient(180deg,#ffd1dd,#ff6f9c)'
                        : 'rgba(255,255,255,.22)',
                      boxShadow: active ? '0 0 10px rgba(255,143,177,.65)' : 'none',
                    }}
                  />
                )
              })}
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={current}
              onChange={seek}
              aria-label="Voice note progress"
              className="guilt-range mt-3 h-4"
              style={{ '--fill': `${progress}%` }}
            />

            <div className="mt-1 flex justify-between font-mono text-[11px] tracking-wider text-cream/50">
              <span>{fmt(current)}</span>
              <span>{duration ? fmt(duration) : '--:--'}</span>
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: error ? 1 : 1.03 }}
            whileTap={{ scale: error ? 1 : 0.97 }}
            onClick={toggle}
            disabled={error}
            className="btn-primary w-full max-w-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-plum-900/80" />}
            {playing ? 'Pause' : 'Listen to My Voice ❤️'}
          </motion.button>

          {!loaded && !error && (
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">
              loading the recording…
            </p>
          )}

          {error && (
            <div className="flex max-w-md items-start gap-2 rounded-2xl border border-rose-glow/25 bg-rose-glow/10 px-4 py-3 text-left text-xs leading-relaxed text-cream/75">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-glow" />
              <span>
                Your browser could not play this recording. You can still{' '}
                <a
                  href={ASSETS.voiceNote}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-rose-soft underline underline-offset-2"
                >
                  open the voice note directly
                </a>
                .
              </span>
            </div>
          )}
        </div>

        <audio ref={audioRef} src={ASSETS.voiceNote} preload="metadata" />
      </motion.div>
    </section>
  )
}
