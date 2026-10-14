import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Clock, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';

export const TrustStats: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // References to observe when the section/cards enter the viewport
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const hasStartedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Numerical values tracked during the count-up animation
  const [countDevotees, setCountDevotees] = useState(0);
  const [countRating, setCountRating] = useState(0.0);
  const [countOntime, setCountOntime] = useState(0);
  const [countYears, setCountYears] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const startCountUp = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check for prefers-reduced-motion
    const isReduced = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      setCountDevotees(12500);
      setCountRating(4.9);
      setCountOntime(100);
      setCountYears(14);
      setHasFinished(true);
      return;
    }

    const duration = 1800; // ~1.8 seconds smooth animation
    let startTime: number | null = null;

    // Smooth cubic deceleration easing
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      // 12,500+ animate from 0 to 12,500
      const currentDevotees = Math.min(12500, Math.round(easedProgress * 12500));
      setCountDevotees(currentDevotees);

      // 4.9 / 5 animate from 0.0 to 4.9
      const currentRating = Math.min(4.9, parseFloat((easedProgress * 4.9).toFixed(1)));
      setCountRating(currentRating);

      // 100% animate from 0% to 100%
      const currentOntime = Math.min(100, Math.round(easedProgress * 100));
      setCountOntime(currentOntime);

      // 14+ Years animate from 0 to 14
      const currentYears = Math.min(14, Math.round(easedProgress * 14));
      setCountYears(currentYears);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Guarantee final exact targets
        setCountDevotees(12500);
        setCountRating(4.9);
        setCountOntime(100);
        setCountYears(14);
        setHasFinished(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (hasStartedRef.current) return;

    // Check visibility via viewport bounding box
    const checkVisibility = () => {
      if (hasStartedRef.current) return;
      const target = cardsRef.current || sectionRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Trigger when the section top reaches inside the viewport
      if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
        startCountUp();
      }
    };

    // 1. Intersection Observer trigger
    let observer: IntersectionObserver | null = null;
    const targetElement = cardsRef.current || sectionRef.current;

    if (typeof IntersectionObserver !== 'undefined' && targetElement) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startCountUp();
              if (observer) observer.disconnect();
              break;
            }
          }
        },
        {
          root: null,
          threshold: 0.05, // Trigger as soon as 5% becomes visible
        }
      );
      observer.observe(targetElement);
    }

    // 2. Direct checks on mount and slightly delayed (handles fast renders / pre-scrolled pages)
    checkVisibility();
    const timer1 = setTimeout(checkVisibility, 150);
    const timer2 = setTimeout(checkVisibility, 500);

    // 3. Fallback scroll/touch listeners in case IntersectionObserver has delay or container nesting
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    window.addEventListener('touchmove', checkVisibility, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('touchmove', checkVisibility);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-6 sm:pt-8 pb-14 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200/60 bg-slate-50">
      {/* ---------------- SECTION 2 BACKGROUND IMAGE (Home-sec2_bg.webp) ---------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img 
          src="/images/Home-sec2_bg.webp" 
          alt="Tirupati Temple Scenery Background" 
          className="w-full h-full object-cover object-[75%_center] sm:object-center opacity-65 sm:opacity-75 filter contrast-105 saturate-105"
          referrerPolicy="no-referrer"
        />
        {/* Atmospheric gradient overlay ensuring crisp readability while keeping temple photo vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/80 sm:from-sky-50/60 sm:via-white/45 sm:to-white/70" />
        
        {/* Subtle warm golden ambient glow */}
        <div className="absolute top-10 right-0 sm:right-1/4 w-[350px] sm:w-[600px] h-[350px] bg-amber-200/25 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ---------------- SECTION HEADER ---------------- */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Top Pill Badge with Temple Icon */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full bg-amber-50/95 border border-amber-200/80 shadow-xs backdrop-blur-md mb-4 sm:mb-5">
            {/* Traditional Temple Icon */}
            <svg 
              className="w-4 h-4 text-amber-700 shrink-0" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2L9 6H15L12 2Z" />
              <path d="M7 7H17V9H7V7Z" />
              <path d="M6 10H18V12H6V10Z" />
              <path d="M5 13H19V17H17V22H15V17H9V22H7V17H5V13Z" />
              <circle cx="12" cy="15" r="1.5" />
            </svg>
            <span className="text-xs sm:text-sm font-extrabold tracking-wider text-slate-800 uppercase flex items-center gap-2">
              <span>Safe Journey</span>
              <span className="text-amber-500">•</span>
              <span>Trusted Service</span>
              <span className="text-amber-500">•</span>
              <span>Divine Experience</span>
            </span>
          </div>

          {/* Main Title: Chennai's Most Trusted [Pilgrimage Cab] Network */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
            Chennai's Most Trusted{' '}
            <span className="text-amber-500 font-black inline-block">
              Pilgrimage Cab
            </span>{' '}
            Network
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Thousands of devotees trust us for a safe, comfortable and hassle-free journey to Tirupati, Tirumala and major spiritual destinations across South India.
          </p>
        </div>

        {/* ---------------- 4 DISTINCTIVE TRUST CARDS ---------------- */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          
          {/* ================= CARD 1: 12,500+ Devotee Assured ================= */}
          <div 
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-100/90 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                  Devotee Assured
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none tabular-nums">
                {countDevotees.toLocaleString('en-US')}{countDevotees >= 12500 ? '+' : ''}
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-2">
                Pilgrims & Devotees Assisted
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Seamless Tirupati, Tirumala & major temple tours across South India.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 text-blue-600 text-xs font-bold border border-blue-100 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white animate-pulse" />
                <span>Daily Departures</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 2: 4.9 / 5 Google Verified Rating ================= */}
          <div 
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-amber-50/40 rounded-3xl p-5 sm:p-6 border border-amber-100/90 shadow-xl shadow-amber-500/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            {/* Google 3D Plate Graphic on Right */}
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-6 w-20 h-20 bg-white rounded-2xl shadow-lg shadow-amber-900/5 border border-slate-100 flex flex-col items-center justify-center p-2 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              {/* Google G Logo */}
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.41l4.04-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.13c.95-2.83 3.6-4.93 6.72-4.93z"/>
              </svg>
              {/* 5 Tiny Stars under G */}
              <div className="flex items-center gap-0.5 mt-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[10px] leading-none">★</span>
                ))}
              </div>
            </div>

            <div className="relative z-10 max-w-[170px] sm:max-w-[185px]">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md shadow-amber-400/30">
                  <span className="text-lg leading-none font-black text-white">★</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200/60 whitespace-nowrap">
                  Highest Rated
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none tabular-nums">
                {countRating.toFixed(1)} / 5
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-2">
                Google Verified Rating
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                From 1,840+ authentic reviews by devotees and travelers.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200/80 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors cursor-pointer">
                {/* Micro G Icon */}
                <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-amber-700">G</span>
                <span>1,840+ Reviews</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 3: 100% On-Time Doorstep Pickup ================= */}
          <div 
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-sky-50/40 rounded-3xl p-5 sm:p-6 border border-sky-100/90 shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200/60 whitespace-nowrap">
                  Zero Delay
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none tabular-nums">
                {countOntime}%
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-2">
                On-Time Doorstep Pickup
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Guaranteed 4:30 AM – 5:30 AM starts across Chennai for a smooth journey.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-blue-600 text-xs font-bold border border-blue-200/70 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer">
                <Clock className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                <span>On-Time Promise</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 4: 14+ Years Ghat Road Driving Record ================= */}
          <div 
            onMouseEnter={() => setActiveCard(3)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-emerald-50/30 rounded-3xl p-5 sm:p-6 border border-emerald-100/90 shadow-xl shadow-emerald-500/5 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            {/* Winding Mountain Highway Ghat Road Bottom Right */}
            <div className="absolute -right-2 bottom-0 w-36 h-28 pointer-events-none group-hover:scale-105 transition-transform duration-300 flex items-end justify-end overflow-hidden rounded-br-3xl">
              <svg 
                className="w-full h-full opacity-90 drop-shadow-sm" 
                viewBox="0 0 160 120" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lush green mountain slope */}
                <path d="M0 120 C 40 80, 80 50, 160 30 L 160 120 Z" fill="#047857" opacity="0.15" />
                <path d="M30 120 C 70 70, 110 40, 160 15 L 160 120 Z" fill="#059669" opacity="0.25" />
                {/* Winding asphalt highway */}
                <path d="M0 120 C 35 110, 60 95, 80 80 C 105 60, 120 45, 160 35 L 160 70 C 120 78, 105 92, 85 105 C 65 118, 40 120, 0 120 Z" fill="#334155" />
                {/* Guard rail */}
                <path d="M0 119 C 35 109, 60 94, 80 79 C 105 59, 120 44, 160 34" stroke="#e2e8f0" strokeWidth="2.5" />
                {/* Center road divider yellow dashes */}
                <path d="M10 118 C 40 108, 65 92, 83 83 C 105 65, 122 52, 160 42" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 4" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200/60">
                  Hill Certified
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none tabular-nums">
                {countYears}{countYears >= 14 || hasFinished ? '+' : ''} Years
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-2">
                Ghat Road Driving Record
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-[190px]">
                Experienced, hill-certified drivers with a spotless safety record.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-emerald-700 text-xs font-bold border border-emerald-200/80 shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                <span>Zero Accident Record</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
