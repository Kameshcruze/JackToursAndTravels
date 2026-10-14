import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Plane,
  ShieldCheck, 
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CHENNAI_PICKUP_ZONES, FLEET_VEHICLES, TOUR_PACKAGES, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

const HERO_SLIDES = [
  {
    id: 'banner-h1',
    url: '/Homepage_banner/H1.png',
    heading: 'One Day Chennai to Tirupati Tour',
    tagline: 'Same-day round trip with doorstep pickup, breakfast, lunch & smooth ghat travel',
    badge: 'Best Seller • 1-Day Return',
    packageTitle: 'Chennai to Tirupati 1-Day VIP Package',
    defaultVehicle: 'Toyota Innova Crysta',
    estimatedPrice: 5999
  },
  {
    id: 'banner-h2',
    url: '/Homepage_banner/H2.png',
    heading: 'VIP Tirupati Tour',
    tagline: 'Premium VIP Special Entry Darshan assistance, sanitized luxury cabs & priority coordinator',
    badge: 'Exclusive VIP Darshan',
    packageTitle: 'Chennai to Tirupati 1-Day VIP Package',
    defaultVehicle: 'Toyota Innova Crysta',
    estimatedPrice: 8999
  },
  {
    id: 'banner-h',
    url: '/Homepage_banner/H.png',
    heading: 'Common Temple Tour',
    tagline: 'Customized spiritual temple circuit across South India with door-to-door cab service',
    badge: 'Popular Pilgrimage Circuit',
    packageTitle: 'Kumbakonam Navagraha Circuit (9 Planet Temples)',
    defaultVehicle: 'Toyota Innova Crysta',
    estimatedPrice: 17999
  }
];

interface HeroProps {
  onQuickBook: (data: {
    serviceType: string;
    pickupLocation: string;
    date: string;
    vehicleType: string;
    passengers: number;
    name: string;
    phone: string;
    estimatedPrice?: number;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook }) => {
  const [activeTab, setActiveTab] = useState<'tirupati' | 'outstation' | 'temple' | 'airport'>('tirupati');
  const [pickupLocation, setPickupLocation] = useState(CHENNAI_PICKUP_ZONES[0]);
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [customPickupText, setCustomPickupText] = useState('');
  const [destination, setDestination] = useState('Tirupati Balaji VIP Darshan');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [vehicleType, setVehicleType] = useState('innova-crysta');
  const [passengers, setPassengers] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Preload all banner images for instantaneous auto-switch
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.url;
    });
  }, []);

  useEffect(() => {
    if (isAutoPlayPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlayPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsAutoPlayPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsAutoPlayPaused(false);
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNextSlide(); // Swiped left -> next photo
    } else if (diff < -45) {
      handlePrevSlide(); // Swiped right -> prev photo
    }
    setTouchStartX(null);
  };

  const handleTabChange = (tab: 'tirupati' | 'outstation' | 'temple' | 'airport') => {
    setActiveTab(tab);
    if (tab === 'tirupati') setDestination('Tirupati Balaji VIP Darshan');
    if (tab === 'outstation') setDestination('Mahabalipuram & Pondicherry');
    if (tab === 'temple') setDestination('Kumbakonam 9 Navagraha Temples');
    if (tab === 'airport') setDestination('Chennai Airport Transfer');
  };

  const selectedPkg = TOUR_PACKAGES.find(p => {
    if (activeTab === 'tirupati') return p.id === 'tirupati-1day-vip';
    if (activeTab === 'temple') return p.id === 'navagraha-temple-tour';
    return p.id === 'mahabalipuram-pondicherry';
  }) || TOUR_PACKAGES[0];

  const estimatedPrice = React.useMemo(() => {
    if (activeTab === 'airport') {
      return vehicleType === 'sedan' ? 1200 : vehicleType === 'suv-ertiga' ? 1600 : 2200;
    }
    if (vehicleType === 'sedan') return selectedPkg.priceSedan;
    if (vehicleType === 'suv-ertiga') return selectedPkg.priceSUV;
    if (vehicleType === 'tempo-traveller' || vehicleType === 'urbania') return selectedPkg.priceTempo;
    return selectedPkg.priceInnova;
  }, [selectedPkg, vehicleType, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicleObj = FLEET_VEHICLES.find(v => v.id === vehicleType);
    const vehicleLabel = vehicleObj ? vehicleObj.name : vehicleType;
    const effectivePickup = isCustomPickup && customPickupText.trim()
      ? customPickupText.trim()
      : (pickupLocation === 'Other (Custom Address / Area)' && customPickupText.trim() ? customPickupText.trim() : pickupLocation);

    onQuickBook({
      serviceType: destination,
      pickupLocation: effectivePickup,
      date,
      vehicleType: vehicleLabel,
      passengers,
      name: 'Devotee / Traveler',
      phone: '',
      estimatedPrice
    });
  };

  return (
    <section className="relative">
      
      {/* ----------------- TOP HERO PANORAMA ----------------- */}
      <div 
        className="relative w-full h-[360px] sm:h-auto min-h-[350px] sm:min-h-[340px] sm:aspect-[2.3/1] lg:aspect-[2.5/1] max-h-[580px] flex items-center overflow-hidden bg-transparent"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Background Scenic Photography (3 Rotating Images from Homepage_banner) */}
        <div 
          className="absolute inset-0 z-0 select-none overflow-hidden bg-transparent"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.url}
                  alt={slide.heading}
                  className={`w-full h-full object-cover object-center ${
                    slide.id === 'banner-h1' ? '' : 'brightness-[0.96] contrast-[1.03]'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = '1';
                      target.src = slide.url;
                    }
                  }}
                />

                {/* Dark gradient overlay for other slides; omitted completely for H1 to preserve the original image without any black tint */}
                {slide.id !== 'banner-h1' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/40 sm:bg-radial sm:from-slate-950/45 sm:via-slate-950/65 sm:to-slate-950/85" />
                )}

                {/* Slide Caption Wording and Book Now Button - Middle Alignment */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center pointer-events-none">
                  <div className="pointer-events-auto flex flex-col items-center max-w-2xl mx-auto space-y-2.5 sm:space-y-4">
                    {/* Badge with clean static styling & premium typography (animation removed) */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider border border-amber-300/80 shadow-md font-['Outfit']">
                      <span>{slide.badge}</span>
                    </div>

                    {/* Main Heading with Outfit display font & cool animated glowing text-shadow */}
                    <h2 className="hero-heading-glow text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.15] text-center select-none">
                      {slide.heading}
                    </h2>

                    {/* Refined Descriptive Tagline with subtle ambient shadow */}
                    <p className="font-['Outfit'] sm:font-sans text-xs sm:text-sm md:text-base text-slate-100 max-w-lg font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] text-center line-clamp-2 leading-relaxed">
                      {slide.tagline}
                    </p>

                    {/* Book Now Button with animated ambient glow */}
                    <div className="pt-1.5 sm:pt-2.5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          onQuickBook({
                            serviceType: slide.packageTitle,
                            pickupLocation: CHENNAI_PICKUP_ZONES[0],
                            date,
                            vehicleType: slide.defaultVehicle,
                            passengers: 4,
                            name: 'Devotee / Traveler',
                            phone: '',
                            estimatedPrice: slide.estimatedPrice
                          });
                        }}
                        className="hero-btn-glow inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer group border border-amber-200/50"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous and Next Navigation Buttons */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ----------------- FLOATING SEARCH WIDGET ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 lg:-mt-14 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-200/80 p-5 sm:p-8 lg:p-9 border border-slate-100">
          
          {/* Top Category Tabs */}
          <div className="flex items-center justify-center gap-5 sm:gap-10 pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-slate-100 overflow-x-auto no-scrollbar text-base sm:text-lg lg:text-xl font-bold text-slate-500">
            <button
              type="button"
              onClick={() => handleTabChange('tirupati')}
              className={`flex items-center gap-2.5 pb-2 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'tirupati' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm sm:text-base">🛕</span>
              <span>Tirupati Packages</span>
              {activeTab === 'tirupati' && (
                <span className="absolute -bottom-4 sm:-bottom-5 left-0 right-0 h-1 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('outstation')}
              className={`flex items-center gap-2.5 pb-2 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'outstation' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </div>
              <span>Outstation Cabs</span>
              {activeTab === 'outstation' && (
                <span className="absolute -bottom-4 sm:-bottom-5 left-0 right-0 h-1 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('temple')}
              className={`flex items-center gap-2.5 pb-2 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'temple' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm sm:text-base">🔱</span>
              <span>Temple Circuits</span>
              {activeTab === 'temple' && (
                <span className="absolute -bottom-4 sm:-bottom-5 left-0 right-0 h-1 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('airport')}
              className={`flex items-center gap-2.5 pb-2 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'airport' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
              </div>
              <span>Airport Drops</span>
              {activeTab === 'airport' && (
                <span className="absolute -bottom-4 sm:-bottom-5 left-0 right-0 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>

          {/* 4 Multi-segment search fields + Blue Search button */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
            
            {/* 1. From (Doorstep Pickup) */}
            <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 sm:p-4.5 rounded-2xl border border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  From (Pickup)
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomPickup(!isCustomPickup)}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  {isCustomPickup ? "Preset List" : "Type Address"}
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                {isCustomPickup ? (
                  <input
                    type="text"
                    value={customPickupText}
                    onChange={(e) => setCustomPickupText(e.target.value)}
                    placeholder="Enter pickup address/area"
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 focus:outline-none truncate placeholder:font-normal"
                    autoFocus
                  />
                ) : (
                  <select
                    value={pickupLocation}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPickupLocation(val);
                      if (val === 'Other (Custom Address / Area)') {
                        setIsCustomPickup(true);
                        setCustomPickupText('');
                      }
                    }}
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 focus:outline-none cursor-pointer truncate"
                  >
                    {CHENNAI_PICKUP_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                    <option value="Other (Custom Address / Area)">📍 Type Custom Street Address</option>
                  </select>
                )}
              </div>
            </div>

            {/* 2. To */}
            <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 sm:p-4.5 rounded-2xl border border-slate-200 transition-colors">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                To
              </span>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 focus:outline-none truncate"
                />
              </div>
            </div>

            {/* 3. Depart */}
            <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 sm:p-4.5 rounded-2xl border border-slate-200 transition-colors">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Depart Date
              </span>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-slate-500 shrink-0" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Travelers / Vehicle */}
            <div className="bg-slate-50 hover:bg-slate-100/70 p-3.5 sm:p-4.5 rounded-2xl border border-slate-200 transition-colors">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Travelers & Cab
              </span>
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-slate-500 shrink-0" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={2}>2 Travelers</option>
                  <option value={4}>4 Travelers</option>
                  <option value={6}>6 Travelers</option>
                  <option value={7}>7 Travelers</option>
                  <option value={12}>12 Travelers</option>
                </select>
              </div>
            </div>

            {/* 5. Search Action Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full py-4 sm:py-5 px-5 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all shadow-lg shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Search & Fare Lock</span>
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* ----------------- 4-COLUMN FEATURE STRIP (Below search card) ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-5 sm:mb-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* 1. Best Price Guarantee (Blue) */}
          <div className="flex items-center gap-4 sm:gap-5 bg-white p-4.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <div>
              <div className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">Best Price Guarantee</div>
              <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">We ensure you get the best fixed prices for your travel.</p>
            </div>
          </div>

          {/* 2. Handpicked Experiences (Green) */}
          <div className="flex items-center gap-4 sm:gap-5 bg-white p-4.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <div>
              <div className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">VIP Experiences</div>
              <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">Curated darshan assistance for memories that last a lifetime.</p>
            </div>
          </div>

          {/* 3. 24/7 Support (Amber) */}
          <div className="flex items-center gap-4 sm:gap-5 bg-white p-4.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <div>
              <div className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">24/7 Support</div>
              <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">Our travel coordinators are here for you, anytime.</p>
            </div>
          </div>

          {/* 4. Secure Booking (Purple) */}
          <div className="flex items-center gap-4 sm:gap-5 bg-white p-4.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <div>
              <div className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900">Secure Booking</div>
              <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-1">Book with confidence, zero advance required.</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
