import React from 'react';
import { Shirt, Contact, Ban, Gift, Check, Clock } from 'lucide-react';

export const TirupatiGuide: React.FC = () => {
  const cards = [
    {
      id: 'dress-code',
      icon: Shirt,
      title: "Mandatory TTD Dress Code",
      image: "/images/dhoti-sarree.png",
      rules: [
        {
          prefix: "Men:",
          text: "Dhoti with Angavastram (Uttariyam) or Kurta Pyjama. Strictly NO jeans, lungi, bermudas, or western t-shirts."
        },
        {
          prefix: "Women:",
          text: "Traditional Saree, Half Saree, or Chudidar with Dupatta pinned. Strictly NO leggings or western tops."
        }
      ]
    },
    {
      id: 'id-proof',
      icon: Contact,
      title: "Mandatory Original ID Proof",
      image: "/images/guide-id-proof.svg",
      rules: [
        {
          prefix: "",
          text: "Original Aadhaar Card is compulsory for every person matching the Darshan ticket name."
        },
        {
          prefix: "",
          text: "NRIs / Foreign nationals must carry their Original Passport with valid Indian Visa."
        },
        {
          prefix: "",
          text: "Mobile screenshots or photocopies are strictly NOT accepted at the biometric gate."
        }
      ]
    },
    {
      id: 'forbidden',
      icon: Ban,
      title: "Forbidden Items in Sanctum Line",
      image: "/images/guide-forbidden-items.svg",
      rules: [
        {
          prefix: "",
          text: "Mobile phones, cameras, power banks, and electronic gadgets must be deposited in TTD free lockers."
        },
        {
          prefix: "",
          text: "Leather belts with large metal buckles, outside cooked food, and tobacco/liquor are strictly banned at Alipiri."
        }
      ]
    },
    {
      id: 'laddu',
      icon: Gift,
      title: "Laddu Prasadam & Additional Laddus",
      image: "/images/laddu.png",
      rules: [
        {
          prefix: "",
          text: "2 Free sacred Laddus are provided with every ₹300 Special Entry Darshan ticket token."
        },
        {
          prefix: "",
          text: "Extra laddus can be purchased at TTD Laddu Counters for ₹50 each (subject to daily quota)."
        }
      ]
    }
  ];

  return (
    <section id="guide" className="pt-8 sm:pt-12 pb-10 sm:pb-16 bg-gradient-to-b from-[#f2f8fc] via-white to-[#f0f7fc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Attached Design */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-tight">
            Essential <span className="text-[#0084d1]">Tirupati Balaji</span> Guidelines
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Ensure an auspicious, hassle-free pilgrimage without delays at the Tirumala biometric scanning gates.
          </p>
          <div className="w-14 h-1 bg-[#0084d1] rounded-full mx-auto mt-4" />
        </div>

        {/* 4 Cards in 2x2 Grid with Left Bullets & Right Graphics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2eef6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group"
              >
                <div>
                  {/* Card Title Row with Circular Dark Navy Badge */}
                  <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#0d1b2e] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-black text-slate-900 leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  {/* Two-Column Split: Left Checklist & Right Illustration */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                    
                    {/* Left Rules Column */}
                    <div className="sm:col-span-7 space-y-3.5 sm:space-y-4">
                      {card.rules.map((rule, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5 sm:gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#0084d1] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <div className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
                            {rule.prefix && (
                              <strong className="text-[#0084d1] font-bold mr-1">
                                {rule.prefix}
                              </strong>
                            )}
                            <span>{rule.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Illustration Column */}
                    <div className="sm:col-span-5 flex items-center justify-center">
                      <div className={`w-full ${card.id === 'laddu' ? 'h-48 sm:h-52' : 'h-44 sm:h-48'} rounded-2xl flex items-center justify-center p-2 relative`}>
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ${
                            card.id === 'laddu'
                              ? 'scale-[1.24] sm:scale-[1.28] group-hover:scale-[1.34]'
                              : 'group-hover:scale-105'
                          }`}
                          loading="lazy"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hill Ghat Road Timing Advisory Notice */}
        <div className="mt-8 bg-slate-900 text-white rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-lg border border-slate-800">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            <strong className="text-white">Tirumala Ghat Road Speed Advisory:</strong> To ensure passenger safety, Tirumala Tirupati Devasthanams enforces an electronic timer at Alipiri and Tirumala Toll gates. Vehicles descending down the 1st Ghat road must take at least <strong className="text-amber-400 font-bold">28 minutes</strong> to prevent brake overheating. Our drivers adhere strictly to these safety rules.
          </div>
        </div>

      </div>
    </section>
  );
};
