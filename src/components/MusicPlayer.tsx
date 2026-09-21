import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc3, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  song: {
    title: string;
    artist: string;
    audioUrl: string;
    coverUrl: string;
    lyricsSnippet?: string;
  };
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Handled silently if file not present or autoplay blocked
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="song" className="relative py-28 px-6 overflow-hidden">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onTogglePlay}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-3"
          >
            The Soundtrack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-ivory-50 mb-3"
          >
            Our Song
          </motion.h2>
          <p className="font-serif italic text-base text-ivory-300/70">
            "Some melodies will always sound like you."
          </p>
        </div>

        {/* Vinyl Player Component */}
        <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl glass-panel border border-rose-300/20 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            {/* Spinning Vinyl Record */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full vinyl-record flex items-center justify-center relative shadow-2xl transition-transform duration-700 ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                {/* Center Label Artwork */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-charcoal-900 shadow-inner relative">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Spindle hole */}
                  <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-charcoal-900 border border-white/20" />
                </div>
              </div>

              {/* Tonearm graphic */}
              <div
                className={`absolute -top-4 -right-4 w-16 h-28 pointer-events-none transition-transform duration-500 origin-top-right ${
                  isPlaying ? 'rotate-12' : '-rotate-12'
                }`}
              >
                <div className="w-2 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow" />
                <div className="w-4 h-6 bg-gold-500 rounded-sm -ml-1 mt-1 shadow" />
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 text-center sm:text-left">
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-400">
                Playing from memory
              </span>
              <h3 className="font-serif text-2xl text-ivory-50 mt-1 mb-1 font-medium">
                {song.title}
              </h3>
              <p className="font-sans text-sm text-rose-300/80 mb-6">
                {song.artist}
              </p>

              {song.lyricsSnippet && (
                <p className="font-serif italic text-sm text-ivory-200/70 mb-6 border-l-2 border-rose-400/40 pl-3">
                  "{song.lyricsSnippet}"
                </p>
              )}

              {/* Progress Slider */}
              <div className="space-y-2 mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full accent-rose-400 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-ivory-300/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Play / Pause Toggle Button */}
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <button
                  onClick={onTogglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-wine-700 to-rose-500 text-ivory-50 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-1" />
                  )}
                </button>
                <span className="font-sans text-xs text-ivory-300/60 font-light">
                  {isPlaying ? 'Now playing...' : 'Press play to listen'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating Music Pill (Section 24)
export const FloatingMusicButton: React.FC<{
  isPlaying: boolean;
  onToggle: () => void;
}> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle background music"
      className={`fixed top-5 right-5 z-40 px-4 py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 border shadow-xl backdrop-blur-md ${
        isPlaying
          ? 'bg-wine-900/80 border-rose-400/40 text-rose-200 shadow-[0_0_20px_rgba(201,96,118,0.3)]'
          : 'bg-black/60 border-white/10 text-ivory-300/60 hover:text-ivory-100'
      }`}
    >
      <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin-slow text-rose-300' : ''}`} />
      <span className="font-sans text-xs font-medium tracking-wide">
        {isPlaying ? 'Our Song' : 'Play Music'}
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-rose-400" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 opacity-50" />
      )}
    </button>
  );
};
