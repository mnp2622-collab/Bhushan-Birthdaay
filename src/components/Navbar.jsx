import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cake, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "MEMORIES", href: "#memories" },
    { name: "VIDEOS", href: "#videos" },
    { name: "FUNNY", href: "#funny" },
    { name: "FRIENDS", href: "#friends" },
    { name: "TIMELINE", href: "#timeline" },
    { name: "CAKE", href: "#cake" },
    { name: "FINALE", href: "#finale" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Navbar Header */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-xl border border-white/15 rounded-full px-6 py-3 shadow-2xl shadow-pink-500/10'
          : 'bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 font-serif font-extrabold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-rose-300 tracking-tight"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BHUSHAN • 2005</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="hover:text-pink-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full bg-white/10 text-white border border-white/15"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 bg-[#0e0a1f]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl lg:hidden flex flex-col items-center gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-bold tracking-widest text-pink-100 uppercase hover:text-amber-300 py-1"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cake Jump Button */}
      <motion.a
        href="#cake"
        onClick={(e) => scrollToSection(e, "#cake")}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white flex items-center justify-center shadow-2xl shadow-pink-500/40 border border-white/30 cursor-pointer"
        title="Jump to Birthday Cake"
      >
        <Cake className="w-6 h-6 animate-bounce" />
      </motion.a>
    </>
  );
}
