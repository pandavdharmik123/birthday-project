import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  photoUrl: string;
  caption: string;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  photoUrl,
  caption,
  currentIndex,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-2xl p-4 sm:p-8 select-none"
        >
          {/* Top Bar with Counter and Close */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20">
            <span className="font-mono text-xs text-rose-300/80 tracking-widest uppercase">
              Memory {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Main Photo Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[82vh] flex flex-col items-center"
          >
            <img
              src={photoUrl}
              alt={caption}
              className="max-h-[72vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {caption && (
              <p className="mt-4 font-serif italic text-base sm:text-lg text-ivory-200/90 text-center max-w-xl">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
