import React from 'react';
import { motion } from 'framer-motion';
import { PolaroidItem } from '../types';

interface PolaroidScrapbookProps {
  polaroids: PolaroidItem[];
  onPhotoClick: (url: string, caption: string) => void;
}

export const PolaroidScrapbook: React.FC<PolaroidScrapbookProps> = ({
  polaroids,
  onPhotoClick,
}) => {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-charcoal-800/40">
      {/* Background ambient texture */}
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-handwriting text-2xl text-rose-300 mb-1"
          >
            from our memory box
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-4"
          >
            Polaroids & Little Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg text-ivory-300/70"
          >
            "Untouched, unposed, and perfectly ours."
          </motion.p>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 items-center justify-items-center">
          {polaroids.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (idx % 3) * 0.15, duration: 0.6 }}
              className="relative cursor-pointer group"
              onClick={() => onPhotoClick(item.photoUrl, `${item.caption} — ${item.handwrittenNote}`)}
              style={{
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              {/* Polaroid Frame */}
              <div className="polaroid-frame w-72 sm:w-80 p-4 pb-6 rounded-sm text-charcoal-900 transition-all duration-300">
                {/* Washi Tape Accent */}
                <div
                  className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]"
                  style={{
                    backgroundColor: idx % 2 === 0 ? 'rgba(238, 186, 194, 0.7)' : 'rgba(238, 214, 136, 0.7)',
                  }}
                />

                {/* Photo */}
                <div className="relative aspect-square w-full bg-charcoal-800 overflow-hidden mb-4 shadow-inner">
                  <img
                    src={item.photoUrl}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle film grain on the polaroid */}
                  <div className="absolute inset-0 bg-wine-900/10 mix-blend-color-burn pointer-events-none" />
                </div>

                {/* Handwritten Note & Caption */}
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <p className="font-handwriting text-2xl sm:text-3xl text-wine-900 leading-tight">
                    {item.handwrittenNote}
                  </p>
                  <p className="font-sans text-[11px] text-charcoal-700/60 uppercase tracking-widest mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
