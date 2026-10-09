import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Phone, MapPin, Calendar, Car } from 'lucide-react';
import { 
  CHENNAI_PICKUP_ZONES, 
  FLEET_VEHICLES, 
  TOUR_PACKAGES, 
  PHONE_PRIMARY_RAW, 
  createWhatsAppLink 
} from '../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    serviceType?: string;
    pickupLocation?: string;
    date?: string;
    vehicleType?: string;
    passengers?: number;
    name?: string;
    phone?: string;
    estimatedPrice?: number;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  
  // Custom or standard package/route
  const initialIsCustomService = Boolean(
    initialData?.serviceType && 
    !TOUR_PACKAGES.some(p => p.title === initialData.serviceType) &&
    initialData.serviceType !== 'Outstation Custom Route' &&
    initialData.serviceType !== 'Chennai Airport Pickup / Drop'
  );
  const [service, setService] = useState(initialData?.serviceType || 'Chennai to Tirupati 1-Day VIP Package');
  const [customService, setCustomService] = useState(initialIsCustomService ? (initialData?.serviceType || '') : '');
  const [isCustomServiceMode, setIsCustomServiceMode] = useState(initialIsCustomService);

  // Custom or standard pickup locality
  const initialIsCustomPickup = Boolean(
    initialData?.pickupLocation && 
    !CHENNAI_PICKUP_ZONES.includes(initialData.pickupLocation)
  );
  const [pickup, setPickup] = useState(
    initialIsCustomPickup 
      ? 'Other (Custom Address / Area)' 
      : (initialData?.pickupLocation || CHENNAI_PICKUP_ZONES[0])
  );
  const [customPickup, setCustomPickup] = useState(initialIsCustomPickup ? (initialData?.pickupLocation || '') : '');
  const [isCustomPickupMode, setIsCustomPickupMode] = useState(initialIsCustomPickup);

  // Custom Drop Location
  const [dropLocation, setDropLocation] = useState('');

  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(() => initialData?.date || getDefaultDate());
  const [vehicle, setVehicle] = useState(initialData?.vehicleType || 'Toyota Innova Crysta (7+1)');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const effectiveService = isCustomServiceMode 
    ? (customService.trim() || 'Custom Tour / Destination') 
    : (service === 'Outstation Custom Route' && customService.trim() ? customService.trim() : service);

  const effectivePickup = isCustomPickupMode || pickup === 'Other (Custom Address / Area)'
    ? (customPickup.trim() || 'Doorstep Pickup (Specific Address provided in chat)')
    : pickup;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    if ((isCustomPickupMode || pickup === 'Other (Custom Address / Area)') && !customPickup.trim()) {
      setError('Please type your pickup address or locality.');
      return;
    }
    if (isCustomServiceMode && !customService.trim()) {
      setError('Please specify your custom tour package or destination.');
      return;
    }
    setError('');
    setSubmitted(true);

    const msg = `Hi Jack Tours & Travels!
I want to confirm my cab booking:
*Customer:* ${name || 'Pilgrim Devotee / Traveler'}
*Phone:* ${phone}
*Package/Route:* ${effectiveService}
*Pickup Locality:* ${effectivePickup}${dropLocation.trim() ? `\n*Drop/Destination Location:* ${dropLocation.trim()}` : ''}
*Travel Date:* ${date}
*Vehicle Chosen:* ${vehicle}

Please confirm driver allotment and route quotation.`;

    window.open(createWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
              Reservation Desk
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Instant Booking & Fare Lock
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-7 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Booking Request Forwarded!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                We generated your request in WhatsApp. Our travel coordinator is reviewing your pickup schedule for {date}.
              </p>
              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href={`tel:+${PHONE_PRIMARY_RAW}`}
                  className="w-full py-3 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call Booking Desk</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 underline font-semibold mt-1"
                >
                  Close this window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Tour Package / Route with Custom Location Option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tour Package or Custom Destination
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomServiceMode(!isCustomServiceMode);
                      if (!isCustomServiceMode && !customService) {
                        setCustomService('');
                      }
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                  >
                    {isCustomServiceMode ? "Choose fixed package" : "Type custom destination"}
                  </button>
                </div>

                {isCustomServiceMode ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      placeholder="e.g. Chennai to Vellore Golden Temple / Bangalore / Custom Route"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      className="w-full bg-slate-50 border border-blue-400 focus:border-blue-600 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                      autoFocus
                    />
                    <p className="text-[11px] text-slate-500">
                      Type any custom destination, temple circuit, or drop address across South India.
                    </p>
                  </div>
                ) : (
                  <select
                    value={service}
                    onChange={(e) => {
                      if (e.target.value === 'Outstation Custom Route') {
                        setIsCustomServiceMode(true);
                        setCustomService('');
                      } else {
                        setService(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600"
                  >
                    {TOUR_PACKAGES.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="Outstation Custom Route">✨ Other Custom Outstation Route (Type details)</option>
                    <option value="Chennai Airport Pickup / Drop">Chennai Airport Transfer</option>
                  </select>
                )}
              </div>

              {/* Pickup Area with Custom Type-in Support */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Pickup Location</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomPickupMode(!isCustomPickupMode);
                      if (!isCustomPickupMode && !customPickup) {
                        setCustomPickup('');
                      }
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                  >
                    {isCustomPickupMode ? "Select preset area" : "Type custom address"}
                  </button>
                </div>

                {isCustomPickupMode ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      placeholder="e.g. 15th Cross St, Besant Nagar / Hotel Grand Chola / Your House Address"
                      value={customPickup}
                      onChange={(e) => setCustomPickup(e.target.value)}
                      className="w-full bg-slate-50 border border-blue-400 focus:border-blue-600 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <p className="text-[11px] text-slate-500">
                      We offer doorstep pickup across Chennai city, suburbs, airport & railway stations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <select
                      value={pickup}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPickup(val);
                        if (val === 'Other (Custom Address / Area)') {
                          setIsCustomPickupMode(true);
                          setCustomPickup('');
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-medium text-slate-800"
                    >
                      {CHENNAI_PICKUP_ZONES.map((zone) => (
                        <option key={zone} value={zone}>{zone}</option>
                      ))}
                      <option value="Other (Custom Address / Area)">📍 Type Custom Street Address / Specific Locality</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Optional Custom Drop Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Specific Drop Point / Hotel (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tirumala CRO Office / Hotel Bliss Tirupati / ECR Resort"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Travel Date</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-medium text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-blue-600" />
                    <span>Cab Model</span>
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-medium text-slate-800"
                  >
                    {FLEET_VEHICLES.map((v) => (
                      <option key={v.id} value={v.name}>{v.name.split('/')[0]} ({v.capacity.split(' ')[0]}S)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 font-semibold">{error}</div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Confirm on WhatsApp (Instant Response)</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Zero advance required for booking confirmation · Pay driver directly at end of trip
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
