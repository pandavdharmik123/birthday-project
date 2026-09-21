import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';
import { Sparkles } from 'lucide-react';

interface ScratchCardProps {
  heading: string;
  subheading: string;
  hiddenMessage: string;
  revealNote: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  heading,
  subheading,
  hiddenMessage,
  revealNote,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on CSS display
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw luxury rose-gold foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#5C122C');
    grad.addColorStop(0.35, '#851A3F');
    grad.addColorStop(0.7, '#DE8E9D');
    grad.addColorStop(1, '#D4AF37');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add romantic pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to reveal our secret ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchedPercentage();
  };

  const checkScratchedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentCount = 0;
      const step = 32; // sampling for performance

      for (let i = 3; i < data.length; i += step) {
        if (data[i] === 0) {
          transparentCount++;
        }
      }

      const totalSampled = data.length / step;
      const percentage = (transparentCount / totalSampled) * 100;

      if (percentage > 40 && !isRevealed) {
        setIsRevealed(true);
        soundFx.playRomanticChime();
        triggerHeartConfetti();
        // Clear entire canvas smoothly
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    } catch {
      // Fallback
    }
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
        >
          A Private Secret
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-3"
        >
          {heading}
        </motion.h2>
        <p className="font-serif italic text-base text-ivory-300/70 mb-10">
          {subheading}
        </p>

        {/* Scratch Card Container */}
        <div
          ref={containerRef}
          className="relative max-w-lg mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-rose-300/20 glass-panel flex items-center justify-center p-8 select-none"
        >
          {/* Underneath Message */}
          <div className="text-center z-0 px-4">
            <Sparkles className="w-6 h-6 text-gold-400 mx-auto mb-3 animate-spin-slow" />
            <p className="font-serif italic text-xl sm:text-2xl text-ivory-50 leading-relaxed mb-3">
              "{hiddenMessage}"
            </p>
            <p className="font-sans text-xs text-rose-300/80 tracking-wider uppercase">
              ✦ {revealNote}
            </p>
          </div>

          {/* Foil Scratch Layer */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
            }`}
          />
        </div>

        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 font-handwriting text-2xl text-rose-300"
          >
            Always and forever. ❤️
          </motion.div>
        )}
      </div>
    </section>
  );
};
