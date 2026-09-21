import React, { useMemo } from 'react';

export const FloatingParticles: React.FC = () => {
  // Generate stable particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      isGold: i % 3 === 0,
      isHeart: i % 8 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full animate-float-slow transition-opacity ${
            p.isHeart
              ? 'text-rose-300 text-xs select-none'
              : p.isGold
              ? 'bg-gold-400'
              : 'bg-rose-200'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.isHeart ? 'auto' : `${p.size}px`,
            height: p.isHeart ? 'auto' : `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: p.isHeart ? 'none' : 'blur(0.5px)',
          }}
        >
          {p.isHeart ? '♥' : ''}
        </span>
      ))}
    </div>
  );
};
