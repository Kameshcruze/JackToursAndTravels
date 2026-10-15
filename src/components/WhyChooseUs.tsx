import React from 'react';
import { 
  MapPin, 
  BadgeDollarSign, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  Award,
  ChevronRight,
  PhoneCall,
  Clock
} from 'lucide-react';
import { 
  PHONE_PRIMARY, 
  PHONE_SECONDARY, 
  PHONE_PRIMARY_RAW, 
  PHONE_SECONDARY_RAW 
} from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: MapPin,
      title: "Doorstep Pickup Across Chennai",
      tag: "Doorstep Pickup",
      image: "/images/Door pickup.jpg",
      description: "Direct pickup and drop right from your home anywhere in Chennai — Anna Nagar, T. Nagar, Adyar, Velachery, OMR, Tambaram or Airport. No hauling heavy luggage to crowded bus depots.",
      features: [
        "All Chennai residential zones covered",
        "Airport & Central / Egmore station pickups",
        "Punctual 4:00 AM / early morning departures"
      ],
      footerTag: "Home Pickup & Drop"
    },
    {
      icon: BadgeDollarSign,
      title: "Transparent Fixed Pricing",
      tag: "Zero Hidden Surcharges",
      image: "/images/fixedprice.png",
      description: "100% all-inclusive pricing with zero hidden charges. Toll gates, Interstate Andhra permit taxes, parking fees, and driver allowances are completely included in your quote.",
      features: [
        "NH-716 Tolls & AP state tax included",
        "Driver food & night bata covered",
        "Zero surge pricing or peak-hour fees"
      ],
      footerTag: "100% All-Inclusive"
    },
    {
      icon: ShieldCheck,
      title: "Ghat Road Certified Drivers",
      tag: "Ghat Hill Safety",
      image: "/images/ghatroad.jpg",
      description: "Expert drivers with 10+ years of mountain highway experience navigating the steep Tirumala Ghat hairpin curves safely, with strict zero-alcohol tolerance and speed limit adherence.",
      features: [
        "10+ Years Tirumala Ghat experience",
        "Strict zero-alcohol compliance",
        "Strict adherence to 28-min ghat descent"
      ],
      footerTag: "Ghat Road Safety"
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Darshan Guidance",
      tag: "Devotee Care",
      image: "/images/guidance.jpg",
      description: "End-to-end devotee guidance for ₹300 Special Entry Darshan tokens, tonsure (mottai) Kalyana Katta procedures, free locker luggage storage, and personalized care for elderly family members.",
      features: [
        "TTD ₹300 Special Entry guidance",
        "Tonsure (Mottai) & locker assistance",
        "Senior citizen & child priority care"
      ],
      footerTag: "Complete Devotee Care"
    }
  ];

  return (
    <section id="why-us" className="relative pt-8 sm:pt-12 pb-10 sm:pb-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
      
      {/* Faint Temple Gopuram Outline Watermark in Background */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 opacity-[0.035] pointer-events-none bg-no-repeat bg-contain bg-right-top"
        style={{ backgroundImage: "url('/Homepage_banner/H2.png')" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-4 py-1.5 rounded-full mb-3.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Why Chennai Devotees Prefer Us
          </h2>
          <p className="mt-3.5 text-sm sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Pilgrimages to Lord Balaji are sacred family moments. We deliver the utmost comfort, punctuality, and devotion your spiritual journey deserves.
          </p>
        </div>

        {/* 4 Pillars Grid - Cards With Header Images and Wave Transition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2"
              >
                <div>
                  {/* Top Image Container with Visual Overlays and Wave Transition */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fallbackTitle={pillar.title}
                    />

                    {/* Gradient Shadow Overlay for Image Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent pointer-events-none" />

                    {/* Pill Tag pinned on Top-Left of Image */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 font-bold text-[11px] shadow-xs border border-white/60">
                        <Icon className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{pillar.tag}</span>
                      </span>
                    </div>

                    {/* Wave-like Boundary Transition between Image and White Card Body */}
                    <div className="absolute -bottom-0.5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                      <svg 
                        viewBox="0 0 500 40" 
                        preserveAspectRatio="none" 
                        className="w-full h-6 sm:h-8 fill-white"
                      >
                        <path d="M0,20 C150,42 350,0 500,22 L500,40 L0,40 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 pt-4 sm:pt-5">
                    {/* Card Title */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {pillar.title}
                    </h3>

                    {/* Card Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>

                    {/* Verified Features Checklist */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100">
                      <ul className="space-y-2">
                        {pillar.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs font-semibold text-slate-700 flex items-start gap-2 leading-tight">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Bottom / Footer Bar */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold bg-slate-50/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{pillar.footerTag}</span>
                  </span>
                  <span className="text-blue-600 font-extrabold flex items-center group-hover:translate-x-1 transition-transform">
                    <span>Verified</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* 24/7 Dispatch & Instant Call Banner */}
        <div className="mt-10 sm:mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-13 h-13 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-400/20 font-black">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                Planning an Early Morning or Custom Family Darshan?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our 24/7 Chennai dispatch team confirms driver allocation and temple timings within 10 minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            <a 
              href={`tel:${PHONE_PRIMARY_RAW}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>{PHONE_PRIMARY}</span>
            </a>
            <a 
              href={`tel:${PHONE_SECONDARY_RAW}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{PHONE_SECONDARY}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
