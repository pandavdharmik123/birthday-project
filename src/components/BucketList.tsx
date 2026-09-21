import React from 'react';
import { motion } from 'framer-motion';
import { BucketListItem } from '../types';
import { Sunset, Car, Compass, Coffee, Sparkles, Heart } from 'lucide-react';

interface BucketListProps {
  items: BucketListItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  Sunset: <Sunset className="w-6 h-6 text-gold-400" />,
  Car: <Car className="w-6 h-6 text-rose-300" />,
  Compass: <Compass className="w-6 h-6 text-gold-300" />,
  Coffee: <Coffee className="w-6 h-6 text-rose-200" />,
  Sparkles: <Sparkles className="w-6 h-6 text-gold-400" />,
};

export const BucketList: React.FC<BucketListProps> = ({ items }) => {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            The Horizon
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-4"
          >
            More Memories To Make
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-base sm:text-lg text-ivory-300/70"
          >
            "Because this love story is just getting started."
          </motion.p>
        </div>

        {/* Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl glass-card border border-rose-300/10 hover:border-rose-400/30 transition-all duration-300 shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon] || <Heart className="w-6 h-6 text-rose-400" />}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 mb-2 group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h3>
                <p className="font-serif text-sm sm:text-base text-ivory-200/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {item.tag && (
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-rose-300/60">
                    ✦ {item.tag}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
