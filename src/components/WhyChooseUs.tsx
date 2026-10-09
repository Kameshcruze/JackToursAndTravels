import React from 'react';
import { MapPin, BadgeDollarSign, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: MapPin,
      title: "Doorstep Pickup Across Chennai",
      badge: "Zero Commute Stress",
      description: "Direct doorstep pickup from Adyar, Anna Nagar, Velachery, OMR, Tambaram, Central Station, or Chennai Airport. No need to haul luggage to crowded bus depots."
    },
    {
      icon: BadgeDollarSign,
      title: "Transparent Fixed Pricing",
      badge: "Zero Hidden Surcharges",
      description: "What we quote is exactly what you pay. Highway tolls on NH-716, Interstate Andhra road tax permit, Tirumala parking, and driver bata are already included."
    },
    {
      icon: ShieldCheck,
      title: "Ghat Road Certified Drivers",
      badge: "100% Safety Record",
      description: "Tirumala's steep hairpin bends require experienced hill maneuvering. Our drivers have 10+ years of mountain highway driving experience and zero-alcohol compliance."
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Darshan Guidance",
      badge: "Pilgrim-First Care",
      description: "We guide you to Kalyana Katta tonsure centers (mottai), locker deposit bays, and escort elderly family members right to the ₹300 Special Entry line."
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full mb-3">
            <span>The Jack Tours Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Chennai Devotees Prefer Us
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 font-normal">
            Pilgrimages to Lord Balaji are sacred family occasions. We deliver the comfort, punctuality, and devotion your journey deserves.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/80 hover:border-blue-600 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2 sm:mb-3">
                    {pillar.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 sm:mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
