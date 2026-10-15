import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { 
  PHONE_PRIMARY, 
  PHONE_SECONDARY, 
  PHONE_PRIMARY_RAW, 
  PHONE_SECONDARY_RAW 
} from '../data/travelData';

interface HeaderProps {
  onOpenBooking: () => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, savedCount = 3 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const headerHeight = window.innerWidth >= 640 ? 80 : 64;
      const targetLine = headerHeight + 120;

      // 1. If near top of page, active is home
      if (window.scrollY < 200) {
        setActiveNav('home');
        return;
      }

      // 2. If near bottom of the page, active is contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveNav('contact');
        return;
      }

      // 3. Check sections in reverse DOM order (bottom to top)
      const navSections = [
        { id: 'contact', el: document.getElementById('contact') },
        { id: 'about', el: document.getElementById('why-us') },
        { id: 'guide', el: document.getElementById('guide') },
        { id: 'fleet', el: document.getElementById('fleet') },
        { id: 'destinations', el: document.getElementById('destinations') },
        { id: 'tours', el: document.getElementById('packages') },
      ];

      for (const section of navSections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= targetLine) {
            setActiveNav(section.id);
            return;
          }
        }
      }

      setActiveNav('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'tours', label: 'Tours', href: '#packages' },
    { id: 'destinations', label: 'Destinations', href: '#destinations' },
    { id: 'fleet', label: 'Fleet', href: '#fleet' },
    { id: 'guide', label: 'Pilgrim Guide', href: '#guide' },
    { id: 'about', label: 'Why Us', href: '#why-us' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setActiveNav(link.id);
    setMobileMenuOpen(false);
    if (link.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(link.href);
    if (element) {
      const headerHeight = window.innerWidth >= 640 ? 80 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-200 ${
          isScrolled 
            ? 'shadow-md border-b border-slate-200' 
            : 'border-b border-slate-100 shadow-sm'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Pure Typography Brand Wordmark - Without Car Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col justify-center group shrink-0 py-1 select-none"
            aria-label="Shri Vari Travels - Home"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
              <span className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                SHRI VARI
              </span>
              <span className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight text-blue-600">
                TRAVELS
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] lg:text-[11px] font-extrabold tracking-[0.16em] sm:tracking-[0.2em] uppercase mt-1 leading-none">
              <span className="text-amber-500">CHENNAI</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-bold">TIRUPATI &amp; OUTSTATION CABS</span>
            </div>
          </a>

          {/* Center Navigation Links (visible on lg desktop viewports to prevent tablet collision) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-7 text-sm xl:text-base font-bold text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-2 transition-colors hover:text-blue-600 whitespace-nowrap ${
                    isActive ? 'text-blue-600 font-extrabold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Phone Numbers with Call Icon (Replacing Book Now) */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Primary Mobile Number: 94929 21997 (Warm Amber/Gold Pill) - Desktop only */}
            <a
              href={`tel:+${PHONE_PRIMARY_RAW}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#fde68a] hover:bg-[#fcd34d] text-slate-950 text-xs sm:text-sm font-bold tracking-tight shadow-sm border border-amber-300 transition-all active:scale-95 whitespace-nowrap"
              title={`Call ${PHONE_PRIMARY}`}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-900 text-slate-900 shrink-0" />
              <span>94929 21997</span>
            </a>

            {/* Secondary Mobile Number: 91502 67924 (Deep Navy Pill) - Desktop only */}
            <a
              href={`tel:+${PHONE_SECONDARY_RAW}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0e2138] hover:bg-[#152e4d] text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm transition-all active:scale-95 whitespace-nowrap border border-slate-700/60"
              title={`Call ${PHONE_SECONDARY}`}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white shrink-0" />
              <span>91502 67924</span>
            </a>

            {/* Tablet & Mobile menu toggle (kept alone on mobile/tablet screens) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Tablet & Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 shadow-xl animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="block px-3 py-2 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:+${PHONE_PRIMARY_RAW}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-xs font-black rounded-full shadow-md border border-amber-300/80 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Call: +91 94929 21997</span>
            </a>
            <a
              href={`tel:+${PHONE_SECONDARY_RAW}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Call: +91 91502 67924</span>
            </a>
          </div>
        </div>
      )}
    </header>

    {/* Header placeholder spacer to prevent content overlap */}
    <div className="h-16 sm:h-20 shrink-0 w-full pointer-events-none" aria-hidden="true" />
  </>
  );
};
