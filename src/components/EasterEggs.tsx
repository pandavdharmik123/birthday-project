import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';
import { Sparkles, Heart } from 'lucide-react';

interface EasterEggModalProps {
  message: string;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 15 }}
        className="max-w-sm rounded-3xl p-8 glass-gold text-center border border-gold-400/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-3">
          <Heart className="w-8 h-8 fill-rose-400 text-rose-400 animate-pulse" />
        </div>
        <h4 className="font-serif italic text-2xl text-ivory-50 mb-2">
          Secret Discovered! ✨
        </h4>
        <p className="font-serif text-base text-gold-200 mb-6 leading-relaxed">
          "{message}"
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full bg-wine-800 text-ivory-100 font-sans text-xs uppercase tracking-wider hover:bg-wine-700 transition-colors"
        >
          Keep It Our Secret ❤️
        </button>
      </motion.div>
    </motion.div>
  );
};
