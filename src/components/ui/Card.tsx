import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass ${hover ? 'glass-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
