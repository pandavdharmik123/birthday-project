import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { triggerBirthdayFirework } from '../utils/confetti';
import { Sparkles, Mic, Volume2 } from 'lucide-react';

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [wishMade, setWishMade] = useState(false);
  const [micListening, setMicListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Extinguish all candles
  const extinguishCandles = () => {
    if (wishMade) return;
    soundFx.playCandleBlow();
    setCandlesLit([false, false, false]);
    setWishMade(true);
    triggerBirthdayFirework();
  };

  // Tap single candle
  const handleCandleClick = (index: number) => {
    soundFx.playCandleBlow();
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      setWishMade(true);
      triggerBirthdayFirework();
    }
  };

  // Optional Microphone blow detection
  const startMicDetection = async () => {
    try {
      setMicListening(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudioLevel = () => {
        if (wishMade) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Blow detection threshold
        if (average > 55) {
          extinguishCandles();
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        requestAnimationFrame(checkAudioLevel);
      };

      checkAudioLevel();
    } catch {
      setMicError(true);
      setMicListening(false);
    }
  };

  return (
    <section id="wish" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-2"
        >
          A Birthday Ritual
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-3"
        >
          Make A Wish... ✨
        </motion.h2>
        <p className="font-serif italic text-base text-ivory-300/70 mb-12">
          {wishMade
            ? "Your wish has been whispered to the stars."
            : "Tap the candles or blow into your microphone to extinguish them."}
        </p>

        {/* The Birthday Cake Container */}
        <div className="relative max-w-sm mx-auto flex flex-col items-center select-none">
          {/* Candles */}
          <div className="flex justify-center gap-10 sm:gap-12 mb-1 z-10">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => handleCandleClick(idx)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Flame */}
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-4 h-7 flame"
                      />
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0 }}
                        animate={{ opacity: 0, y: -20, x: idx % 2 === 0 ? 5 : -5 }}
                        transition={{ duration: 1 }}
                        className="w-1.5 h-4 bg-gray-400/40 rounded-full blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div className="w-[2px] h-2 bg-charcoal-700" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 h-14 rounded-t-sm shadow-md transition-colors ${
                    idx === 1
                      ? 'bg-gradient-to-b from-gold-300 to-gold-500'
                      : 'bg-gradient-to-b from-rose-200 to-rose-400'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Cake Tier Top */}
          <div className="w-56 sm:w-64 h-20 rounded-t-3xl bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-xl relative border-t-2 border-white/40 flex items-center justify-center">
            {/* Dripping Frosting */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-ivory-100 rounded-b-full shadow-sm" />
              ))}
            </div>
            <span className="font-handwriting text-2xl text-wine-900 mt-2">
              For You ❤️
            </span>
          </div>

          {/* Cake Tier Bottom */}
          <div className="w-72 sm:w-80 h-24 rounded-b-2xl bg-gradient-to-b from-wine-700 via-wine-800 to-wine-950 shadow-2xl border-t border-rose-300/30 flex items-center justify-center relative">
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-gold-400/80 shadow-md" />
              ))}
            </div>
          </div>

          {/* Cake Golden Stand / Plate */}
          <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-2xl mt-1 border-t border-gold-300/60" />
        </div>

        {/* Wish Made Celebratory Message */}
        <AnimatePresence>
          {wishMade ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-12 p-6 rounded-3xl glass-gold max-w-md mx-auto border border-gold-400/40 shadow-2xl"
            >
              <div className="flex justify-center mb-2">
                <Sparkles className="w-6 h-6 text-gold-400 animate-spin-slow" />
              </div>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-ivory-50 mb-1">
                Wish made. ❤️
              </h3>
              <p className="font-serif italic text-sm text-gold-200">
                May every single dream you hold in your heart come true this year.
              </p>
            </motion.div>
          ) : (
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={extinguishCandles}
                className="px-6 py-2.5 rounded-full glass-card border border-rose-300/20 text-xs font-sans uppercase tracking-wider text-rose-200 hover:border-rose-300/60 transition-all hover:scale-105"
              >
                Blow Out All Candles 🎂
              </button>

              <button
                onClick={startMicDetection}
                disabled={micListening}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans text-ivory-300 flex items-center gap-2 transition-all"
              >
                <Mic className={`w-3.5 h-3.5 ${micListening ? 'text-rose-400 animate-pulse' : ''}`} />
                <span>{micListening ? 'Listening for your blow...' : 'Use Microphone to Blow'}</span>
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
