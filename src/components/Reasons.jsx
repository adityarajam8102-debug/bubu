import { motion } from 'framer-motion'
import {
  Crown,
  Flower2,
  Gift,
  Heart,
  Infinity as InfinityIcon,
  MessageCircleHeart,
  Shield,
  Sparkles,
  Star,
  Sun,
} from 'lucide-react'
import { REASONS } from '../config'

const ICONS = [Sun, Star, Heart, Sparkles, Flower2, Shield, MessageCircleHeart, Crown, Gift, InfinityIcon]

export default function Reasons() {
  return (
    <section id="reasons" className="section-shell">
      <div className="mb-14 text-center">
        <div className="eyebrow">
          <Sparkles className="h-3.5 w-3.5" />
          and I could keep going
        </div>
        <h2 className="display text-balance">
          10 Reasons Why <span className="script text-[1.2em]">You Are Special</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.article
              key={reason}
              initial={{ opacity: 0, y: 34, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6, borderColor: 'rgba(255,143,177,.45)' }}
              className="glass-soft group relative overflow-hidden p-6 transition-colors duration-300"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-glow/10 blur-2xl transition group-hover:bg-rose-glow/25" />

              <div className="relative flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-glow/25 bg-rose-glow/10 text-rose-soft transition group-hover:scale-110 group-hover:bg-rose-glow/20">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="font-serif text-3xl leading-none text-white/10 transition group-hover:text-rose-glow/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="relative mt-5 font-serif text-lg leading-snug text-cream/90">{reason}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
