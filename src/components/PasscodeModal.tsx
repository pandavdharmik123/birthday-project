import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';
import { Lock, Heart, Delete } from 'lucide-react';

interface PasscodeModalProps {
  correctPasscode: string;
  hint: string;
  onSuccess: () => void;
  onSkip?: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({
  correctPasscode,
  hint,
  onSuccess,
  onSkip,
}) => {
  const [digits, setDigits] = useState<string[]>([]);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleKeyPress = (num: string) => {
    soundFx.playSoftTap();
    if (digits.length < 4) {
      const updated = [...digits, num];
      setDigits(updated);
      setErrorMessage('');

      if (updated.length === 4) {
        verifyCode(updated.join(''));
      }
    }
  };

  const handleDelete = () => {
    soundFx.playSoftTap();
    setDigits(digits.slice(0, -1));
    setErrorMessage('');
  };

  const verifyCode = (code: string) => {
    if (code === correctPasscode) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 30, 60]);
      }
      soundFx.playRomanticChime();
      triggerHeartConfetti();
      setTimeout(onSuccess, 600);
    } else {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      setErrorShake(true);
      setErrorMessage('Almost... try again ❤️');
      setTimeout(() => {
        setDigits([]);
        setErrorShake(false);
      }, 700);
    }
  };

  // Keyboard support for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [digits]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-xl px-4 select-none"
    >
      <div className="relative w-full max-w-sm rounded-3xl p-8 glass-panel text-center flex flex-col items-center">
        {/* Soft icon aura */}
        <div className="w-14 h-14 rounded-full bg-wine-800/80 border border-rose-300/30 flex items-center justify-center mb-5 text-rose-300 shadow-[0_0_25px_rgba(201,96,118,0.3)]">
          <Heart className="w-6 h-6 fill-rose-300/40" />
        </div>

        <h3 className="font-serif italic text-2xl sm:text-3xl text-ivory-100 mb-2">
          Before you enter...
        </h3>
        <p className="font-sans text-xs tracking-wider uppercase text-rose-300/80 mb-6">
          What's our little secret?
        </p>

        {/* 4 Digit Slots */}
        <motion.div
          animate={errorShake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="flex justify-center gap-4 mb-6"
        >
          {[0, 1, 2, 3].map((index) => {
            const filled = digits.length > index;
            return (
              <div
                key={index}
                className={`w-12 h-14 rounded-2xl flex items-center justify-center text-xl font-mono border transition-all duration-300 ${
                  filled
                    ? 'border-rose-400 bg-wine-800/60 text-ivory-50 shadow-[0_0_15px_rgba(201,96,118,0.4)] scale-105'
                    : 'border-white/10 bg-black/30 text-transparent'
                }`}
              >
                {filled ? '♥' : '•'}
              </div>
            );
          })}
        </motion.div>

        {/* Error or Hint */}
        <div className="h-6 mb-4">
          {errorMessage ? (
            <p className="font-sans text-xs text-rose-400 font-medium tracking-wide">
              {errorMessage}
            </p>
          ) : showHint ? (
            <p className="font-serif italic text-xs text-gold-300 tracking-wide">
              {hint}
            </p>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-[11px] text-ivory-300/40 hover:text-rose-300 underline underline-offset-4 transition-colors"
            >
              Need a little clue?
            </button>
          )}
        </div>

        {/* Romantic Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px] mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-14 rounded-2xl bg-white/5 hover:bg-wine-700/50 active:scale-95 border border-white/5 hover:border-rose-300/20 text-ivory-100 font-sans text-xl font-light transition-all flex items-center justify-center shadow-sm"
            >
              {num}
            </button>
          ))}
          <div className="flex items-center justify-center">
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-[10px] uppercase tracking-widest text-ivory-300/30 hover:text-ivory-200 transition-colors"
              >
                Skip
              </button>
            )}
          </div>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl bg-white/5 hover:bg-wine-700/50 active:scale-95 border border-white/5 hover:border-rose-300/20 text-ivory-100 font-sans text-xl font-light transition-all flex items-center justify-center shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            aria-label="Delete"
            className="h-14 rounded-2xl bg-white/5 hover:bg-wine-700/50 active:scale-95 border border-white/5 text-ivory-300/60 hover:text-ivory-100 transition-all flex items-center justify-center"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
