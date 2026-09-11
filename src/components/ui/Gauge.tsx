import { useEffect, useState } from 'react';

interface GaugeProps {
  value: number;
  size?: number;
  label?: string;
  animate?: boolean;
}

export default function Gauge({ value, size = 120, label, animate = true }: GaugeProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const stroke = 8;

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }
    let frame: number;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, animate]);

  const offset = circumference - (displayValue / 100) * circumference;
  const color =
    displayValue >= 75 ? '#10b981' : displayValue >= 50 ? '#fbbf24' : '#f43f5e';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold font-display" style={{ color }}>
            {displayValue}
          </span>
        </div>
      </div>
      {label && <span className="text-xs text-slate-400">{label}</span>}
    </div>
  );
}
