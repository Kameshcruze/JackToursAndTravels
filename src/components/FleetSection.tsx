import React, { useState } from 'react';
import { 
  Users, 
  Luggage, 
  Wind, 
  Fuel, 
  MessageCircle, 
  Shield,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { FLEET_VEHICLES, Vehicle, createWhatsAppLink } from '../data/travelData';
import { ImageWithFallback } from './ImageWithFallback';

interface FleetSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredVehicles = activeTab === 'all' 
    ? FLEET_VEHICLES 
    : activeTab === 'cars' 
      ? FLEET_VEHICLES.filter(v => v.id === 'sedan' || v.id === 'suv-ertiga' || v.id === 'innova-crysta')
      : FLEET_VEHICLES.filter(v => v.id === 'tempo-traveller' || v.id === 'urbania');

  return (
    <section id="fleet" className="py-12 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Sanitized AC Cab Fleet & Tariffs
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600">
            Clean, smoke-free, sanitized vehicles with experienced professional drivers for smooth Tirupati ghat roads and long-distance outstation travel.
          </p>
        </div>

        {/* Fleet Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
          <div className="flex p-1 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-5 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'all' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Fleet ({FLEET_VEHICLES.length})
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`px-3.5 sm:px-5 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'cars' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cars (4 - 7 Seats)
            </button>
            <button
              onClick={() => setActiveTab('vans')}
              className={`px-3.5 sm:px-5 py-2 text-xs font-bold rounded-lg sm:rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'vans' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tempo & Vans (12 - 18 Seats)
            </button>
          </div>
        </div>

        {/* Vehicles Grid with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => {
            const isHighlight = vehicle.id === 'innova-crysta';
            const quoteMsg = `Hi Jack Tours,
I want to check availability for ${vehicle.name} (${vehicle.capacity}).
Please provide tariff details for our Chennai trip.`;

            return (
              <div
                key={vehicle.id}
                className={`group bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                  isHighlight 
                    ? 'border-amber-400 ring-2 ring-amber-400/20' 
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Real Vehicle Photography */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <ImageWithFallback
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      fallbackTitle={vehicle.name}
                      type="car"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                        {vehicle.category}
                      </span>
                    </div>

                    {isHighlight && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow">
                          Most Booked MPV
                        </span>
                      </div>
                    )}

                    {/* Vehicle Title Overlaid */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-black text-white leading-tight drop-shadow">
                        {vehicle.name}
                      </h3>
                      <div className="text-xs text-amber-300 font-semibold mt-0.5">
                        {vehicle.capacity}
                      </div>
                    </div>
                  </div>

                  {/* Specs & Rates */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {/* MakeMyTrip Rate Card */}
                    <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 block uppercase font-bold">
                          Tirupati 1-Day Package
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tabular-nums">
                          ₹{vehicle.tirupatiPackageRate.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold block">
                          Tolls & Driver Beta Incl.
                        </span>
                      </div>

                      <div className="text-right border-l border-slate-200 pl-3 sm:pl-4">
                        <span className="text-[10px] sm:text-[11px] text-slate-500 block uppercase font-bold">
                          Outstation Rate
                        </span>
                        <span className="text-base sm:text-lg font-bold text-slate-800 font-mono tabular-nums">
                          ₹{vehicle.baseRatePerKm}/km
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Min 250 km/day
                        </span>
                      </div>
                    </div>

                    {/* Vehicle Spec Badges */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 shrink-0" />
                        <span><strong>{vehicle.capacity.split(' ')[0]}</strong> Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Luggage className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 shrink-0" />
                        <span className="truncate">{vehicle.luggage.split('+')[0]} Luggage</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 shrink-0" />
                        <span>Chilled AC</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Fuel className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900 shrink-0" />
                        <span>{vehicle.fuelType.split('/')[0]}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {vehicle.features.slice(0, 4).map((feat, fIdx) => (
                          <span 
                            key={fIdx}
                            className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500 italic">
                      <strong>Ideal for:</strong> {vehicle.idealFor}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-6 pt-0">
                  <a
                    href={createWhatsAppLink(quoteMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 sm:py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl sm:rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Booking</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Fleet Maintenance Assurance Note */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-white leading-snug">
                Tirumala Hill Permit Certified Drivers
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Our drivers hold certified hill-driving licenses for the steep Alipiri to Tirumala ghat roads. Every vehicle is speed-governed and inspected for highway safety.
              </p>
            </div>
          </div>

          <a
            href="tel:+919585262522"
            className="w-full md:w-auto shrink-0 px-6 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl sm:rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call Booking Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
};
