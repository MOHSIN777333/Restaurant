import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeHighlights } from './components/HomeHighlights';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationSection } from './components/ReservationSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { SeoStructuredData } from './components/SeoStructuredData';
import { RESTAURANT_INFO } from './data/restaurantData';
import { StorageService } from './services/storageService';
import { MenuItem, Reservation, ContactMessage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Load persistent state on mount
  useEffect(() => {
    setMenuItems(StorageService.getMenuItems());
    setReservations(StorageService.getReservations());
    setContactMessages(StorageService.getContactMessages());
  }, []);

  const handleTabChange = (tab: string) => {
    setIsAdmin(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDishClick = (dish: MenuItem) => {
    setSelectedDish(dish);
  };

  const handleReserveFromDish = () => {
    setSelectedDish(null);
    handleTabChange('reservations');
  };

  const handleReservationCreated = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleInquirySubmitted = () => {
    setContactMessages(StorageService.getContactMessages());
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
      {/* Schema.org JSON-LD Structured Data */}
      <SeoStructuredData />

      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        unreadInquiriesCount={contactMessages.filter((m) => !m.isRead).length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {isAdmin ? (
          <AdminPortal
            reservations={reservations}
            onReservationsUpdated={setReservations}
            menuItems={menuItems}
            onMenuItemsUpdated={setMenuItems}
            contactMessages={contactMessages}
          />
        ) : (
          <>
            {/* 1. HOME VIEW */}
            {activeTab === 'home' && (
              <>
                <Hero
                  info={RESTAURANT_INFO}
                  onViewMenu={() => handleTabChange('menu')}
                  onReserveTable={() => handleTabChange('reservations')}
                />
                <HomeHighlights
                  signatureDishes={menuItems.filter((i) => i.isPopular || i.isAvailable)}
                  onSelectDish={handleDishClick}
                  onGoToMenu={() => handleTabChange('menu')}
                  onGoToReservations={() => handleTabChange('reservations')}
                  onGoToAbout={() => handleTabChange('about')}
                />
              </>
            )}

            {/* 2. MENU VIEW */}
            {activeTab === 'menu' && (
              <MenuSection
                items={menuItems}
                onSelectDish={handleDishClick}
                onReserveTable={() => handleTabChange('reservations')}
              />
            )}

            {/* 3. RESERVATIONS VIEW */}
            {activeTab === 'reservations' && (
              <ReservationSection
                onReservationCreated={handleReservationCreated}
                onGoToMenu={() => handleTabChange('menu')}
              />
            )}

            {/* 4. OUR STORY (ABOUT) VIEW */}
            {activeTab === 'about' && (
              <AboutSection
                info={RESTAURANT_INFO}
                onReserveTable={() => handleTabChange('reservations')}
                onViewMenu={() => handleTabChange('menu')}
              />
            )}

            {/* 5. CONTACT & HOURS VIEW */}
            {activeTab === 'contact' && (
              <ContactSection
                info={RESTAURANT_INFO}
                onInquirySubmitted={handleInquirySubmitted}
              />
            )}
          </>
        )}
      </main>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onReserveTable={handleReserveFromDish}
        />
      )}

      {/* Persistent Footer */}
      <Footer
        info={RESTAURANT_INFO}
        onNavigate={handleTabChange}
        onOpenStaffPortal={() => {
          setIsAdmin(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
