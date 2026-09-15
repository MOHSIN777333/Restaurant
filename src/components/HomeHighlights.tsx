import React from 'react';
import { motion } from 'motion/react';
import { Star, ChevronRight, Utensils, Award, Sparkles, Flame, Clock, Wine, HeartHandshake } from 'lucide-react';
import { MenuItem } from '../types';
import { TESTIMONIALS } from '../data/restaurantData';

interface HomeHighlightsProps {
  signatureDishes: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  onGoToMenu: () => void;
  onGoToReservations: () => void;
  onGoToAbout: () => void;
}

export const HomeHighlights: React.FC<HomeHighlightsProps> = ({
  signatureDishes,
  onSelectDish,
  onGoToMenu,
  onGoToReservations,
  onGoToAbout,
}) => {
  return (
    <div className="bg-stone-900 text-stone-100">
      {/* 1. Welcome & Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Philosophy of Taste</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              An Immersive Symphony of Earth, Flame & Season
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Under the culinary direction of Executive Chef Laurent Moreau, Aura honors California’s micro-climate harvests through classical French precision and Japanese omakase sensibilities. Every morning, our purveyors deliver fresh line-caught fish and bio-dynamic coastal produce straight to our wood-fired hearths.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <Flame className="w-6 h-6 text-amber-400 mb-2" />
                <h3 className="font-display font-semibold text-white text-base">White Oak Hearth</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Direct ember roasting and cold smoking that preserves delicate juices and imparts subtle aromatics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <Wine className="w-6 h-6 text-amber-400 mb-2" />
                <h3 className="font-display font-semibold text-white text-base">Grand Cellar Vault</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Over 1,200 curated labels spanning biodynamic Old World domains and rare California library vintages.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onGoToAbout}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors group cursor-pointer"
              >
                <span>Read the Story of Aura</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mosaic Imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Aura Dining Hall"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-stone-200">Main Dining Salon</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80"
                  alt="Wood Fired Culinary Art"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-stone-200">Hearth Cooking</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                  alt="Wine Cellar Collection"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-stone-200">Sommelier Cellar</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Chef Laurent Moreau Plating"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-stone-200">The Chef’s Counter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature Creations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Epicurean Highlights</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Signature Creations
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              Preview our guest favorites crafted with seasonal ingredients and plated with precision.
            </p>
          </div>

          <button
            onClick={onGoToMenu}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-sm font-semibold border border-stone-700 hover:border-amber-500/40 transition-all cursor-pointer"
          >
            <span>View Complete Menu ({signatureDishes.length}+ items)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dish Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureDishes.slice(0, 3).map((dish) => (
            <div
              key={dish.id}
              onClick={() => onSelectDish(dish)}
              className="group bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/30 flex flex-col cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-stone-900">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-400 font-bold text-base border border-amber-500/30">
                  ${dish.price.toFixed(2)}
                </div>

                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {dish.dietaryTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-900/90 text-stone-200 border border-stone-700 backdrop-blur-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span className="italic text-amber-300/90 truncate max-w-[200px]">
                    🍷 {dish.winePairing?.split(',')[0]}
                  </span>
                  <span className="font-semibold text-amber-400 hover:underline">
                    Explore Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Accolades & Testimonials */}
      <section className="py-20 bg-stone-950 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>Guest Acclaim</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Words From Our Diners & Critics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800 flex flex-col justify-between relative hover:border-amber-500/30 transition-all"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                    "{review.quote}"
                  </p>
                </div>

                <div className="border-t border-stone-800 pt-4 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">{review.author}</h4>
                    <p className="text-stone-400">{review.role}</p>
                  </div>
                  <span className="text-stone-500 text-[11px]">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ready to Dine Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border-t border-amber-900/30 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Experience Aura Tonight
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            Tables for our Main Dining Room and Chef's Counter open 30 days in advance. Private dining salon inquiries are welcomed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={onGoToReservations}
              className="px-8 py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-all shadow-lg cursor-pointer"
            >
              Book Your Table Now
            </button>
            <button
              onClick={onGoToMenu}
              className="px-8 py-3.5 rounded-xl bg-stone-800 text-white hover:bg-stone-700 border border-stone-700 transition-all cursor-pointer"
            >
              Browse Seasonal Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
