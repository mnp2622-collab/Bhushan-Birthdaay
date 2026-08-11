import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, Calendar, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 bg-[#070410] text-white px-4 sm:px-8 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-pink-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest"
          >
            <Hourglass className="w-4 h-4 text-purple-400" />
            <span>Chronicles of Greatness</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 font-serif"
          >
            FROM 2005 TO NOW... ⏳
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 font-light"
          >
            A trip down memory lane tracking the evolution of Bhushan Bhusari.
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-pink-500/30 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {BIRTHDAY_DATA.timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 flex items-center justify-center text-sm text-white shadow-lg shadow-pink-500/30 border-2 border-black group-hover:scale-125 transition duration-300">
                {item.icon}
              </div>

              {/* Card Container */}
              <div className="bg-white/5 border border-white/15 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:border-pink-400/40 transition duration-300 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Text Info */}
                <div className="md:col-span-2 space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono font-bold border border-pink-500/30">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </span>

                  <h3 className="text-xl font-bold text-amber-300 font-serif pt-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-pink-100/90 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Milestone Photo */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-black group-hover:scale-105 transition duration-500">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
