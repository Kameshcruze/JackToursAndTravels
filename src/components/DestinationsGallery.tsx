import React, { useState } from 'react';
import { Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { DESTINATIONS_EXPLORE, DestinationCard, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface DestinationsGalleryProps {
  onSelectDestination: (dest: DestinationCard) => void;
}

export const DestinationsGallery: React.FC<DestinationsGalleryProps> = ({ onSelectDestination }) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    tirumala: true,
    mahabalipuram: true
  });
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setSubscribed(true);
      const url = createWhatsAppLink(`Hi Jack Tours, I would like to get package deals and updates on ${emailOrPhone}.`);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="destinations" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ----------------- ASYMMETRIC POPULAR DESTINATIONS GRID (Matching image) ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 sm:mb-16">
          
          {/* Left Column: Heading, Wavy doodle, Text, and View All button */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 pt-1 sm:pt-2">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
              Popular Destinations
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explore The South's Most Loved Places
            </h2>

            {/* Blue wavy doodle ~~~ matching the image */}
            <div className="flex items-center gap-1 text-blue-600 py-0.5 sm:py-1">
              <svg className="w-12 h-3" viewBox="0 0 50 10" fill="none">
                <path d="M0 5 Q 6 0, 12 5 T 24 5 T 36 5 T 48 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              From sacred hilltop sanctums to coastal beaches, find your perfect spiritual & weekend getaway with doorstep Chennai pickup.
            </p>

            <div className="pt-1 sm:pt-2">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold transition-all hover:bg-slate-50 group"
              >
                <span>View All Destinations</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">➔</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Vertical Cards matching the Bali, Maldives, Switzerland, Dubai cards */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {DESTINATIONS_EXPLORE.slice(0, 4).map((dest) => {
                const isFav = !!favorites[dest.id];
                const whatsAppMsg = `Hi Jack Tours, I want to book a cab to ${dest.name} (${dest.distance}). Please share rates.`;

                return (
                  <div
                    key={dest.id}
                    onClick={() => onSelectDestination(dest)}
                    className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo with rounded-3xl top and Heart icon */}
                      <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900">
                        <ImageWithFallback
                          src={dest.imageUrl}
                          alt={dest.name}
                          fallbackTitle={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* White circular heart button in top right matching screenshot */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(dest.id, e)}
                          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md ${
                            isFav ? 'bg-white text-red-500' : 'bg-white/90 text-slate-400 hover:text-red-500'
                          }`}
                          aria-label="Save destination"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Card Content: Title & Price matching image */}
                      <div className="p-4 space-y-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          {dest.name}
                        </h3>
                        <div className="text-xs text-slate-500 font-medium">
                          From <span className="font-extrabold text-blue-600 font-mono">₹{dest.startingPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle bottom action */}
                    <div className="px-4 pb-4">
                      <a
                        href={createWhatsAppLink(whatsAppMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-slate-600" />
                        <span>Instant Cab Quote</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination dots matching the screenshot */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              <span className="w-4 h-1.5 rounded-full bg-blue-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>

          </div>

        </div>

        {/* ----------------- BOTTOM PROMOTIONAL BANNER ----------------- */}
        <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-slate-900 text-white p-5 sm:p-10 shadow-xl">
          
          {/* Scenic Background image */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
              alt="Dream Pilgrimage Banner"
              fallbackTitle="Dream Pilgrimage Banner"
              className="w-full h-full object-cover brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let's Make Your <span className="font-handwriting text-2xl sm:text-4xl lg:text-5xl text-blue-400 italic">Dream Trip</span> a Reality!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-lg">
              Get exclusive fixed-fare deals, VIP darshan updates, and travel inspiration straight to your WhatsApp or inbox.
            </p>

            {/* Inline subscription form */}
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter your phone or email"
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <span className="text-xs">✈</span>
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 font-bold">
                ✓ Thank you! We've registered your interest for VIP package alerts.
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
