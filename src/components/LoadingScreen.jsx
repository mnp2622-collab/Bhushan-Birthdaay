import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const stepsText = [
    "Someone has prepared something for you...",
    "Bhushan... ❤️",
    "Are you ready?"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2200);
    const timer2 = setTimeout(() => setStep(2), 4400);
    const timer3 = setTimeout(() => {
      onComplete();
    }, 6800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleToggleMusic = () => {
    sounds.toggleMusic((state) => setMusicEnabled(state));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07050e] text-white overflow-hidden select-none px-6"
    >
      {/* Floating starry background particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Heartbeat aura center glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-amber-500/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Top audio teaser button */}
      <motion.button
        onClick={handleToggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-wider font-medium hover:bg-white/20 transition-all text-pink-300 shadow-lg shadow-pink-500/10"
      >
        <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-bounce text-pink-400' : ''}`} />
        <span>{musicEnabled ? "Sound ON 🎶" : "Enable Sound 🎵"}</span>
      </motion.button>

      {/* Cinematic Typing Text Sequence */}
      <div className="relative z-10 max-w-xl text-center flex flex-col items-center justify-center min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {step === 0 && (
              <p className="text-xl md:text-3xl font-light text-pink-200/90 tracking-wide font-sans leading-relaxed">
                {stepsText[0]}
                <span className="inline-block w-2.5 h-6 ml-2 bg-pink-400 animate-pulse align-middle" />
              </p>
            )}

            {step === 1 && (
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400 tracking-tight font-serif drop-shadow-[0_0_25px_rgba(255,42,117,0.5)]">
                {stepsText[1]}
              </h1>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center gap-4">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin text-amber-300" style={{ animationDuration: '4s' }} />
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
                  {stepsText[2]}
                </h2>
                <p className="text-xs text-white/50 tracking-widest uppercase mt-2">
                  Unlocking something special...
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 text-xs tracking-widest text-white/40 uppercase hover:text-pink-300 transition-colors underline decoration-pink-500/40 underline-offset-4"
      >
        Skip Intro →
      </motion.button>
    </motion.div>
  );
}
