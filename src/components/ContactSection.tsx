import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Compass, Car, Sparkles, Navigation } from 'lucide-react';
import { RestaurantInfo } from '../types';
import { OPERATING_HOURS } from '../data/restaurantData';
import { StorageService } from '../services/storageService';

interface ContactSectionProps {
  info: RestaurantInfo;
  onInquirySubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ info, onInquirySubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Dining Inquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if currently open
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const todayConfig = OPERATING_HOURS.find((h) => h.dayOfWeek === currentDay);

  let isOpenNow = false;
  let todayHoursText = 'Closed Today';

  if (todayConfig && !todayConfig.isClosed) {
    const [openH, openM] = todayConfig.openTime.split(':').map(Number);
    const [closeH, closeM] = todayConfig.closeTime.split(':').map(Number);
    const openTimeVal = openH + openM / 60;
    const closeTimeVal = closeH + closeM / 60;

    todayHoursText = `${todayConfig.openTime} – ${todayConfig.closeTime}`;
    if (currentHour >= openTimeVal && currentHour < closeTimeVal) {
      isOpenNow = true;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      StorageService.saveContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject,
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      if (onInquirySubmitted) {
        onInquirySubmitted();
      }
      setTimeout(() => setSuccess(false), 6000);
    }, 500);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Concierge & Location</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Contact & Operating Hours
          </h1>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Our guest relations team is available daily for dining inquiries, private salon reservations, and press requests.
          </p>
        </div>

        {/* 2-Column Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Hours */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Live Status Card */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 block mb-1">
                  Today ({todayConfig?.dayName})
                </span>
                <span className="font-display text-lg font-bold text-white block">
                  {todayHoursText}
                </span>
                <span className="text-xs text-stone-400">{todayConfig?.serviceType}</span>
              </div>

              <div
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  isOpenNow
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                    : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpenNow ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                  }`}
                />
                <span>{isOpenNow ? 'Open for Service' : 'Closed for Prep'}</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-stone-950 text-amber-400 border border-stone-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">San Francisco Address</h3>
                    <p className="text-stone-300 text-sm mt-1 leading-relaxed">
                      {info.address}<br />
                      {info.city}, {info.state} {info.zip}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${info.name} ${info.address} ${info.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-2.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps / Apple Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-stone-950 text-amber-400 border border-stone-800">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">Telephone Concierge</h3>
                    <p className="text-stone-400 text-xs mt-1">Available 10:00 – 22:00 PST Daily</p>
                    <a
                      href={`tel:${info.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-amber-400 hover:text-amber-300 font-mono text-base font-bold block mt-1 transition-colors"
                    >
                      {info.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-stone-950 text-amber-400 border border-stone-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base">Electronic Inquiries</h3>
                    <p className="text-stone-400 text-xs mt-1">Direct to Guest Relations & Sommelier</p>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-amber-400 hover:text-amber-300 text-sm font-medium block mt-1 transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Hours of Service</span>
              </h3>
              <div className="divide-y divide-stone-800 text-xs">
                {OPERATING_HOURS.map((hour) => {
                  const isCurrent = hour.dayOfWeek === currentDay;
                  return (
                    <div
                      key={hour.dayName}
                      className={`py-2.5 flex items-center justify-between ${
                        isCurrent ? 'text-amber-300 font-semibold' : 'text-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {hour.dayName}
                        {isCurrent && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="font-mono">
                        {hour.isClosed ? 'Closed' : `${hour.openTime} – ${hour.closeTime}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form & Location Guidance */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Form Card */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-white">Send a Message</h2>
                <p className="text-stone-400 text-sm mt-1">
                  For private events, sommelier cellar requests, dietary inquiries, or media bookings.
                </p>
              </div>

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Thank you. Your message has been routed to our guest concierge team. We will respond promptly.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="victoria@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (415) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="General Dining Inquiry">General Dining Inquiry</option>
                      <option value="Private Dining & Salon Buyout">Private Dining & Salon Buyout (12–60 Guests)</option>
                      <option value="Wine Cellar Consultation">Wine Cellar Consultation</option>
                      <option value="Special Dietary Accommodations">Special Dietary Accommodations</option>
                      <option value="Press & Media">Press & Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our team assist your upcoming visit?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400 resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Delivering Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiries to Concierge</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Simulated Interactive Map & Arrival Guidance */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-72 w-full bg-stone-950 overflow-hidden">
                {/* Visual Architectural Map Representation */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="Aura Neighborhood Map"
                  className="w-full h-full object-cover filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[2px]" />

                {/* Map Pin Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center animate-bounce">
                    <div className="p-3 bg-amber-500 text-stone-950 rounded-full shadow-2xl shadow-amber-500/50 border-2 border-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="mt-2 bg-stone-950/90 text-white border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-bold shadow-xl">
                      Aura Restaurant & Lounge
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${info.name} ${info.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-900 text-amber-300 text-xs font-semibold border border-stone-700 backdrop-blur-md transition-colors"
                  >
                    Open Live Navigation
                  </a>
                </div>
              </div>

              <div className="p-6 bg-stone-900 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-300">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Valet Parking:</strong>
                    Complimentary white-glove valet staging at the porte-cochère entrance on Heritage Blvd.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Dress Code:</strong>
                    {info.dressCode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
