import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { FINALE_PHOTO } from '../data/bhushanAssets';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function FinalSection({ onReplay }) {
  return (
    <section id="finale" className="relative min-h-screen py-24 bg-[#05030c] text-white px-4 sm:px-8 flex items-center justify-center overflow-hidden">
      {/* Soft warm emotional lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-950/20 via-[#05030c] to-black pointer-events-none" />

      {/* Subtle floating heart particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-4 h-4 fill-pink-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10 flex flex-col items-center">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>A Special Thanks From The Gang ❤️</span>
        </motion.div>

        {/* Headlines */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-sans font-light text-pink-200/80 italic tracking-wide"
          >
            Jokes apart...
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-400 font-serif drop-shadow-[0_0_35px_rgba(255,42,117,0.3)]"
          >
            Happy Birthday, Bhushan ❤️
          </motion.h2>
        </div>

        {/* Finale Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative group w-64 sm:w-80 aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black"
        >
          <img
            src={FINALE_PHOTO}
            alt="Bhushan Bhusari Finale Photo"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 justify-center">
            <span className="text-xs text-amber-300 font-mono font-bold tracking-widest uppercase">
              Bhushan Bhusari • 08.09.2005
            </span>
          </div>
        </motion.div>

        {/* Emotional Message Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-6 max-w-xl text-slate-200 text-base sm:text-lg font-light leading-relaxed font-sans"
        >
          <p>
            May this year give you more reasons to smile,
            more adventures to remember,
            more success to celebrate,
            and more crazy moments with the people who matter.
          </p>

          <p className="text-2xl font-bold font-serif text-amber-300">
            Keep being you.
          </p>

          {/* Sign-off */}
          <div className="pt-4 border-t border-white/10 text-pink-300 font-serif text-lg font-semibold tracking-wide">
            — Manav, Viro, Sanvidhan, Samyak & Vaibhav ❤️
          </div>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-6"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(255, 42, 117, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-extrabold text-base shadow-xl border border-white/30 flex items-center gap-3 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY IT AGAIN 🔄</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
