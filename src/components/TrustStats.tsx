import React from 'react';
import { Award, Users, Star, Clock } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      value: "12,500+",
      label: "Pilgrims & Devotees Assisted",
      detail: "Seamless Tirupati & South India Tours",
      color: "text-blue-600 bg-blue-50"
    },
    {
      value: "4.9 / 5",
      label: "Google Verified Rating",
      detail: "From 1,840+ real Chennai reviews",
      color: "text-amber-600 bg-amber-50"
    },
    {
      value: "100%",
      label: "On-Time Doorstep Pickup",
      detail: "Guaranteed 4:30 AM - 5:30 AM starts",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      value: "14+ Years",
      label: "Ghat Road Driving Record",
      detail: "Hill-certified vetted drivers",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-8 sm:py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight mt-1">
                  {stat.label}
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-2">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
