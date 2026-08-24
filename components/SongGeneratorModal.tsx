import React, { useState } from 'react';
import { X, Sparkles, Music, Loader2, Heart, BookOpen } from 'lucide-react';
import { generateSongWithGemini } from '../services/geminiService';
import { Song } from '../types';

interface SongGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSongGenerated: (newSong: Song) => void;
}

const PRESET_IDEAS = [
  "A letter never sent under midnight rain",
  "Unspoken goodbyes at the quiet train station",
  "Walking through falling autumn leaves alone",
  "A gentle memory of warmth in winter cold",
  "Longing across a distant ocean at sunset"
];

export const SongGeneratorModal: React.FC<SongGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSongGenerated,
}) => {
  const [theme, setTheme] = useState('');
  const [keySig, setKeySig] = useState('D Minor');
  const [bpm, setBpm] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const generated = await generateSongWithGemini(theme, keySig, bpm);
      onSongGenerated(generated);
      onClose();
      setTheme('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to compose song. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-900/60 rounded-3xl p-6 lg:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-amber-200 bg-slate-800/80 hover:bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-950/50">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Compose AI Piano & Violin Song
            </h2>
            <p className="text-xs text-slate-400">
              Slow, emotional English ballad generated strictly for piano & violin
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Theme Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
              Emotional Theme / Story Prompt (English or Indonesian)
            </label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. A solitary violin in an old candlelit room remembering a lost love..."
              rows={3}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-amber-900/40 rounded-xl text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm font-serif leading-relaxed"
            />
          </div>

          {/* Quick Preset Ideas */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-amber-400" />
              Quick Theme Inspiration:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_IDEAS.map((idea, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setTheme(idea)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-700/50 text-[11px] text-amber-200/90 transition text-left"
                >
                  "{idea}"
                </button>
              ))}
            </div>
          </div>

          {/* Musical Parameters: Key & Slow BPM */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                Key Signature
              </label>
              <select
                value={keySig}
                onChange={(e) => setKeySig(e.target.value)}
                className="w-full bg-slate-950 border border-amber-900/40 rounded-xl px-3 py-2 text-sm text-amber-100 font-serif focus:outline-none focus:border-amber-500"
              >
                <option value="D Minor">D Minor (Melancholic)</option>
                <option value="A Minor">A Minor (Solitary)</option>
                <option value="C Minor">C Minor (Dramatically Emotional)</option>
                <option value="F Minor">F Minor (Deep Sorrow)</option>
                <option value="E Minor">E Minor (Hopeful Healing)</option>
                <option value="G Minor">G Minor (Longing)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                Slow Tempo (BPM)
              </label>
              <select
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-amber-900/40 rounded-xl px-3 py-2 text-sm text-amber-100 font-serif focus:outline-none focus:border-amber-500"
              >
                <option value={52}>52 BPM (Very Slow Largo)</option>
                <option value={58}>58 BPM (Slow Adagio)</option>
                <option value={60}>60 BPM (Emotional Lento)</option>
                <option value={65}>65 BPM (Flowing Andante)</option>
              </select>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading || !theme.trim()}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Composer Gemini is writing music & lyrics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Compose Piano & Violin Ballad</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
