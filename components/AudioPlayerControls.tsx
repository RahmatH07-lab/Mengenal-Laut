import React from 'react';
import { Play, Pause, RotateCcw, Volume2, Sliders, Repeat } from 'lucide-react';
import { Song, AudioPlayerState } from '../types';

interface AudioPlayerControlsProps {
  song: Song;
  playerState: AudioPlayerState;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSetPianoVolume: (vol: number) => void;
  onSetViolinVolume: (vol: number) => void;
  onToggleLoop: () => void;
  onReset: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const AudioPlayerControls: React.FC<AudioPlayerControlsProps> = ({
  song,
  playerState,
  onTogglePlay,
  onSeek,
  onSetPianoVolume,
  onSetViolinVolume,
  onToggleLoop,
  onReset,
}) => {
  const progressPercent = song.duration > 0 ? (playerState.currentTime / song.duration) * 100 : 0;

  return (
    <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-4 lg:p-6 shadow-2xl backdrop-blur-md">
      {/* Top Header: Song Title & Key Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-0.5">
            Now Performing • Slow Emotional Duet
          </span>
          <h2 className="text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
            {song.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {song.keySignature} • {song.bpm} BPM • Piano & Violin Duo
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={onReset}
            title="Rewind to Start"
            className="p-2 text-slate-400 hover:text-amber-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition border border-slate-700/50"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleLoop}
            title={playerState.isLooping ? 'Looping Enabled' : 'Looping Disabled'}
            className={`p-2 rounded-xl transition border text-xs flex items-center gap-1 ${
              playerState.isLooping
                ? 'bg-amber-950/90 text-amber-300 border-amber-600/60'
                : 'bg-slate-800/80 text-slate-400 border-slate-700/50 hover:text-slate-200'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span className="hidden xs:inline">Loop</span>
          </button>
        </div>
      </div>

      {/* Progress Timeline Bar */}
      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs font-mono text-amber-200/80">
          <span>{formatTime(playerState.currentTime)}</span>
          <span className="text-slate-500">{song.mood}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * song.duration;
            onSeek(newTime);
          }}
          className="relative w-full h-3 bg-slate-950 rounded-full cursor-pointer group overflow-hidden border border-amber-900/30"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 rounded-full transition-all duration-100 relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-glow animate-pulse" />
          </div>
        </div>
      </div>

      {/* Controls & Instrument Mixer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Play / Pause Primary Button */}
        <div className="md:col-span-4 flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl transform active:scale-95 ${
              playerState.isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 ring-4 ring-amber-500/20'
                : 'bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 hover:from-amber-400 hover:to-amber-600 shadow-amber-900/50'
            }`}
          >
            {playerState.isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>
          <div>
            <span className="text-sm font-semibold text-slate-200 block">
              {playerState.isPlaying ? 'Playing Music' : 'Paused'}
            </span>
            <span className="text-xs text-amber-400/90 font-serif">
              Piano + Violin Ensemble
            </span>
          </div>
        </div>

        {/* Dual Instrument Balance Mixers */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          
          {/* Piano Volume Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Grand Piano
              </span>
              <span className="text-amber-400 font-mono text-[11px]">
                {Math.round(playerState.volumePiano * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={playerState.volumePiano}
              onChange={(e) => onSetPianoVolume(parseFloat(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Violin Volume Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                Solo Violin
              </span>
              <span className="text-amber-300 font-mono text-[11px]">
                {Math.round(playerState.volumeViolin * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={playerState.volumeViolin}
              onChange={(e) => onSetViolinVolume(parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
