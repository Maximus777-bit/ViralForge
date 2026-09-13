import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, FolderKanban, BarChart3, Video, GalleryVerticalEnd, Image as ImageIcon,
  MessageSquare, Circle, Check, Download, Copy, Calendar, Send, Search, Play,
  ChevronRight, TrendingUp,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Gauge from '@/components/ui/Gauge';
import {
  platforms, trendingTags, formats, projects, viewsData, formatPerformance,
  statCards, heatmapData, heatmapDays, heatmapSlots, generateSteps, mockScript,
} from '@/data/mockData';

interface DashboardProps {
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const formatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Video, GalleryVerticalEnd, ImageIcon, MessageSquare, Circle,
};

const platformNames: Record<string, string> = {
  tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', telegram: 'Telegram', x: 'X',
};

function heatColor(value: number): string {
  if (value >= 90) return 'bg-fuchsia-500';
  if (value >= 75) return 'bg-fuchsia-500/70';
  if (value >= 60) return 'bg-violet-500/60';
  if (value >= 40) return 'bg-violet-500/40';
  if (value >= 25) return 'bg-violet-500/25';
  return 'bg-white/5';
}

/* ============ TAB 1: CREATE WIZARD ============ */

const deviceMockups: Record<string, React.ReactNode> = {
  video: (
    <div className="relative w-20 h-36 bg-slate-900 rounded-xl border-2 border-white/10 p-1">
      <div className="w-full h-full rounded-lg bg-gradient-to-b from-violet-600/30 to-fuchsia-500/30 flex items-center justify-center">
        <Video className="w-6 h-6 text-white/50" />
      </div>
    </div>
  ),
  carousel: (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-12 h-36 bg-gradient-to-b from-violet-600/20 to-fuchsia-500/20 rounded-lg border border-white/10 flex items-center justify-center">
          <GalleryVerticalEnd className="w-4 h-4 text-white/40" />
        </div>
      ))}
    </div>
  ),
  meme: (
    <div className="relative w-28 h-28 bg-slate-900 rounded-xl border-2 border-white/10 overflow-hidden flex items-center justify-center">
      <ImageIcon className="w-8 h-8 text-white/40" />
      <div className="absolute bottom-2 left-2 right-2 text-center text-[8px] font-bold text-white uppercase tracking-wide">
        When AI writes your content
      </div>
    </div>
  ),
  thread: (
    <div className="flex flex-col gap-1 w-28">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-slate-900 border border-white/10 rounded-lg p-1.5">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full gradient-bg" />
            <div className="h-1.5 w-8 bg-white/10 rounded-full" />
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full mb-0.5" />
          <div className="h-1 w-2/3 bg-white/5 rounded-full" />
        </div>
      ))}
    </div>
  ),
  story: (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-16 h-28 rounded-xl border-2 border-white/10 bg-gradient-to-b from-fuchsia-500/20 to-amber-400/20 flex items-center justify-center">
          <Circle className={`w-4 h-4 ${i === 0 ? 'text-fuchsia-400' : 'text-white/30'}`} />
        </div>
      ))}
    </div>
  ),
};

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#7c3aed', '#d946ef', '#fbbf24', '#10b981', '#ec4899'][i % 5],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 1.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function CreateTab({ showToast }: { showToast: DashboardProps['showToast'] }) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok']);
  const [selectedFormat, setSelectedFormat] = useState<string>('video');
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(-1);
  const [generated, setGenerated] = useState(false);
  const [viralScore, setViralScore] = useState(87);
  const [confetti, setConfetti] = useState(false);
  const [activeTag, setActiveTag] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [script, setScript] = useState(mockScript);
  const [imageUrl, setImageUrl] = useState('');
  const [genError, setGenError] = useState('');

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const startGenerate = async () => {
    setGenerating(true);
    setGenStep(0);
    setGenerated(false);
    setGenError('');

    try {
      setGenStep(1);
      const scriptRes = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platform: selectedPlatforms[0] || 'tiktok',
          format: selectedFormat,
        }),
      });
      const scriptData = await scriptRes.json();
      if (scriptData.error) throw new Error(scriptData.error);
      setScript({ hook: scriptData.hook, body: scriptData.body, cta: scriptData.cta });
      setViralScore(scriptData.viralScore);

      setGenStep(2);
      const imageRes = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${topic}, ${scriptData.hook}`.slice(0, 300) }),
      });
      const imageData = await imageRes.json();
      if (imageData.error) throw new Error(imageData.error);
      setImageUrl(imageData.imageUrl);

      setGenStep(3);
      const saveRes = await fetch('/api/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic,
          platform: selectedPlatforms[0] || 'tiktok',
          format: selectedFormat,
          script: `${scriptData.hook}\n\n${scriptData.body}\n\n${scriptData.cta}`,
          viralScore: scriptData.viralScore,
          imageUrl: imageData.imageUrl,
        }),
      });
      const saveData = await saveRes.json();
      if (saveData.error) throw new Error(saveData.error);

      setGenStep(4);
      setGenerating(false);
      setGenerated(true);
    } catch (err) {
      setGenerating(false);
      setGenStep(-1);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setGenError(message);
      showToast(`Generation failed: ${message}`, 'error');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTag((prev) => (prev + 1) % trendingTags.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setPlayProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playing]);

  const handlePostNow = () => {
    setConfetti(true);
    showToast('Posted successfully to all platforms!', 'success');
    setTimeout(() => setConfetti(false), 3500);
  };

  const handleStartOver = () => {
    setStep(1);
    setGenerated(false);
    setGenStep(-1);
    setPlaying(false);
    setPlayProgress(0);
    setScript(mockScript);
    setImageUrl('');
    setGenError('');
  };

  const stepLabels = ['Idea', 'Format', 'Generate', 'Export'];

  return (
    <div className="space-y-6">
      <ConfettiBurst show={confetti} />

      {/* Step indicator — vertical on mobile, horizontal on desktop */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-1 sm:gap-2 sm:gap-4">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center w-full sm:w-auto">
            <button
              onClick={() => i < step && setStep(i + 1)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all w-full sm:w-auto ${
                step === i + 1
                  ? 'gradient-bg text-white'
                  : i < step
                  ? 'bg-white/10 text-slate-200 cursor-pointer hover:bg-white/15'
                  : 'bg-white/5 text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              <span>{label}</span>
            </button>
            {i < stepLabels.length - 1 && (
              <ChevronRight className="hidden sm:block w-4 h-4 text-slate-600 mx-1" />
            )}
            {i < stepLabels.length - 1 && (
              <div className="sm:hidden w-0.5 h-4 bg-white/10 ml-4" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: IDEA */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-6 space-y-6"
          >
            <div>
              <label className="text-sm text-slate-400 mb-2 block">What's your topic?</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How AI is changing content creation in 2026..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:border-fuchsia-500/50 focus:outline-none transition-colors resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-3 block">Select platforms</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedPlatforms.includes(p.id)
                        ? `${p.color} scale-105`
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-3 block">Trending tags</label>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, i) => (
                  <button
                    key={tag}
                    onClick={() => showToast(`Added ${tag}`, 'info')}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-500 ${
                      activeTag === i
                        ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 shadow-[0_0_15px_-2px_rgba(217,70,239,0.4)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full sm:w-auto" disabled={!topic}>
              Continue to Format
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* STEP 2: FORMAT */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-6 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formats.map((f) => {
                const Icon = formatIcons[f.icon] ?? Video;
                const selected = selectedFormat === f.id;
                return (
                  <motion.button
                    key={f.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFormat(f.id)}
                    className={`glass p-5 text-left transition-all relative overflow-hidden ${
                      selected ? 'glow-border border-fuchsia-500/40' : 'border-white/10'
                    }`}
                  >
                    {selected && (
                      <motion.div
                        layoutId="format-glow"
                        className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 pointer-events-none"
                      />
                    )}
                    <div className="relative z-10 flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        selected ? 'gradient-bg' : 'bg-white/10'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{f.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{f.desc}</div>
                      </div>
                    </div>
                    {selected && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Device mockup preview */}
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Preview</div>
              <motion.div
                key={selectedFormat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {deviceMockups[selectedFormat]}
              </motion.div>
            </div>

            <div className="flex gap-3">
              <Button variant="glass" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>
                Continue to Generate
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: GENERATE */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Left: Script editor */}
            <div className="glass p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-slate-300">Script Editor</h4>
                <Badge variant="gradient">AI Draft</Badge>
              </div>
              <div>
                <label className="text-xs text-fuchsia-400 mb-1 block font-medium">Hook</label>
                <textarea
                  value={script.hook}
                  onChange={(e) => setScript((s) => ({ ...s, hook: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-sm text-slate-100 focus:border-fuchsia-500/50 focus:outline-none resize-none transition-colors"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-xs text-fuchsia-400 mb-1 block font-medium">Body</label>
                <textarea
                  value={script.body}
                  onChange={(e) => setScript((s) => ({ ...s, body: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-sm text-slate-100 focus:border-fuchsia-500/50 focus:outline-none resize-none transition-colors"
                  rows={6}
                />
              </div>
              <div>
                <label className="text-xs text-fuchsia-400 mb-1 block font-medium">CTA</label>
                <textarea
                  value={script.cta}
                  onChange={(e) => setScript((s) => ({ ...s, cta: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-sm text-slate-100 focus:border-fuchsia-500/50 focus:outline-none resize-none transition-colors"
                  rows={2}
                />
              </div>
            </div>

            {/* Right: Generate panel */}
            <div className="glass p-6 flex flex-col items-center justify-center gap-6 min-h-[400px]">
              {!generating && !generated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto">
                    <Wand2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ready to generate</h4>
                    <p className="text-sm text-slate-400">AI will write your script and score its virality</p>
                  </div>
                  <Button onClick={startGenerate} size="lg" className="w-full">
                    <Wand2 className="w-5 h-5" />
                    Generate Content
                  </Button>
                </motion.div>
              )}

              {generating && (
                <div className="w-full space-y-4">
                  <div className="text-center mb-2">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-slate-400">Generating your content...</p>
                  </div>
                  {generateSteps.map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        i < genStep ? 'bg-emerald-500' : i === genStep ? 'gradient-bg' : 'bg-white/10'
                      }`}>
                        {i < genStep ? <Check className="w-3.5 h-3.5 text-white" /> :
                         i === genStep ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> :
                         <div className="w-2 h-2 bg-white/30 rounded-full" />}
                      </div>
                      <span className={`text-sm transition-colors ${i <= genStep ? 'text-slate-100' : 'text-slate-500'}`}>{s}</span>
                      {i < genStep && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-emerald-400 ml-auto"
                        >
                          Done
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {generated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full space-y-4"
                >
                  <Gauge value={viralScore} size={120} label="Viral Score" />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Generated visual"
                      className="w-full max-h-40 object-cover rounded-xl border border-white/10"
                    />
                  )}
                  <div className="glass p-3 max-h-40 overflow-y-auto">
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{script.body}</p>
                  </div>
                  <Button onClick={() => setStep(4)} className="w-full">
                    Proceed to Export
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}

              {genError && !generating && (
                <p className="text-xs text-red-400 text-center max-w-xs">{genError}</p>
              )}

              <div className="flex gap-2">
                <Button variant="glass" size="sm" onClick={() => setStep(2)}>Back</Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: EXPORT */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-6 space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {/* Mock video player */}
              <div className="relative w-full max-w-[200px] aspect-[9/16] bg-gradient-to-b from-violet-600/30 via-fuchsia-500/20 to-amber-400/20 rounded-2xl flex items-center justify-center group cursor-pointer overflow-hidden"
                onClick={() => { setPlaying(!playing); if (!playing) setPlayProgress(0); }}
              >
                <motion.div
                  animate={{ scale: playing ? 0.9 : 1 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  {playing ? (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-6 bg-white rounded-sm" />
                      <div className="w-1.5 h-6 bg-white rounded-sm" />
                    </div>
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  )}
                </motion.div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-bg rounded-full"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/70 mt-1">
                    <span>{Math.floor(playProgress * 0.3)}s</span>
                    <span>0:30</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="gradient" className="text-[10px]">
                    {formats.find((f) => f.id === selectedFormat)?.name ?? 'Video'}
                  </Badge>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex-1 space-y-3 max-w-xs w-full">
                <h4 className="font-semibold text-sm text-slate-300 text-center sm:text-left">Export & Publish</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="glass" size="sm" onClick={() => showToast('Downloading...', 'success')}>
                    <Download className="w-4 h-4" /> Download
                  </Button>
                  <Button variant="glass" size="sm" onClick={() => showToast('Copied to clipboard!', 'success')}>
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                  <Button variant="glass" size="sm" onClick={() => showToast('Schedule opened', 'info')}>
                    <Calendar className="w-4 h-4" /> Schedule
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePostNow}
                    className="inline-flex items-center justify-center gap-2 rounded-xl gradient-bg text-white font-semibold px-6 py-3 text-sm transition-all shadow-[0_0_20px_-5px_rgba(217,70,239,0.5)]"
                  >
                    <Send className="w-4 h-4" /> Post Now
                  </motion.button>
                </div>
                <div className="text-xs text-slate-500 text-center sm:text-left pt-2">
                  Content ready for {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="glass" size="sm" onClick={() => setStep(3)}>Back</Button>
              <Button variant="ghost" size="sm" onClick={handleStartOver}>
                Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============ TAB 2: PROJECTS ============ */
function ProjectsTab({ showToast }: { showToast: DashboardProps['showToast'] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.platform === filter;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    published: 'bg-emerald-500',
    draft: 'bg-amber-500',
    scheduled: 'bg-blue-500',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-fuchsia-500/50 focus:outline-none"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:border-fuchsia-500/50 focus:outline-none"
        >
          <option value="all">All Platforms</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="telegram">Telegram</option>
          <option value="x">X</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass glass-hover p-5 cursor-pointer"
            onClick={() => showToast(`Opening ${p.name}`, 'info')}
          >
            <div className="flex items-start justify-between mb-3">
              <Badge variant="default">{platformNames[p.platform]}</Badge>
              <Badge variant={p.score >= 85 ? 'success' : 'warning'}>
                <TrendingUp className="w-3 h-3" />
                {p.score}
              </Badge>
            </div>
            <h4 className="font-semibold text-sm mb-2">{p.name}</h4>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${statusColors[p.status]}`} />
                <span className="capitalize">{p.status}</span>
              </div>
              <span>{p.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No projects found. Try a different search or filter.
        </div>
      )}
    </div>
  );
}

/* ============ TAB 3: ANALYTICS ============ */
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass p-5">
          <h4 className="text-sm font-semibold mb-4">Views Over 7 Days</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d946ef" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#d946ef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(2,6,23,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#d946ef" strokeWidth={2} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-5">
          <h4 className="text-sm font-semibold mb-4">Performance by Format</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formatPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="format" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(2,6,23,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass p-5">
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold font-display">{stat.value}</div>
            <div className={`text-xs mt-1 ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass p-5">
        <h4 className="text-sm font-semibold mb-4">Best Time to Post</h4>
        <div className="space-y-1.5">
          <div className="grid grid-cols-5 gap-1.5">
            <div />
            {heatmapSlots.map((slot) => (
              <div key={slot} className="text-xs text-slate-500 text-center">{slot}</div>
            ))}
          </div>
          {heatmapData.map((row, dayIdx) => (
            <div key={dayIdx} className="grid grid-cols-5 gap-1.5">
              <div className="text-xs text-slate-500 flex items-center">{heatmapDays[dayIdx]}</div>
              {row.map((val, slotIdx) => (
                <div
                  key={slotIdx}
                  className={`h-10 rounded-lg ${heatColor(val)} hover:ring-2 hover:ring-fuchsia-500/50 transition-all cursor-pointer`}
                  title={`${heatmapDays[dayIdx]} ${heatmapSlots[slotIdx]}: ${val}% engagement`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ MAIN DASHBOARD ============ */
export default function Dashboard({ showToast }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Create', icon: Wand2 },
    { label: 'Projects', icon: FolderKanban },
    { label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <section id="dashboard" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-balance">
            Your <span className="gradient-text">ViralForge</span> Dashboard
          </h2>
          <p className="text-slate-400 mt-4">Create, manage, and analyze — all in one place</p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex justify-center mb-8">
          <div className="glass p-1.5 flex gap-1">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === i ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 gradient-bg rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 0 && <CreateTab showToast={showToast} />}
            {activeTab === 1 && <ProjectsTab showToast={showToast} />}
            {activeTab === 2 && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
