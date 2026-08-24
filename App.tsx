import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OceanAtmosphere } from './components/OceanAtmosphere';
import { StoryModeViewer } from './components/StoryModeViewer';
import { SeaEncyclopedia } from './components/SeaEncyclopedia';
import { KidsQuiz } from './components/KidsQuiz';
import { AskKikiModal } from './components/AskKikiModal';
import { OceanPlayground } from './components/OceanPlayground';
import { AudioControlsBar } from './components/AudioControlsBar';
import { AppMode, SeaCreature } from './types';
import { kidsAudioEngine } from './services/kidsAudioEngine';

export const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>('story');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  useEffect(() => {
    // Check initial audio state
    setIsMusicPlaying(kidsAudioEngine.getIsMusicPlaying());
  }, []);

  const handleToggleMusic = () => {
    const playing = kidsAudioEngine.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleStartAdventure = () => {
    kidsAudioEngine.playSplash();
    kidsAudioEngine.startCheerfulMusic();
    setIsMusicPlaying(true);
    setWelcomeDismissed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-slate-100 flex flex-col relative font-kids selection:bg-amber-400 selection:text-slate-900 overflow-x-hidden">
      
      {/* Animated Ocean Visual Backdrop (Bubbles, Light Rays, Swimming Fish) */}
      <OceanAtmosphere />

      {/* Primary Top Header Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 relative z-10">
        
        {/* Cheerful Welcome Banner for 5+ Kids (Auto prompt on first load) */}
        {!welcomeDismissed && (
          <div className="w-full max-w-3xl mx-auto mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 text-slate-950 p-5 sm:p-6 rounded-3xl border-4 border-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-bounce" style={{ animationIterationCount: 1, animationDuration: '0.8s' }}>
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-4xl sm:text-5xl">🤿</span>
              <div>
                <h3 className="font-kids font-extrabold text-lg sm:text-xl text-slate-950">
                  Selamat Datang di Laut Ajaib Si Kiki! 🌊
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-900">
                  Klik tombol di samping untuk menyalakan musik ceria dan mulai menyelam!
                </p>
              </div>
            </div>

            <button
              onClick={handleStartAdventure}
              className="px-6 py-3 bg-sky-900 hover:bg-sky-800 text-white font-kids font-extrabold text-sm sm:text-base rounded-2xl shadow-xl border-2 border-sky-700 flex items-center gap-2 active:scale-95 transition-all shrink-0"
            >
              <span>Ayo Mulai! 🚀🎶</span>
            </button>
          </div>
        )}

        {/* View Switcher based on current mode */}
        {currentMode === 'story' && (
          <StoryModeViewer onCreatureClick={() => setCurrentMode('explorer')} />
        )}

        {currentMode === 'explorer' && (
          <SeaEncyclopedia />
        )}

        {currentMode === 'quiz' && (
          <KidsQuiz />
        )}

        {currentMode === 'ask_kiki' && (
          <AskKikiModal />
        )}

        {currentMode === 'ocean_playground' && (
          <OceanPlayground />
        )}

      </main>

      {/* Floating Audio & Cheerful Music Control Bar */}
      <AudioControlsBar />

      {/* Footer credits */}
      <footer className="relative z-10 text-center py-4 text-xs text-sky-400/80 font-kids border-t border-sky-900/60 select-none">
        Petualangan Laut Si Kiki 🐬 Ilustrasi & Animasi Edukasi Hewan Laut untuk Anak 5+ Tahun
      </footer>

    </div>
  );
};

export default App;
