import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { Lock, Unlock, Sparkles } from 'lucide-react';

interface FutureLetterProps {
  title: string;
  unlockDateDescription: string;
  paragraphs: string[];
}

export const FutureLetter: React.FC<FutureLetterProps> = ({
  title,
  unlockDateDescription,
  paragraphs,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    soundFx.playRomanticChime();
    setIsUnlocked(true);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-2"
        >
          Time Capsule
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl text-ivory-50 mb-3"
        >
          {title}
        </motion.h2>
        <p className="font-serif italic text-sm text-ivory-300/70 mb-8">
          {unlockDateDescription}
        </p>

        {/* Locked / Unlocked Container */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-rose-300/20 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6"
              >
                <div className="w-14 h-14 rounded-full bg-wine-900/60 border border-rose-300/30 flex items-center justify-center text-rose-300 mb-5 shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <p className="font-serif text-lg text-ivory-100 mb-6 max-w-sm">
                  This message is kept safe for the chapters we haven't written yet.
                </p>
                <button
                  onClick={handleUnlock}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-wine-700 to-rose-500 text-ivory-50 font-sans text-xs font-medium tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  Open When You're Ready ❤️
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-left space-y-4 font-serif text-base sm:text-lg text-ivory-100/90 leading-relaxed"
              >
                <div className="flex items-center gap-2 text-gold-400 text-xs font-mono mb-4 uppercase tracking-wider">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlocked with love</span>
                </div>
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="italic">{p}</p>
                ))}
                <div className="pt-4 flex justify-end">
                  <span className="font-handwriting text-2xl text-rose-300">
                    Forever & Always
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
