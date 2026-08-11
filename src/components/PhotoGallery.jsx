import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { BHUSHAN_PHOTOS } from '../data/bhushanAssets';

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % BHUSHAN_PHOTOS.length);
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + BHUSHAN_PHOTOS.length) % BHUSHAN_PHOTOS.length);
  };

  return (
    <section id="memories" className="relative py-24 bg-[#0c0818] text-white overflow-hidden px-4 sm:px-8">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest"
          >
            <Camera className="w-4 h-4 text-pink-400" />
            <span>Digital Memory Vault</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-rose-400 font-serif"
          >
            THE MANY VERSIONS OF BHUSHAN 😂
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 font-light"
          >
            Hover over any polaroid to reveal the raw truth behind every iconic picture.
          </motion.p>
        </div>

        {/* Polaroid Masonry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BHUSHAN_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              style={{ rotate: `${photo.rotate}deg` }}
              onClick={() => openLightbox(index)}
              className="cursor-pointer group relative bg-white/90 text-slate-900 rounded-2xl p-4 shadow-xl border border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 mb-3">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-500"
                />
                
                {/* Tag Badge */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-400/30">
                  {photo.tag}
                </span>

                {/* Hover Click overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Handwritten Style Caption */}
              <div className="px-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm font-sans tracking-tight">
                    {photo.title}
                  </h4>
                  <Heart className="w-4 h-4 text-pink-500 opacity-60 group-hover:opacity-100 fill-pink-500 transition-opacity" />
                </div>
                <p className="text-xs text-slate-600 font-serif italic">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 6: Memory Carousel Horizontal Reel */}
        <div className="pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-12">
            <div>
              <h3 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Cinematic Memory Carousel</span>
              </h3>
              <p className="text-xs text-pink-200/70">Swipe or click photos to launch lightbox</p>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-pink-500/20 snap-x">
            {BHUSHAN_PHOTOS.slice(0, 12).map((photo, idx) => (
              <motion.div
                key={`carousel-${photo.id}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(idx)}
                className="flex-none w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden relative cursor-pointer group border border-white/15 bg-white/5 snap-center shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] text-amber-300 uppercase font-bold tracking-widest">
                    {photo.tag}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Lightbox Content */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={BHUSHAN_PHOTOS[selectedPhotoIndex].url}
                alt={BHUSHAN_PHOTOS[selectedPhotoIndex].title}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl border-2 border-white/20 shadow-2xl"
              />
              <div className="mt-4 text-center space-y-1">
                <h3 className="text-xl font-bold text-amber-300 font-serif">
                  {BHUSHAN_PHOTOS[selectedPhotoIndex].title}
                </h3>
                <p className="text-sm text-pink-100 font-sans italic max-w-md">
                  "{BHUSHAN_PHOTOS[selectedPhotoIndex].caption}"
                </p>
                <p className="text-xs text-white/50 pt-1">
                  Photo {selectedPhotoIndex + 1} of {BHUSHAN_PHOTOS.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
