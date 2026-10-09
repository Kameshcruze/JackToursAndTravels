import React from 'react';
import { X, Clock, Check, AlertCircle, MessageCircle, MapPin } from 'lucide-react';
import { TourPackage, createWhatsAppLink } from '../data/travelData';

interface ItineraryModalProps {
  packageData: TourPackage | null;
  onClose: () => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ packageData, onClose }) => {
  if (!packageData) return null;

  const whatsAppMsg = `Hi Jack Tours & Travels,
I reviewed the detailed itinerary for:
*Package:* ${packageData.title}
*Duration:* ${packageData.duration}
*Starting Price:* ₹${packageData.priceSedan.toLocaleString('en-IN')} (Sedan) / ₹${packageData.priceInnova.toLocaleString('en-IN')} (Innova)

Please share availability and booking details.`;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-[36px] shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-7 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 sm:top-6 right-5 sm:right-6 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 block mb-1.5">
            Hour-by-Hour Pilgrimage Schedule
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-white pr-8">
            {packageData.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{packageData.duration}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Doorstep Pickup Across Chennai</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-7 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto space-y-5 sm:space-y-6">
          
          {/* Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 sm:mb-4">
              Tour Itinerary Timeline
            </h4>
            <div className="space-y-4 border-l-2 border-slate-200 ml-2 pl-4">
              {packageData.itinerary.map((step, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
                  <div className="text-xs font-bold text-slate-500 font-mono">
                    {step.time}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {step.activity}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {step.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 sm:mb-2.5 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Inclusions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {packageData.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 sm:mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <span>Exclusions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                {packageData.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Starting from </span>
            <span className="text-base font-black text-slate-900 font-mono">
              ₹{packageData.priceSedan.toLocaleString('en-IN')}
            </span>
            <span> (Sedan) / </span>
            <span className="text-base font-black text-slate-900 font-mono">
              ₹{packageData.priceInnova.toLocaleString('en-IN')}
            </span>
            <span> (Innova)</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors text-center"
            >
              Close
            </button>

            <a
              href={createWhatsAppLink(whatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Book Package</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
