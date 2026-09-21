import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  herName: string;
  heroPhoto: string;
  subheading: string;
  quote: string;
  onScrollClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  herName,
  heroPhoto,
  subheading,
  quote,
  onScrollClick,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden px-6 pt-16 pb-20">
      {/* Background Hero Image with Slow Cinematic Zoom & Edge Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src={heroPhoto}
            alt="Hero couple memory"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05] saturate-[1.1]"
          />
        </motion.div>

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-charcoal-900/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal-900/30 to-charcoal-900" />
        <div className="absolute inset-0 bg-wine-950/30 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Floating Ambient Light Spots */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-rose-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6 border border-rose-300/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-rose-200">
            A Celebration of You
          </span>
        </motion.div>

        {/* Main Heading with Elegant Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory-50 tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
        >
          Happy Birthday, <br />
          <span className="font-serif italic font-normal bg-gradient-to-r from-rose-200 via-rose-300 to-gold-300 bg-clip-text text-transparent">
            {herName}
          </span>
          <span className="text-rose-400 ml-2 inline-block animate-pulse">❤️</span>
        </motion.h1>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif italic text-lg sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto font-light leading-relaxed mb-4"
        >
          "{subheading}"
        </motion.p>

        {/* Small Emotional Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-sans text-xs sm:text-sm text-ivory-300/60 max-w-lg mx-auto tracking-wide mb-12"
        >
          {quote}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onScrollClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.3, duration: 0.8 },
            y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
          }}
          className="group flex flex-col items-center gap-2 text-rose-300/80 hover:text-rose-200 transition-colors focus:outline-none"
        >
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-light">
            Your story begins here
          </span>
          <div className="w-8 h-8 rounded-full border border-rose-300/20 flex items-center justify-center group-hover:border-rose-300/50 transition-colors bg-white/5">
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.button>
      </div>
    </section>
  );
};
