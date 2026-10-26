import React from 'react';

export type MascotMood = 'happy' | 'cheering' | 'thinking' | 'encouraging' | 'celebrating';

interface MascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
  }[size];

  // Mascot colors & states
  const isBouncing = mood === 'cheering' || mood === 'celebrating';
  const isEncouraging = mood === 'encouraging';

  return (
    <div className={`relative flex items-center gap-3 select-none ${className}`}>
      {/* SVG Cartoon Mascot: Ollie the Wise & Cheerful Owl */}
      <div
        className={`relative ${sizeClasses} transition-transform duration-300 ${
          isBouncing ? 'animate-bounce' : 'hover:scale-105'
        }`}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Body */}
          <ellipse cx="60" cy="68" rx="42" ry="46" fill="#FBBF24" />
          {/* Tummy */}
          <ellipse cx="60" cy="74" rx="28" ry="32" fill="#FEF3C7" />
          {/* Tummy Feathers Pattern */}
          <path d="M52 64 Q60 70 68 64 M48 76 Q60 84 72 76 M52 88 Q60 94 68 88" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Ears / Feather Tufts */}
          <polygon points="34,32 46,14 52,36" fill="#D97706" />
          <polygon points="86,32 74,14 68,36" fill="#D97706" />

          {/* Wings */}
          {isBouncing ? (
            <>
              {/* Cheerful Raised Wings */}
              <path d="M22 62 Q6 40 24 38 Q32 50 26 70 Z" fill="#F59E0B" />
              <path d="M98 62 Q114 40 96 38 Q88 50 94 70 Z" fill="#F59E0B" />
            </>
          ) : (
            <>
              {/* Resting Wings */}
              <ellipse cx="22" cy="70" rx="9" ry="22" fill="#F59E0B" transform="rotate(15 22 70)" />
              <ellipse cx="98" cy="70" rx="9" ry="22" fill="#F59E0B" transform="rotate(-15 98 70)" />
            </>
          )}

          {/* Big Cartoon Eyes Background */}
          <circle cx="44" cy="48" r="16" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="76" cy="48" r="16" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />

          {/* Eye Pupils based on Mood */}
          {mood === 'encouraging' ? (
            <>
              {/* Gentle Happy Arc Eyes */}
              <path d="M36 50 Q44 42 52 50" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M68 50 Q76 42 84 50" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'cheering' || mood === 'celebrating' ? (
            <>
              {/* Star-struck / Joyful Arcs */}
              <path d="M35 50 Q44 38 53 50" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M67 50 Q76 38 85 50" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Big Curious Pupils */}
              <circle cx="46" cy="48" r="8" fill="#1E293B" />
              <circle cx="49" cy="45" r="3" fill="#FFFFFF" />
              <circle cx="74" cy="48" r="8" fill="#1E293B" />
              <circle cx="77" cy="45" r="3" fill="#FFFFFF" />
            </>
          )}

          {/* Rosy Cheeks */}
          <circle cx="30" cy="58" r="6" fill="#F43F5E" opacity="0.4" />
          <circle cx="90" cy="58" r="6" fill="#F43F5E" opacity="0.4" />

          {/* Beak */}
          <polygon points="54,53 66,53 60,65" fill="#EA580C" />

          {/* Little Feet */}
          <ellipse cx="48" cy="112" rx="7" ry="4" fill="#EA580C" />
          <ellipse cx="72" cy="112" rx="7" ry="4" fill="#EA580C" />

          {/* Cute Graduation Cap / Star on Top */}
          <path d="M60 12 L72 17 L60 22 L48 17 Z" fill="#4F46E5" />
          <line x1="68" y1="18" x2="72" y2="25" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="72" cy="26" r="2" fill="#F59E0B" />
        </svg>
      </div>

      {/* Speech Bubble */}
      {speechText && (
        <div className="relative bg-white text-slate-800 px-4 py-2.5 rounded-2xl border-2 border-amber-200 shadow-sm max-w-xs text-sm md:text-base font-bold animate-fadeIn">
          {/* Bubble tail */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-amber-200 border-b-[8px] border-b-transparent"></div>
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-white border-b-[6px] border-b-transparent"></div>
          <p className="leading-snug">{speechText}</p>
        </div>
      )}
    </div>
  );
};
