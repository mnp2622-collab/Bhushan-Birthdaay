import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Delete, Sparkles, AlertCircle, Heart, KeyRound } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { INTRO_PHOTO } from '../data/bhushanAssets';
import { sounds } from '../utils/soundEffects';

export default function PasskeyScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleKeyPress = (num) => {
    if (isUnlocked || passcode.length >= 4) return;
    sounds.playClick();
    const nextCode = passcode + num;
    setPasscode(nextCode);
    setErrorMsg('');

    if (nextCode.length === 4) {
      verifyPasscode(nextCode);
    }
  };

  const handleDelete = () => {
    if (isUnlocked || passcode.length === 0) return;
    sounds.playClick();
    setPasscode(prev => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    if (isUnlocked) return;
    sounds.playClick();
    setPasscode('');
    setErrorMsg('');
  };

  const verifyPasscode = (code) => {
    if (code === BIRTHDAY_DATA.passkey) {
      sounds.playUnlock();
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 1800);
    } else {
      sounds.playError();
      setIsShaking(true);
      const randomError =
        BIRTHDAY_DATA.passcodeErrors[
          Math.floor(Math.random() * BIRTHDAY_DATA.passcodeErrors.length)
        ];
      setErrorMsg(randomError);

      setTimeout(() => {
        setIsShaking(false);
        setPasscode('');
      }, 600);
    }
  };

  const handleEasterEggPhotoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 3) {
      setErrorMsg("Bro remembers his own birth year 2005! Press 2005 😂");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#0d091a] text-white p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-[#0d091a] to-[#05030a] pointer-events-none" />
      
      {/* Floating sparkles background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-400"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Lock Screen Card */}
      <motion.div
        animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl bg-white/5 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(255,42,117,0.15)] flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        {/* Left Side: Photo Frame & Warm Greetings */}
        <div className="flex-1 flex flex-col items-center text-center">
          {/* Framed Oval Photo with Cute Glowing Border */}
          <div 
            onClick={handleEasterEggPhotoClick}
            className="relative cursor-pointer group mb-4"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-amber-400 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-full overflow-hidden border-4 border-pink-400/80 shadow-2xl bg-black">
              <img
                src={INTRO_PHOTO}
                alt="Bhushan Bhusari"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"
              />
              {/* Cute heart icons border overlay */}
              <div className="absolute inset-0 border-2 border-white/30 rounded-full pointer-events-none" />
            </div>
            <span className="absolute -bottom-2 right-2 bg-pink-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-lg border border-pink-300">
              Birthday Boy ❤️
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-300 tracking-tight font-serif flex items-center justify-center gap-2">
            <span>Hey Bhushan</span>
            <Heart className="w-7 h-7 text-pink-500 fill-pink-500 inline-block animate-pulse" />
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 mt-1 font-light max-w-xs">
            Something special is waiting for you...
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Hint: The year you stepped into this world 🌍</span>
          </div>
        </div>

        {/* Right Side: Passcode Display & Numeric Keypad */}
        <div className="flex-1 w-full max-w-sm flex flex-col items-center">
          <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold tracking-wider uppercase mb-2">
            {isUnlocked ? (
              <Unlock className="w-4 h-4 text-emerald-400 animate-bounce" />
            ) : (
              <Lock className="w-4 h-4 text-pink-400" />
            )}
            <span>{isUnlocked ? "Access Granted!" : "Enter Secret Passkey 🔐"}</span>
          </div>

          {/* Passcode Dots Display */}
          <div className="flex items-center justify-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => {
              const filled = idx < passcode.length;
              return (
                <motion.div
                  key={idx}
                  animate={filled ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 transition-all shadow-inner ${
                    isUnlocked
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                      : filled
                      ? 'bg-pink-500/20 border-pink-400 text-white shadow-pink-500/30'
                      : 'bg-white/5 border-white/15 text-white/30'
                  }`}
                >
                  {filled ? '•' : ''}
                </motion.div>
              );
            })}
          </div>

          {/* Error Message Box */}
          <div className="h-8 mb-2 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs sm:text-sm font-medium text-rose-400 flex items-center gap-1.5 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Numeric Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <motion.button
                key={digit}
                whileHover={{ scale: 1.06, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleKeyPress(digit)}
                disabled={isUnlocked}
                className="h-13 sm:h-15 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-xl sm:text-2xl font-semibold text-white shadow-md transition-all flex items-center justify-center hover:border-pink-400/50 hover:shadow-pink-500/20"
              >
                {digit}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleClear}
              disabled={isUnlocked}
              className="h-13 sm:h-15 rounded-2xl bg-white/5 border border-white/10 text-xs uppercase font-bold text-pink-300 tracking-wider flex items-center justify-center hover:bg-white/10"
            >
              Clear
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleKeyPress('0')}
              disabled={isUnlocked}
              className="h-13 sm:h-15 rounded-2xl bg-white/10 border border-white/10 text-xl sm:text-2xl font-semibold text-white flex items-center justify-center hover:border-pink-400/50"
            >
              0
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleDelete}
              disabled={isUnlocked}
              className="h-13 sm:h-15 rounded-2xl bg-white/5 border border-white/10 text-pink-300 flex items-center justify-center hover:bg-white/10"
            >
              <Delete className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Dramatic Unlock Explosion Burst Overlay */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 via-amber-400 to-purple-600 blur-2xl opacity-90" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
