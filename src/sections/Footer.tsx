import { useState } from 'react';
import { Zap, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FooterProps {
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Dashboard', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Community', 'Tutorials', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  },
];

export default function Footer({ showToast }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to newsletter!', 'success');
    setEmail('');
  };

  return (
    <footer className="relative z-10 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter */}
        <div className="glass p-8 mb-16 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold font-display mb-2">Stay in the loop</h3>
          <p className="text-slate-400 text-sm mb-6">
            Get the latest content trends and product updates delivered weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-fuchsia-500/50 focus:outline-none"
            />
            <Button type="submit" size="md">
              <Send className="w-4 h-4" />
              Subscribe
            </Button>
          </form>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold font-display">ViralForge</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              The viral content engine that never sleeps. Generate viral content in one click.
            </p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => showToast('Coming soon', 'info')} className="w-9 h-9 glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button onClick={() => showToast('Coming soon', 'info')} className="w-9 h-9 glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
              <button onClick={() => showToast('Coming soon', 'info')} className="w-9 h-9 glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => showToast('Coming soon', 'info')}
                      className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 ViralForge. All rights reserved.</p>
          <p className="text-sm text-slate-500">Built with AI, for creators.</p>
        </div>
      </div>
    </footer>
  );
}
