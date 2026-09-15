import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle, Sparkles, MapPin, ShieldCheck, Download, Share2, Copy, Check } from 'lucide-react';
import { Reservation, SeatingArea } from '../types';
import { StorageService } from '../services/storageService';

interface ReservationSectionProps {
  onReservationCreated?: (res: Reservation) => void;
  onGoToMenu: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationCreated,
  onGoToMenu,
}) => {
  // Current local date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Main Dining Room');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean; remainingSpots: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Load available time slots whenever date changes
  useEffect(() => {
    if (date) {
      const slots = StorageService.getAvailableTimeSlots(date);
      setAvailableSlots(slots);
      // If current selected time is no longer available, reset time
      const isCurrentTimeValid = slots.some((s) => s.time === time && s.available);
      if (!isCurrentTimeValid && slots.length > 0) {
        const firstAvailable = slots.find((s) => s.available);
        setTime(firstAvailable ? firstAvailable.time : '');
      }
    }
  }, [date]);

  const seatingAreas: { id: SeatingArea; description: string; tag: string }[] = [
    { id: 'Main Dining Room', description: 'Cozy booths and linen tables under warm architectural lighting.', tag: 'Popular' },
    { id: 'Chef’s Tasting Counter', description: 'Direct vantage of Chef Moreau and line hearth action.', tag: 'Experiential' },
    { id: 'Private Garden Terrace', description: 'Heated open-air terrace with lush living walls.', tag: 'Al Fresco' },
    { id: 'Wine Cellar Vault', description: 'Surrounded by historic vintages. Intimate and secluded.', tag: 'Exclusive' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validations
    if (!date) {
      setErrorMsg('Please select a dining date.');
      return;
    }
    if (!time) {
      setErrorMsg('Please select an available seating time.');
      return;
    }
    if (!guestName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address for your confirmation receipt.');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 7) {
      setErrorMsg('Please provide a contact telephone number.');
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic reservation booking process
    setTimeout(() => {
      const result = StorageService.createReservation({
        date,
        time,
        partySize,
        seatingArea,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        guestPhone: guestPhone.trim(),
        specialRequests: specialRequests.trim() || undefined,
      });

      setIsSubmitting(false);

      if (result.success && result.reservation) {
        setConfirmedReservation(result.reservation);
        if (onReservationCreated) {
          onReservationCreated(result.reservation);
        }
      } else {
        setErrorMsg(result.error || 'Unable to complete reservation. Please try another time.');
      }
    }, 600);
  };

  const handleCopyCode = () => {
    if (confirmedReservation) {
      navigator.clipboard.writeText(confirmedReservation.confirmationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Live Table Availability</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Table Reservations
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Reserve your dining experience at Aura. For parties larger than 16 or private venue buyout inquiries, please contact our concierge directly.
          </p>
        </div>

        {/* Confirmation Success Card */}
        {confirmedReservation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-stone-900 border border-amber-500/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h2 className="font-display text-3xl font-bold text-white">
                We Look Forward to Welcoming You, {confirmedReservation.guestName}
              </h2>
              <p className="text-stone-300 text-sm mt-2">
                A confirmation summary has been registered in our restaurant host system.
              </p>
            </div>

            {/* Ticket Pass Container */}
            <div className="bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
                <div>
                  <span className="text-xs text-stone-400 block uppercase tracking-wider">Confirmation Code</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tracking-wider">
                      {confirmedReservation.confirmationCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 transition-colors"
                      title="Copy Confirmation Code"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-400 block uppercase tracking-wider">Reserved Table</span>
                  <span className="font-display text-xl font-bold text-white">
                    Table #{confirmedReservation.tableNumber} ({confirmedReservation.seatingArea})
                  </span>
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-stone-400 text-xs block">Date</span>
                  <strong className="text-white font-medium">{confirmedReservation.date}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-xs block">Seating Time</span>
                  <strong className="text-amber-300 font-medium">{confirmedReservation.time}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-xs block">Party Size</span>
                  <strong className="text-white font-medium">
                    {confirmedReservation.partySize} {confirmedReservation.partySize === 1 ? 'Guest' : 'Guests'}
                  </strong>
                </div>
                <div>
                  <span className="text-stone-400 text-xs block">Status</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Confirmed
                  </span>
                </div>
              </div>

              {confirmedReservation.specialRequests && (
                <div className="pt-4 border-t border-stone-800/80 text-xs">
                  <span className="text-stone-400 block mb-1">Notes for Culinary & Service Team:</span>
                  <p className="text-stone-200 italic bg-stone-900/60 p-3 rounded-lg border border-stone-800">
                    "{confirmedReservation.specialRequests}"
                  </p>
                </div>
              )}
            </div>

            {/* Post-booking Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setConfirmedReservation(null);
                  setDate(todayStr);
                  setGuestName('');
                  setGuestEmail('');
                  setGuestPhone('');
                  setSpecialRequests('');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-semibold border border-stone-700 transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>

              <button
                onClick={onGoToMenu}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                View Menu in Advance
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Reservation Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Step 1: Date, Guests, Seating */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-stone-800">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-display text-xl font-bold text-white">Date & Seating Preference</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Dining Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    />
                  </div>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Reservations open 30 days in advance
                  </span>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Guests *
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'Guest (Solo Tasting)' : size === 2 ? 'Guests (Table for Two)' : `Guests`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">
                  Select Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingAreas.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        seatingArea === area.id
                          ? 'bg-amber-950/30 border-amber-400 text-white shadow-md'
                          : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-semibold text-base">{area.id}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            seatingArea === area.id
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {area.tag}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 font-light">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Available Timeslots */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-display text-xl font-bold text-white">Select Seating Time</h2>
                </div>
                <span className="text-xs text-stone-400">
                  {availableSlots.filter((s) => s.available).length} time slots available
                </span>
              </div>

              {availableSlots.length === 0 ? (
                <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 text-center text-stone-400 text-sm">
                  We are closed for regular table seatings on the selected date. Please pick another evening.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setTime(slot.time)}
                        className={`py-3 px-2 rounded-xl text-xs font-medium transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                          !slot.available
                            ? 'bg-stone-950 text-stone-600 border border-stone-900 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-950/50 scale-105'
                            : 'bg-stone-950 border border-stone-800 text-stone-200 hover:border-amber-500/50 hover:text-amber-300'
                        }`}
                      >
                        <span className="text-sm font-semibold">{slot.time}</span>
                        <span className="text-[10px] opacity-80">
                          {slot.available ? `${slot.remainingSpots} tables` : 'Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 3: Guest Details */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-stone-800">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="font-display text-xl font-bold text-white">Guest Information & Notes</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
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
                    placeholder="name@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (415) 000-0000"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Special Occasion, Allergies or Dietary Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  maxLength={200}
                  placeholder="E.g. Celebrating a milestone anniversary, severe peanut allergy, quiet corner table requested..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-400 resize-none font-light"
                />
                <div className="flex justify-between items-center text-[11px] text-stone-400 mt-1">
                  <span>Informing our kitchen in advance ensures flawless personalized service.</span>
                  <span>{specialRequests.length} / 200</span>
                </div>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Dining Policies & Terms Note */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Aura Dining & Reservation Policy
              </div>
              <p>
                Tables are held for a 15-minute grace period from the reserved seating time. Cancellations made with at least 24 hours notice incur no fee. Smart casual dress code requested.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting || !time}
              id="submit-reservation-btn"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base tracking-wide transition-all shadow-xl shadow-amber-950/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Securing Your Table...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Reservation ({date} at {time || 'Select Time'})</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
