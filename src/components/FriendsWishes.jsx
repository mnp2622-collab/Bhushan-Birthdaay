import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, User, MessageCircle, Star } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function FriendsWishes() {
  const [activeFriendId, setActiveFriendId] = useState(null);

  const handleSignatureClick = (id) => {
    sounds.playClick();
    setActiveFriendId(id);
    const element = document.getElementById(`wish-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="friends" className="relative py-24 bg-[#0a0718] text-white px-4 sm:px-8 overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-pink-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest"
          >
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>Brotherhood Letters</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300 font-serif leading-tight"
          >
            MESSAGES FROM THE IDIOTS WHO KNOW YOU BEST ❤️😂
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 font-light"
          >
            Handwritten wishes from your core circle: Manav, Viro, Sanvidhan, Samyak & Vaibhav.
          </motion.p>
        </div>

        {/* Section 10: Interactive Friends Signature Wall ("YOUR PEOPLE ❤️") */}
        <div className="bg-white/5 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>YOUR PEOPLE ❤️ • Click any name to highlight wish</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {BIRTHDAY_DATA.friendMessages.map((friend) => {
              const isSelected = activeFriendId === friend.id;
              return (
                <motion.button
                  key={friend.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSignatureClick(friend.id)}
                  className={`px-6 py-3 rounded-2xl font-serif text-lg sm:text-xl tracking-wider transition-all duration-300 shadow-lg border ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white border-white/40 shadow-pink-500/40 ring-4 ring-pink-500/30'
                      : 'bg-white/10 text-white/90 border-white/15 hover:border-pink-400/50 hover:bg-white/20'
                  }`}
                >
                  ✍️ {friend.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Individual Animated Cards for Each Friend */}
        <div className="space-y-8">
          {BIRTHDAY_DATA.friendMessages.map((friend, idx) => {
            const isHighlighted = activeFriendId === friend.id;
            return (
              <motion.div
                key={friend.id}
                id={`wish-card-${friend.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative bg-gradient-to-br from-white/10 via-white/5 to-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-2xl ${
                  isHighlighted
                    ? 'border-pink-400 ring-4 ring-pink-500/30 shadow-pink-500/20 scale-[1.02]'
                    : 'border-white/15 hover:border-white/30'
                }`}
              >
                {/* Header Badge & Name */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${friend.avatarBg} flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/30`}>
                      {friend.name[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                        {friend.heading}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-mono">
                        {friend.tagline}
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-pink-200 border border-white/10">
                    Verified Friend 🤝
                  </span>
                </div>

                {/* Message Body */}
                <div className="whitespace-pre-line font-sans text-base sm:text-lg text-slate-100 leading-relaxed font-normal tracking-wide space-y-4">
                  {friend.message}
                </div>

                {/* Card Footer Reaction */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-1.5 text-pink-300">
                    <Star className="w-4 h-4 fill-pink-400 text-pink-400" />
                    <span>Sent with love & chaos</span>
                  </div>
                  <span className="font-mono">#BhushanBirthday2026</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
