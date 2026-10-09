import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MapPin, 
  Navigation, 
  Car, 
  Calendar,
  MessageCircle, 
  Info,
  ArrowRight
} from 'lucide-react';
import { CHENNAI_PICKUP_ZONES, FLEET_VEHICLES, createWhatsAppLink } from '../data/travelData';

interface DestinationOption {
  id: string;
  name: string;
  distanceKm: number;
  durationHours: string;
  description: string;
  tollPermitEstimate: number;
  baseMultiplier: number;
}

const DESTINATIONS: DestinationOption[] = [
  {
    id: "tirupati-1day",
    name: "Tirupati 1-Day VIP Package (Balaji + Padmavathi)",
    distanceKm: 320,
    durationHours: "16 Hours Same-Day",
    description: "Doorstep Chennai pickup, Tirumala ghat ascent, darshan assistance, Padmavathi temple, dinner return.",
    tollPermitEstimate: 950,
    baseMultiplier: 1.0
  },
  {
    id: "tirupati-kalahasti-2day",
    name: "Tirupati & Srikalahasti (2 Days / 1 Night)",
    distanceKm: 420,
    durationHours: "2 Days / 1 Night",
    description: "Lord Balaji Darshan, night stay in Tirupati, Rahu Ketu Pooja at Srikalahasteeswara.",
    tollPermitEstimate: 1450,
    baseMultiplier: 1.75
  },
  {
    id: "mahabalipuram-pondy",
    name: "Mahabalipuram & Pondicherry Weekend",
    distanceKm: 340,
    durationHours: "2 Days / 1 Night",
    description: "Scenic ECR coast drive, Shore Temple, French White Town, Auroville and beaches.",
    tollPermitEstimate: 450,
    baseMultiplier: 1.2
  },
  {
    id: "kanchipuram-vellore",
    name: "Kanchipuram Temples & Sripuram Golden Temple",
    distanceKm: 310,
    durationHours: "1 Day (14 Hours)",
    description: "Kamakshi Amman, Varadharaja Perumal, silk saree weaving, 1.5-ton Gold temple at Vellore.",
    tollPermitEstimate: 550,
    baseMultiplier: 0.85
  },
  {
    id: "tiruvannamalai",
    name: "Tiruvannamalai Arunachaleswarar & Girivalam",
    distanceKm: 390,
    durationHours: "1 Day / Pournami",
    description: "Arunachaleswarar Agni Lingam darshan, Ramana Maharshi Ashram, 14 km holy hill path.",
    tollPermitEstimate: 600,
    baseMultiplier: 0.95
  },
  {
    id: "kumbakonam-navagraha",
    name: "Kumbakonam 9 Navagraha Planet Temples",
    distanceKm: 700,
    durationHours: "3 Days / 2 Nights",
    description: "Sacred astrological circuit covering all 9 celestial planet temples & Thanjavur Big Temple.",
    tollPermitEstimate: 1600,
    baseMultiplier: 2.9
  },
  {
    id: "bangalore-oneway",
    name: "Chennai to Bangalore Drop (One Way)",
    distanceKm: 345,
    durationHours: "6 Hours Direct",
    description: "Express highway drop right at your home, hotel, or Kempegowda Airport (BLR).",
    tollPermitEstimate: 850,
    baseMultiplier: 1.15
  }
];

export const FareCalculator: React.FC = () => {
  const [pickup, setPickup] = useState(CHENNAI_PICKUP_ZONES[0]);
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [customPickupText, setCustomPickupText] = useState('');
  
  const [destinationId, setDestinationId] = useState(DESTINATIONS[0].id);
  const [isCustomDest, setIsCustomDest] = useState(false);
  const [customDestText, setCustomDestText] = useState('');

  const [vehicleId, setVehicleId] = useState('innova-crysta');
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(4);

  const selectedDest = useMemo(() => 
    DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0],
    [destinationId]
  );

  const selectedVehicle = useMemo(() => 
    FLEET_VEHICLES.find(v => v.id === vehicleId) || FLEET_VEHICLES[2],
    [vehicleId]
  );

  const effectivePickup = isCustomPickup && customPickupText.trim()
    ? customPickupText.trim()
    : pickup;

  const effectiveDestName = isCustomDest && customDestText.trim()
    ? customDestText.trim()
    : selectedDest.name;

  const calculation = useMemo(() => {
    let baseTariff = 0;
    
    if (selectedDest.id === 'tirupati-1day') {
      baseTariff = selectedVehicle.tirupatiPackageRate;
    } else {
      const kmCost = selectedDest.distanceKm * selectedVehicle.baseRatePerKm;
      baseTariff = Math.round((kmCost + selectedDest.tollPermitEstimate + 600) / 100) * 100;
    }

    const driverBeta = selectedDest.durationHours.includes('3 Days') ? 1500 : selectedDest.durationHours.includes('2 Days') ? 1000 : 500;
    const tollAndPermits = selectedDest.tollPermitEstimate;
    const vehicleFuelShare = Math.max(1000, baseTariff - driverBeta - tollAndPermits);

    return {
      total: baseTariff,
      vehicleFuelShare,
      tollAndPermits,
      driverBeta
    };
  }, [selectedDest, selectedVehicle]);

  const whatsAppBookingMsg = `Hi Jack Tours & Travels,
I used your online Fare Estimator:
*Pickup Location:* ${effectivePickup}
*Destination / Route:* ${effectiveDestName}
*Vehicle:* ${selectedVehicle.name}
*Travel Date:* ${travelDate}
*Passengers:* ${passengers}
*Estimated Fare:* ₹${calculation.total.toLocaleString('en-IN')} (All-inclusive reference tariff)

Please confirm exact fare and cab allotment for this route.`;

  return (
    <section id="calculator" className="py-12 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Instant Trip Cost & Fare Estimator
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal">
            Select your starting locality in Chennai, destination, and vehicle to get an immediate, transparent quote.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-4 sm:p-8 space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span>Configure Your Route</span>
            </h3>

            {/* 1. Chennai Pickup Zone */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Pickup Locality (Doorstep)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomPickup(!isCustomPickup)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  {isCustomPickup ? "Select preset area" : "Type custom address"}
                </button>
              </div>

              {isCustomPickup ? (
                <input
                  type="text"
                  placeholder="e.g. 24th Cross Street, Indira Nagar, Adyar"
                  value={customPickupText}
                  onChange={(e) => setCustomPickupText(e.target.value)}
                  className="w-full bg-slate-50 border border-blue-400 focus:border-blue-600 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoFocus
                />
              ) : (
                <select
                  value={pickup}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other (Custom Address / Area)') {
                      setIsCustomPickup(true);
                      setCustomPickupText('');
                    } else {
                      setPickup(val);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                >
                  {CHENNAI_PICKUP_ZONES.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                  <option value="Other (Custom Address / Area)">📍 Type Custom Street Address</option>
                </select>
              )}
            </div>

            {/* 2. Destination Route */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>Destination Route</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomDest(!isCustomDest)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  {isCustomDest ? "Choose fixed package" : "Type custom route"}
                </button>
              </div>

              {isCustomDest ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="e.g. Chennai to Madurai Meenakshi Amman Temple / Mysore / Custom"
                    value={customDestText}
                    onChange={(e) => setCustomDestText(e.target.value)}
                    className="w-full bg-slate-50 border border-blue-400 focus:border-blue-600 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Calculated with transparent per-km baseline; final quote confirmed on WhatsApp.
                  </p>
                </div>
              ) : (
                <>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  >
                    {DESTINATIONS.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name} ({dest.durationHours})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDest.description}
                  </p>
                </>
              )}
            </div>

            {/* 3. Vehicle Category Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Vehicle Fleet Model</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FLEET_VEHICLES.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setVehicleId(v.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      vehicleId === v.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{v.name.split('/')[0]}</div>
                    <div className={`text-[11px] ${vehicleId === v.id ? 'text-blue-100' : 'text-slate-500'}`}>
                      {v.capacity.split(' ')[0]} Seats
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Travel Date & Passenger Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Passengers Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

          </div>

          {/* Fare Summary Column in Clean Royal Navy */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 sm:mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Fare Summary Breakdown
                </span>
                <span className="text-[11px] bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                  All-Inclusive
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Selected Route:</span>
                  <span className="font-bold text-white text-right truncate">
                    {selectedDest.name.split('(')[0]}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Distance & Timing:</span>
                  <span className="font-semibold text-white text-right">
                    {selectedDest.distanceKm} km · {selectedDest.durationHours}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Vehicle Model:</span>
                  <span className="font-semibold text-white text-right">{selectedVehicle.name}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Doorstep Pickup:</span>
                  <span className="font-semibold text-emerald-400 text-right">Included (Free)</span>
                </div>

                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Tolls & Permits:</span>
                  <span className="font-semibold text-emerald-400 text-right">Included in Quote</span>
                </div>

                <div className="flex justify-between items-center text-slate-300 gap-2">
                  <span className="shrink-0">Driver Bata (Beta):</span>
                  <span className="font-semibold text-emerald-400 text-right">Included in Quote</span>
                </div>
              </div>

              {/* Total Fare Box */}
              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800 bg-white/5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Estimated Package Price</div>
                    <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums">
                      ₹{calculation.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block">Locked Tariff</span>
                    <span className="text-xs text-emerald-400 font-bold">Zero Hidden Fees</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 leading-snug">
                  <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Includes AC car, driver allowance, tolls, and inter-state road taxes.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 sm:mt-6 space-y-2">
              <a
                href={createWhatsAppLink(whatsAppBookingMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 sm:px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This Fare on WhatsApp</span>
              </a>

              <p className="text-[10px] sm:text-[11px] text-center text-slate-400">
                ⚡ Instant cab allotment within 15 minutes of WhatsApp confirmation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
