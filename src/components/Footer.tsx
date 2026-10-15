import React from 'react';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
import { 
  PHONE_PRIMARY, 
  PHONE_SECONDARY, 
  PHONE_PRIMARY_RAW, 
  PHONE_SECONDARY_RAW,
  OFFICE_ADDRESS, 
  POPULAR_ROUTES 
} from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c2a4f] text-slate-200 text-sm pt-6 sm:pt-8 pb-16 sm:pb-8 lg:pb-8 border-t border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Col 1: Brand - Pure Typography Wordmark */}
          <div className="space-y-3">
            <div className="flex flex-col select-none">
              <div className="flex items-center gap-1.5 sm:gap-2 leading-none font-logo">
                <span className="text-xl sm:text-2xl font-normal tracking-[0.06em] text-white">
                  SHRI VARI
                </span>
                <span className="text-xl sm:text-2xl font-normal tracking-[0.06em] text-blue-300">
                  TRAVELS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-logo tracking-[0.18em] uppercase text-amber-400 mt-1.5 leading-none">
                <span>CHENNAI</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-200">TIRUPATI &amp; OUTSTATION CABS</span>
              </div>
            </div>
            
            <p className="text-slate-200 leading-relaxed text-sm">
              Chennai's premier travel and pilgrimage cab agency. Providing safe doorstep pickups, VIP Tirupati Darshan assistance, and verified professional drivers.
            </p>

            <div className="flex items-center gap-2 text-emerald-300 font-medium text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Government Registered Commercial Fleet</span>
            </div>
          </div>

          {/* Col 2: Popular Routes */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
              Popular Chennai Routes
            </h4>
            <ul className="space-y-2">
              {POPULAR_ROUTES.slice(0, 5).map((route, idx) => (
                <li key={idx} className="flex justify-between items-center text-slate-200 hover:text-white transition-colors text-xs sm:text-sm">
                  <span>{route.from} to {route.to}</span>
                  <span className="text-xs text-blue-300 font-mono font-semibold">{route.duration}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#destinations" className="text-slate-200 hover:text-white transition-colors">
                  Popular South Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="text-slate-200 hover:text-white transition-colors">
                  Tirupati 1-Day VIP Package
                </a>
              </li>
              <li>
                <a href="#packages" className="text-slate-200 hover:text-white transition-colors">
                  Kumbakonam Navagraha Circuit
                </a>
              </li>
              <li>
                <a href="#fleet" className="text-slate-200 hover:text-white transition-colors">
                  Innova Crysta & Tempo Fleet
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-slate-200 hover:text-white transition-colors">
                  Trip Cost & Fare Estimator
                </a>
              </li>
              <li>
                <a href="#guide" className="text-slate-200 hover:text-white transition-colors">
                  Tirupati Dress Code & Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Chennai Head Office
            </h4>
            <div className="space-y-2.5 text-slate-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <a href={`tel:+${PHONE_PRIMARY_RAW}`} className="text-slate-200 hover:text-white font-medium transition-colors">
                  {PHONE_PRIMARY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <a href={`tel:+${PHONE_SECONDARY_RAW}`} className="text-slate-200 hover:text-white font-medium transition-colors">
                  {PHONE_SECONDARY}
                </a>
              </div>
              <div className="text-xs text-slate-300 pt-1">
                24/7 Dispatch Desk for Airport & Midnight Ghat Pickups
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-5 sm:pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} Shri Vari Travels. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Pilgrim Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
