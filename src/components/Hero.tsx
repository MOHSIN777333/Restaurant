import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Utensils, Star, Award, Clock, ArrowDown, Sparkles } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeroProps {
  info: RestaurantInfo;
  onViewMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, onViewMenu, onReserveTable }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-stone-950 overflow-hidden text-stone-100">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Aura Fine Dining Ambiance"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Established badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 text-amber-300 text-xs tracking-widest uppercase mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ESTABLISHED {info.foundedYear} • SAN FRANCISCO</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl"
        >
          Culinary Artistry <span className="italic font-normal text-amber-300 font-serif">Meets</span> Wood-Fired Passion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-stone-300 font-light max-w-3xl mb-10 leading-relaxed font-sans"
        >
          {info.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mb-14"
        >
          <button
            onClick={onReserveTable}
            id="hero-reserve-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-5 h-5 text-stone-950" />
            <span>RESERVE A TABLE</span>
          </button>

          <button
            onClick={onViewMenu}
            id="hero-view-menu-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold tracking-wider bg-stone-900/90 text-stone-100 hover:text-amber-300 border border-stone-700 hover:border-amber-500/60 backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Utensils className="w-5 h-5 text-amber-400" />
            <span>EXPLORE MENU</span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-stone-800/80 w-full text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm tracking-wide">4.9 / 5.0 Rating</div>
              <div className="text-stone-400 text-xs">940+ Google Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm tracking-wide">Michelin Guide</div>
              <div className="text-stone-400 text-xs">Selected 2024–2026</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm tracking-wide">Wine Spectator</div>
              <div className="text-stone-400 text-xs">Best of Award of Excellence</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-sm tracking-wide">Open Nightly</div>
              <div className="text-stone-400 text-xs">Dinner from 17:00</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <button
        onClick={onViewMenu}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-stone-400 hover:text-amber-300 transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
