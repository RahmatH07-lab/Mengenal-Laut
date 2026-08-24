import React, { useState, useEffect, useRef } from 'react';
import { Quote, Languages, Music, Sparkles } from 'lucide-react';
import { LyricLine, Song } from '../types';

interface LyricsDisplayProps {
  song: Song;
  currentTime: number;
  onSeekToLyric: (time: number) => void;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  song,
  currentTime,
  onSeekToLyric,
}) => {
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Find currently active lyric line based on playback time
  const currentLineIndex = song.lyrics.findIndex(
    (line) => currentTime >= line.startTime && currentTime <= line.endTime
  );

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentLineIndex]);

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 lg:p-6 shadow-2xl flex flex-col h-full min-h-[420px]">
      
      {/* Header & Translation Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Quote className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-serif font-bold text-amber-100">
            English Lyrics & Arrangement
          </h3>
        </div>

        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition border ${
            showTranslation
              ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{showTranslation ? 'Terjemahan ID: On' : 'Show Indonesian'}</span>
        </button>
      </div>

      {/* Lyrics Scrollable Container */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar max-h-[450px]">
        {song.lyrics.map((line, idx) => {
          const isActive = idx === currentLineIndex;

          return (
            <div
              key={line.id}
              ref={isActive ? activeLineRef : null}
              onClick={() => onSeekToLyric(line.startTime)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-950 border-amber-500/80 shadow-lg shadow-amber-950/50 ring-1 ring-amber-500/30 translate-x-1'
                  : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                  isActive
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-amber-400'
                }`}>
                  {line.section}
                </span>

                {line.chord && (
                  <span className="text-xs font-mono font-bold text-amber-300/90 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    {line.chord}
                  </span>
                )}
              </div>

              {/* English Main Lyric Text */}
              <p className={`font-serif text-lg leading-relaxed transition-colors ${
                isActive
                  ? 'text-amber-100 font-semibold text-xl'
                  : 'text-slate-300'
              }`}>
                {line.text}
              </p>

              {/* Optional Indonesian Translation Context */}
              {showTranslation && line.translationIndo && (
                <p className="text-xs text-amber-300/70 font-sans mt-1.5 italic border-l-2 border-amber-700/50 pl-2">
                  {line.translationIndo}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Tip */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Click any line to jump audio
        </span>
        <span className="font-serif italic text-amber-300/80">
          Piano & Violin Duo
        </span>
      </div>

    </div>
  );
};
