import { useState, useCallback } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Dashboard from '@/sections/Dashboard';
import Pricing from '@/sections/Pricing';
import Testimonials from '@/sections/Testimonials';
import Footer from '@/sections/Footer';
import ToastContainer, { type Toast } from '@/components/ui/Toast';
import DemoModal from '@/components/ui/DemoModal';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scrollToDashboard = () => {
    document.querySelector('#dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    scrollToDashboard();
    showToast("Welcome to ViralForge! Let's create something viral.", 'success');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden">
        {/* Animated mesh gradient background */}
        <div className="mesh-bg">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
        </div>

        <Navbar
          darkMode={darkMode}
          onToggleDark={() => {
            setDarkMode((d) => !d);
            showToast(darkMode ? 'Light mode coming soon!' : 'Dark mode on', 'info');
          }}
          onGetStarted={handleGetStarted}
        />

        <main className="relative z-10">
          <Hero
            onLaunchFactory={scrollToDashboard}
            onWatchDemo={() => setDemoOpen(true)}
          />
          <Features />
          <Dashboard showToast={showToast} />
          <Pricing showToast={showToast} />
          <Testimonials />
        </main>

        <Footer showToast={showToast} />

        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </div>
  );
}

export default App;
