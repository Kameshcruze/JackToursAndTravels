import React, { useState } from 'react';
import { Heart, User, Menu, X, Navigation } from 'lucide-react';
import { PHONE_PRIMARY_RAW, createWhatsAppLink } from '../data/travelData';

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
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'destinations', label: 'Destinations', href: '#destinations' },
    { id: 'tours', label: 'Tours', href: '#packages' },
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
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled 
            ? 'shadow-md border-b border-slate-200/90' 
            : 'border-b border-slate-100 shadow-sm'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo matching the brand emblem */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            </div>
            <span className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Jack<span className="text-blue-600">Tours</span>
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-2 transition-colors hover:text-blue-600 whitespace-nowrap ${
                    isActive ? 'text-blue-600 font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Book Now Pill Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Heart / Saved tours icon */}
            <a
              href="#packages"
              className="p-2 text-slate-700 hover:text-blue-600 transition-colors relative hidden sm:block"
              aria-label="Wishlist / Saved Packages"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            </a>

            {/* Profile / User Icon */}
            <a
              href="tel:+919585262522"
              className="p-2 text-slate-700 hover:text-blue-600 transition-colors hidden sm:block"
              aria-label="Call Booking Desk"
            >
              <User className="w-5 h-5" />
            </a>

            {/* Pill Button "Book Now" */}
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold tracking-tight shadow-md shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
            >
              Book Now
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 shadow-xl animate-in fade-in duration-200">
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
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full shadow-md"
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
