import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Video, GalleryVerticalEnd, Image as ImageIcon, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useParallax } from '@/hooks/useMousePosition';

interface HeroProps {
  onLaunchFactory: () => void;
  onWatchDemo: () => void;
}

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  const formatted =
    count >= 1000000 ? `${(count / 1000000).toFixed(1)}M`
    : count >= 1000 ? `${(count / 1000).toFixed(0)}K`
    : `${count}`;

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold font-display gradient-text">
        {formatted}{suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  parallaxStrength,
  floatDelay = '0s',
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  parallaxStrength: number;
  floatDelay?: string;
}) {
  const { x, y } = useParallax(parallaxStrength);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      style={{ x, y, animationDelay: floatDelay }}
      className={`glass glass-hover absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ onLaunchFactory, onWatchDemo }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span className="text-sm text-slate-300">AI-powered content creation platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-tight text-balance"
        >
          <span className="gradient-text">Viral Content Engine</span>
          <br />
          <span className="text-slate-100">That Never Sleeps</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 mt-6 max-w-2xl mx-auto text-balance"
        >
          The viral content engine that prints views while you sleep
          <span className="inline-block w-0.5 h-6 ml-1 gradient-bg animate-cursor-blink align-middle" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button size="lg" onClick={onLaunchFactory} className="w-full sm:w-auto">
            <Sparkles className="w-5 h-5" />
            Launch Factory
          </Button>
          <Button size="lg" variant="glass" onClick={onWatchDemo} className="w-full sm:w-auto">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-16"
        >
          <AnimatedCounter value={2400000} suffix="" label="videos generated" />
          <AnimatedCounter value={847000} suffix="" label="posts created" />
          <AnimatedCounter value={156} suffix="" label="countries" />
        </motion.div>
      </div>

      {/* Floating glass cards — 1 on mobile, 3 on desktop */}
      <FloatingCard delay={0.5} parallaxStrength={15} floatDelay="0s" className="lg:top-24 lg:left-8 lg:w-48 lg:h-64 top-4 right-4 w-36 h-48 flex-col p-3 animate-float">
        <div className="w-full h-24 lg:h-32 gradient-bg rounded-lg flex items-center justify-center mb-3">
          <Video className="w-8 h-8 lg:w-10 lg:h-10 text-white/80" />
        </div>
        <div className="text-xs text-slate-400 mb-1">Video Preview</div>
        <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2" />
        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
        <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          <span>87 viral score</span>
        </div>
      </FloatingCard>

      <FloatingCard delay={0.7} parallaxStrength={25} floatDelay="1.5s" className="hidden lg:flex top-32 right-8 w-44 h-56 flex-col p-4 animate-float" >
        <div className="text-xs text-slate-400 mb-2">Carousel</div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-full h-12 bg-gradient-to-r from-violet-600/30 to-fuchsia-500/30 rounded-lg mb-2 flex items-center justify-center">
            <GalleryVerticalEnd className="w-5 h-5 text-white/50" />
          </div>
        ))}
        <div className="flex gap-1 justify-center mt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-fuchsia-500' : 'bg-white/20'}`} />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard delay={0.9} parallaxStrength={20} floatDelay="3s" className="hidden lg:flex bottom-24 left-16 w-40 h-40 flex-col items-center justify-center p-4 animate-float">
        <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-2">
          <ImageIcon className="w-8 h-8 text-white/80" />
        </div>
        <div className="text-xs text-slate-400">Meme Generator</div>
        <div className="text-xs text-fuchsia-400 mt-1">Trending now</div>
      </FloatingCard>
    </section>
  );
}
