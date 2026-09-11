import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { pricingPlans } from '@/data/mockData';

interface PricingProps {
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export default function Pricing({ showToast }: PricingProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-balance">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-slate-400 mt-4">Start free. Upgrade when you're ready to scale.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 glass p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !yearly ? 'gradient-bg text-white' : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                yearly ? 'gradient-bg text-white' : 'text-slate-400'
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-400">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => {
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-6 relative ${plan.highlighted ? 'glow-border border-fuchsia-500/30 md:scale-105 order-first md:order-none' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg px-4 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 badge-glow">
                    <Crown className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-2 mb-1">
                  {plan.name === 'Free' && <Zap className="w-5 h-5 text-slate-400" />}
                  {plan.name === 'Pro' && <Zap className="w-5 h-5 text-fuchsia-400" />}
                  {plan.name === 'Agency' && <Crown className="w-5 h-5 text-amber-400" />}
                  <h3 className="text-lg font-semibold font-display">{plan.name}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">{plan.desc}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold font-display">${price}</span>
                  <span className="text-sm text-slate-400">/mo</span>
                  {yearly && price > 0 && (
                    <div className="text-xs text-emerald-400 mt-1">Billed annually</div>
                  )}
                </div>

                <Button
                  variant={plan.highlighted ? 'gradient' : 'glass'}
                  className="w-full mb-6"
                  onClick={() => showToast(`Starting ${plan.name} plan...`, 'success')}
                >
                  {plan.name === 'Free' ? 'Get Started' : `Choose ${plan.name}`}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlighted ? 'gradient-bg' : 'bg-white/10'
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
