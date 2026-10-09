import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full mb-3">
            <span>Customer Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Thousands of Chennai Families
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 font-normal">
            Real feedback from pilgrims who experienced our doorstep pickup, hill-driving safety, and courteous service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 hover:border-blue-600 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4 sm:mb-6">
                  "{review.review}"
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">{review.name}</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs truncate">{review.location} · {review.tourTaken}</div>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-blue-600 bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 px-4 py-3 rounded-2xl sm:rounded-full bg-white border border-slate-200 text-center text-xs text-slate-600 max-w-xl mx-auto shadow-sm">
          Rated <strong className="text-slate-900">4.9/5 stars</strong> across 1,840+ verified Google Reviews in Chennai.
        </div>

      </div>
    </section>
  );
};
