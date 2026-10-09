import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppLink } from '../data/travelData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsAppUrl = createWhatsAppLink("Hi Jack Tours & Travels, I'm on your website and want to ask about Chennai to Tirupati packages.");

  return (
    <div className="hidden sm:flex fixed bottom-8 right-6 z-40 items-end flex-col gap-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 max-w-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Quick Tirupati fare or advice? Chat with us!</span>
          <button 
            onClick={() => setShowTooltip(false)} 
            className="text-slate-400 hover:text-white ml-1 p-0.5 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 ring-4 ring-emerald-500/20"
        aria-label="Chat with Jack Tours on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
