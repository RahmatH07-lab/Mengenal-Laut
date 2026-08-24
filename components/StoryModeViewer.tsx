import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles,
  Info,
  Award
} from 'lucide-react';
import { StoryScene, SeaCreature } from '../types';
import { STORY_SCENES, SEA_CREATURES } from '../data/seaCreatures';
import { KikiNarratorAvatar } from './KikiNarratorAvatar';
import { kidsVoiceService } from '../services/voiceService';
import { kidsAudioEngine } from '../services/kidsAudioEngine';

interface StoryModeViewerProps {
  onCreatureClick?: (creature: SeaCreature) => void;
}

export const StoryModeViewer: React.FC<StoryModeViewerProps> = ({ onCreatureClick }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [spokenCharIndex, setSpokenCharIndex] = useState<number>(0);

  const scene = STORY_SCENES[currentSceneIndex];
  const creature = SEA_CREATURES.find(c => c.id === scene.creatureId);

  useEffect(() => {
    kidsVoiceService.setCallbacks(
      (speaking) => setIsSpeaking(speaking),
      (charIdx) => setSpokenCharIndex(charIdx)
    );

    // Auto-read on scene change
    playCurrentSceneAudio();

    return () => {
      kidsVoiceService.stop();
    };
  }, [currentSceneIndex]);

  const playCurrentSceneAudio = () => {
    kidsVoiceService.stop();
    
    // Play creature specific sound effect first
    if (creature) {
      if (creature.soundType === 'dolphin') kidsAudioEngine.playDolphinWhistle();
      else if (creature.soundType === 'whale') kidsAudioEngine.playWhaleSong();
      else if (creature.soundType === 'splash') kidsAudioEngine.playSplash();
      else if (creature.soundType === 'harp') kidsAudioEngine.playHarpSparkle();
      else kidsAudioEngine.playBubblePop();
    } else {
      kidsAudioEngine.playSonarPing();
    }

    setTimeout(() => {
      kidsVoiceService.speak(scene.dialogue, () => {
        if (isAutoPlay && currentSceneIndex < STORY_SCENES.length - 1) {
          setTimeout(() => {
            setCurrentSceneIndex(prev => prev + 1);
          }, 1800);
        }
      });
    }, 450);
  };

  const handleNext = () => {
    kidsAudioEngine.playBubblePop();
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    kidsAudioEngine.playBubblePop();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      kidsVoiceService.stop();
    } else {
      playCurrentSceneAudio();
    }
  };

  const handleToggleAutoPlay = () => {
    kidsAudioEngine.playBubblePop();
    const newAuto = !isAutoPlay;
    setIsAutoPlay(newAuto);
    if (newAuto && !isSpeaking) {
      playCurrentSceneAudio();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 relative z-10 select-none pb-12">
      
      {/* Submarine Porthole / Scene Display Card */}
      <div className="bg-sky-950/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border-4 border-amber-400 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col gap-6 relative overflow-hidden">
        
        {/* Top Header: Submarine Navigation Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-bounce">🟡</span>
            <div>
              <h2 className="font-kids text-lg sm:text-2xl font-bold text-amber-300">
                {scene.title}
              </h2>
              <p className="text-sky-200 text-xs sm:text-sm font-semibold">
                {scene.subtitle}
              </p>
            </div>
          </div>

          {/* Scene Dot Indicators */}
          <div className="flex items-center gap-1.5 bg-sky-900/90 px-3 py-1.5 rounded-full border border-sky-700">
            {STORY_SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  kidsAudioEngine.playBubblePop();
                  setCurrentSceneIndex(idx);
                }}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                  idx === currentSceneIndex
                    ? 'bg-amber-400 scale-125 ring-2 ring-white'
                    : 'bg-sky-700 hover:bg-sky-500'
                }`}
                title={`Adegan ${idx + 1}`}
              />
            ))}
            <span className="text-sky-200 font-kids text-xs font-bold ml-1.5">
              {currentSceneIndex + 1}/{STORY_SCENES.length}
            </span>
          </div>
        </div>

        {/* Central Stage: Animated Creature Portal + Kiki Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Visual Arena (Porthole) */}
          <div className="lg:col-span-8 relative min-h-[260px] sm:min-h-[340px] rounded-2xl bg-gradient-to-b ${scene.backgroundGradient} p-6 flex flex-col items-center justify-center border-3 border-cyan-300/40 shadow-inner overflow-hidden group">
            
            {/* Animated Ambient Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {scene.ambientFish.map((elem, idx) => (
                <span
                  key={idx}
                  style={{
                    top: `${15 + idx * 20}%`,
                    left: `${10 + idx * 22}%`,
                    animation: `floatSlow ${3 + idx * 1.5}s ease-in-out infinite`,
                  }}
                  className="absolute text-2xl sm:text-3xl opacity-70 filter drop-shadow"
                >
                  {elem}
                </span>
              ))}
            </div>

            {/* Hero Sea Creature Illustration */}
            {creature ? (
              <div
                onClick={() => {
                  kidsAudioEngine.playBubblePop();
                  if (creature.soundType === 'dolphin') kidsAudioEngine.playDolphinWhistle();
                  else if (creature.soundType === 'whale') kidsAudioEngine.playWhaleSong();
                  else kidsAudioEngine.playHarpSparkle();
                }}
                className="relative cursor-pointer flex flex-col items-center group/creature transition-transform hover:scale-110 active:scale-95 duration-300"
                title="Klik hewan untuk mendengarkan suaranya!"
              >
                {/* Creature Big Avatar with pulsating aura */}
                <div className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr ${creature.gradient} flex items-center justify-center text-7xl sm:text-8xl shadow-2xl border-4 border-white/80 animate-gentle-pulse relative`}>
                  <span>{creature.emoji}</span>
                  <div className="absolute -bottom-2 bg-amber-400 text-slate-900 px-3 py-0.5 rounded-full font-kids font-bold text-xs shadow-md">
                    {creature.category}
                  </div>
                </div>

                {/* Creature Label */}
                <div className="mt-3 bg-white/90 text-slate-900 px-4 py-1.5 rounded-2xl font-kids font-bold text-base sm:text-lg shadow-lg border-2 border-amber-300 flex items-center gap-2">
                  <span>{creature.name}</span>
                  <span className="text-sm text-sky-600 italic">({creature.scientificName})</span>
                </div>

                <div className="mt-1 text-xs text-cyan-200 font-semibold bg-sky-900/80 px-2.5 py-0.5 rounded-full">
                  💡 Ketuk hewan untuk efek suara! 🎶
                </div>
              </div>
            ) : (
              /* Submarine Intro / Outro Visual */
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-8xl sm:text-9xl animate-float">
                  {currentSceneIndex === 0 ? '🚢' : '🌟'}
                </div>
                <div className="bg-amber-400 text-slate-950 font-kids text-lg sm:text-xl font-bold px-5 py-1.5 rounded-full shadow-lg">
                  {scene.highlightText}
                </div>
              </div>
            )}
          </div>

          {/* Kiki the Child Explorer Avatar Panel */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center gap-3 bg-sky-900/60 p-4 sm:p-5 rounded-2xl border-2 border-sky-700">
            <KikiNarratorAvatar
              isSpeaking={isSpeaking}
              expression={scene.kikiExpression}
              size="hero"
              customDialogue={isSpeaking ? 'Mendengarkan Kiki... 🎙️' : 'Klik aku untuk sapa! 👋'}
            />

            {/* Quick action buttons for Kiki */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleToggleVoice}
                className={`px-4 py-2 rounded-2xl font-kids font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
                  isSpeaking
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Dengarkan Kiki 🔊</span>
                  </>
                )}
              </button>

              <button
                onClick={handleToggleAutoPlay}
                className={`px-3 py-2 rounded-2xl font-kids font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95 ${
                  isAutoPlay
                    ? 'bg-amber-400 text-slate-900 ring-2 ring-white'
                    : 'bg-sky-800 hover:bg-sky-700 text-sky-200'
                }`}
                title="Putar cerita otomatis bab per bab"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAutoPlay ? 'Auto ON 🎬' : 'Auto Play'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big Kid-Friendly Subtitle / Narration Box */}
        <div className="relative bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 text-slate-900 p-5 sm:p-6 rounded-3xl border-4 border-amber-300 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎙️</span>
            <span className="font-kids font-bold text-amber-900 text-sm uppercase tracking-wide">
              Cerita Kapten Kiki:
            </span>
          </div>

          <p className="font-kids text-base sm:text-xl font-medium leading-relaxed sm:leading-loose text-slate-800">
            {scene.dialogue}
          </p>

          {creature && (
            <div className="mt-4 pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Kekuatan Hebat: {creature.superpower}</span>
              </div>

              {onCreatureClick && (
                <button
                  onClick={() => onCreatureClick(creature)}
                  className="text-xs sm:text-sm bg-sky-600 hover:bg-sky-700 text-white font-kids font-bold px-3.5 py-1 rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Lihat Fakta Lengkap 📖</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation Control Toolbar */}
        <div className="flex items-center justify-between gap-4 pt-2">
          
          <button
            onClick={handlePrev}
            disabled={currentSceneIndex === 0}
            className={`px-4 sm:px-6 py-3 rounded-2xl font-kids font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              currentSceneIndex === 0
                ? 'bg-sky-900/50 text-sky-500 cursor-not-allowed border border-sky-800'
                : 'bg-sky-700 hover:bg-sky-600 text-white border-2 border-sky-500'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {/* Center: Replay Button */}
          <button
            onClick={() => {
              kidsAudioEngine.playBubblePop();
              playCurrentSceneAudio();
            }}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl font-kids font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 border-2 border-amber-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Suara</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSceneIndex === STORY_SCENES.length - 1}
            className={`px-4 sm:px-6 py-3 rounded-2xl font-kids font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              currentSceneIndex === STORY_SCENES.length - 1
                ? 'bg-sky-900/50 text-sky-500 cursor-not-allowed border border-sky-800'
                : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-900 border-2 border-yellow-200'
            }`}
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
};
