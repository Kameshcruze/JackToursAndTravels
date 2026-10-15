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
  const [isRunning, setIsRunning] = useState(false);

  const resetCountUp = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    hasStartedRef.current = false;
    setCountDevotees(0);
    setCountRating(0.0);
    setCountOntime(0);
    setCountYears(0);
    setHasFinished(false);
    setIsRunning(false);
  };

  const startCountUp = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setIsRunning(true);

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
      setIsRunning(false);
      return;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const duration = 1600; // ~1.6 seconds smooth count-up
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
        setIsRunning(false);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const checkCardVisibility = () => {
      const target = cardsRef.current || sectionRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // When element is substantially in view (top reaches above 85% of screen and bottom hasn't left top)
      const isInView = rect.top < vh * 0.85 && rect.bottom > 80;
      const isCompletelyOutOfView = rect.bottom < -80 || rect.top > vh + 80;

      if (isInView) {
        startCountUp();
      } else if (isCompletelyOutOfView) {
        // Reset when user scrolls away so values run again when they reach the section
        resetCountUp();
      }
    };

    // 1. Intersection Observer with thresholds
    let observer: IntersectionObserver | null = null;
    const targetElement = cardsRef.current || sectionRef.current;

    if (typeof IntersectionObserver !== 'undefined' && targetElement) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const rect = entry.boundingClientRect;

            if (entry.isIntersecting && rect.top < vh * 0.85) {
              startCountUp();
            } else if (!entry.isIntersecting || rect.bottom < -80 || rect.top > vh + 80) {
              resetCountUp();
            }
          }
        },
        {
          root: null,
          threshold: [0, 0.15, 0.4],
        }
      );
      observer.observe(targetElement);
    }

    // 2. Initial check only if already scrolled to this section on load
    if (window.scrollY > 150) {
      setTimeout(checkCardVisibility, 200);
    }

    // 3. Scroll and resize listeners for rock-solid cross-browser detection
    window.addEventListener('scroll', checkCardVisibility, { passive: true });
    window.addEventListener('resize', checkCardVisibility, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', checkCardVisibility);
      window.removeEventListener('resize', checkCardVisibility);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-8 sm:pt-10 pb-6 sm:pb-8 overflow-hidden border-b border-blue-950/80 bg-[#040e24]">
      {/* ---------------- SECTION 2 BACKGROUND (Royal Blue & Gold from image.png) ---------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img 
          src="/images/trust-stats-bg.svg" 
          alt="Royal Navy Blue & Gold Ribbons Background" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030c1c]/40 via-transparent to-[#030c1c]/60 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ---------------- SECTION HEADER (Matching image.png) ---------------- */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Main Title: Chennai's Most Trusted [Pilgrimage Cab] Network */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.14]">
            Chennai's Most Trusted{' '}
            <span className="text-amber-400 font-black inline-block">
              Pilgrimage Cab
            </span>{' '}
            Network
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg text-slate-200/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Thousands of devotees trust us for a safe, comfortable and hassle-free journey to Tirupati, Tirumala and major spiritual destinations across South India.
          </p>
        </div>

        {/* ---------------- 4 DISTINCTIVE GLASS TRUST CARDS (All Transparent Matching image.png) ---------------- */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          
          {/* ================= CARD 1: 12,500+ Devotee Assured (Transparent Glass) ================= */}
          <div 
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-white/10 sm:bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 hover:border-white/40 shadow-2xl shadow-blue-950/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/25 text-blue-200 border border-blue-400/40 whitespace-nowrap">
                  Devotee Assured
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none tabular-nums flex items-baseline gap-0.5">
                <span>{countDevotees.toLocaleString('en-US')}</span>
                <span className="text-amber-400 font-extrabold text-2xl sm:text-3xl">+</span>
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-white mt-2">
                Pilgrims &amp; Devotees Assisted
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                Seamless Tirupati, Tirumala &amp; major temple tours across South India.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-700 text-xs font-bold border border-white/60 shadow-md group-hover:scale-[1.02] transition-all cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Daily Departures</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 2: 4.9 / 5 Google Verified Rating ================= */}
          <div 
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-white/10 sm:bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 hover:border-white/40 shadow-2xl shadow-amber-950/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            {/* Google 3D Plate Graphic on Right */}
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-6 w-20 h-20 bg-white/95 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center justify-center p-2 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              {/* Google G Logo */}
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.41l4.04-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.13c.95-2.83 3.6-4.93 6.72-4.93z"/>
              </svg>
              {/* 5 Tiny Stars under G */}
              <div className="flex items-center gap-0.5 mt-1.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[10px] leading-none">★</span>
                ))}
              </div>
            </div>

            <div className="relative z-10 max-w-[170px] sm:max-w-[185px]">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-400/30">
                  <span className="text-lg leading-none font-black text-slate-950">★</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/25 text-amber-200 border border-amber-400/40 whitespace-nowrap">
                  Highest Rated
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none tabular-nums flex items-baseline gap-1">
                <span>{countRating.toFixed(1)}</span>
                <span className="text-lg sm:text-xl font-bold text-slate-300">/ 5</span>
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-white mt-2">
                Google Verified Rating
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                From 1,800+ authentic reviews by devotees and travellers.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-amber-900 text-xs font-bold border border-white/60 shadow-md group-hover:scale-[1.02] transition-all cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>1,800+ Reviews</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 3: 100% On-Time Doorstep Pickup ================= */}
          <div 
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-white/10 sm:bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 hover:border-white/40 shadow-2xl shadow-sky-950/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
          >
            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/25 text-sky-200 border border-sky-400/40 whitespace-nowrap">
                  Zero Delay
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none tabular-nums flex items-baseline gap-0.5">
                <span>{countOntime}</span>
                <span className="text-amber-400 font-extrabold text-2xl sm:text-3xl">%</span>
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-white mt-2">
                On-Time Doorstep Pickup
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                Guaranteed 4:30 AM – 5:30 AM starts across Chennai for a smooth journey.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-700 text-xs font-bold border border-white/60 shadow-md group-hover:scale-[1.02] transition-all cursor-pointer">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                <span>On-Time Promise</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>


          {/* ================= CARD 4: 14+ Years Ghat Road Driving Record ================= */}
          <div 
            onMouseEnter={() => setActiveCard(3)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative bg-white/10 sm:bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 hover:border-white/40 shadow-2xl shadow-emerald-950/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
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
                <path d="M0 120 C 40 80, 80 50, 160 30 L 160 120 Z" fill="#047857" opacity="0.3" />
                <path d="M30 120 C 70 70, 110 40, 160 15 L 160 120 Z" fill="#059669" opacity="0.4" />
                {/* Winding asphalt highway */}
                <path d="M0 120 C 35 110, 60 95, 80 80 C 105 60, 120 45, 160 35 L 160 70 C 120 78, 105 92, 85 105 C 65 118, 40 120, 0 120 Z" fill="#1e293b" />
                {/* Guard rail */}
                <path d="M0 119 C 35 109, 60 94, 80 79 C 105 59, 120 44, 160 34" stroke="#94a3b8" strokeWidth="2.5" />
                {/* Center road divider yellow dashes */}
                <path d="M10 118 C 40 108, 65 92, 83 83 C 105 65, 122 52, 160 42" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 4" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Header Icon + Pill Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/40">
                  Hill Certified
                </span>
              </div>

              {/* Stat Metric with Scroll-triggered Count-Up */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none tabular-nums flex items-baseline gap-1">
                <span>{countYears}</span>
                <span className="text-amber-400 font-extrabold text-2xl sm:text-3xl">+</span>
                <span className="text-lg sm:text-xl font-bold text-slate-300 ml-0.5">Years</span>
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-extrabold text-white mt-2">
                Ghat Road Driving Record
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-[190px]">
                Experienced, hill-certified drivers with a spotless safety record.
              </p>
            </div>

            {/* Bottom Pill Link */}
            <div className="relative z-10 mt-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-emerald-800 text-xs font-bold border border-white/60 shadow-md group-hover:scale-[1.02] transition-all cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
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
