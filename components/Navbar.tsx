import React from 'react';
import { 
  Tv, 
  BookOpen, 
  HelpCircle, 
  MessageCircle, 
  Palette, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Music
} from 'lucide-react';
import { AppMode } from '../types';
import { kidsAudioEngine } from '../services/kidsAudioEngine';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const navItems: { mode: AppMode; label: string; icon: string }[] = [
    { mode: 'story', label: 'Cerita Animasi', icon: '🎬' },
    { mode: 'explorer', label: 'Ensiklopedia Hewan', icon: '📖' },
    { mode: 'quiz', label: 'Kuis Ceria', icon: '❓' },
    { mode: 'ask_kiki', label: 'Tanya Kiki', icon: '💬' },
    { mode: 'ocean_playground', label: 'Akuarium Ceria', icon: '🎨' },
  ];

  return (
    <header className="w-full bg-sky-950/90 backdrop-blur-md border-b-4 border-amber-400 shadow-xl sticky top-0 z-30 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-300 animate-bounce">
            🤿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-kids font-extrabold text-xl sm:text-2xl text-amber-300 tracking-wide">
                Petualangan Laut Si Kiki
              </h1>
              <span className="bg-rose-500 text-white text-[10px] sm:text-xs font-kids font-extrabold px-2 py-0.5 rounded-full shadow">
                Usia 5+ Thn 🌟
              </span>
            </div>
            <p className="text-sky-200 text-xs font-semibold">
              Animasi & Edukasi Hewan Laut Lengkap dengan Suara Ceria
            </p>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <nav className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
          {navItems.map(item => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  kidsAudioEngine.playBubblePop();
                  onSelectMode(item.mode);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-2xl font-kids font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all transform active:scale-95 shadow ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-white scale-105 shadow-amber-400/30'
                    : 'bg-sky-900/70 hover:bg-sky-800 text-sky-100 border border-sky-700'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Cheerful Music Button */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => {
              kidsAudioEngine.playBubblePop();
              onToggleMusic();
            }}
            className={`px-3.5 py-1.5 rounded-full font-kids font-bold text-xs flex items-center gap-1.5 shadow-md border-2 transition-all active:scale-95 ${
              isMusicPlaying
                ? 'bg-amber-400 text-slate-950 border-amber-300 animate-pulse'
                : 'bg-sky-900 text-sky-200 border-sky-700 hover:bg-sky-800'
            }`}
            title={isMusicPlaying ? 'Matikan musik' : 'Nyalakan musik gembira'}
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isMusicPlaying ? 'Musik Ceria ON 🎵' : 'Musik Ceria OFF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
