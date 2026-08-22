import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Camera, ShieldCheck, Laugh } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { FUNNY_FACE_PHOTO } from '../data/bhushanAssets';

export default function MemeSection() {
  return (
    <section id="funny" className="relative py-24 bg-[#0a0616] text-white px-4 sm:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-widest"
          >
            <Laugh className="w-4 h-4 text-rose-400" />
            <span>Official Meme Archive</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-300 to-purple-400 font-serif"
          >
            BHUSHAN LORE 💀
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 font-light"
          >
            Unfiltered truths certified by your best friends.
          </motion.p>
        </div>

        {/* Meme Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 5-Minute Promise */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-900/40 via-purple-950/60 to-black/80 border border-purple-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>Bhushan Time Zone</span>
              </span>
              <span className="text-xl">⏱️</span>
            </div>

            <div className="space-y-4 my-2">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-white/60 font-mono uppercase">When Bhushan says:</p>
                <p className="text-lg sm:text-xl font-bold text-amber-300 italic font-serif">
                  "Bas 5 minute mein aata hoon."
                </p>
              </div>

              <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-4">
                <p className="text-xs text-pink-300 font-mono uppercase">Actual Delivery:</p>
                <p className="text-xl sm:text-2xl font-extrabold text-pink-400 font-serif">
                  3 business days later... 💀
                </p>
              </div>
            </div>

            <p className="text-[11px] text-white/40 text-right italic font-mono pt-2">
              #PunctualityLevelZero
            </p>
          </motion.div>

          {/* Card 2: Camera Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-900/40 via-indigo-950/60 to-black/80 border border-blue-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Camera Effect</span>
              </span>
              <span className="text-xl">📸</span>
            </div>

            <div className="space-y-4 my-2">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60 font-mono uppercase">Bhushan BEFORE camera:</p>
                  <p className="text-xl font-bold text-slate-300 font-serif">Neutral mode</p>
                </div>
                <span className="text-4xl">😐</span>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-300 font-mono uppercase">Bhushan AFTER camera:</p>
                  <p className="text-xl font-extrabold text-amber-400 font-serif">Instant Superstar</p>
                </div>
                <span className="text-4xl">😎</span>
              </div>
            </div>

            <p className="text-[11px] text-white/40 text-right italic font-mono pt-2">
              #NaturalBornModel
            </p>
          </motion.div>

          {/* Card 3: Normal Photo Request */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-amber-900/40 via-red-950/60 to-black/80 border border-amber-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Group Photo Request</span>
              </span>
              <span className="text-xl">🖼️</span>
            </div>

            <div className="space-y-3">
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/60 font-mono">Everyone:</p>
                <p className="text-sm font-bold text-white italic">"Let's take one normal photo, please."</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 aspect-[16/9] bg-black">
                <img
                  src={FUNNY_FACE_PHOTO}
                  alt="Bhushan Funny Moment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs font-extrabold text-amber-300 font-serif">Bhushan: [Unfiltered Chaos] 😂</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Birthday Rules */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-900/40 via-teal-950/60 to-black/80 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Constitution of Bhushan</span>
              </span>
              <span className="text-xl">📜</span>
            </div>

            <div className="space-y-4 my-2">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
                <p className="text-xs text-emerald-400 font-mono font-bold uppercase">Birthday Rule #1:</p>
                <p className="text-lg font-bold text-white font-serif">
                  Bhushan is ALWAYS right.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-amber-400 font-mono font-bold uppercase">Birthday Rule #2:</p>
                <p className="text-sm font-semibold text-pink-200 font-sans italic">
                  If Bhushan is ever wrong, immediately refer back to Rule #1. 🧠
                </p>
              </div>
            </div>

            <p className="text-[11px] text-white/40 text-right italic font-mono pt-2">
              #UnbeatableLogic
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
