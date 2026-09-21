import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { triggerBirthdayFirework } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
  herName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, herName }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      // If today or past target
      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        if (!celebrated) {
          triggerBirthdayFirework();
          setCelebrated(true);
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate, celebrated]);

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {timeLeft.isToday ? (
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-gold mb-4 border border-gold-400/40 animate-pulse">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span className="font-serif italic text-lg text-gold-300 font-semibold tracking-wide">
                IT'S YOUR DAY ❤️
              </span>
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
          ) : (
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-2">
              Counting down to your special day...
            </p>
          )}

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory-100 font-normal">
            {timeLeft.isToday
              ? `Happy Birthday, ${herName}! Today the world celebrates you.`
              : `Every second brings us closer to your day.`}
          </h2>
        </motion.div>

        {/* Countdown Units */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl glass-card border border-rose-300/10 shadow-lg relative group hover:border-rose-400/30 transition-all"
            >
              <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-light text-ivory-50 tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[9px] sm:text-[11px] tracking-[0.25em] text-rose-300/70 mt-1 uppercase">
                {item.label}
              </span>
              <div className="absolute inset-0 rounded-2xl bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {timeLeft.isToday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-center items-center gap-2 text-rose-300 text-sm font-serif italic"
          >
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span>Today, you are the center of the universe.</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
