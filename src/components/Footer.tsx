import React from 'react';
import { Phone, MapPin, ShieldCheck, Navigation } from 'lucide-react';
import { 
  PHONE_PRIMARY, 
  PHONE_SECONDARY, 
  PHONE_PRIMARY_RAW, 
  OFFICE_ADDRESS, 
  POPULAR_ROUTES 
} from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b132b] text-slate-400 text-xs pt-12 sm:pt-16 pb-24 sm:pb-20 lg:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Navigation className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Jack<span className="text-blue-400">Tours</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs">
              Chennai's premier travel and pilgrimage cab agency. Providing safe doorstep pickups, VIP Tirupati Darshan assistance, and verified professional drivers.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Government Registered Commercial Fleet</span>
            </div>
          </div>

          {/* Col 2: Popular Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Popular Chennai Routes
            </h4>
            <ul className="space-y-2">
              {POPULAR_ROUTES.slice(0, 5).map((route, idx) => (
                <li key={idx} className="flex justify-between items-center text-slate-400 hover:text-white transition-colors">
                  <span>{route.from} to {route.to}</span>
                  <span className="text-[11px] text-blue-400 font-mono">{route.duration}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Popular South Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Tirupati 1-Day VIP Package
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Kumbakonam Navagraha Circuit
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Innova Crysta & Tempo Fleet
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Trip Cost & Fare Estimator
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
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
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:+${PHONE_PRIMARY_RAW}`} className="hover:text-white">
                  {PHONE_PRIMARY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+919840376210" className="hover:text-white">
                  {PHONE_SECONDARY}
                </a>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                24/7 Dispatch Desk for Airport & Midnight Ghat Pickups
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Jack Tours & Travels. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Pilgrim Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
