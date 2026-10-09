import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_PRIMARY_RAW, createWhatsAppLink } from '../data/travelData';

export const MobileStickyBar: React.FC = () => {
  const whatsAppUrl = createWhatsAppLink("Hi Jack Tours & Travels, I want to book a Chennai to Tirupati Cab / Tour Package.");

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="flex items-center gap-2.5 max-w-md mx-auto h-11">
        
        {/* Direct Call Button */}
        <a
          href={`tel:+${PHONE_PRIMARY_RAW}`}
          className="flex-1 h-full bg-slate-900 active:bg-slate-800 text-white rounded-full flex items-center justify-center gap-2 text-xs font-bold transition-colors shadow-sm"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>Call Desk</span>
        </a>

        {/* Instant WhatsApp Booking Button */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-full bg-[#25D366] active:bg-[#20ba59] text-white rounded-full flex items-center justify-center gap-2 text-xs font-bold transition-transform active:scale-95 shadow-md shadow-emerald-500/25"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Book</span>
        </a>

      </div>
    </div>
  );
};
