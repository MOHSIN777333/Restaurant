import React from 'react';
import { Award, Sparkles, HeartHandshake, Flame, Wine, ChevronRight, Star, Instagram, Facebook } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface AboutSectionProps {
  info: RestaurantInfo;
  onReserveTable: () => void;
  onViewMenu: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info, onReserveTable, onViewMenu }) => {
  const values = [
    {
      title: 'Uncompromising Quality',
      description: 'We partner directly with organic biodynamic family farms along the Northern California coast, day-boat fishermen, and artisanal cheesemakers.',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    },
    {
      title: 'Heartfelt Hospitality',
      description: 'True luxury lies in attentiveness without pretension. Every guest is welcomed with warmth, unhurried pacing, and intuitive care.',
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
    },
    {
      title: 'Wood-Fired Innovation',
      description: 'Embracing ancestral open-fire methods over native white oak alongside cutting-edge fermentation and dry-aging techniques.',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
    },
  ];

  const milestones = [
    { year: '2015', title: 'Founding of Aura', detail: 'Chef Laurent Moreau opened Aura on Heritage Boulevard with a 36-seat dining room and custom white oak hearth.' },
    { year: '2018', title: 'Wine Spectator Best of Award', detail: 'Expanded our subterranean wine cellar vault to hold over 1,200 rare international vintages.' },
    { year: '2022', title: 'Private Garden Terrace Debut', detail: 'Introduced an open-air al fresco dining courtyard adorned with living botanical walls.' },
    { year: '2026', title: 'Michelin Selected & Global Acclaim', detail: 'Recognized for culinary excellence, exceptional service standards, and terroir-driven tasting menus.' },
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Hero Header */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Heritage & Culinary Craft</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The Story Behind Aura
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Founded in 2015, Aura was conceived as a gathering place where the intimacy of a neighborhood bistro harmonizes with the rigorous discipline of haute cuisine.
          </p>
        </div>
      </div>

      {/* Main Narrative & Chef Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Rooted in the Soil, Ignited by Fire
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              At Aura, cuisine is not merely prepared; it is curated through deep relationships with the farmers, foragers, and fishermen who steward our coastal waters and fertile valleys.
            </p>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Our open hearth burns sustainably harvested California white oak, delivering nuanced char and aromatic cedar notes that elevate our dry-aged meats, wild seafood, and heirloom produce without overpowering their natural essence.
            </p>
            <div className="pt-2 border-l-2 border-amber-400 pl-4 italic text-stone-200 text-base">
              "Great cooking requires the courage to let exceptional ingredients speak for themselves."
              <span className="block not-italic text-amber-400 font-semibold text-xs uppercase tracking-wider mt-2">
                — Chef Laurent Moreau
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
                alt="Chef plating at Aura"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800">
                <span className="text-xs text-amber-400 uppercase tracking-widest block mb-0.5">The Open Kitchen</span>
                <span className="text-sm font-medium text-stone-200">Where ancestral wood-fire meets modern gastronomic elegance.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Bios */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              Our Artisans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              The Culinary & Cellar Masters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chef Bio */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                alt="Executive Chef Laurent Moreau"
                className="w-32 h-32 rounded-2xl object-cover shrink-0 border border-amber-500/30"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Laurent Moreau</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Executive Chef & Partner</span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Trained across Michelin-starred kitchens in Lyon, Paris, and Kyoto, Chef Moreau brings 22 years of culinary pedigree to Aura's seasonally shifting menus.
                </p>
              </div>
            </div>

            {/* Sommelier Bio */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Master Sommelier Elena Vance"
                className="w-32 h-32 rounded-2xl object-cover shrink-0 border border-amber-500/30"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Elena Vance</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Master Sommelier & Cellar Director</span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Curator of Aura's 1,200-bottle cellar, Elena specializes in low-intervention biodynamic viticulture and unexpected vintage pairings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-stone-900/60 p-8 sm:p-12 rounded-3xl border border-stone-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              Our Principles
            </span>
            <h2 className="font-display text-3xl font-bold text-white">
              What Guides Every Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.title} className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{val.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              Our Journey
            </span>
            <h2 className="font-display text-3xl font-bold text-white">
              A Decade of Memorable Evenings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="font-mono text-2xl font-bold text-amber-400">{m.year}</span>
                <h4 className="font-display font-semibold text-white text-base">{m.title}</h4>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-900/40 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Join Us at the Hearth
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-light">
            Whether for a celebratory anniversary, an executive dinner, or an unhurried tasting flight, we look forward to hosting you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onReserveTable}
              className="px-8 py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-all shadow-lg cursor-pointer"
            >
              Book Table Reservation
            </button>
            <button
              onClick={onViewMenu}
              className="px-8 py-3.5 rounded-xl bg-stone-800 text-white hover:bg-stone-700 border border-stone-700 transition-all cursor-pointer"
            >
              View Autumn Menu
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
