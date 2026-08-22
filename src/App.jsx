import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import PasskeyScreen from './components/PasskeyScreen';
import SurpriseIntro from './components/SurpriseIntro';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import PhotoGallery from './components/PhotoGallery';
import VideoSection from './components/VideoSection';
import MemeSection from './components/MemeSection';
import FriendsWishes from './components/FriendsWishes';
import Timeline from './components/Timeline';
import CakeSection from './components/CakeSection';
import FinalSection from './components/FinalSection';
import { X, Laugh } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState('loading'); // 'loading' | 'passkey' | 'intro' | 'unlocked'
  const [showIdleModal, setShowIdleModal] = useState(false);

  const handleLoadingComplete = () => {
    setStage('passkey');
  };

  const handleUnlockPasskey = () => {
    setStage('intro');
  };

  const handleFinishIntro = () => {
    setStage('unlocked');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('loading');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Easter Egg: Idle Timer Modal
  useEffect(() => {
    if (stage !== 'unlocked') return;
    const idleTimer = setTimeout(() => {
      setShowIdleModal(true);
    }, 60000); // 60 seconds idle reminder

    return () => clearTimeout(idleTimer);
  }, [stage]);

  return (
    <div className="min-h-screen bg-[#07050e] text-white selection:bg-pink-500 selection:text-white font-sans antialiased overflow-x-hidden">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {/* 1. CINEMATIC LOADING SCREEN */}
        {stage === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {/* 2. SECRET PASSKEY SCREEN */}
        {stage === 'passkey' && (
          <PasskeyScreen key="passkey" onUnlock={handleUnlockPasskey} />
        )}

        {/* 3. SURPRISE INTRO */}
        {stage === 'intro' && (
          <SurpriseIntro key="intro" onFinishIntro={handleFinishIntro} />
        )}
      </AnimatePresence>

      {/* 4. MAIN BIRTHDAY EXPERIENCE */}
      {stage === 'unlocked' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Navbar />
          <MusicPlayer />

          {/* Hero Birthday Section */}
          <HeroSection onStartChaos={() => scrollToSection('memories')} />

          {/* Photo Gallery & Memory Carousel */}
          <PhotoGallery />

          {/* Video Section ("THE EVIDENCE") */}
          <VideoSection />

          {/* Meme Wall ("BHUSHAN LORE") */}
          <MemeSection />

          {/* Friends' Wishes & Signature Wall */}
          <FriendsWishes />

          {/* Vertical Timeline */}
          <Timeline />

          {/* Interactive Birthday Cake & Candles & Blast */}
          <CakeSection onTriggerBlast={() => {}} />

          {/* Final Emotional Message */}
          <FinalSection onReplay={handleReplay} />
        </motion.main>
      )}

      {/* Easter Egg Idle Popup */}
      <AnimatePresence>
        {showIdleModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 max-w-xs bg-gradient-to-r from-purple-900 via-pink-900 to-black border border-pink-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-white space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1">
                <Laugh className="w-4 h-4 text-pink-400" />
                <span>Easter Egg Alert!</span>
              </span>
              <button
                onClick={() => setShowIdleModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-semibold">
              Bhushan, you're still here? 😂
            </p>
            <p className="text-xs text-pink-200/80">
              The boys spent hours making this for you! Make sure to cut the cake above! 🎂
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
