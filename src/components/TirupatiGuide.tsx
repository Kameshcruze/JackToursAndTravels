import React from 'react';
import { Shirt, FileCheck, Ban, Gift, Clock } from 'lucide-react';

export const TirupatiGuide: React.FC = () => {
  const guidelines = [
    {
      icon: Shirt,
      title: "Mandatory TTD Dress Code",
      rules: [
        "Men: Dhoti with Angavastram (Uttariyam) or Kurta Pyjama. Strictly NO jeans, lungi, bermudas, or western t-shirts.",
        "Women: Traditional Saree, Half Saree, or Chudidar with Dupatta pinned. Strictly NO leggings or western tops."
      ]
    },
    {
      icon: FileCheck,
      title: "Mandatory Original ID Proof",
      rules: [
        "Original Aadhaar Card is compulsory for every person matching the Darshan ticket name.",
        "NRIs / Foreign nationals must carry their Original Passport with valid Indian Visa.",
        "Mobile screenshots or photocopies are strictly NOT accepted at the biometric gate."
      ]
    },
    {
      icon: Ban,
      title: "Forbidden Items in Sanctum Line",
      rules: [
        "Mobile phones, cameras, power banks, and electronic gadgets must be deposited in TTD free lockers.",
        "Leather belts with large metal buckles, outside cooked food, and tobacco/liquor are strictly banned at Alipiri."
      ]
    },
    {
      icon: Gift,
      title: "Laddu Prasadam & Additional Laddus",
      rules: [
        "2 Free sacred Laddus are provided with every ₹300 Special Entry Darshan ticket token.",
        "Extra laddus can be purchased at TTD Laddu Counters for ₹50 each (subject to daily quota)."
      ]
    }
  ];

  return (
    <section id="guide" className="pt-6 sm:pt-8 pb-6 sm:pb-8 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Essential Tirupati Balaji Guidelines
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-slate-600 font-medium leading-relaxed">
            Ensure an auspicious, hassle-free pilgrimage without delays at the Tirumala biometric scanning gates.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {guidelines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 sm:gap-3.5 mb-3.5 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mt-3">
                    {item.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="text-sm sm:text-base text-slate-700 flex items-start gap-2.5 leading-relaxed font-normal">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hill Ghat Road Timing Advisory Notice */}
        <div className="mt-6 sm:mt-7 bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-lg">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            <strong className="text-white">Tirumala Ghat Road Speed Advisory:</strong> To ensure passenger safety, Tirumala Tirupati Devasthanams enforces an electronic timer at Alipiri and Tirumala Toll gates. Vehicles descending down the 1st Ghat road must take at least <strong className="text-amber-400 font-bold">28 minutes</strong> to prevent brake overheating. Our drivers adhere strictly to these safety rules.
          </div>
        </div>

      </div>
    </section>
  );
};
