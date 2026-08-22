import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-pink-500 pointer-events-none z-50 mix-blend-screen shadow-[0_0_15px_#ff2a75]"
        animate={{
          x: pos.x - 8,
          y: pos.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-amber-300/60 pointer-events-none z-50"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.2 }}
      />
    </>
  );
}
