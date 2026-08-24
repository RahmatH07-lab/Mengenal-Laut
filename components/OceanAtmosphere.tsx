import React, { useState, useEffect } from 'react';
import { kidsAudioEngine } from '../services/kidsAudioEngine';

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export const OceanAtmosphere: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState<number>(0);

  useEffect(() => {
    // Generate gentle randomized floating bubbles
    const initialBubbles: Bubble[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 32) + 16,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePopBubble = (id: number) => {
    kidsAudioEngine.playBubblePop();
    setPoppedCount(prev => prev + 1);
    // Replace popped bubble with new one from bottom
    setBubbles(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              left: Math.random() * 95,
              delay: 0,
              duration: Math.random() * 7 + 5,
            }
          : b
      )
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep Ocean Ambient Light Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 via-blue-700/20 to-sky-950/70" />

      {/* Sunbeams (God Rays) piercing through water */}
      <div className="absolute top-0 left-0 right-0 h-96 flex justify-around opacity-35">
        <div className="w-24 h-full bg-gradient-to-b from-yellow-200/50 to-transparent transform -rotate-12 blur-2xl origin-top" />
        <div className="w-32 h-full bg-gradient-to-b from-sky-200/60 to-transparent transform rotate-6 blur-2xl origin-top" />
        <div className="w-28 h-full bg-gradient-to-b from-cyan-100/50 to-transparent transform -rotate-6 blur-2xl origin-top" />
        <div className="w-20 h-full bg-gradient-to-b from-yellow-100/40 to-transparent transform rotate-15 blur-2xl origin-top" />
      </div>

      {/* Interactive Floating Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          onClick={() => handlePopBubble(bubble.id)}
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            bottom: '-40px',
            animation: `bubbleRise ${bubble.duration}s linear infinite`,
            animationDelay: `${bubble.delay}s`,
          }}
          className="absolute rounded-full bg-gradient-to-br from-white/60 via-cyan-200/40 to-sky-400/20 border border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.4)] pointer-events-auto cursor-pointer hover:scale-125 transition-transform backdrop-blur-xs flex items-center justify-center group"
          title="Klik untuk meletuskan gelembung! 🫧"
        >
          {/* Bubble reflection highlight */}
          <div className="w-1/3 h-1/3 rounded-full bg-white/80 absolute top-1 left-1.5" />
          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">💥</span>
        </div>
      ))}

      {/* Swimming Background Mini Fish (CSS Animated) */}
      <div
        style={{
          top: '25%',
          animation: 'swimAcross 24s linear infinite',
        }}
        className="absolute text-2xl filter drop-shadow-md opacity-75"
      >
        🐠 🐟 🐡
      </div>

      <div
        style={{
          top: '60%',
          animation: 'swimAcross 32s linear infinite reverse',
        }}
        className="absolute text-3xl filter drop-shadow-lg opacity-60"
      >
        🐬 ✨
      </div>

      {/* Seabed Coral & Seaweed Decorative Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 flex justify-between items-end px-4 sm:px-12 opacity-80 pointer-events-none">
        <div className="text-4xl sm:text-5xl animate-bounce" style={{ animationDuration: '6s' }}>
          🌿🪸
        </div>
        <div className="text-3xl sm:text-4xl animate-pulse" style={{ animationDuration: '4s' }}>
          ⭐🐚
        </div>
        <div className="text-4xl sm:text-5xl animate-bounce" style={{ animationDuration: '5s' }}>
          🪸🌿
        </div>
        <div className="text-3xl sm:text-4xl">
          🦀
        </div>
        <div className="text-4xl sm:text-5xl animate-bounce" style={{ animationDuration: '7s' }}>
          🪸🌿
        </div>
      </div>
    </div>
  );
};
