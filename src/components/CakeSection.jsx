import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind, Sparkles, PartyPopper, AlertTriangle, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { FireworksEngine } from '../utils/canvasFireworks';

export default function CakeSection({ onTriggerBlast }) {
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishLocked, setWishLocked] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [blastActive, setBlastActive] = useState(false);

  const canvasRef = useRef(null);
  const fireworksRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      fireworksRef.current = new FireworksEngine(canvasRef.current);
    }
    return () => {
      if (fireworksRef.current) fireworksRef.current.destroy();
    };
  }, []);

  const handleLightCandles = () => {
    sounds.playLightCandle();
    setCandlesLit(true);
    setCandlesBlown(false);
    setWishLocked(false);
  };

  const handleBlowCandles = () => {
    if (!candlesLit || candlesBlown) return;
    sounds.playBlowCandle();
    setCandlesLit(false);
    setCandlesBlown(true);
    setWishLocked(true);

    // Launch Fireworks immediately
    if (fireworksRef.current) {
      fireworksRef.current.start();
      fireworksRef.current.spawnConfetti(150);
      sounds.playUnlock();
    }
  };

  const handleBirthdayBlast = () => {
    sounds.playClick();
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      sounds.playClick();
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setBlastActive(true);
      sounds.playUnlock();

      if (fireworksRef.current) {
        fireworksRef.current.start();
        fireworksRef.current.spawnConfetti(300);
      }
      if (onTriggerBlast) onTriggerBlast();

      setTimeout(() => {
        setBlastActive(false);
      }, 6000);
    }
  }, [countdown, onTriggerBlast]);

  return (
    <section id="cake" className={`relative py-24 px-4 sm:px-8 text-white transition-colors duration-1000 overflow-hidden ${candlesLit ? 'bg-[#04020a]' : 'bg-[#0b081a]'}`}>
      {/* Canvas Layer for Fireworks & Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-30 pointer-events-none"
      />

      {/* Dimmed Room Lighting Glow when candles are lit */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${candlesLit ? 'opacity-90' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
        {/* Header */}
        <div className="space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest"
          >
            <PartyPopper className="w-4 h-4 text-amber-400" />
            <span>The Grand Celebration</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 font-serif">
            IT'S CAKE TIME! 🎂
          </h2>

          <p className="text-sm sm:text-base text-pink-200/80 font-light">
            Okay Bhushan... Enough scrolling. Light the candles and make your special wish! ✨
          </p>
        </div>

        {/* Multi-Tier Interactive SVG Cake Illustration */}
        <div className="relative flex flex-col items-center justify-center my-8">
          <div className="relative w-72 sm:w-96 aspect-square flex flex-col items-center justify-end">
            
            {/* Candles Row */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 z-20 -mb-2">
              {[0, 1, 2, 3, 4].map((cIdx) => (
                <div key={cIdx} className="relative flex flex-col items-center">
                  {/* Flickering Flame */}
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0.8, 1, 0.8],
                          scale: [0.9, 1.15, 0.95],
                          y: [0, -3, 0],
                        }}
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                        transition={{
                          duration: 0.4 + Math.random() * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative w-5 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_20px_#ff9900]"
                      >
                        <div className="absolute inset-1 rounded-full bg-white opacity-80 blur-[1px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Smoke particle when blown out */}
                  <AnimatePresence>
                    {candlesBlown && (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -40, scale: 2 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-3 h-3 rounded-full bg-white/40 blur-[2px]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Candle Stick */}
                  <div className="w-2.5 h-12 rounded-t-sm bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500 border border-white/30 shadow-md" />
                </div>
              ))}
            </div>

            {/* Top Tier */}
            <div className="w-48 sm:w-64 h-20 sm:h-24 rounded-t-3xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 border-2 border-white/20 shadow-xl relative flex items-center justify-center overflow-hidden">
              {/* Frosting Drips */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-white/90 rounded-b-2xl shadow-sm flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-5 bg-white/90 rounded-b-full shadow-inner" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-widest uppercase pt-4 font-serif drop-shadow-md">
                BHUSHAN 2005
              </span>
            </div>

            {/* Bottom Tier */}
            <div className="w-64 sm:w-80 h-24 sm:h-28 rounded-t-3xl bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 border-2 border-white/20 shadow-2xl relative flex items-center justify-center overflow-hidden -mt-1">
              <div className="absolute top-0 left-0 right-0 h-6 bg-amber-200/90 rounded-b-2xl shadow-sm flex justify-around">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-6 h-5 bg-amber-200/90 rounded-b-full" />
                ))}
              </div>
              <span className="text-sm sm:text-base font-black text-amber-300 tracking-wider uppercase pt-4 font-serif">
                HAPPY BIRTHDAY 🎉
              </span>
            </div>

            {/* Cake Stand Base */}
            <div className="w-72 sm:w-92 h-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-2xl border border-white/40 -mt-1" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {!candlesLit && !candlesBlown && (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLightCandles}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-extrabold text-base shadow-xl shadow-amber-500/25 border border-white/30 flex items-center gap-2"
            >
              <Flame className="w-5 h-5 fill-amber-300 text-amber-300 animate-bounce" />
              <span>LIGHT THE CANDLES 🕯️</span>
            </motion.button>
          )}

          {candlesLit && (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 border border-white/30 flex items-center gap-2 animate-pulse"
            >
              <Wind className="w-5 h-5 text-cyan-300" />
              <span>BLOW THE CANDLES 💨</span>
            </motion.button>
          )}

          {candlesBlown && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-base flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                <span>WISH LOCKED IN. ✨</span>
              </motion.div>

              <button
                onClick={handleLightCandles}
                className="text-xs text-white/50 underline hover:text-pink-300 flex items-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Relight candles</span>
              </button>
            </div>
          )}
        </div>

        {/* Section 15: Birthday Blast Warning Button */}
        <div className="pt-16 border-t border-white/10 max-w-md mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone</span>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBirthdayBlast}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 text-white font-black text-lg tracking-wider uppercase shadow-2xl shadow-rose-600/40 border-2 border-white/30 flex items-center justify-center gap-3 animate-pulse"
            >
              <AlertTriangle className="w-5 h-5 text-amber-300" />
              <span>DO NOT PRESS THIS BUTTON 🚨</span>
            </motion.button>
          </div>

          {/* Countdown Overlay */}
          <AnimatePresence>
            {countdown !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-4 text-white"
              >
                <span className="text-xs font-mono uppercase text-rose-400 tracking-widest">
                  BIRTHDAY BLAST INCOMING IN
                </span>
                <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-500 font-serif">
                  {countdown}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blast Explosion Typography Banner */}
          <AnimatePresence>
            {blastActive && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-pink-500 via-amber-400 to-purple-600 text-slate-950 font-black text-2xl sm:text-4xl shadow-2xl tracking-tight uppercase font-serif border-4 border-white animate-bounce"
              >
                🎉 BIRTHDAY BLAST UNLOCKED! 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
