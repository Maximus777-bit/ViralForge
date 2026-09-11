import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

export function useParallax(strength: number = 20) {
  const { x, y } = useMousePosition();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = ((x - centerX) / centerX) * strength;
  const offsetY = ((y - centerY) / centerY) * strength;
  return { x: offsetX, y: offsetY };
}
