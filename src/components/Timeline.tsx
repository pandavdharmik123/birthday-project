import React from 'react';
import { motion } from 'framer-motion';
import { MemoryItem } from '../types';
import { Heart, Calendar } from 'lucide-react';

interface TimelineProps {
  memories: MemoryItem[];
  onPhotoClick: (url: string, caption: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ memories, onPhotoClick }) => {
  return (
    <section id="memories" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            Memory Lane
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-4"
          >
            Every Moment With You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg text-ivory-300/70"
          >
            "Little moments that quietly became our biggest memories."
          </motion.p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-300/30 to-transparent" />

          <div className="space-y-20">
            {memories.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-charcoal-900 border-2 border-rose-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(201,96,118,0.5)]">
                    <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
                  </div>

                  {/* Content Card (Left or Right depending on alignment) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10 mt-6 md:mt-0">
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? 30 : -30,
                        filter: 'blur(10px)',
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)',
                      }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="p-6 sm:p-7 rounded-3xl glass-card border border-rose-300/10 hover:border-rose-300/30 transition-all duration-300 shadow-xl group"
                    >
                      {/* Photo Thumbnail */}
                      <div
                        className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 cursor-pointer"
                        onClick={() => onPhotoClick(item.photoUrl, item.caption)}
                      >
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                        {item.tag && (
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium bg-black/40 backdrop-blur-md text-rose-200 border border-white/10">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Header Info */}
                      {item.date && (
                        <div className="flex items-center gap-2 text-rose-300 text-xs font-mono mb-2">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          <span>{item.date}</span>
                        </div>
                      )}

                      <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 mb-1 group-hover:text-rose-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-rose-300/80 uppercase tracking-wider mb-3">
                        {item.subtitle}
                      </p>

                      <p className="font-serif text-sm sm:text-base text-ivory-200/80 leading-relaxed mb-4">
                        {item.caption}
                      </p>

                      <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                        <span className="font-serif italic text-xs text-rose-300">
                          ✦ {item.emotionalNote}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
