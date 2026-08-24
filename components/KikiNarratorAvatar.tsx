import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { kidsAudioEngine } from '../services/kidsAudioEngine';

interface KikiNarratorAvatarProps {
  isSpeaking: boolean;
  expression?: 'happy' | 'excited' | 'thinking' | 'waving' | 'surprised';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  onTap?: () => void;
  customDialogue?: string;
}

export const KikiNarratorAvatar: React.FC<KikiNarratorAvatarProps> = ({
  isSpeaking,
  expression = 'happy',
  size = 'md',
  onTap,
  customDialogue,
}) => {
  const [isGiggling, setIsGiggling] = useState(false);
  const [bubbleCount, setBubbleCount] = useState(0);

  const handleAvatarClick = () => {
    kidsAudioEngine.playBubblePop();
    setIsGiggling(true);
    setBubbleCount(prev => prev + 1);
    setTimeout(() => setIsGiggling(false), 900);
    if (onTap) onTap();
  };

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    hero: 'w-56 h-56 sm:w-72 sm:h-72',
  }[size];

  return (
    <div className="relative flex flex-col items-center select-none group">
      
      {/* Floating mini speech bubble if provided */}
      {customDialogue && (
        <div className="absolute -top-12 sm:-top-14 bg-white text-slate-800 px-3.5 py-1.5 rounded-2xl shadow-xl border-2 border-amber-400 font-kids text-xs sm:text-sm font-bold flex items-center gap-1.5 animate-bounce z-20 whitespace-nowrap">
          <span>{customDialogue}</span>
          <span className="text-amber-500">✨</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-white" />
        </div>
      )}

      {/* Main Avatar Container */}
      <div
        onClick={handleAvatarClick}
        title="Klik Kiki untuk menyapa!"
        className={`relative ${sizeClasses} cursor-pointer transition-transform transform active:scale-90 duration-200 ${
          isGiggling ? 'animate-bounce rotate-6' : 'animate-float'
        }`}
      >
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-sky-300 opacity-60 blur-xl animate-pulse" />

        {/* Custom SVG Illustrated Character "Kiki the Child Explorer" */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl relative z-10 overflow-visible"
        >
          <defs>
            {/* Skin Gradient */}
            <radialGradient id="kikiSkin" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#ffdfc4" />
              <stop offset="85%" stopColor="#f5c29b" />
              <stop offset="100%" stopColor="#e8a87c" />
            </radialGradient>

            {/* Rosy Cheeks */}
            <radialGradient id="rosyCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b81" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ff6b81" stopOpacity="0" />
            </radialGradient>

            {/* Hair Gradient */}
            <linearGradient id="kikiHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c3826" />
              <stop offset="100%" stopColor="#3d2114" />
            </linearGradient>

            {/* Cap / Goggles Gradient */}
            <linearGradient id="capYellow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="goggleGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>

            {/* Snorkel Tube */}
            <linearGradient id="snorkelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Shirt Gradient */}
            <linearGradient id="shirtBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Body & Explorer Diving Shirt */}
          <path
            d="M 60 160 Q 100 148 140 160 L 155 200 Q 100 210 45 200 Z"
            fill="url(#shirtBlue)"
            stroke="#0369a1"
            strokeWidth="3"
          />

          {/* Yellow Stripes on Shirt */}
          <path
            d="M 85 155 L 85 200 M 115 155 L 115 200"
            stroke="#fde047"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Waving / Pointing Arms */}
          {expression === 'waving' || isGiggling ? (
            <g className="animate-wiggle origin-bottom-left">
              {/* Left hand waving high */}
              <path
                d="M 58 165 C 35 150 20 125 24 105 C 26 95 38 95 44 108 C 48 120 56 145 62 165"
                fill="url(#kikiSkin)"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              {/* Hand Palm */}
              <circle cx="28" cy="100" r="11" fill="url(#kikiSkin)" />
              {/* Fingers */}
              <ellipse cx="22" cy="92" rx="4" ry="7" fill="url(#kikiSkin)" transform="rotate(-20 22 92)" />
              <ellipse cx="28" cy="88" rx="4" ry="8" fill="url(#kikiSkin)" />
              <ellipse cx="35" cy="90" rx="4" ry="7" fill="url(#kikiSkin)" transform="rotate(15 35 90)" />
            </g>
          ) : (
            <g>
              {/* Relaxed cheerful hands holding explorer badge */}
              <circle cx="52" cy="178" r="9" fill="url(#kikiSkin)" />
              <circle cx="148" cy="178" r="9" fill="url(#kikiSkin)" />
            </g>
          )}

          {/* Ears */}
          <ellipse cx="48" cy="115" rx="10" ry="12" fill="url(#kikiSkin)" stroke="#e8a87c" strokeWidth="1.5" />
          <ellipse cx="152" cy="115" rx="10" ry="12" fill="url(#kikiSkin)" stroke="#e8a87c" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="86" y="140" width="28" height="22" rx="6" fill="url(#kikiSkin)" />

          {/* Head Shape */}
          <ellipse cx="100" cy="112" rx="52" ry="48" fill="url(#kikiSkin)" />

          {/* Hair back / fringe */}
          <path
            d="M 48 105 C 44 70 70 50 100 50 C 130 50 156 70 152 105 C 145 75 130 65 100 65 C 70 65 55 75 48 105 Z"
            fill="url(#kikiHair)"
          />
          {/* Cute front bangs */}
          <path
            d="M 52 95 Q 75 75 95 90 Q 115 70 148 95 Q 130 72 100 72 Q 70 72 52 95 Z"
            fill="url(#kikiHair)"
          />

          {/* Explorer Snorkel Yellow Cap */}
          <path
            d="M 54 85 Q 100 45 146 85 Q 155 70 140 55 Q 100 38 60 55 Q 45 70 54 85 Z"
            fill="url(#capYellow)"
            stroke="#ca8a04"
            strokeWidth="2.5"
          />
          {/* Cap Visor */}
          <path
            d="M 46 82 Q 100 66 154 82 Q 100 74 46 82 Z"
            fill="#eab308"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />

          {/* Snorkel Gear on side */}
          <g>
            <path
              d="M 145 125 C 165 125 172 110 172 80 C 172 50 162 38 152 32"
              fill="none"
              stroke="url(#snorkelGradient)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Snorkel top valve */}
            <circle cx="152" cy="32" r="6" fill="#ef4444" />
          </g>

          {/* Diving Goggles resting on forehead */}
          <g>
            {/* Goggle Strap */}
            <path d="M 48 76 Q 100 68 152 76" fill="none" stroke="#0284c7" strokeWidth="4" />
            {/* Left Lens Frame */}
            <rect x="62" y="60" width="34" height="24" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <rect x="65" y="63" width="28" height="18" rx="6" fill="url(#goggleGlass)" />
            <ellipse cx="72" cy="69" rx="4" ry="2" fill="white" opacity="0.9" />

            {/* Right Lens Frame */}
            <rect x="104" y="60" width="34" height="24" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <rect x="107" y="63" width="28" height="18" rx="6" fill="url(#goggleGlass)" />
            <ellipse cx="114" cy="69" rx="4" ry="2" fill="white" opacity="0.9" />

            {/* Middle Bridge */}
            <rect x="94" y="68" width="12" height="6" rx="2" fill="#0369a1" />
          </g>

          {/* Rosy Cheeks */}
          <ellipse cx="68" cy="122" rx="12" ry="7" fill="url(#rosyCheek)" />
          <ellipse cx="132" cy="122" rx="12" ry="7" fill="url(#rosyCheek)" />

          {/* Eyebrows */}
          <path
            d="M 68 96 Q 78 90 88 95"
            fill="none"
            stroke="#5c3826"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 112 95 Q 122 90 132 96"
            fill="none"
            stroke="#5c3826"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Big Sparkly Eyes */}
          {/* Left Eye */}
          <g>
            <circle cx="78" cy="108" r="10" fill="#292524" />
            <circle cx="76" cy="105" r="4.5" fill="white" />
            <circle cx="81" cy="111" r="2" fill="white" />
          </g>

          {/* Right Eye */}
          <g>
            <circle cx="122" cy="108" r="10" fill="#292524" />
            <circle cx="120" cy="105" r="4.5" fill="white" />
            <circle cx="125" cy="111" r="2" fill="white" />
          </g>

          {/* Cute Nose */}
          <path
            d="M 98 116 Q 100 120 102 116"
            fill="none"
            stroke="#e8a87c"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Dynamic Animated Mouth (Synchronized to isSpeaking) */}
          {isSpeaking ? (
            <g className="talking-mouth origin-center">
              {/* Wide open happy talking mouth with tongue & tooth */}
              <path
                d="M 88 126 Q 100 148 112 126 Q 100 124 88 126 Z"
                fill="#b91c1c"
                stroke="#991b1b"
                strokeWidth="1.5"
              />
              {/* White front tooth */}
              <rect x="96" y="126" width="8" height="4" rx="2" fill="white" />
              {/* Pink tongue */}
              <ellipse cx="100" cy="140" rx="7" ry="5" fill="#f472b6" />
            </g>
          ) : (
            <g>
              {/* Sweet resting smile */}
              <path
                d="M 88 127 Q 100 142 112 127"
                fill="none"
                stroke="#b91c1c"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Floating animated sparkles around Kiki */}
          <circle cx="35" cy="65" r="3" fill="#fde047" className="animate-ping" />
          <circle cx="168" cy="95" r="2.5" fill="#38bdf8" className="animate-pulse" />
        </svg>

        {/* Floating Bubble Generator when tapped */}
        {bubbleCount > 0 && (
          <div className="absolute -top-4 right-4 pointer-events-none animate-bounce">
            <span className="text-xl">🫧</span>
          </div>
        )}
      </div>

      {/* Name Tag Badge */}
      <div className="mt-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-900 font-kids font-bold text-xs sm:text-sm shadow-md border-2 border-amber-300 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
        <span>Kapten Kiki Penyelam Cilik</span>
      </div>

    </div>
  );
};
