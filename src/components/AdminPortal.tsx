import React, { useState } from 'react';
import { ShieldCheck, Calendar, Users, Clock, Search, Filter, CheckCircle, XCircle, UserCheck, Download, Edit3, Check, RefreshCw, Mail, DollarSign, Eye, EyeOff } from 'lucide-react';
import { Reservation, ReservationStatus, MenuItem, ContactMessage } from '../types';
import { StorageService } from '../services/storageService';

interface AdminPortalProps {
  reservations: Reservation[];
  onReservationsUpdated: (updated: Reservation[]) => void;
  menuItems: MenuItem[];
  onMenuItemsUpdated: (updated: MenuItem[]) => void;
  contactMessages: ContactMessage[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  reservations,
  onReservationsUpdated,
  menuItems,
  onMenuItemsUpdated,
  contactMessages,
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'inquiries' | 'analytics'>('reservations');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Editing price state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (selectedDate && r.date !== selectedDate) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.guestName.toLowerCase().includes(q);
      const matchEmail = r.guestEmail.toLowerCase().includes(q);
      const matchCode = r.confirmationCode.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCode) return false;
    }
    return true;
  });

  const handleStatusChange = (id: string, newStatus: ReservationStatus) => {
    const updated = StorageService.updateReservationStatus(id, newStatus);
    onReservationsUpdated(updated);
  };

  const handleToggleMenuAvailability = (id: string) => {
    const updated = StorageService.toggleMenuItemAvailability(id);
    onMenuItemsUpdated(updated);
  };

  const handleSavePrice = (id: string) => {
    const num = parseFloat(tempPrice);
    if (!isNaN(num) && num > 0) {
      const updated = StorageService.updateMenuItemPrice(id, num);
      onMenuItemsUpdated(updated);
    }
    setEditingItemId(null);
  };

  // Export reservations to CSV
  const handleExportCSV = () => {
    const headers = ['Confirmation Code', 'Date', 'Time', 'Guests', 'Area', 'Guest Name', 'Email', 'Phone', 'Status', 'Special Requests'];
    const rows = reservations.map((r) => [
      r.confirmationCode,
      r.date,
      r.time,
      r.partySize,
      r.seatingArea,
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.guestEmail,
      r.guestPhone,
      r.status,
      `"${(r.specialRequests || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aura_Reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Analytics metrics
  const totalCovers = reservations.reduce((acc, r) => acc + (r.status !== 'cancelled' ? r.partySize : 0), 0);
  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;
  const seatedCount = reservations.filter((r) => r.status === 'seated').length;
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Management Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Host Stand & Operational CMS</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">Staff Management Portal</h1>
            <p className="text-stone-400 text-xs mt-0.5">
              Live reservations management, host seating coordination, and menu stock controls.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <span className="text-[10px] uppercase text-stone-400 block font-semibold">Total Guests</span>
              <span className="font-mono text-lg font-bold text-amber-400">{totalCovers} Covers</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <span className="text-[10px] uppercase text-stone-400 block font-semibold">Seated Tables</span>
              <span className="font-mono text-lg font-bold text-emerald-400">{seatedCount}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
              <span className="text-[10px] uppercase text-stone-400 block font-semibold">Confirmed</span>
              <span className="font-mono text-lg font-bold text-amber-300">{confirmedCount}</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-stone-800 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'reservations'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservations Ledger ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Menu & 86’d Stock CMS ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Guest Inquiries ({contactMessages.length})</span>
          </button>
        </div>

        {/* TAB 1: RESERVATIONS LEDGER */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search guest or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Date filter */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  title="Filter by reservation date"
                />

                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate('')}
                    className="text-xs text-stone-400 hover:text-white underline"
                  >
                    Clear Date
                  </button>
                )}
              </div>

              {/* Status and CSV */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated at Table</option>
                  <option value="pending">Pending Review</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-950 border-b border-stone-800 text-stone-400 font-semibold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Code / Guest</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Party / Area</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Host Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400">
                          No reservations match the chosen filter.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => (
                        <tr key={res.id} className="hover:bg-stone-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-amber-400 block">
                              {res.confirmationCode}
                            </span>
                            <span className="text-white font-medium text-sm">{res.guestName}</span>
                            {res.tableNumber && (
                              <span className="text-[10px] text-stone-400 block">
                                Table #{res.tableNumber}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-white font-medium block">{res.date}</span>
                            <span className="text-amber-300 font-mono text-xs">{res.time}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-white font-bold">{res.partySize} Guests</span>
                            <span className="text-[11px] text-stone-400 block">{res.seatingArea}</span>
                            {res.specialRequests && (
                              <span
                                className="text-[10px] text-amber-300/90 italic block truncate max-w-xs mt-0.5"
                                title={res.specialRequests}
                              >
                                Note: "{res.specialRequests}"
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-stone-300 block">{res.guestEmail}</span>
                            <span className="text-stone-400 font-mono text-[11px]">{res.guestPhone}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                  : res.status === 'seated'
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                                  : res.status === 'completed'
                                  ? 'bg-stone-800 text-stone-400 border-stone-700'
                                  : res.status === 'cancelled'
                                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                                  : 'bg-amber-950/80 text-amber-300 border-amber-800'
                              }`}
                            >
                              {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {res.status !== 'seated' && res.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleStatusChange(res.id, 'seated')}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-blue-900 text-blue-300 hover:text-white border border-stone-700 transition-colors"
                                  title="Seat Party at Table"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {res.status === 'seated' && (
                                <button
                                  onClick={() => handleStatusChange(res.id, 'completed')}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-stone-700 transition-colors"
                                  title="Complete & Clear Table"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {res.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleStatusChange(res.id, 'cancelled')}
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900 text-rose-300 hover:text-white border border-stone-700 transition-colors"
                                  title="Cancel Reservation"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU & STOCK CMS */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
              <div>
                <strong className="text-white block mb-0.5">Real-Time Kitchen 86 & Price Adjustments</strong>
                Toggle dishes between in-stock and sold out, or click the price to adjust nightly market pricing.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    item.isAvailable
                      ? 'bg-stone-900 border-stone-800'
                      : 'bg-stone-950 border-rose-900/40 opacity-75'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          {item.category}
                        </span>
                        <h4 className="font-display text-lg font-bold text-white leading-snug">
                          {item.name}
                        </h4>
                      </div>

                      {/* Availability toggle */}
                      <button
                        onClick={() => handleToggleMenuAvailability(item.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 cursor-pointer shrink-0 ${
                          item.isAvailable
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-800'
                            : 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-800'
                        }`}
                        title={item.isAvailable ? 'Click to 86 (mark Sold Out)' : 'Click to Restock'}
                      >
                        {item.isAvailable ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{item.isAvailable ? 'Active' : '86’d'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400">Price:</span>
                      {editingItemId === item.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.5"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-16 px-1.5 py-1 rounded bg-stone-950 border border-amber-400 text-white text-xs"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(item.id)}
                            className="p-1 rounded bg-amber-500 text-stone-950"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setTempPrice(item.price.toString());
                          }}
                          className="font-mono text-base font-bold text-amber-400 hover:underline flex items-center gap-1"
                          title="Click to edit price"
                        >
                          ${item.price.toFixed(2)}
                          <Edit3 className="w-3 h-3 text-stone-500" />
                        </button>
                      )}
                    </div>

                    <span className="text-[11px] text-stone-500">
                      {item.dietaryTags[0] || 'Standard'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {contactMessages.length === 0 ? (
              <div className="py-16 text-center bg-stone-900 rounded-2xl border border-stone-800 text-stone-400">
                No guest messages currently logged.
              </div>
            ) : (
              contactMessages.map((msg) => (
                <div key={msg.id} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-800 gap-2">
                    <div>
                      <h4 className="font-display text-base font-bold text-white">{msg.subject}</h4>
                      <span className="text-xs text-amber-400">
                        From: {msg.name} ({msg.email}) {msg.phone ? `• ${msg.phone}` : ''}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">
                      {new Date(msg.createdAt).toLocaleDateString()} at{' '}
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed font-light whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
