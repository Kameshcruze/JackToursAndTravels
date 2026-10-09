import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { 
  PHONE_PRIMARY, 
  PHONE_SECONDARY, 
  PHONE_PRIMARY_RAW, 
  OFFICE_ADDRESS, 
  SECONDARY_OFFICE, 
  CHENNAI_PICKUP_ZONES, 
  createWhatsAppLink 
} from '../data/travelData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: CHENNAI_PICKUP_ZONES[0],
    customPickup: '',
    destination: '',
    date: '',
    passengers: '4',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');
    setFormSubmitted(true);

    const effectivePickup = isCustomPickup && formData.customPickup.trim()
      ? formData.customPickup.trim()
      : formData.pickupLocation;

    const whatsAppMsg = `Hi Jack Tours & Travels,
I am submitting an inquiry via your website:
*Name:* ${formData.name || 'Devotee / Traveler'}
*Phone:* ${formData.phone}
*Pickup Locality:* ${effectivePickup}${formData.destination.trim() ? `\n*Destination / Route:* ${formData.destination.trim()}` : ''}
*Travel Date:* ${formData.date || 'Soon'}
*Passengers:* ${formData.passengers}
${formData.message ? `*Notes:* ${formData.message}` : ''}

Please send quotation and cab availability.`;

    window.open(createWhatsAppLink(whatsAppMsg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full mb-3">
            <span>Direct Chennai Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Book Your Cab or Visit Our Offices
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 font-normal">
            Headquartered in T. Nagar with dedicated airport dispatch counters across Chennai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            
            {/* Primary Office Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 space-y-3.5 sm:space-y-4 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Main Office (T. Nagar)
                  </h3>
                  <div className="text-xs text-slate-400">Central Chennai Booking Headquarters</div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{SECONDARY_OFFICE}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold text-slate-900">
                <a
                  href={`tel:+${PHONE_PRIMARY_RAW}`}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{PHONE_PRIMARY}</span>
                </a>
                <span>·</span>
                <a
                  href="tel:+919840376210"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{PHONE_SECONDARY}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Operational Hours: 24 Hours / 7 Days a week</span>
              </div>
            </div>

            {/* Chennai Doorstep Localities Coverage */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 sm:mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Chennai Doorstep Pickup Localities</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Zero extra charge for pickup within these major residential and business zones:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  "T. Nagar", "Adyar", "Anna Nagar", "Velachery", "OMR IT Expressway",
                  "Tambaram", "Guindy", "Mylapore", "Chromepet", "Koyambedu", "Porur",
                  "Kilpauk", "Besant Nagar", "Perungudi", "Thoraipakkam", "Pallavaram",
                  "Chennai Central", "Egmore Station", "Chennai Airport (MAA)"
                ].map((locality, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-100 border border-slate-200/80 px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-full text-slate-700 font-medium"
                  >
                    {locality}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-2xl border border-slate-800 relative">
              <div className="mb-5 sm:mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                  Fast Callback
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Send Your Travel Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Our dispatch manager responds within 15 minutes with vehicle availability.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base sm:text-lg font-bold text-white">Inquiry Forwarded via WhatsApp!</h4>
                  <p className="text-xs text-slate-400">
                    Our reservation manager will contact you promptly at {formData.phone}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-blue-400 underline font-semibold mt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {phoneError && (
                    <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
                      {phoneError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (phoneError) setPhoneError('');
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Pickup Location
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsCustomPickup(!isCustomPickup)}
                          className="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline"
                        >
                          {isCustomPickup ? "Choose area" : "Type address"}
                        </button>
                      </div>
                      {isCustomPickup ? (
                        <input
                          type="text"
                          placeholder="e.g. Besant Nagar 3rd Cross / Hotel Leela"
                          value={formData.customPickup}
                          onChange={(e) => setFormData({ ...formData, customPickup: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <select
                          value={formData.pickupLocation}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other (Custom Address / Area)') {
                              setIsCustomPickup(true);
                              setFormData({ ...formData, customPickup: '' });
                            } else {
                              setFormData({ ...formData, pickupLocation: val });
                            }
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {CHENNAI_PICKUP_ZONES.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                          <option value="Other (Custom Address / Area)">📍 Type Custom Street Address</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Destination or Package
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tirupati VIP / Pondicherry / Custom Outstation"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Planned Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Number of Passengers
                      </label>
                      <select
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1-3">1 - 3 Passengers (Sedan)</option>
                        <option value="4-6">4 - 6 Passengers (SUV / Ertiga)</option>
                        <option value="7">7 Passengers (Innova Crysta)</option>
                        <option value="8-14">8 - 14 Passengers (Tempo Traveller)</option>
                        <option value="15+">15+ Passengers (Force Urbania / Mini Bus)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Notes (Senior Citizens, Mottai, Luggage)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Traveling with elderly parents, early 4:30 AM pickup from Adyar."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 sm:py-3.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full transition-transform active:scale-95 shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Send Inquiry to Dispatch Team</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
