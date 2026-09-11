import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'gradient' | 'glass' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  gradient:
    'gradient-bg text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.5)] hover:scale-105',
  glass:
    'glass text-slate-100 hover:bg-white/10 hover:scale-105 hover:border-white/20',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  outline:
    'border border-white/20 text-slate-100 hover:bg-white/5 hover:border-white/30 hover:scale-105',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gradient', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
