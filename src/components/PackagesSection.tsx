import React, { useState } from 'react';
import { 
  Check, 
  MessageCircle, 
  Calendar,
  Eye,
  ShieldCheck
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

  const filteredPackages = selectedCategory === 'all' 
    ? TOUR_PACKAGES 
    : TOUR_PACKAGES.filter(p => p.category === selectedCategory);

  return (
    <section id="packages" className="pt-6 sm:pt-8 pb-6 sm:pb-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-widest block mb-2">
            Handcrafted Tours
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Popular Tour Packages & VIP Darshan
          </h2>
          <p className="mt-2.5 sm:mt-3.5 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Doorstep pickup, verified AC cabs, ₹300 VIP Special Entry ticket coordination, and all highway tolls included.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Packages ({TOUR_PACKAGES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('tirupati')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'tirupati'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛕 Tirupati VIP Darshan
            </button>
            <button
              onClick={() => setSelectedCategory('temple')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'temple'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔱 Temple Circuits
            </button>
            <button
              onClick={() => setSelectedCategory('weekend')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'weekend'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏖️ Weekend & Heritage
            </button>
          </div>
        </div>

        {/* Package Cards Grid with Clean Editorial Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => {
            const whatsAppMsg = `Hi Shri Vari Travels,
I would like to enquire about the "${pkg.title}".
Please confirm cab availability, itinerary schedule, and darshan booking assistance.`;

            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header Container with Increased Height */}
                  <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      fallbackTitle={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-black/20 pointer-events-none" />

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="text-xl sm:text-2xl md:text-[26px] font-black text-white leading-tight drop-shadow-md">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-6 space-y-3.5">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                      {pkg.tagline}
                    </p>

                    {/* Sightseeing Highlights */}
                    <div className="pt-0.5">
                      <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center justify-between">
                        <span>Tour Highlights & Inclusions</span>
                        <button
                          onClick={() => onSelectItinerary(pkg)}
                          className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Full Timeline</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {pkg.highlightPoints.slice(0, 4).map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compact Inclusions Strip */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-slate-600">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>All Tolls &amp; Permits Included</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Ghat Certified Driver</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <span>✕ Excludes Personal Seva / Hotel</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Streamlined Action Buttons (Price Section Removed) */}
                <div className="p-4 sm:p-6 pt-3.5 border-t border-slate-100 bg-slate-50/70">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      onClick={() => onSelectItinerary(pkg)}
                      className="w-full py-3 px-3 rounded-xl border border-slate-300 hover:border-slate-800 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                    >
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span>View Itinerary</span>
                    </button>

                    <a
                      href={createWhatsAppLink(whatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 active:scale-[0.98] whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 text-white fill-white/20 stroke-[2.5]" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner beneath packages */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-white leading-snug">
                Shri Vari Travels Assured Guarantee · Trusted by 12,500+ Devotees
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
