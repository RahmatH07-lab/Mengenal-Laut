import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Star, Zap, CheckCircle2 } from 'lucide-react';
import { SeaCreature } from '../types';
import { SEA_CREATURES } from '../data/seaCreatures';
import { kidsAudioEngine } from '../services/kidsAudioEngine';
import { kidsVoiceService } from '../services/voiceService';

interface SeaEncyclopediaProps {
  onSelectCreature?: (creature: SeaCreature) => void;
}

export const SeaEncyclopedia: React.FC<SeaEncyclopediaProps> = ({ onSelectCreature }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  const [selectedCreatureDetail, setSelectedCreatureDetail] = useState<SeaCreature | null>(null);

  const categories = ['Semua', 'Mamalia Laut', 'Ikan', 'Reptil Laut', 'Moluska & Lainnya'];

  const filteredCreatures = selectedCategory === 'Semua'
    ? SEA_CREATURES
    : SEA_CREATURES.filter(c => c.category === selectedCategory);

  const handleSpeakCreature = (creature: SeaCreature, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudioEngine.playBubblePop();

    if (activeSpeakingId === creature.id) {
      kidsVoiceService.stop();
      setActiveSpeakingId(null);
    } else {
      setActiveSpeakingId(creature.id);
      
      // Play animal specific sound effect
      if (creature.soundType === 'dolphin') kidsAudioEngine.playDolphinWhistle();
      else if (creature.soundType === 'whale') kidsAudioEngine.playWhaleSong();
      else if (creature.soundType === 'splash') kidsAudioEngine.playSplash();
      else kidsAudioEngine.playHarpSparkle();

      kidsVoiceService.speak(creature.voiceScript, () => {
        setActiveSpeakingId(null);
      });
    }
  };

  const handlePlaySoundOnly = (creature: SeaCreature, e: React.MouseEvent) => {
    e.stopPropagation();
    if (creature.soundType === 'dolphin') kidsAudioEngine.playDolphinWhistle();
    else if (creature.soundType === 'whale') kidsAudioEngine.playWhaleSong();
    else if (creature.soundType === 'splash') kidsAudioEngine.playSplash();
    else if (creature.soundType === 'harp') kidsAudioEngine.playHarpSparkle();
    else kidsAudioEngine.playBubblePop();
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 relative z-10 select-none pb-12">
      
      {/* Category Selection Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              kidsAudioEngine.playBubblePop();
              setSelectedCategory(cat);
            }}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl font-kids font-bold text-sm sm:text-base shadow-md transition-all transform active:scale-95 ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300 scale-105'
                : 'bg-sky-900/80 hover:bg-sky-800 text-sky-100 border border-sky-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Sea Creatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreatures.map(creature => {
          const isSpeakingThis = activeSpeakingId === creature.id;

          return (
            <div
              key={creature.id}
              onClick={() => {
                kidsAudioEngine.playBubblePop();
                setSelectedCreatureDetail(creature);
                if (onSelectCreature) onSelectCreature(creature);
              }}
              className="group bg-sky-950/80 hover:bg-sky-900/90 backdrop-blur-md rounded-3xl p-5 border-3 border-sky-700 hover:border-amber-400 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              {/* Background gradient glow on hover */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${creature.gradient} opacity-20 group-hover:opacity-40 blur-2xl transition-opacity pointer-events-none`} />

              {/* Card Header: Avatar + Category + Name */}
              <div className="flex items-start gap-4">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${creature.gradient} flex items-center justify-center text-4xl shadow-lg border-2 border-white/70 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  <span>{creature.emoji}</span>
                </div>

                <div className="flex-1">
                  <span className={`inline-block text-[11px] font-kids font-extrabold px-2.5 py-0.5 rounded-full ${creature.badgeColor} mb-1 shadow-xs`}>
                    {creature.category}
                  </span>
                  <h3 className="font-kids font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                    {creature.name}
                  </h3>
                  <p className="text-xs text-sky-300 italic">
                    {creature.scientificName}
                  </p>
                </div>
              </div>

              {/* Short Kid-Friendly Description */}
              <p className="text-sky-100 text-sm font-medium leading-relaxed font-kids line-clamp-3">
                {creature.shortDesc}
              </p>

              {/* Superpower Tag */}
              <div className="bg-sky-900/80 p-2.5 rounded-xl border border-sky-800 flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 font-bold font-kids line-clamp-2">
                  {creature.superpower}
                </p>
              </div>

              {/* Card Action Controls: Voice Narration & Sound Effect */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-sky-800">
                
                {/* Voice Read Aloud Button */}
                <button
                  onClick={(e) => handleSpeakCreature(creature, e)}
                  className={`flex-1 py-2 px-3 rounded-xl font-kids font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 ${
                    isSpeakingThis
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                  title="Dengarkan Kiki bercerita tentang hewan ini"
                >
                  {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeakingThis ? 'Berhenti' : 'Dengarkan Kiki 🎙️'}</span>
                </button>

                {/* Sound effect trigger button */}
                <button
                  onClick={(e) => handlePlaySoundOnly(creature, e)}
                  className="py-2 px-3 rounded-xl font-kids font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-900 shadow transition-all active:scale-95 flex items-center gap-1"
                  title="Bunyikan efek suara hewan"
                >
                  <span>🔊 Efek</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sea Creature Full Detail Modal */}
      {selectedCreatureDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-sky-900 to-sky-950 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col gap-5">
            
            {/* Close Modal Button */}
            <button
              onClick={() => {
                kidsAudioEngine.playBubblePop();
                kidsVoiceService.stop();
                setSelectedCreatureDetail(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg flex items-center justify-center shadow-lg transition-transform active:scale-90"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${selectedCreatureDetail.gradient} flex items-center justify-center text-6xl shadow-xl border-3 border-white shrink-0`}>
                <span>{selectedCreatureDetail.emoji}</span>
              </div>
              <div>
                <span className={`inline-block text-xs font-kids font-extrabold px-3 py-1 rounded-full ${selectedCreatureDetail.badgeColor} mb-1.5 shadow`}>
                  {selectedCreatureDetail.category}
                </span>
                <h2 className="font-kids font-bold text-2xl sm:text-3xl text-amber-300">
                  {selectedCreatureDetail.name}
                </h2>
                <p className="text-sky-300 text-sm italic">
                  {selectedCreatureDetail.scientificName}
                </p>
              </div>
            </div>

            {/* Listen to Voice Narration Banner */}
            <div className="bg-sky-800/80 p-4 rounded-2xl border-2 border-sky-600 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sky-100 font-kids text-sm">
                <span className="text-2xl">🎙️</span>
                <span>Cerita Suara Lengkap oleh Kiki:</span>
              </div>

              <button
                onClick={(e) => handleSpeakCreature(selectedCreatureDetail, e)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-kids font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Putar Suara Narator</span>
              </button>
            </div>

            {/* Fun Facts List for Kids */}
            <div className="flex flex-col gap-3">
              <h3 className="font-kids font-bold text-lg text-amber-300 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>3 Fakta Unik & Menakjubkan:</span>
              </h3>

              <div className="flex flex-col gap-2.5">
                {selectedCreatureDetail.funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="bg-sky-900/60 p-3.5 rounded-2xl border border-sky-700 flex items-start gap-3 text-sky-100 font-kids text-sm sm:text-base leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Superpower Section */}
            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 p-4 rounded-2xl font-kids font-bold text-sm sm:text-base shadow-lg flex items-center gap-3">
              <Zap className="w-6 h-6 text-slate-900 shrink-0" />
              <div>
                <span className="block text-xs uppercase text-slate-800 tracking-wider">Kekuatan Super:</span>
                <span>{selectedCreatureDetail.superpower}</span>
              </div>
            </div>

            {/* Close / Selesai button */}
            <button
              onClick={() => {
                kidsAudioEngine.playBubblePop();
                kidsVoiceService.stop();
                setSelectedCreatureDetail(null);
              }}
              className="w-full py-3 bg-sky-700 hover:bg-sky-600 text-white font-kids font-bold text-base rounded-2xl shadow-md active:scale-98 transition-all mt-2"
            >
              Tutup & Lanjut Menjelajah 🌊
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
