import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { PackagesSection } from './components/PackagesSection';
import { DestinationsGallery } from './components/DestinationsGallery';
import { FareCalculator } from './components/FareCalculator';
import { FleetSection } from './components/FleetSection';
import { TirupatiGuide } from './components/TirupatiGuide';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ItineraryModal } from './components/ItineraryModal';
import { BookingModal } from './components/BookingModal';
import { TourPackage, Vehicle, DestinationCard } from './data/travelData';

export default function App() {
  const [selectedItinerary, setSelectedItinerary] = useState<TourPackage | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    serviceType?: string;
    pickupLocation?: string;
    date?: string;
    vehicleType?: string;
    passengers?: number;
    name?: string;
    phone?: string;
    estimatedPrice?: number;
  }>({});

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleQuickBook = (data: {
    serviceType: string;
    pickupLocation: string;
    date: string;
    vehicleType: string;
    passengers: number;
    name: string;
    phone: string;
    estimatedPrice?: number;
  }) => {
    setBookingInitialData(data);
    setIsBookingModalOpen(true);
  };

  const handleSelectPackageForBooking = (pkg: TourPackage) => {
    setBookingInitialData({
      serviceType: pkg.title,
      estimatedPrice: pkg.priceInnova
    });
    setIsBookingModalOpen(true);
  };

  const handleSelectVehicleForBooking = (vehicle: Vehicle) => {
    setBookingInitialData({
      vehicleType: vehicle.name,
      estimatedPrice: vehicle.tirupatiPackageRate
    });
    setIsBookingModalOpen(true);
  };

  const handleSelectDestination = (dest: DestinationCard) => {
    setBookingInitialData({
      serviceType: `Chennai to ${dest.name} Tour`,
      estimatedPrice: dest.startingPrice
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header with Top Strip & Phone Hotlines */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="flex-grow pb-16 lg:pb-0">
        {/* 2. Hero Section: MakeMyTrip-Style Multi-Tab Search Widget */}
        <Hero onQuickBook={handleQuickBook} />

        {/* 3. Proof & Trust Points */}
        <TrustStats />

        {/* 4. Flagship Featured Packages with Photography & Ratings */}
        <PackagesSection 
          onSelectItinerary={(pkg) => setSelectedItinerary(pkg)}
          onBookPackage={handleSelectPackageForBooking}
        />

        {/* 5. Trending Destinations Gallery with Rich Place Photography */}
        <div id="destinations">
          <DestinationsGallery onSelectDestination={handleSelectDestination} />
        </div>

        {/* 6. Sanitized AC Fleet Showcase with Real Car Photos */}
        <FleetSection onSelectVehicle={handleSelectVehicleForBooking} />

        {/* 7. Interactive Fare Calculator Matrix */}
        <FareCalculator />

        {/* 8. Devotee Tirupati Guide (Dress Code, Aadhaar, Mottai, Laddus) */}
        <TirupatiGuide />

        {/* 9. Value Proposition: Why Choose Jack Tours */}
        <WhyChooseUs />

        {/* 10. Pilgrim Testimonials & Social Proof */}
        <Testimonials />

        {/* 11. Frequently Asked Questions */}
        <FaqSection />

        {/* 12. Office Locations & Contact Form */}
        <ContactSection />
      </main>

      {/* 13. Comprehensive Footer */}
      <Footer />

      {/* 14. Mobile Sticky Bottom Action Bar (<15% Viewport Cap) */}
      <MobileStickyBar />

      {/* 15. Floating WhatsApp Chat Widget */}
      <FloatingWhatsApp />

      {/* 16. Modals */}
      <ItineraryModal 
        packageData={selectedItinerary} 
        onClose={() => setSelectedItinerary(null)} 
      />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        initialData={bookingInitialData}
      />
    </div>
  );
}
