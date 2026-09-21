import React, { useEffect, useState } from 'react';

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    // Detect touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      const newHeart = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setClickHearts((prev) => [...prev.slice(-12), newHeart]);

      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Desktop cursor ambient glow */}
      {!isTouch && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${pos.x - 120}px, ${pos.y - 120}px, 0)`,
          }}
        >
          <div className="w-60 h-60 rounded-full bg-rose-500/10 blur-3xl" />
        </div>
      )}

      {/* Floating mini hearts on click */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {clickHearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-rose-400 select-none text-lg animate-float-slow"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              animation: 'floatUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.6) rotate(0deg); }
          50% { opacity: 0.9; transform: translate(-50%, -80px) scale(1.2) rotate(${Math.random() > 0.5 ? 15 : -15}deg); }
          100% { opacity: 0; transform: translate(-50%, -130px) scale(0.9) rotate(0deg); }
        }
      `}</style>
    </>
  );
};
