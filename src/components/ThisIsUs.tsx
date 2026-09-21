import React from 'react';
import { motion } from 'framer-motion';

interface ThisIsUsProps {
  title: string;
  subtitle: string;
  photos: string[];
  paragraphs: string[];
  onPhotoClick: (url: string, caption: string) => void;
}

export const ThisIsUs: React.FC<ThisIsUsProps> = ({
  title,
  subtitle,
  photos,
  paragraphs,
  onPhotoClick,
}) => {
  return (
    <section id="us" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-wine-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            The Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory-50 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-lg sm:text-xl text-ivory-200/70"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Bento / Layered Depth Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-20">
          {/* Main primary photo (staggered left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 relative group cursor-pointer"
            onClick={() => onPhotoClick(photos[0], "Our quiet happiness")}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-rose-300/15 shadow-2xl">
              <img
                src={photos[0]}
                alt="Us moment"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-serif italic text-base sm:text-lg text-ivory-100">
                  "Every adventure is better with you."
                </span>
              </div>
            </div>
            {/* Soft decorative shadow border */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-wine-700/20 to-rose-400/10 blur-lg -z-10 opacity-70" />
          </motion.div>

          {/* Secondary Stacked Photos (Right) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {photos.slice(1, 3).map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 * (idx + 1) }}
                className="relative group cursor-pointer"
                onClick={() => onPhotoClick(photo, `Memory ${idx + 2}`)}
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-rose-300/15 shadow-xl">
                  <img
                    src={photo}
                    alt={`Moment ${idx + 2}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Narrative Poetic Block */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className={`leading-relaxed ${
                idx === paragraphs.length - 1
                  ? 'font-serif italic text-2xl sm:text-3xl text-rose-300 font-normal pt-2'
                  : 'font-serif text-lg sm:text-xl text-ivory-200/80 font-light'
              }`}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
