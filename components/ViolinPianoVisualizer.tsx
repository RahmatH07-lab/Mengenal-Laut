import React, { useEffect, useRef } from 'react';
import { Activity, Music } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface ViolinPianoVisualizerProps {
  activePianoNotes: string[];
  activeViolinNotes: string[];
  isPlaying: boolean;
}

// 2-Octave Piano Keyboard Mapping (C3 to B4)
const PIANO_KEYS = [
  { pitch: 'C3', isBlack: false }, { pitch: 'C#3', isBlack: true },
  { pitch: 'D3', isBlack: false }, { pitch: 'D#3', isBlack: true },
  { pitch: 'E3', isBlack: false },
  { pitch: 'F3', isBlack: false }, { pitch: 'F#3', isBlack: true },
  { pitch: 'G3', isBlack: false }, { pitch: 'G#3', isBlack: true },
  { pitch: 'A3', isBlack: false }, { pitch: 'A#3', isBlack: true },
  { pitch: 'B3', isBlack: false },

  { pitch: 'C4', isBlack: false }, { pitch: 'C#4', isBlack: true },
  { pitch: 'D4', isBlack: false }, { pitch: 'D#4', isBlack: true },
  { pitch: 'E4', isBlack: false },
  { pitch: 'F4', isBlack: false }, { pitch: 'F#4', isBlack: true },
  { pitch: 'G4', isBlack: false }, { pitch: 'G#4', isBlack: true },
  { pitch: 'A4', isBlack: false }, { pitch: 'A#4', isBlack: true },
  { pitch: 'B4', isBlack: false },
];

const VIOLIN_NOTES = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];

export const ViolinPianoVisualizer: React.FC<ViolinPianoVisualizerProps> = ({
  activePianoNotes,
  activeViolinNotes,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Waveform Animation Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = 128;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = 70;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        audioEngine.getAnalyserData(dataArray);
      } else {
        dataArray.fill(10);
      }

      const barWidth = (width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.85;

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#d97706'); // amber-600
        gradient.addColorStop(0.6, '#f59e0b'); // amber-500
        gradient.addColorStop(1, '#fef08a'); // amber-200

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-2xl space-y-6">
      
      {/* Header & Live Waveform */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            Live Instrument & Acoustic Visualizer
          </h3>
          <p className="text-xs text-slate-400">
            Real-time piano keyboard and violin string bowing simulation
          </p>
        </div>

        {/* Audio Waveform Canvas */}
        <div className="w-full sm:w-48 bg-slate-950 p-1.5 rounded-xl border border-amber-900/30">
          <canvas ref={canvasRef} className="w-full h-[50px] rounded" />
        </div>
      </div>

      {/* Piano Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-glow"></span>
            Acoustic Grand Piano (C3 - B4)
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Click keys to play piano
          </span>
        </div>

        {/* Interactive Piano Keys Container */}
        <div className="relative h-28 bg-slate-950 rounded-xl p-2 border border-slate-800 flex overflow-x-auto justify-center select-none custom-scrollbar">
          {PIANO_KEYS.map((key) => {
            const isActive = activePianoNotes.includes(key.pitch);

            if (key.isBlack) {
              return (
                <button
                  key={key.pitch}
                  onClick={() => audioEngine.playNoteManual(key.pitch, 'piano')}
                  title={key.pitch}
                  className={`w-5 h-16 -mx-2.5 z-10 rounded-b transition-all border border-slate-900 ${
                    isActive
                      ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-y-105'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-500'
                  }`}
                />
              );
            }

            return (
              <button
                key={key.pitch}
                onClick={() => audioEngine.playNoteManual(key.pitch, 'piano')}
                title={key.pitch}
                className={`w-8 h-24 rounded-b border border-slate-800 flex items-end justify-center pb-1 text-[9px] font-mono transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-200 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/40 translate-y-1'
                    : 'bg-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {key.pitch}
              </button>
            );
          })}
        </div>
      </div>

      {/* Violin Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-glow"></span>
            Solo Violin String & Bowing (G4 - C6)
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Click notes to play violin
          </span>
        </div>

        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
          {/* Animated String Representation */}
          <div className="relative h-3 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-full border border-amber-900/50 flex items-center">
            {/* Bow animation indicator */}
            {activeViolinNotes.length > 0 && (
              <div className="absolute top-0 bottom-0 w-8 bg-amber-300/80 blur-xs rounded-full animate-pulse transform -translate-y-0.5" style={{
                left: `${Math.min(90, Math.max(10, (VIOLIN_NOTES.indexOf(activeViolinNotes[0]) / VIOLIN_NOTES.length) * 100))}%`
              }} />
            )}
            <div className="w-full h-0.5 bg-amber-200/60 shadow-glow" />
          </div>

          {/* Interactive Violin Notes Buttons */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto">
            {VIOLIN_NOTES.map((pitch) => {
              const isActive = activeViolinNotes.includes(pitch);

              return (
                <button
                  key={pitch}
                  onClick={() => audioEngine.playNoteManual(pitch, 'violin')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                    isActive
                      ? 'bg-amber-300 text-slate-950 border-amber-200 shadow-lg shadow-amber-300/50 scale-110'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                >
                  {pitch}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
