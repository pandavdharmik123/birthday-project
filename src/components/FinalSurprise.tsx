import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerBirthdayFirework } from '../utils/confetti';
import { RotateCcw, Share2, Heart, Check } from 'lucide-react';

interface FinalSurpriseProps {
  herName: string;
  climaxPhoto: string;
  photos: string[];
  onReplay: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  herName,
  climaxPhoto,
  photos,
  onReplay,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    soundFx.playSoftTap();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday, ${herName}! ❤️`,
          text: `A private digital love story made just for ${herName}.`,
          url: window.location.href,
        });
        return;
      } catch {
        // User dismissed share dialog
      }
    }

    // Fallback: Copy link
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-charcoal-900 via-charcoal-950 to-black">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-wine-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Cinematic Paced Reveal Section (Section 20) */}
        <div className="max-w-2xl mx-auto space-y-10 mb-28">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80"
          >
            Before you go...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-2xl sm:text-3xl text-ivory-200/90 font-light"
          >
            I just want you to remember one thing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="py-4"
          >
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-rose-300 font-normal tracking-tight">
              You are loved.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-serif italic text-xl sm:text-2xl text-ivory-300/80 font-light"
          >
            More than these pictures can show. <br />
            More than these words can explain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="space-y-2 pt-6"
          >
            <p className="font-serif text-2xl sm:text-3xl text-ivory-100">
              Happy Birthday, {herName}. ❤️
            </p>
            <p className="font-serif italic text-base sm:text-lg text-gold-300/80">
              Here's to another year of you... and hopefully, many more memories of us.
            </p>
          </motion.div>
        </div>

        {/* Climax Photo Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-xl mx-auto aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-rose-300/20 shadow-[0_0_50px_rgba(201,96,118,0.25)] mb-20 group"
        >
          <img
            src={climaxPhoto}
            alt="Final memory"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-transparent" />
          <div className="absolute bottom-6 inset-x-6 text-center">
            <span className="font-handwriting text-3xl sm:text-4xl text-rose-200">
              Thank you for being you.
            </span>
          </div>
        </motion.div>

        {/* Section 21: Animated Photo Collage */}
        <div className="mb-24">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-6">
            A tapestry of us
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {photos.slice(0, 4).map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
              >
                <img
                  src={p}
                  alt={`Collage ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 22: Final Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
          <button
            onClick={onReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-wine-700 via-wine-600 to-rose-500 text-ivory-50 font-sans font-medium text-sm shadow-[0_0_25px_rgba(201,96,118,0.4)] hover:shadow-[0_0_40px_rgba(201,96,118,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Story</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full glass-card border border-rose-300/20 text-ivory-100 font-sans font-medium text-sm hover:border-rose-300/50 hover:scale-105 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>Link Copied To Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-rose-300" />
                <span>Keep This Memory ❤️</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Credit Line */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="font-handwriting text-2xl text-rose-300/80 mb-1">
            Made with all my heart, just for you.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-ivory-300/30">
            Forever & Always
          </p>
        </div>
      </div>
    </section>
  );
};
