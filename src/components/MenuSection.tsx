import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Heart, Utensils, X, Info } from 'lucide-react';
import { MenuItem, DietaryTag } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  onReserveTable: () => void;
}

type MenuCategory = 'all' | 'starters' | 'mains' | 'grills' | 'desserts' | 'drinks' | 'tasting';

export const MenuSection: React.FC<MenuSectionProps> = ({ items, onSelectDish, onReserveTable }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietaryTag, setSelectedDietaryTag] = useState<DietaryTag | 'All'>('All');
  const [tastingWishlist, setTastingWishlist] = useState<string[]>([]);

  const categories: { id: MenuCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Offerings', count: items.length },
    { id: 'starters', label: 'Starters & Crudo', count: items.filter((i) => i.category === 'starters').length },
    { id: 'mains', label: 'Artisanal Mains', count: items.filter((i) => i.category === 'mains').length },
    { id: 'grills', label: 'Wood-Fired Grills', count: items.filter((i) => i.category === 'grills').length },
    { id: 'desserts', label: 'Pastry & Desserts', count: items.filter((i) => i.category === 'desserts').length },
    { id: 'drinks', label: 'Vintage & Cocktails', count: items.filter((i) => i.category === 'drinks').length },
    { id: 'tasting', label: 'Chef’s Tasting Journey', count: items.filter((i) => i.category === 'tasting').length },
  ];

  const dietaryFilterOptions: (DietaryTag | 'All')[] = [
    'All',
    'Chef Selection',
    'Gluten-Free',
    'Vegetarian',
    'Halal',
    'Organic',
  ];

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTastingWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary tag match
      if (selectedDietaryTag !== 'All' && !item.dietaryTags.includes(selectedDietaryTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchIng = item.ingredients?.some((ing) => ing.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchIng) return false;
      }
      return true;
    });
  }, [items, selectedCategory, selectedDietaryTag, searchQuery]);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Hero Header */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>Seasonal Degustation & A La Carte</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            The Autumn Menu
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Curated daily by Chef Laurent Moreau. Prepared over white oak embers and paired with selections from our subterranean wine cellar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Dietary Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or ingredients (e.g. Scallops, Wagyu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Tags Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> Dietary:
            </span>
            {dietaryFilterOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedDietaryTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedDietaryTag === tag
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-stone-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat.id ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-stone-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tasting Wishlist Notice if items selected */}
        {tastingWishlist.length > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-amber-200">
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>
                You have marked <strong>{tastingWishlist.length}</strong> {tastingWishlist.length === 1 ? 'dish' : 'dishes'} for your dining wishlist.
              </span>
            </div>
            <button
              onClick={onReserveTable}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 cursor-pointer"
            >
              Book Table & Mention Notes
            </button>
          </div>
        )}

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-stone-900/40 rounded-3xl border border-stone-800">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-white mb-2">No matching creations found</h3>
            <p className="text-stone-400 text-sm mb-6">
              Try adjusting your search criteria or resetting filters to browse our full culinary collection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietaryTag('All');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-semibold text-sm hover:bg-amber-400 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => {
              const isWishlisted = tastingWishlist.includes(dish.id);
              return (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 cursor-pointer relative"
                >
                  {/* Dish Image Banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />

                    {/* Price Tag */}
                    <div className="absolute top-3 right-3 bg-stone-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-amber-400 font-bold text-base border border-amber-500/30 shadow-lg">
                      ${dish.price.toFixed(2)}
                    </div>

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => toggleWishlist(dish.id, e)}
                      className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-950/70 text-stone-300 hover:text-amber-400 border border-stone-700'
                      }`}
                      title={isWishlisted ? 'Remove from tasting list' : 'Add to tasting list'}
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-stone-950' : ''}`} />
                    </button>

                    {/* Sold out overlay */}
                    {!dish.isAvailable && (
                      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-4 py-1.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold uppercase tracking-wider">
                          Sold Out Tonight
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {dish.dietaryTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-950 text-stone-300 border border-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {dish.name}
                      </h3>

                      <p className="text-stone-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed font-light">
                        {dish.description}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                      {dish.winePairing ? (
                        <span className="text-amber-300/80 italic truncate max-w-[190px]">
                          🍷 {dish.winePairing.split(',')[0]}
                        </span>
                      ) : (
                        <span className="text-stone-500">Aura Kitchen Signature</span>
                      )}

                      <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        View Details <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Reservation Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Ready to savor our seasonal dining experience?
            </h3>
            <p className="text-stone-400 text-sm">
              We accommodate private parties, wine pairing tastings, and dietary accommodations upon request.
            </p>
          </div>
          <button
            onClick={onReserveTable}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shrink-0 cursor-pointer"
          >
            Reserve Your Dining Table
          </button>
        </div>
      </div>
    </div>
  );
};
