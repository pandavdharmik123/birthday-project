import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReasonItem } from '../types';
import { soundFx } from '../utils/sound';
import { Heart, Sparkles } from 'lucide-react';

interface ReasonsCardsProps {
  reasons: ReasonItem[];
}

export const ReasonsCards: React.FC<ReasonsCardsProps> = ({ reasons }) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    soundFx.playRomanticChime();
    setOpenedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="reasons" className="relative py-28 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-wine-800/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            A Few of a Million Reasons
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-4"
          >
            Reasons I Love You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg text-ivory-300/70"
          >
            "Tap any envelope to open what's written inside."
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const isOpened = openedIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
                className="relative cursor-pointer min-h-[190px]"
                onClick={() => toggleCard(item.id)}
              >
                <div
                  className={`w-full h-full rounded-3xl p-6 transition-all duration-500 border flex flex-col justify-between ${
                    isOpened
                      ? 'bg-gradient-to-br from-wine-900/90 via-wine-800/80 to-charcoal-900 border-rose-400/40 shadow-[0_10px_30px_rgba(201,96,118,0.25)]'
                      : 'glass-card border-rose-300/10 hover:border-rose-300/30 hover:shadow-lg'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-rose-300/80">
                      {item.teaser}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpened ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-ivory-300/40'
                      }`}
                    >
                      {isOpened ? <Sparkles className="w-4 h-4" /> : <Heart className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="my-4">
                    <AnimatePresence mode="wait">
                      {isOpened ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="font-serif text-lg text-ivory-50 leading-snug mb-2">
                            "{item.reason}"
                          </p>
                          {item.subtext && (
                            <p className="font-sans text-xs text-rose-200/60 italic">
                              ✦ {item.subtext}
                            </p>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center py-4 text-center"
                        >
                          <span className="font-serif italic text-base text-rose-200/90">
                            Open me ❤️
                          </span>
                          <span className="font-sans text-[10px] tracking-widest uppercase text-ivory-300/40 mt-1">
                            Click to reveal
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="flex justify-end">
                    <span className="text-[10px] uppercase tracking-widest text-ivory-300/30">
                      {isOpened ? 'Tap to close' : 'Private'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
