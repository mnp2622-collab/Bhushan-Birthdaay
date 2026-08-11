import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';
import { BHUSHAN_VIDEOS } from '../data/bhushanAssets';

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [mutedStates, setMutedStates] = useState({ 0: true, 1: true, 2: true });

  const toggleMute = (idx, e) => {
    e.stopPropagation();
    setMutedStates(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="videos" className="relative py-24 bg-[#080512] text-white px-4 sm:px-8 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-purple-900/10 to-[#080512] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>Classified Video Archives</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 font-serif"
          >
            THE EVIDENCE 📹
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 font-light"
          >
            Some memories were too chaotic to remain hidden.
          </motion.p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BHUSHAN_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/15 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition duration-300 flex flex-col"
            >
              {/* Video Player Container */}
              <div className="relative aspect-[9/16] max-h-[420px] bg-black group overflow-hidden">
                <video
                  src={video.url}
                  poster={video.poster}
                  playsInline
                  muted={mutedStates[idx]}
                  loop
                  controls={false}
                  className="w-full h-full object-cover"
                />

                {/* Video Card Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => toggleMute(idx, e)}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition"
                      title={mutedStates[idx] ? "Unmute" : "Mute"}
                    >
                      {mutedStates[idx] ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Reel</span>
                    </button>

                    <button
                      onClick={() => setActiveVideo(video)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info Footer */}
              <div className="p-5 space-y-1 bg-black/40">
                <h3 className="font-bold text-base text-amber-300 font-serif">
                  {video.title}
                </h3>
                <p className="text-xs text-pink-200/70">
                  {video.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-lg aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black relative"
            >
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
