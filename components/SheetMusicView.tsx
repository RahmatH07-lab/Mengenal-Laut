import React, { useState } from 'react';
import { FileMusic, Copy, Check, Info } from 'lucide-react';
import { Song } from '../types';

interface SheetMusicViewProps {
  song: Song;
}

export const SheetMusicView: React.FC<SheetMusicViewProps> = ({ song }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAbc = () => {
    if (song.abcNotation) {
      navigator.clipboard.writeText(song.abcNotation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 lg:p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
            <FileMusic className="w-5 h-5 text-amber-400" />
            Musical Notation & Harmony Map
          </h3>
          <p className="text-xs text-slate-400">
            Chord progressions, piano voice leadings, and violin staves
          </p>
        </div>

        {song.abcNotation && (
          <button
            onClick={handleCopyAbc}
            className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700/50 text-xs font-medium flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied ABC' : 'Copy ABC Notation'}</span>
          </button>
        )}
      </div>

      {/* Harmonic Chord Progression Cards */}
      <div>
        <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2.5">
          Chord Progression Timeline ({song.keySignature})
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {song.chords.map((chord, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 p-3 rounded-xl border border-amber-900/30 text-center"
            >
              <span className="text-[10px] font-mono text-slate-500 block mb-1">
                @ {chord.time}s
              </span>
              <span className="text-xl font-serif font-bold text-amber-200 block">
                {chord.chord}
              </span>
              <span className="text-[10px] font-mono text-amber-400/80 mt-1 block truncate">
                {chord.notes.join(' - ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ABC Sheet Music Notation */}
      {song.abcNotation && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            ABC Standard Sheet Music Score
          </h4>
          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-amber-100/90 font-mono text-xs overflow-x-auto leading-relaxed custom-scrollbar max-h-48">
            {song.abcNotation}
          </pre>
        </div>
      )}

      {/* Musical Analysis Note */}
      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/80 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-200">Arrangement Tip:</strong> The piano plays in soft, open 10ths and sustained pedal chords in lower register (C2-F3), creating vast emotional room for the solo violin to weep in upper register (D5-A5) with expressive 5Hz vibrato.
        </p>
      </div>

    </div>
  );
};
