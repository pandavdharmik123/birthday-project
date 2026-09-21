import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';

interface OpeningScreenProps {
  herName: string;
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ herName, onOpen }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 3400);
    const t3 = setTimeout(() => setStep(3), 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleOpenClick = () => {
    soundFx.playRomanticChime();
    triggerHeartConfetti();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal-900 px-6 text-center select-none"
    >
      {/* Cinematic ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-wine-800/30 blur-[120px] pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none -bottom-10" />

      {/* Poetic progressive text */}
      <div className="relative z-10 max-w-lg min-h-[180px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="step1"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 1.2 }}
              className="font-serif italic text-2xl sm:text-3xl text-rose-200/90 tracking-wide"
            >
              Hey, beautiful...
            </motion.p>
          )}

          {step === 2 && (
            <motion.p
              key="step2"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 1.2 }}
              className="font-sans font-light text-xl sm:text-2xl text-ivory-200/90 tracking-wider"
            >
              I made something special for you.
            </motion.p>
          )}

          {step >= 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4 }}
              className="space-y-4"
            >
              <p className="font-serif italic text-xl sm:text-2xl text-rose-200/90">
                Something that belongs only to you.
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-ivory-300/40">
                A personal love story
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button with gentle glow and spring interaction */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="mt-8 relative z-20"
          >
            <button
              onClick={handleOpenClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-wine-700 via-wine-600 to-rose-500 text-ivory-50 font-sans font-medium text-base shadow-[0_0_35px_rgba(201,96,118,0.4)] hover:shadow-[0_0_55px_rgba(201,96,118,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10">Open Your Surprise</span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="text-rose-200 text-lg"
              >
                ❤️
              </motion.span>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
