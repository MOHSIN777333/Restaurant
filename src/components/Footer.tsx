import React, { useState } from 'react';
import { Utensils, Phone, Mail, MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface FooterProps {
  info: RestaurantInfo;
  onNavigate: (tab: string) => void;
  onOpenStaffPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onNavigate, onOpenStaffPortal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800/80">
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-500/40 bg-stone-900 flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-display text-2xl tracking-widest text-white">AURA</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-light">
              Modern Californian gastronomy influenced by French technique and wood-fired hearths. Serving seasonal harvest menus and rare cellar pairings since {info.foundedYear}.
            </p>
            <div className="pt-2 text-xs text-amber-400/90 font-medium">
              428 Heritage Blvd • San Francisco, CA 94105
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Autumn Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservations')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Reserve a Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Story & Chefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Location & Hours
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStaffPortal}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer font-medium text-xs"
                >
                  Staff Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dining */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              Concierge
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>
                <strong className="text-stone-300 block">Reservations:</strong>
                <a href={`tel:${info.phone}`} className="hover:text-amber-300 text-stone-400">
                  {info.phone}
                </a>
              </p>
              <p>
                <strong className="text-stone-300 block">Inquiries:</strong>
                <a href={`mailto:${info.email}`} className="hover:text-amber-300 text-stone-400">
                  {info.email}
                </a>
              </p>
              <p>
                <strong className="text-stone-300 block">Service:</strong>
                Dinner: 17:00 – Late Night<br />
                Weekend Brunch: 11:30 – 15:00
              </p>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold">
              Private Cellar Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Receive quarterly invitations to seasonal tasting unveilings and rare winemaker dinners.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Thank you for subscribing.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Restaurant Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-400">Smart Casual Dress Code</span>
            <span>•</span>
            <span className="text-stone-400">Valet Service Available</span>
            <span>•</span>
            <button
              onClick={onOpenStaffPortal}
              className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Host Stand Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
