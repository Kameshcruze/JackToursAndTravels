import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PHONE_PRIMARY_RAW } from '../data/travelData';

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
          
          {/* Logo with attached Logo.png and responsive mobile vs desktop sizing */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group shrink-0 py-1"
          >
            <img 
              src="/Logo.svg" 
              alt="Shri Vari Travels" 
              className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto max-w-[210px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[310px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = '1';
                  target.src = '/Logo.png';
                }
              }}
            />
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

          {/* Right Action Icons & Book Now Pill Button */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Pill Button "Book Now" */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 sm:px-5 lg:px-6 xl:px-7 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-sm sm:text-base font-black tracking-tight shadow-md shadow-amber-500/25 border border-amber-300/80 transition-all active:scale-95 whitespace-nowrap"
            >
              Book Now
            </button>

            {/* Tablet & Mobile menu toggle (visible on screens < lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black rounded-full shadow-md border border-amber-300/80"
            >
              Book Now
            </button>
            <a
              href={`tel:+${PHONE_PRIMARY_RAW}`}
              className="w-full text-center py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full"
            >
              Call Booking Desk: +91 95852 62522
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
