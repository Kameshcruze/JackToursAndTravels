import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA, createWhatsAppLink } from '../data/travelData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<'all' | 'tirupati' | 'booking' | 'fleet'>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const askCustomQuestion = () => {
    const url = createWhatsAppLink("Hi Jack Tours, I have a specific question about Tirupati Darshan / Cab booking from Chennai.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faqs" className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 font-normal">
            Everything you need to know about Tirupati VIP Darshan, cab tariffs, and travel timings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 mb-8 sm:mb-10 overflow-x-auto no-scrollbar p-1 bg-slate-100 rounded-xl sm:rounded-full max-w-xl mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-full transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('tirupati')}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-full transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === 'tirupati' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tirupati VIP
          </button>
          <button
            onClick={() => setActiveCategory('booking')}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-full transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === 'booking' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fares & Inclusions
          </button>
          <button
            onClick={() => setActiveCategory('fleet')}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-lg sm:rounded-full transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === 'fleet' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cabs & Drivers
          </button>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-base font-extrabold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-8 sm:mt-12 bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center space-y-3 sm:space-y-4 shadow-xl">
          <h4 className="text-base sm:text-lg font-black text-white">
            Have a custom itinerary in mind?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Our Chennai travel managers are on call 24/7 on WhatsApp to explain darshan slots, tonsure rules, and vehicle choices.
          </p>
          <button
            onClick={askCustomQuestion}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-xs font-bold transition-transform active:scale-95 shadow-md shadow-emerald-500/25"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
