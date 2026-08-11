import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowDown } from 'lucide-react';
import { INTRO_PHOTO, HERO_PHOTO } from '../data/bhushanAssets';

export default function SurpriseIntro({ onFinishIntro }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2000);
    const t2 = setTimeout(() => setStep(2), 4200);
    const t3 = setTimeout(() => setStep(3), 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-30 min-h-screen flex flex-col items-center justify-center bg-[#0a0714] text-white px-6 py-12 overflow-hidden select-none"
    >
      {/* Background glow orb */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-600/30 via-purple-600/30 to-amber-500/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-widest">
                Hold Up 🛑
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 font-serif leading-tight">
                WAIT... DON'T SCROLL YET 👀
              </h2>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl sm:text-4xl font-light text-pink-100 tracking-wide font-sans">
                This isn't just a birthday wish...
              </h2>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-2">
                <Heart className="w-10 h-10 text-pink-500 animate-pulse fill-pink-500" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 font-serif">
                It's a whole experience made for you. ❤️
              </h2>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-amber-400 to-purple-600 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse" />
                <motion.div
                  initial={{ rotate: -3 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black"
                >
                  <img
                    src={INTRO_PHOTO}
                    alt="Happy Birthday Bhushan"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                      Bhushan Bhusari • 08.09.2005
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-400 to-purple-300 font-serif tracking-tight"
                >
                  HAPPY BIRTHDAY<br />BHUSHAN 🎉
                </motion.h1>
                <p className="text-sm text-pink-200/80 font-light">
                  From your best friends with love & chaos ❤️
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={onFinishIntro}
                className="mt-4 flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-bold text-base shadow-xl shadow-pink-500/30 border border-white/30 hover:shadow-pink-500/50 transition-all"
              >
                <span>ENTER THE SURPRISE</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
