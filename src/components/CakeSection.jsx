import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind, Sparkles, PartyPopper, AlertTriangle, RefreshCw, Volume2, VolumeX, SkipForward, Play, Pause, Video } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { FireworksEngine } from '../utils/canvasFireworks';
import { BHUSHAN_VIDEOS } from '../data/bhushanAssets';

export default function CakeSection({ onTriggerBlast }) {
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishLocked, setWishLocked] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [blastActive, setBlastActive] = useState(false);

  // Video Blast State
  const [blastVideoActive, setBlastVideoActive] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(BHUSHAN_VIDEOS[2] || BHUSHAN_VIDEOS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const canvasRef = useRef(null);
  const fireworksRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      fireworksRef.current = new FireworksEngine(canvasRef.current);
    }
    return () => {
      if (fireworksRef.current) fireworksRef.current.destroy();
    };
  }, []);

  // Continuous Fireworks & Confetti during Video Blast
  useEffect(() => {
    if (!blastVideoActive) return;

    if (fireworksRef.current) {
      fireworksRef.current.start();
      fireworksRef.current.spawnConfetti(250);
    }

    const blastInterval = setInterval(() => {
      if (fireworksRef.current) {
        fireworksRef.current.launchRocket();
        if (Math.random() < 0.35) {
          fireworksRef.current.spawnConfetti(60);
        }
      }
    }, 450);

    return () => clearInterval(blastInterval);
  }, [blastVideoActive]);

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

    // Launch Video Blast & Continuous Fireworks immediately!
    setBlastActive(true);
    setBlastVideoActive(true);
    setIsPlaying(true);
    sounds.playUnlock();

    if (fireworksRef.current) {
      fireworksRef.current.start();
      fireworksRef.current.spawnConfetti(300);
    }
  };

  const handleBirthdayBlast = () => {
    sounds.playClick();
    setCountdown(3);
  };

  const handleVideoEnd = () => {
    setBlastVideoActive(false);
    setBlastActive(false);
    if (onTriggerBlast) onTriggerBlast();

    // Scroll smoothly to Finale / Thanks message section
    setTimeout(() => {
      const finaleEl = document.getElementById('finale');
      if (finaleEl) {
        finaleEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
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
      setBlastVideoActive(true);
      setIsPlaying(true);
      sounds.playUnlock();

      if (fireworksRef.current) {
        fireworksRef.current.start();
        fireworksRef.current.spawnConfetti(300);
      }
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

          <p className="text-sm sm:text-base text-pink-200/90 font-medium">
            Wait Bhushan... Don't scroll yet! ❤️ Light the candles and make your special wish! ✨
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

          <p className="text-xs sm:text-sm text-pink-300 font-semibold italic animate-pulse">
            Wait Bhushan! Don't scroll yet... ❤️ Press the button below first! 🚨
          </p>

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

          {/* Fullscreen Birthday Blast Video Experience */}
          <AnimatePresence>
            {blastVideoActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-40 bg-[#07050e]/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 text-white overflow-hidden"
              >
                {/* Radial Glow Background matching theme */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-600/20 via-purple-900/30 to-[#07050e] pointer-events-none" />

                {/* Top Banner Header */}
                <div className="relative z-10 text-center space-y-2 mb-3 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-pink-500/40 text-amber-300 text-xs font-black uppercase tracking-widest animate-pulse">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>🎉 GRAND BIRTHDAY BLAST CELEBRATION</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 font-serif">
                    BEHOLD THE CELEBRATION! 🚀
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-200/90 font-medium">
                    Wait Bhushan! Don't scroll yet... ❤️ Watch the blast video until it ends, then your special thanks message will unlock!
                  </p>
                </div>

                {/* Main Video Frame */}
                <div className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[60vh] sm:max-h-[68vh] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,42,117,0.4)] border-2 border-white/20 bg-black flex items-center justify-center group">
                  <video
                    ref={videoRef}
                    src={selectedVideo.url}
                    autoPlay
                    playsInline
                    muted={isMuted}
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-contain"
                  />

                  {/* Top Right Sound Toggle */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-3 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition shadow-lg"
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-rose-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                      )}
                    </button>
                  </div>

                  {/* Center Play/Pause Control Overlay */}
                  <button
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <div className="p-4 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/30">
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
                    </div>
                  </button>
                </div>

                {/* Video Selector Thumbnails */}
                <div className="relative z-10 flex items-center gap-2 my-3">
                  {BHUSHAN_VIDEOS.map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => {
                        setSelectedVideo(vid);
                        setIsPlaying(true);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border ${
                        selectedVideo.id === vid.id
                          ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white border-white'
                          : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Video className="w-3 h-3" />
                      <span>{vid.title}</span>
                    </button>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="relative z-10 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVideoEnd}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-600 to-purple-600 text-white font-extrabold text-sm shadow-xl border border-white/30 flex items-center gap-2"
                  >
                    <span>Proceed to Thanks Message</span>
                    <SkipForward className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
