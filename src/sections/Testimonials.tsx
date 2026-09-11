import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/mockData';

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="glass p-6 w-[280px] sm:w-[320px] shrink-0 mx-2 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shrink-0">
          {t.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-slate-400">{t.role}</div>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < t.stars ? 'text-amber-400' : 'text-slate-600'}`}
            fill={i < t.stars ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">"{t.quote}"</p>
    </div>
  );
}

export default function Testimonials() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollMobile = (dir: 'left' | 'right') => {
    const next = dir === 'left'
      ? Math.max(0, mobileIndex - 1)
      : Math.min(testimonials.length - 1, mobileIndex + 1);
    setMobileIndex(next);
  };

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-4"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-display text-balance">
          Loved by <span className="gradient-text">creators worldwide</span>
        </h2>
        <p className="text-slate-400 mt-4">Join 100,000+ creators using ViralForge</p>
      </motion.div>

      {/* Desktop: auto-scrolling marquee */}
      <div className="hidden md:block relative">
        <div className="flex animate-marquee">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>

      {/* Mobile: swipeable carousel with arrows */}
      <div className="md:hidden">
        <div className="relative px-4">
          <div className="overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex"
              animate={{ x: `calc(-${mobileIndex} * (100% + 16px))` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === mobileIndex ? 'w-8 gradient-bg' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scrollMobile('left')}
            disabled={mobileIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 glass flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollMobile('right')}
            disabled={mobileIndex === testimonials.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 glass flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
