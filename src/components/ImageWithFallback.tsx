import React, { useState } from 'react';
import { MapPin, Car } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  type?: 'place' | 'car';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  type = 'place'
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 flex items-center justify-center p-4 text-center ${className}`}>
        <div className="space-y-1.5 z-10">
          <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-amber-400">
            {type === 'car' ? <Car className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
          </div>
          <div className="text-xs font-bold text-white tracking-wide">
            {fallbackTitle || alt}
          </div>
          <div className="text-[10px] text-amber-400/80 font-medium uppercase tracking-wider">
            {type === 'car' ? 'Sanitized AC Cab' : 'Chennai Direct Circuit'}
          </div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <span className="text-xs text-slate-400 font-medium">Loading destination...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
