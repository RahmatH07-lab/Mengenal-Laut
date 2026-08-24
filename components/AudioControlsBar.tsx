import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Sliders, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { kidsAudioEngine } from '../services/kidsAudioEngine';
import { MUSIC_THEMES } from '../data/seaCreatures';

export const AudioControlsBar: React.FC = () => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState('cheerful_nursery');
  const [musicVol, setMusicVol] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlayingMusic(kidsAudioEngine.getIsMusicPlaying());
  }, []);

  const handleToggleMusic = () => {
    kidsAudioEngine.playBubblePop();
    const playing = kidsAudioEngine.toggleMusic();
    setIsPlayingMusic(playing);
  };

  const handleChangeTheme = (themeId: string, scaleType: 'nursery' | 'bubble_dance' | 'calm_ocean') => {
    kidsAudioEngine.playBubblePop();
    setCurrentThemeId(themeId);
    kidsAudioEngine.setTheme(scaleType);
    if (!isPlayingMusic) {
      kidsAudioEngine.startCheerfulMusic();
      setIsPlayingMusic(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setMusicVol(val);
    kidsAudioEngine.setMusicVolume(val);
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-md w-full select-none">
      
      {/* Soundboard Drawer (Expanded) */}
      {isExpanded && (
        <div className="bg-sky-950/95 backdrop-blur-xl border-3 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-2xl mb-3 flex flex-col gap-4 animate-fadeIn text-white">
          
          <div className="flex items-center justify-between border-b border-sky-800 pb-2">
            <span className="font-kids font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <Music className="w-4 h-4" />
              <span>Pilihan Musik Ceria & Efek Suara 🎶</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sky-300 hover:text-white text-xs font-kids font-bold"
            >
              Tutup ✕
            </button>
          </div>

          {/* Theme Selector Pills */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-sky-200 font-kids font-bold">Pilih Musik Latar:</span>
            <div className="grid grid-cols-1 gap-2">
              {MUSIC_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleChangeTheme(theme.id, theme.scaleType)}
                  className={`p-2.5 rounded-2xl font-kids text-xs font-bold text-left transition-all flex items-center justify-between ${
                    currentThemeId === theme.id && isPlayingMusic
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow'
                      : 'bg-sky-900/80 hover:bg-sky-800 text-sky-100 border border-sky-700'
                  }`}
                >
                  <div>
                    <div className="font-bold">{theme.name}</div>
                    <div className="text-[10px] opacity-80">{theme.description}</div>
                  </div>
                  {currentThemeId === theme.id && isPlayingMusic && (
                    <span className="text-sm animate-spin">💿</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Soundboard Shortcuts */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-sky-200 font-kids font-bold">Papan Suara Instan:</span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => kidsAudioEngine.playDolphinWhistle()}
                className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-kids text-xs font-bold text-center active:scale-95 transition-transform"
              >
                🐬 Lumba
              </button>
              <button
                onClick={() => kidsAudioEngine.playWhaleSong()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-kids text-xs font-bold text-center active:scale-95 transition-transform"
              >
                🐋 Paus
              </button>
              <button
                onClick={() => kidsAudioEngine.playSplash()}
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-kids text-xs font-bold text-center active:scale-95 transition-transform"
              >
                🌊 Byur!
              </button>
              <button
                onClick={() => kidsAudioEngine.playCheerChime()}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-kids text-xs font-bold text-center active:scale-95 transition-transform"
              >
                🎉 Sorak
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 pt-2 border-t border-sky-800 text-xs font-kids">
            <Volume2 className="w-4 h-4 text-sky-300" />
            <span className="text-sky-200">Volume Musik:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVol}
              onChange={handleVolumeChange}
              className="flex-1 accent-amber-400 h-2 bg-sky-800 rounded-lg cursor-pointer"
            />
          </div>

        </div>
      )}

      {/* Main Bottom Floating Capsule Pill */}
      <div className="bg-sky-950/90 backdrop-blur-md border-3 border-amber-400 rounded-full p-2 pl-3.5 pr-2.5 shadow-2xl flex items-center justify-between gap-3 text-white">
        
        {/* Play/Pause Cheerful BGM */}
        <button
          onClick={handleToggleMusic}
          className={`px-3.5 py-2 rounded-full font-kids font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
            isPlayingMusic
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
          title={isPlayingMusic ? 'Hentikan Musik Ceria' : 'Putar Musik Ceria'}
        >
          {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlayingMusic ? 'Musik Ceria ON 🎶' : 'Putar Musik 🎵'}</span>
        </button>

        {/* Quick Bubble Pop button */}
        <button
          onClick={() => kidsAudioEngine.playBubblePop()}
          className="p-2 bg-sky-800 hover:bg-sky-700 text-sky-100 rounded-full font-kids text-xs font-bold shadow flex items-center gap-1 active:scale-90 transition-transform"
          title="Letuskan Gelembung! 🫧"
        >
          <span>🫧 Pop!</span>
        </button>

        {/* Drawer Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full bg-sky-900 hover:bg-sky-800 text-amber-300 border border-sky-700 shadow flex items-center justify-center transition-transform active:scale-90"
          title="Pengaturan Musik & Efek Suara"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
        </button>

      </div>

    </div>
  );
};
