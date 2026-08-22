import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    sounds.toggleMusic((state) => setIsPlaying(state));
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMusic}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold shadow-2xl shadow-pink-500/20 hover:bg-white/20 transition group"
      >
        <div className={`p-1 rounded-full ${isPlaying ? 'bg-pink-500 text-white animate-pulse' : 'bg-white/10 text-pink-300'}`}>
          <Music className="w-3.5 h-3.5" />
        </div>
        
        <span>{isPlaying ? 'Music ON 🎵' : 'Play Music 🎶'}</span>

        {/* Animated Sound Waves when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-pink-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
            <span className="w-0.5 bg-purple-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
