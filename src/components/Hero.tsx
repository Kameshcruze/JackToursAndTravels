import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Plane,
  ShieldCheck, 
  Clock, 
  Sparkles,
  Heart,
  ChevronDown
} from 'lucide-react';
import { CHENNAI_PICKUP_ZONES, FLEET_VEHICLES, TOUR_PACKAGES, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

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
      <div className="relative min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden bg-slate-900">
        
        {/* Background Scenic Photography (Clean, Bright, Mediterranean/Tirumala Hills style) */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop"
            alt="Scenic Travel Panorama"
            fallbackTitle="Your Journey, Our Passion"
            className="w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
          />
          {/* Subtle light gradient overlay so the text pops cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent sm:hidden" />
        </div>

        {/* Hero Content Left Aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24 w-full">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            
            {/* Cursive Handwriting script with flight path dotted curve & paper plane */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-handwriting text-xl sm:text-3xl text-blue-600 font-bold tracking-wide">
                Explore. Dream. Discover.
              </span>
              
              {/* Dotted flight path line with airplane */}
              <div className="flex items-center text-blue-500">
                <svg className="w-12 sm:w-16 h-4 text-blue-500" viewBox="0 0 100 25" fill="none">
                  <path d="M0 20 Q50 0, 100 15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <Plane className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-blue-500 rotate-45 -ml-1 text-blue-600" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[68px] font-black tracking-[-0.03em] text-slate-900 leading-[1.12]">
              Your Journey, <br className="hidden sm:inline" />
              Our <span className="text-blue-600">Passion.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-md">
              Discover sacred temples, amazing heritage, and unforgettable pilgrimage experiences with doorstep Chennai pickup.
            </p>

            {/* CTA Button */}
            <div className="pt-1 sm:pt-2">
              <a
                href="#destinations"
                className="inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-tight shadow-lg shadow-blue-600/25 transition-transform active:scale-95 group"
              >
                <span>Explore Destinations</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                  ➔
                </span>
              </a>
            </div>

            {/* Social Proof Avatars Row */}
            <div className="pt-2 sm:pt-4 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" alt="Traveler" />
                <img className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" alt="Traveler" />
                <img className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" alt="Traveler" />
                <img className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" alt="Traveler" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-900">20K+ Happy Pilgrims</div>
                <div className="text-slate-500 text-[11px]">Trusted by devotees worldwide</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ----------------- FLOATING SEARCH WIDGET ----------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 lg:-mt-20 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 p-4 sm:p-7 border border-slate-100">
          
          {/* Top Category Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-slate-100 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold text-slate-500">
            <button
              type="button"
              onClick={() => handleTabChange('tirupati')}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'tirupati' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs">🛕</span>
              <span>Tirupati Packages</span>
              {activeTab === 'tirupati' && (
                <span className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('outstation')}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'outstation' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4 text-slate-500" />
              <span>Outstation Cabs</span>
              {activeTab === 'outstation' && (
                <span className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('temple')}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'temple' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center text-xs">🔱</span>
              <span>Temple Circuits</span>
              {activeTab === 'temple' && (
                <span className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('airport')}
              className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors whitespace-nowrap shrink-0 relative ${
                activeTab === 'airport' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <Plane className="w-4 h-4 text-slate-500" />
              <span>Airport Drops</span>
              {activeTab === 'airport' && (
                <span className="absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>

          {/* 4 Multi-segment search fields + Blue Search button */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 items-center">
            
            {/* 1. From (Doorstep Pickup) */}
            <div className="bg-slate-50/80 hover:bg-slate-50 p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 transition-colors">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  From (Pickup)
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomPickup(!isCustomPickup)}
                  className="text-[10px] text-blue-600 font-bold hover:underline"
                >
                  {isCustomPickup ? "Preset List" : "Type Address"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                {isCustomPickup ? (
                  <input
                    type="text"
                    value={customPickupText}
                    onChange={(e) => setCustomPickupText(e.target.value)}
                    placeholder="Enter pickup address/area"
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none truncate placeholder:font-normal"
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
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer truncate"
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
            <div className="bg-slate-50/80 hover:bg-slate-50 p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                To
              </span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none truncate"
                />
              </div>
            </div>

            {/* 3. Depart */}
            <div className="bg-slate-50/80 hover:bg-slate-50 p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Depart Date
              </span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Travelers / Vehicle */}
            <div className="bg-slate-50/80 hover:bg-slate-50 p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Travelers & Cab
              </span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
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
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all shadow-md shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Search & Fare Lock</span>
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* ----------------- 4-COLUMN FEATURE STRIP (Below search card) ----------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* 1. Best Price Guarantee (Blue) */}
          <div className="flex items-center gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Best Price Guarantee</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">We ensure you get the best fixed prices for your travel.</p>
            </div>
          </div>

          {/* 2. Handpicked Experiences (Green) */}
          <div className="flex items-center gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">VIP Experiences</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Curated darshan assistance for memories that last a lifetime.</p>
            </div>
          </div>

          {/* 3. 24/7 Support (Amber) */}
          <div className="flex items-center gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">24/7 Support</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Our travel coordinators are here for you, anytime.</p>
            </div>
          </div>

          {/* 4. Secure Booking (Purple) */}
          <div className="flex items-center gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Secure Booking</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Book with confidence, zero advance required.</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
