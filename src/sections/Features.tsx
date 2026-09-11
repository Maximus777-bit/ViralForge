import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Layers, TrendingUp, Mic, Calendar, Search, MessageCircle,
  type LucideProps,
} from 'lucide-react';
import Gauge from '@/components/ui/Gauge';
import { features } from '@/data/mockData';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Layers, TrendingUp, Mic, Calendar, Search, MessageCircle,
};

const trendingTopics = [
  'AI content tools', 'Short-form video', 'Creator economy', 'Viral hooks',
  'Carousel design', 'Voice cloning', 'Trend jacking', 'UGC marketing',
  'TikTok algorithm', 'Instagram Reels', 'YouTube Shorts', 'Thread writing',
];

const mockComments = [
  { user: '@sarah_creates', text: 'This is INSANE 🔥', avatar: 'S', color: 'from-pink-500 to-rose-500' },
  { user: '@growthguru', text: 'How did you make this??', avatar: 'G', color: 'from-violet-500 to-fuchsia-500' },
  { user: '@dailydose', text: 'Saving this immediately', avatar: 'D', color: 'from-amber-500 to-orange-500' },
];

const timeline = ['Research', 'Draft', 'Design', 'Schedule', 'Publish'];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = iconMap[feature.icon] ?? Layers;
  const gaugeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gaugeRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass glass-hover p-6 ${feature.span} relative overflow-hidden group`}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-colors" />
      <div className="relative z-10">
        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold font-display mb-2">{feature.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>

        {feature.icon === 'TrendingUp' && (
          <div ref={gaugeRef} className="mt-4 flex justify-center">
            <Gauge value={87} size={80} label="Virality" animate={inView} />
          </div>
        )}

        {feature.icon === 'Mic' && (
          <div className="mt-4 flex items-center justify-center gap-1 h-12">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div
                key={i}
                className="w-1.5 gradient-bg rounded-full animate-wave"
                style={{
                  height: '100%',
                  animationDelay: `${i * 0.08}s`,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </div>
        )}

        {feature.icon === 'Calendar' && (
          <div className="mt-4 flex items-center justify-between">
            {timeline.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'gradient-bg text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-[10px] text-slate-500 hidden sm:block">{step}</span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="flex-1 h-0.5 bg-white/10 mx-1" />
                )}
              </div>
            ))}
          </div>
        )}

        {feature.icon === 'Search' && (
          <div className="mt-4 overflow-hidden">
            <div className="flex gap-2 animate-marquee">
              {[...trendingTopics, ...trendingTopics].map((topic, i) => (
                <span
                  key={i}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {feature.icon === 'MessageCircle' && (
          <div className="mt-4 space-y-2">
            {mockComments.map((c) => (
              <div key={c.user} className="flex items-center gap-2 glass p-2">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {c.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400">{c.user}</div>
                  <div className="text-xs text-slate-200 truncate">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-balance">
            Everything you need to <span className="gradient-text">go viral</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Six powerful tools that replace your entire content team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
