import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, Volume2 } from 'lucide-react';
import { kidsAudioEngine } from '../services/kidsAudioEngine';

interface PlacedCreature {
  id: number;
  emoji: string;
  name: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export const OceanPlayground: React.FC = () => {
  const [creatures, setCreatures] = useState<PlacedCreature[]>([
    { id: 1, emoji: '🐬', name: 'Lumba-lumba', x: 25, y: 35, size: 70, rotation: -10 },
    { id: 2, emoji: '🐠', name: 'Nemo', x: 65, y: 55, size: 60, rotation: 5 },
    { id: 3, emoji: '🐢', name: 'Penyu', x: 45, y: 70, size: 75, rotation: 0 },
    { id: 4, emoji: '🪼', name: 'Ubur-ubur', x: 80, y: 30, size: 65, rotation: 12 },
  ]);

  const stickers = [
    { emoji: '🐬', name: 'Lumba-lumba', sound: () => kidsAudioEngine.playDolphinWhistle() },
    { emoji: '🐋', name: 'Paus Biru', sound: () => kidsAudioEngine.playWhaleSong() },
    { emoji: '🐠', name: 'Ikan Badut', sound: () => kidsAudioEngine.playSplash() },
    { emoji: '🐢', name: 'Penyu Laut', sound: () => kidsAudioEngine.playHarpSparkle() },
    { emoji: '🐙', name: 'Gurita', sound: () => kidsAudioEngine.playBubblePop() },
    { emoji: '🪼', name: 'Ubur-ubur', sound: () => kidsAudioEngine.playHarpSparkle() },
    { emoji: '🐴', name: 'Kuda Laut', sound: () => kidsAudioEngine.playBubblePop() },
    { emoji: '⭐', name: 'Bintang Laut', sound: () => kidsAudioEngine.playCheerChime() },
    { emoji: '🦀', name: 'Kepiting', sound: () => kidsAudioEngine.playBubblePop() },
    { emoji: '🫧', name: 'Gelembung', sound: () => kidsAudioEngine.playBubblePop() },
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    randomSticker.sound();

    const newCreature: PlacedCreature = {
      id: Date.now(),
      emoji: randomSticker.emoji,
      name: randomSticker.name,
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(85, y)),
      size: Math.floor(Math.random() * 25) + 55,
      rotation: Math.floor(Math.random() * 30) - 15,
    };

    setCreatures(prev => [...prev.slice(-15), newCreature]);
  };

  const handleCreatureTap = (c: PlacedCreature, e: React.MouseEvent) => {
    e.stopPropagation();
    kidsAudioEngine.playBubblePop();
    const matched = stickers.find(s => s.emoji === c.emoji);
    if (matched) matched.sound();
  };

  const handleClear = () => {
    kidsAudioEngine.playBubblePop();
    setCreatures([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 relative z-10 select-none pb-12">
      
      {/* Playground Header & Toolbar */}
      <div className="bg-sky-950/85 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-4 border-amber-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-kids font-bold text-2xl sm:text-3xl text-amber-300 flex items-center gap-2">
            <span>🎨 Akuarium Ceria Si Kiki</span>
          </h2>
          <p className="text-sky-200 text-xs sm:text-sm font-kids mt-0.5">
            Sentuh atau klik di dalam air untuk membuat hewan laut baru berenang! 🌊
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-kids font-bold text-xs sm:text-sm rounded-2xl shadow flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Trash2 className="w-4 h-4" />
            <span>Bersihkan Layar</span>
          </button>
        </div>
      </div>

      {/* Interactive Sticker Palette */}
      <div className="flex items-center justify-center flex-wrap gap-2 bg-sky-900/80 p-3 rounded-2xl border-2 border-sky-700">
        <span className="text-xs font-kids font-bold text-amber-300 mr-1">Pilih Stempel:</span>
        {stickers.map((stk, i) => (
          <button
            key={i}
            onClick={() => {
              stk.sound();
              const newCreature: PlacedCreature = {
                id: Date.now() + i,
                emoji: stk.emoji,
                name: stk.name,
                x: 20 + (i * 7) % 65,
                y: 30 + (i * 9) % 50,
                size: 65,
                rotation: Math.floor(Math.random() * 20) - 10,
              };
              setCreatures(prev => [...prev.slice(-15), newCreature]);
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-sky-950 hover:bg-amber-400 hover:text-slate-900 text-white font-kids text-sm font-bold shadow border border-sky-600 flex items-center gap-1 active:scale-90 transition-all"
            title={`Tambahkan ${stk.name}`}
          >
            <span>{stk.emoji}</span>
            <span className="hidden sm:inline text-xs">{stk.name}</span>
          </button>
        ))}
      </div>

      {/* Interactive Aquatic Canvas */}
      <div
        onClick={handleCanvasClick}
        className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-b from-sky-400 via-blue-600 to-indigo-900 rounded-3xl border-4 border-cyan-300/60 shadow-2xl overflow-hidden cursor-crosshair group"
      >
        {/* Helper Hint text */}
        <div className="absolute top-4 left-4 bg-white/80 text-slate-900 px-3.5 py-1 rounded-full font-kids text-xs font-bold shadow pointer-events-none flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Klik di mana saja untuk menaruh hewan laut!</span>
        </div>

        {/* Ambient sea floor */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-700/60 to-transparent pointer-events-none flex justify-around text-4xl opacity-80">
          <span>🌿</span>
          <span>🪸</span>
          <span>🐚</span>
          <span>🪸</span>
          <span>🌿</span>
        </div>

        {/* Placed Animated Creatures */}
        {creatures.map(c => (
          <div
            key={c.id}
            onClick={(e) => handleCreatureTap(c, e)}
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: `${c.size}px`,
              transform: `translate(-50%, -50%) rotate(${c.rotation}deg)`,
              animation: 'floatSlow 4s ease-in-out infinite',
            }}
            className="absolute cursor-pointer hover:scale-125 active:scale-90 transition-transform filter drop-shadow-xl select-none"
            title={`Klik ${c.name} untuk bunyi!`}
          >
            {c.emoji}
          </div>
        ))}
      </div>

    </div>
  );
};
