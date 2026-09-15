import React, { useState } from 'react';
import { Utensils, Calendar, Clock, Phone, Menu as MenuIcon, X, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  unreadInquiriesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  setIsAdmin,
  unreadInquiriesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Pairings' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact & Hours' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 border-b border-amber-900/30 text-xs py-1.5 px-4 text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-2.5 h-2.5 mr-1" /> Michelin Selected 2026
            </span>
            <span className="hidden sm:inline text-stone-400">Autumn Harvest Tasting Menu now serving</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <a href="tel:+14158923400" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" /> (415) 892-3400
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-amber-200/80">Dinner Daily from 17:00</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-stone-900 flex items-center justify-center text-amber-400 shadow-inner group-hover:border-amber-400 group-hover:scale-105 transition-all">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-display text-2xl tracking-widest text-stone-100 group-hover:text-amber-300 transition-colors block leading-tight">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-sans block">
                Fine Dining & Lounge
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id && !isAdmin;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsAdmin(false);
                    handleNavClick(link.id);
                  }}
                  id={`nav-link-${link.id}`}
                  className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-300 bg-stone-900 border-b-2 border-amber-400'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Staff / Admin Portal Toggle */}
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              id="staff-portal-toggle-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isAdmin
                  ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-950/50'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500/50 hover:text-amber-300'
              }`}
              title="Switch to Restaurant Staff & Reservation Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdmin ? 'Exit Staff Portal' : 'Staff Portal'}</span>
              {unreadInquiriesCount > 0 && !isAdmin && (
                <span className="ml-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>

            {/* Quick Reservation Button */}
            <button
              onClick={() => {
                setIsAdmin(false);
                handleNavClick('reservations');
              }}
              id="header-reserve-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 hover:from-amber-500 hover:to-amber-400 transition-all transform hover:scale-[1.02] shadow-md shadow-amber-950/40 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-xs border ${
                isAdmin ? 'bg-amber-600 text-white border-amber-500' : 'bg-stone-900 text-stone-300 border-stone-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-300 hover:text-white bg-stone-900 border border-stone-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2 animate-fadeInUp">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsAdmin(false);
                  handleNavClick(link.id);
                }}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeTab === link.id && !isAdmin
                    ? 'bg-amber-900/30 text-amber-300 border-l-4 border-amber-400 font-semibold'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsAdmin(false);
                handleNavClick('reservations');
              }}
              className="w-full py-3 px-4 rounded-lg bg-amber-500 text-stone-950 font-bold text-center tracking-wide flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book a Reservation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
