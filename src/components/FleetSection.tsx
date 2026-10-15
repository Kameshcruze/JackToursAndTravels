import React, { useState } from 'react';
import { 
  Users, 
  Luggage, 
  Wind, 
  MessageCircle, 
  ShieldCheck, 
  Phone, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';
import { FLEET_VEHICLES, Vehicle, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface FleetSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const VEHICLE_CARD_CONFIG: Record<string, {
  seatLabel: string;
  shortLuggage: string;
  acLabel: string;
  keyPerks: string[];
  recommendation: string;
}> = {
  'sedan': {
    seatLabel: '4 Seats',
    shortLuggage: '2 Trolleys',
    acLabel: 'Chilled AC',
    keyPerks: ['Fastag Enabled', 'Live GPS Tracking', 'Mobile Charger', 'Bottled Water'],
    recommendation: 'Perfect for couples & small families on 1-day Tirupati darshan.'
  },
  'suv-ertiga': {
    seatLabel: '6 Seats',
    shortLuggage: '3 Trolleys',
    acLabel: 'Chilled AC',
    keyPerks: ['Split Fold Seats', 'Extra Legroom', 'Dual Airbags', 'Smooth Hill Ride'],
    recommendation: 'Spacious family SUV with generous boot space & hill stability.'
  },
  'innova-crysta': {
    seatLabel: '7 Seats',
    shortLuggage: '4 Trolleys',
    acLabel: 'Chilled AC',
    keyPerks: ['Captain Recliners', 'Ghat Hill Certified', 'Ultra-Silent Cabin', 'Highway Stability'],
    recommendation: 'Gold standard for senior citizens, NRI pilgrims & luxury comfort.'
  },
  'tempo-traveller': {
    seatLabel: '12-18 Seats',
    shortLuggage: '12+ Luggage',
    acLabel: 'Roof AC',
    keyPerks: ['Pushback Recliners', 'LED TV & Audio', 'Stand-Up Roof', 'Hill Highway Driver'],
    recommendation: 'Spacious group coach for joint family yatras & temple circuits.'
  },
  'urbania': {
    seatLabel: '10-13 Seats',
    shortLuggage: '10+ Luggage',
    acLabel: 'Dual AC',
    keyPerks: ['Aircraft Recliners', 'Monocoque Safety', 'Reading Lights & USB', 'Panoramic Windows'],
    recommendation: 'VIP ultra-modern luxury van for executive comfort & spiritual visits.'
  }
};

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sedan' | 'suv' | 'coach'>('all');
  const [isPaused, setIsPaused] = useState(false);

  // Filter vehicles by category
  const filteredVehicles = FLEET_VEHICLES.filter(v => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sedan') return v.id === 'sedan';
    if (activeCategory === 'suv') return v.id === 'suv-ertiga' || v.id === 'innova-crysta';
    if (activeCategory === 'coach') return v.id === 'tempo-traveller' || v.id === 'urbania';
    return true;
  });

  // Create repeated list to guarantee seamless infinite looping without gaps
  const repeatCount = filteredVehicles.length <= 2 ? 6 : 4;
  const repeatedVehicles = Array.from({ length: repeatCount }).flatMap(() => filteredVehicles);

  return (
    <section 
      id="fleet" 
      className="pt-6 sm:pt-8 pb-6 sm:pb-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Ambient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-100/30 via-sky-100/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Cab Fleet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Clean, comfortable, sanitized AC vehicles with certified drivers for your spiritual journeys and outstation travel.
          </p>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center justify-center gap-2.5 mt-6 flex-wrap">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'sedan', label: 'Sedan (4 Seater)' },
              { id: 'suv', label: 'SUV & MPV (6-7 Seater)' },
              { id: 'coach', label: 'Tempo & Van (10-18 Seater)' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 active:scale-95 ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Infinite Scroll Marquee Carousel */}
      <div 
        className="relative w-full overflow-hidden py-3 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerCancel={() => setIsPaused(false)}
      >
        {/* Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

        {/* Scrollable Container */}
        <div className="overflow-x-auto no-scrollbar scroll-smooth">
          <div 
            className="animate-infinite-scroll-rtl flex items-stretch gap-5 sm:gap-6 px-4"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: `${Math.max(25, filteredVehicles.length * 7)}s`
            }}
          >
            {repeatedVehicles.map((vehicle, idx) => {
              const config = VEHICLE_CARD_CONFIG[vehicle.id] || {
                seatLabel: `${vehicle.capacity.split(' ')[0]} Seats`,
                shortLuggage: 'Ample Boot',
                acLabel: 'Chilled AC',
                keyPerks: vehicle.features.slice(0, 4),
                recommendation: vehicle.idealFor.slice(0, 75)
              };

              const whatsappMsg = `Hi Shri Vari Travels,
I would like to inquire about booking the ${vehicle.name} (${vehicle.capacity}).
Please confirm availability.`;

              return (
                <div
                  key={`${vehicle.id}-${idx}`}
                  className="w-[290px] sm:w-[340px] md:w-[360px] lg:w-[380px] shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl group"
                >
                  <div className="flex flex-col flex-grow">
                    {/* Vehicle Image Banner */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 shrink-0">
                      <ImageWithFallback
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        fallbackTitle={vehicle.name}
                        type="car"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30 pointer-events-none" />

                      {/* Overlaid Name & Capacity */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow truncate">
                          {vehicle.name}
                        </h3>
                        <div className="text-xs text-amber-300 font-semibold mt-0.5">
                          {vehicle.capacity}
                        </div>
                      </div>
                    </div>

                    {/* Specs & Features Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3.5">
                      {/* 1. Quick Specs Bar (Never Truncates) */}
                      <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100 pb-3 text-center">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                          <Users className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800 block whitespace-nowrap">
                            {config.seatLabel}
                          </span>
                        </div>

                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                          <Luggage className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800 block whitespace-nowrap">
                            {config.shortLuggage}
                          </span>
                        </div>

                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                          <Wind className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800 block whitespace-nowrap">
                            {config.acLabel}
                          </span>
                        </div>
                      </div>

                      {/* 2. Structured 2x2 Key Features (No Cut-off Words) */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {config.keyPerks.map((perk, pIdx) => (
                          <div 
                            key={pIdx}
                            className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold text-[11px] sm:text-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{perk}</span>
                          </div>
                        ))}
                      </div>

                      {/* 3. Purpose & Devotee Recommendation Bar (Fills Any Gaps Neatly) */}
                      <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/80 flex items-start gap-2">
                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                          Best For
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug">
                          {config.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean Action Buttons matching website brand color */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                    <a
                      href={createWhatsAppLink(whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs sm:text-sm rounded-xl transition-all border border-blue-200 shadow-xs flex items-center justify-center gap-2 group text-center active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="py-3 px-4 sm:px-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1 whitespace-nowrap active:scale-95"
                    >
                      <span>Select</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clean Assurance & Call Booking Desk Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-7">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-white leading-snug">
                Tirumala Ghat-Road Certified Hill Drivers
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Clean, speed-governed, non-smoking AC vehicles with experienced drivers for seamless Tirupati darshan and outstation trips.
              </p>
            </div>
          </div>

          <a
            href="tel:+919585262522"
            className="w-full md:w-auto shrink-0 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call Booking Desk</span>
          </a>
        </div>
      </div>

    </section>
  );
};
