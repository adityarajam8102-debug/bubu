import { motion } from 'framer-motion'
import { Camera, Heart } from 'lucide-react'
import { MEMORIES } from '../config'

export default function Memories() {
  return (
    <section id="memories" className="section-shell">
      <div className="mb-14 text-center">
        <div className="eyebrow">
          <Camera className="h-3.5 w-3.5" />
          the parts I keep replaying
        </div>
        <h2 className="display">
          Our Beautiful <span className="script text-[1.2em]">Memories</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          Small moments, real days, and the smile I never want to be the reason for losing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {MEMORIES.map((photo, i) => (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: 60, rotate: photo.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: (i % 3) * 0.12, ease: 'easeOut' }}
            whileHover={{ rotate: 0, y: -10, scale: 1.025 }}
            className="group relative mx-auto w-full max-w-[330px] cursor-default rounded-[6px] bg-[#fffaf7] p-3 pb-0 shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-25px_rgba(255,143,177,.45)]"
          >
            {/* washi tape */}
            <span className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-[2px] bg-gradient-to-r from-rose-soft/70 to-rose-glow/60 opacity-80 shadow-sm backdrop-blur-sm" />

            <div className="relative overflow-hidden bg-plum-800">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-[900ms] group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900/45 via-transparent to-transparent opacity-70 transition group-hover:opacity-40" />
              {photo.note && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-plum-900/70 px-3 py-2 text-center font-serif text-[13px] italic text-cream/90 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                  {photo.note}
                </div>
              )}
            </div>

            <figcaption className="flex flex-col items-center gap-1 px-2 py-4 text-center">
              <Heart className="h-3 w-3 fill-rose-deep/70 text-rose-deep/70" />
              <p className="font-script text-[1.35rem] leading-tight text-[#4a1d34]">
                {photo.caption}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="mt-14 text-center text-[11px] uppercase tracking-[0.32em] text-white/30">
        every picture here is really us
      </p>
    </section>
  )
}
