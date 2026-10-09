import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Calendar,
  Eye,
  ShieldCheck,
  Award,
  Star,
  Sparkles
} from 'lucide-react';
import { TOUR_PACKAGES, TourPackage, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface PackagesSectionProps {
  onSelectItinerary: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ 
  onSelectItinerary, 
  onBookPackage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tirupati' | 'temple' | 'weekend'>('all');
  const [selectedVehicleTab, setSelectedVehicleTab] = useState<'sedan' | 'suv' | 'innova' | 'tempo'>('innova');

  const filteredPackages = selectedCategory === 'all' 
    ? TOUR_PACKAGES 
    : TOUR_PACKAGES.filter(p => p.category === selectedCategory);

  const getPrice = (pkg: TourPackage) => {
    switch (selectedVehicleTab) {
      case 'sedan': return pkg.priceSedan;
      case 'suv': return pkg.priceSUV;
      case 'tempo': return pkg.priceTempo;
      case 'innova':
      default: return pkg.priceInnova;
    }
  };

  const getVehicleLabel = () => {
    switch (selectedVehicleTab) {
      case 'sedan': return 'Swift Dzire / Etios';
      case 'suv': return 'Maruti Ertiga / Carens';
      case 'tempo': return 'Force Tempo Traveller (14S)';
      case 'innova': return 'Toyota Innova Crysta';
    }
  };

  return (
    <section id="packages" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Handcrafted Tours
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Popular Tour Packages & VIP Darshan
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500 font-normal">
            Doorstep pickup, verified AC cabs, ₹300 VIP Special Entry ticket coordination, and all highway tolls included.
          </p>
        </div>

        {/* Filter Controls Bar: Category Tabs + Vehicle Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 bg-slate-50 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm mb-8 sm:mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto p-1 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Packages ({TOUR_PACKAGES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('tirupati')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'tirupati'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛕 Tirupati VIP Darshan
            </button>
            <button
              onClick={() => setSelectedCategory('temple')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'temple'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔱 Temple Circuits
            </button>
            <button
              onClick={() => setSelectedCategory('weekend')}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'weekend'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏖️ Weekend & Heritage
            </button>
          </div>

          {/* Vehicle Tariff Switcher */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto justify-start md:justify-end text-xs p-1 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 px-2 shrink-0 hidden sm:inline">Cab:</span>
            {(['sedan', 'suv', 'innova', 'tempo'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVehicleTab(v)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg sm:rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedVehicleTab === v
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {v === 'sedan' ? 'Dzire Sedan' : v === 'suv' ? 'Ertiga SUV' : v === 'innova' ? 'Innova Crysta' : 'Tempo (14S)'}
              </button>
            ))}
          </div>

        </div>

        {/* Package Cards Grid with Authentic Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => {
            const currentPrice = getPrice(pkg);
            const originalPrice = pkg.originalPrice + (selectedVehicleTab === 'innova' ? 2000 : selectedVehicleTab === 'tempo' ? 4000 : 1000);
            const savings = originalPrice - currentPrice;

            const whatsAppMsg = `Hi Jack Tours & Travels,
I would like to book the "${pkg.title}" with vehicle: ${getVehicleLabel()} for ₹${currentPrice.toLocaleString('en-IN')}.
Please confirm cab availability and darshan slot.`;

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      fallbackTitle={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {pkg.popular && (
                        <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>Bestseller</span>
                        </span>
                      )}
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                        Doorstep Chennai Pickup
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Instant Confirmation
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-amber-400 text-xs font-extrabold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{pkg.rating}</span>
                          <span className="text-slate-300 font-normal">({pkg.reviewsCount} reviews)</span>
                        </div>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-slate-200 text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{pkg.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {pkg.tagline}
                    </p>

                    {/* Sightseeing Highlights */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center justify-between">
                        <span>Tour Highlights & Inclusions</span>
                        <button
                          onClick={() => onSelectItinerary(pkg)}
                          className="text-xs font-bold text-blue-900 hover:text-blue-700 underline underline-offset-2 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Timeline</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.highlightPoints.slice(0, 4).map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Included vs Excluded Strip */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="font-bold text-emerald-800 block mb-1">✓ Included in Tariff:</span>
                        <ul className="text-slate-600 space-y-0.5">
                          {pkg.inclusions.slice(0, 2).map((inc, i) => (
                            <li key={i} className="truncate">· {inc}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block mb-1">✕ Not Included:</span>
                        <ul className="text-slate-500 space-y-0.5">
                          {pkg.exclusions.slice(0, 2).map((exc, i) => (
                            <li key={i} className="truncate">· {exc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-2">
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Price Block */}
                    <div>
                      <div className="text-[11px] text-slate-500 font-semibold">
                        All-Inclusive for {getVehicleLabel()}
                      </div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          SAVE ₹{savings.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Zero toll or driver beta surprise
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onSelectItinerary(pkg)}
                        className="w-full sm:w-auto px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Itinerary</span>
                      </button>

                      <a
                        href={createWhatsAppLink(whatsAppMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book WhatsApp</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner beneath packages */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-white leading-snug">
                Jack Tours Assured Guarantee · Trusted by 12,500+ Devotees
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Tolls, Interstate Andhra Road Tax Permits, Tirumala Ghat parking, and Driver allowances (Bata) are 100% locked in advance. No awkward demands from the driver on your sacred pilgrimage.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookPackage(TOUR_PACKAGES[0])}
            className="w-full md:w-auto shrink-0 px-6 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl sm:rounded-2xl shadow-lg transition-transform active:scale-95 text-center"
          >
            Customize Family Tour
          </button>
        </div>

      </div>
    </section>
  );
};
