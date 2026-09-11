/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        forge: {
          violet: '#7c3aed',
          fuchsia: '#d946ef',
          amber: '#fbbf24',
        },
      },
      animation: {
        'mesh-1': 'mesh1 18s ease-in-out infinite',
        'mesh-2': 'mesh2 22s ease-in-out infinite',
        'mesh-3': 'mesh3 20s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        mesh1: {
          '0%,100%': { transform: 'translate(0%,0%) scale(1)' },
          '50%': { transform: 'translate(15%,-10%) scale(1.2)' },
        },
        mesh2: {
          '0%,100%': { transform: 'translate(0%,0%) scale(1)' },
          '50%': { transform: 'translate(-12%,15%) scale(1.15)' },
        },
        mesh3: {
          '0%,100%': { transform: 'translate(0%,0%) scale(1)' },
          '50%': { transform: 'translate(10%,12%) scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        wave: {
          '0%,100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
