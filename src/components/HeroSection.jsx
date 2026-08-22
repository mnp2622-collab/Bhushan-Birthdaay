import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Flame, ChevronDown } from 'lucide-react';
import { HERO_PHOTO } from '../data/bhushanAssets';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function HeroSection({ onStartChaos }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#090614] text-white px-4 sm:px-8 py-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-900/30 via-purple-950/20 to-[#090614] pointer-events-none" />

      {/* Floating balloons and sparkles layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center opacity-70"
            style={{
              left: `${(i * 8.5) + 3}%`,
              bottom: "-80px",
            }}
            animate={{
              y: [0, -1100],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              rotate: [0, i % 2 === 0 ? 15 : -15],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <div
              className="w-10 h-12 sm:w-14 sm:h-16 rounded-full shadow-lg border border-white/20 flex items-center justify-center"
              style={{
                backgroundColor: i % 4 === 0 ? '#ff2a75' : i % 4 === 1 ? '#ffd700' : i % 4 === 2 ? '#a855f7' : '#ff5e00'
              }}
            >
              <Sparkles className="w-4 h-4 text-white/70" />
            </div>
            <div className="w-0.5 h-12 bg-white/30" />
          </motion.div>
        ))}
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        {/* Left Column: Typography & Action */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>It's Official • Birthday Mode Active</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-serif leading-none">
              Happy Birthday,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400 drop-shadow-[0_0_35px_rgba(255,42,117,0.4)]">
                Bhushan! 🎂
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-mono text-amber-300 tracking-widest pt-2">
              {BIRTHDAY_DATA.formattedDob}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-pink-100/90 font-light max-w-lg leading-relaxed italic"
          >
            "Another year older... <br className="hidden sm:block" />
            <span className="text-amber-300 font-normal">but definitely not wiser. 😂</span>"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 42, 117, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartChaos}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-pink-500/25 border border-white/20 flex items-center gap-3 transition-all"
            >
              <span>START THE CHAOS →</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Hero Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative flex justify-center"
        >
          <div className="relative group w-72 sm:w-88 lg:w-96">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-600 to-amber-400 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
            
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black aspect-[3/4]">
              <img
                src={HERO_PHOTO}
                alt="Bhushan Bhusari Hero Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Bhushan Bhusari</h4>
                  <p className="text-[11px] text-pink-300 font-mono">Main Character • 2005</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center border border-pink-400/50">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Arrow Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={onStartChaos}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-white/50 hover:text-pink-400 transition-colors flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
