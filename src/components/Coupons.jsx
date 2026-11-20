import { AnimatePresence, motion } from 'framer-motion'
import { Check, Film, Heart, HeartHandshake, Sparkles, Sun, Ticket, Utensils, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { COUPONS } from '../config'

const ICONS = {
  hug: HeartHandshake,
  heart: Heart,
  utensils: Utensils,
  film: Film,
  sparkles: Sparkles,
  sun: Sun,
}

export default function Coupons() {
  const [active, setActive] = useState(null)
  const [redeemed, setRedeemed] = useState([])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  const redeem = () => {
    if (!active) return
    setRedeemed((r) => (r.includes(active.title) ? r : [...r, active.title]))
    setTimeout(() => setActive(null), 1400)
  }

  return (
    <section id="coupons" className="section-shell">
      <div className="mb-14 text-center">
        <div className="eyebrow">
          <Ticket className="h-3.5 w-3.5" />
          no expiry date, no conditions
        </div>
        <h2 className="display text-balance">
          Unlimited Love <span className="script text-[1.2em]">Coupons</span> 🎟️
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          Tap any coupon to redeem it. Every single one is yours, forever.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COUPONS.map((coupon, i) => {
          const Icon = ICONS[coupon.icon] ?? Heart
          const isUsed = redeemed.includes(coupon.title)
          return (
            <motion.button
              key={coupon.title}
              onClick={() => setActive(coupon)}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.2 : -1.2 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6, rotate: 0 }}
              whileTap={{ scale: 0.985 }}
              className="group relative overflow-hidden rounded-2xl border border-rose-glow/25 bg-gradient-to-br from-[#3a1124]/90 to-[#2a0b19]/95 p-6 text-left shadow-soft transition-shadow duration-300 hover:shadow-glow"
            >
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-plum-900" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-plum-900" />

              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-glow/30 bg-rose-glow/10 text-rose-soft transition group-hover:scale-110 group-hover:bg-rose-glow/20">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/45">
                  {isUsed ? 'redeemed' : 'valid forever'}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-2xl text-cream">{coupon.title}</h3>
              <div className="my-4 border-t border-dashed border-white/15" />
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-rose-glow/70">
                <span>tap to redeem</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>

              {isUsed && (
                <span className="absolute right-4 top-1/2 rotate-[-12deg] rounded-md border-2 border-rose-glow/70 px-3 py-1 font-serif text-sm uppercase tracking-widest text-rose-glow/80">
                  redeemed
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-900/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} coupon`}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-rose-glow/30 bg-gradient-to-b from-[#40142a] to-[#25080f] p-8 text-center shadow-glow-lg"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close coupon"
                className="absolute right-4 top-4 rounded-full p-2 text-cream/50 transition hover:bg-white/10 hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rose-glow/40 bg-rose-glow/15 text-3xl"
              >
                🎟️
              </motion.div>

              <h3 className="mt-5 font-script text-4xl text-rose-soft">{active.title}</h3>
              <p className="mt-4 font-serif text-[17px] leading-relaxed text-cream/80">{active.note}</p>

              <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-rose-glow/60">
                one coupon, infinite love
              </p>

              {redeemed.includes(active.title) ? (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-rose-glow/30 bg-rose-glow/10 px-4 py-3 text-sm font-semibold text-rose-soft">
                  <Check className="h-4 w-4" /> It is yours, my love
                </div>
              ) : (
                <button onClick={redeem} className="btn-primary mt-6 w-full">
                  Redeem it now ❤️
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
