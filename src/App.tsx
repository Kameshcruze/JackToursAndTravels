import React, { useState, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { PackagesSection } from './components/PackagesSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TourPackage, Vehicle, DestinationCard } from './data/travelData';

// Code-split below-the-fold sections to drastically reduce initial mobile JS parsing and execution time (TBT)
const DestinationsGallery = React.lazy(() => import('./components/DestinationsGallery').then(m => ({ default: m.DestinationsGallery })));
const FleetSection = React.lazy(() => import('./components/FleetSection').then(m => ({ default: m.FleetSection })));
const FareCalculator = React.lazy(() => import('./components/FareCalculator').then(m => ({ default: m.FareCalculator })));
const TirupatiGuide = React.lazy(() => import('./components/TirupatiGuide').then(m => ({ default: m.TirupatiGuide })));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FaqSection = React.lazy(() => import('./components/FaqSection').then(m => ({ default: m.FaqSection })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

// Code-split heavy modals to minimize initial bundle size and speed up first paint
const ItineraryModal = React.lazy(() => import('./components/ItineraryModal').then(m => ({ default: m.ItineraryModal })));
const BookingModal = React.lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));

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
      <main className="flex-grow">
        {/* 2. Hero Section: MakeMyTrip-Style Multi-Tab Search Widget */}
        <Hero onQuickBook={handleQuickBook} />

        {/* 3. Proof & Trust Points */}
        <TrustStats />

        {/* 4. Flagship Featured Packages with Photography & Ratings */}
        <PackagesSection 
          onSelectItinerary={(pkg) => setSelectedItinerary(pkg)}
          onBookPackage={handleSelectPackageForBooking}
        />

        {/* Below-the-fold sections loaded asynchronously */}
        <Suspense fallback={null}>
          {/* 5. Trending Destinations Gallery with Rich Place Photography */}
          <DestinationsGallery onSelectDestination={handleSelectDestination} />

          {/* 6. Sanitized AC Fleet Showcase with Real Car Photos */}
          <FleetSection onSelectVehicle={handleSelectVehicleForBooking} />

          {/* 7. Interactive Fare Calculator Matrix */}
          <FareCalculator />

          {/* 8. Devotee Tirupati Guide (Dress Code, Aadhaar, Mottai, Laddus) */}
          <TirupatiGuide />

          {/* 9. Value Proposition: Why Choose Shri Vari Travels */}
          <WhyChooseUs />

          {/* 10. Pilgrim Testimonials & Social Proof */}
          <Testimonials />

          {/* 11. Frequently Asked Questions */}
          <FaqSection />

          {/* 12. Office Locations & Contact Form */}
          <ContactSection />
        </Suspense>
      </main>

      {/* 13. Comprehensive Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* 14. Mobile Sticky Bottom Action Bar (<15% Viewport Cap) */}
      <MobileStickyBar />

      {/* 15. Floating WhatsApp Chat Widget */}
      <FloatingWhatsApp />

      {/* 16. Modals (Deferred chunk loading) */}
      <React.Suspense fallback={null}>
        <ItineraryModal 
          packageData={selectedItinerary} 
          onClose={() => setSelectedItinerary(null)} 
        />

        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
          initialData={bookingInitialData}
        />
      </React.Suspense>
    </div>
  );
}
