import React, { useState } from 'react';
import { BookOpen, Copy, Check, Download, Music2, Share2 } from 'lucide-react';
import { Song } from '../types';

interface SongDetailsCardProps {
  song: Song;
}

export const SongDetailsCard: React.FC<SongDetailsCardProps> = ({ song }) => {
  const [copiedLyrics, setCopiedLyrics] = useState(false);

  const handleCopyLyrics = () => {
    const fullLyrics = song.lyrics
      .map(l => `[${l.section}] (${l.chord || ''})\n${l.text}\n${l.translationIndo ? `(ID: ${l.translationIndo})\n` : ''}`)
      .join('\n');

    const header = `${song.title} - ${song.subtitle}\nKey: ${song.keySignature} | BPM: ${song.bpm}\nComposer: ${song.composer}\n\n`;

    navigator.clipboard.writeText(header + fullLyrics);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  const handleDownloadSongFile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(song, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${song.title.toLowerCase().replace(/\s+/g, '_')}_piano_violin.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 lg:p-6 shadow-2xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-serif font-bold text-amber-100">
            Composition Story & Analysis
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLyrics}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
          >
            {copiedLyrics ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLyrics ? 'Copied' : 'Copy Lyrics'}</span>
          </button>

          <button
            onClick={handleDownloadSongFile}
            className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800/50 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Song</span>
          </button>
        </div>
      </div>

      {/* Story Narrative & Theme */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
          Inspiration & Story Context
        </span>
        <p className="text-sm font-serif text-slate-300 leading-relaxed italic">
          "{song.storyContext}"
        </p>
      </div>

      {/* Musical Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Key Signature</span>
          <span className="text-sm font-serif font-bold text-amber-200">{song.keySignature}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tempo / Pace</span>
          <span className="text-sm font-serif font-bold text-amber-200">{song.bpm} BPM</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Instruments</span>
          <span className="text-sm font-serif font-bold text-amber-200">Piano & Violin</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Duration</span>
          <span className="text-sm font-serif font-bold text-amber-200">{song.duration}s</span>
        </div>
      </div>

    </div>
  );
};
