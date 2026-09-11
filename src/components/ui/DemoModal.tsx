import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setProgress(0);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="glass p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 glass flex items-center justify-center hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold font-display mb-4">Product Demo</h3>

            {/* Mock video player */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-amber-400/20 rounded-xl overflow-hidden flex items-center justify-center group cursor-pointer"
              onClick={() => setPlaying(!playing)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {playing ? <Pause className="w-8 h-8 text-white" fill="white" /> : <Play className="w-8 h-8 text-white ml-1" fill="white" />}
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full gradient-bg" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-4 text-center">
              See how ViralForge generates viral content in seconds.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
