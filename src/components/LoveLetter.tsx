import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';
import { Mail, Heart } from 'lucide-react';

interface LoveLetterProps {
  herName: string;
  letter: {
    salutation: string;
    date: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postScript?: string;
  };
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ herName, letter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    soundFx.playRomanticChime();
    triggerHeartConfetti();
    setIsOpen(true);
  };

  return (
    <section id="letter" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            A Private Letter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-4"
          >
            Words From My Heart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg text-ivory-300/70"
          >
            "Some things are too important not to say out loud."
          </motion.p>
        </div>

        {/* Envelope / Letter Interactive Area */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope */
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.6 }}
                onClick={handleOpenLetter}
                className="relative aspect-[16/11] max-w-lg mx-auto bg-gradient-to-br from-ivory-200 to-ivory-300 rounded-3xl p-8 shadow-2xl border border-ivory-100/40 cursor-pointer group flex flex-col items-center justify-center text-center overflow-hidden"
              >
                {/* Envelope Flap Lines */}
                <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-charcoal-700/10 pointer-events-none" />

                {/* Wax Seal */}
                <div className="w-16 h-16 rounded-full wax-seal flex items-center justify-center text-ivory-100 shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 fill-white/80 text-white/90" />
                </div>

                <p className="font-serif italic text-2xl text-charcoal-900 mb-1">
                  For {herName}
                </p>
                <p className="font-sans text-xs tracking-widest uppercase text-charcoal-700/60 mb-4">
                  Sealed with all my love
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-900/10 text-charcoal-800 text-xs font-medium group-hover:bg-wine-900 group-hover:text-ivory-100 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Click to break seal & read</span>
                </div>
              </motion.div>
            ) : (
              /* Unfolded Handwritten Letter */
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="parchment-paper rounded-3xl p-8 sm:p-14 text-charcoal-900 shadow-2xl relative"
              >
                {/* Vintage Date Header */}
                <div className="flex justify-between items-center border-b border-charcoal-900/10 pb-4 mb-8 text-xs font-mono text-charcoal-700/70">
                  <span>SPECIAL EDITION</span>
                  <span>{letter.date}</span>
                </div>

                {/* Salutation */}
                <h3 className="font-handwriting text-3xl sm:text-4xl text-wine-950 mb-6">
                  {letter.salutation} {herName},
                </h3>

                {/* Paragraphs */}
                <div className="space-y-6 font-serif text-base sm:text-lg text-charcoal-900/90 leading-relaxed">
                  {letter.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Closing & Handwritten Signature */}
                <div className="mt-12 pt-6 border-t border-charcoal-900/10 flex flex-col items-end">
                  <p className="font-serif italic text-sm text-charcoal-700/80 mb-2">
                    {letter.closing}
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-wine-900">
                    {letter.signature}
                  </p>
                </div>

                {/* Post Script */}
                {letter.postScript && (
                  <div className="mt-8 pt-4 border-t border-charcoal-900/5 text-xs font-serif italic text-charcoal-700/70">
                    {letter.postScript}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
