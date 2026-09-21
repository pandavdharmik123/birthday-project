import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';

export const SurpriseGame: React.FC = () => {
  const correctBoxIndex = 2; // Index of the winning gift box
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('Pick a gift box to reveal what’s hidden inside...');
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleBoxClick = (index: number) => {
    setSelected(index);
    if (index === correctBoxIndex) {
      soundFx.playRomanticChime();
      triggerHeartConfetti();
      setIsWon(true);
      setMessage("You found it! ❤️ My whole heart is already yours, but there's still so much more ahead.");
    } else {
      soundFx.playSoftTap();
      const hints = [
        "A little warmer... try another one! ✨",
        "Not quite, but you're getting closer 😘",
        "Almost! Keep searching for your surprise ❤️",
        "So close! Try one more time 🌸",
      ];
      setMessage(hints[index % hints.length]);
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-2"
        >
          A Little Game
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl text-ivory-50 mb-3"
        >
          Can you find your birthday surprise?
        </motion.h2>
        <p className="font-serif italic text-base text-ivory-300/70 mb-10 max-w-lg mx-auto">
          {message}
        </p>

        {/* Floating Gift Boxes */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-xl mx-auto mb-8">
          {[0, 1, 2, 3, 4].map((idx) => {
            const isTarget = idx === correctBoxIndex;
            const isCurrent = selected === idx;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1, y: -6 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, (idx % 2 === 0 ? -8 : 8), 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3 + idx * 0.4, ease: 'easeInOut' },
                }}
                onClick={() => handleBoxClick(idx)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all duration-300 ${
                  isCurrent && isWon
                    ? 'bg-gradient-to-tr from-gold-500 to-rose-400 shadow-[0_0_35px_rgba(212,175,55,0.6)]'
                    : 'glass-card border border-rose-300/20 hover:border-rose-300/50 shadow-md'
                }`}
              >
                {isCurrent && isWon ? (
                  <Sparkles className="w-10 h-10 text-ivory-50 animate-spin-slow" />
                ) : (
                  <Gift
                    className={`w-9 h-9 transition-colors ${
                      isCurrent ? 'text-rose-300' : 'text-rose-200/60'
                    }`}
                  />
                )}
                {/* Ribbon Tag */}
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-black/50 text-[9px] text-ivory-300/80 font-mono">
                  #{idx + 1}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Reward Modal / Message if Won */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-2xl glass-gold border border-gold-400/40 max-w-md mx-auto shadow-2xl"
            >
              <div className="flex justify-center mb-2">
                <Heart className="w-6 h-6 fill-rose-400 text-rose-400 animate-bounce" />
              </div>
              <h4 className="font-serif text-xl text-ivory-50 mb-1">
                You Found It! ❤️
              </h4>
              <p className="font-serif italic text-sm text-gold-200 leading-relaxed">
                "The real surprise isn’t in a box—it’s every moment we get to share together. Keep scrolling down..."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
