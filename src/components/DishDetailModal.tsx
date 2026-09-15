import React, { useEffect } from 'react';
import { X, Wine, Flame, Clock, ShieldAlert, Sparkles, Calendar, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onReserveTable: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, onReserveTable }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-fadeInUp text-stone-100 max-h-[90vh] flex flex-col">
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-950 transition-colors border border-stone-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Dish Image */}
          <div className="relative h-72 sm:h-80 w-full bg-stone-950">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                  {dish.category.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                  {dish.name}
                </h3>
              </div>
              <div className="bg-stone-950/90 border border-amber-500/40 text-amber-400 font-bold text-2xl px-4 py-1.5 rounded-2xl shadow-xl">
                ${dish.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Dietary Tags & Meta */}
            <div className="flex flex-wrap items-center gap-2">
              {dish.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
                >
                  {tag}
                </span>
              ))}
              {dish.calories && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> {dish.calories} kcal
                </span>
              )}
              {dish.preparationTime && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" /> {dish.preparationTime}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-400 mb-2">
                Culinary Composition
              </h4>
              <p className="text-stone-200 text-base leading-relaxed font-light">
                {dish.description}
              </p>
            </div>

            {/* Ingredients */}
            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Handpicked Ingredients & Purveyors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 text-xs border border-stone-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Wine Pairing */}
            {dish.winePairing && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-stone-900 text-amber-400 mt-0.5">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-amber-300 mb-1">
                    Sommelier Pairing Recommendation
                  </h4>
                  <p className="text-stone-200 text-sm font-medium">
                    {dish.winePairing}
                  </p>
                </div>
              </div>
            )}

            {/* Allergens warning if present */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Contains or may come in contact with: <strong className="text-stone-300">{dish.allergens.join(', ')}</strong>. Please alert your service captain of any allergies.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400 text-center sm:text-left">
            <span>Availability: </span>
            <strong className={dish.isAvailable ? 'text-emerald-400' : 'text-rose-400'}>
              {dish.isAvailable ? 'Freshly Prepared Tonight' : 'Sold Out for the Evening'}
            </strong>
          </div>

          <button
            onClick={() => {
              onClose();
              onReserveTable();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Table to Experience This</span>
          </button>
        </div>
      </div>
    </div>
  );
};
