// Web Audio API Synthesizer & Sequencer for Piano and Violin
import { NoteEvent, Song, AudioPlayerState } from '../types';

// Convert note name (e.g. "C4", "F#5", "Bb3") to frequency (Hz)
export function noteToFreq(note: string): number {
  const noteNames: Record<string, number> = {
    'C': 0, 'C#': 1, 'Db': 1,
    'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6,
    'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10,
    'B': 11
  };

  const match = note.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return 440; // Default to A4

  const key = match[1];
  const octave = parseInt(match[2], 10);
  const semitone = noteNames[key] ?? 0;
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private pianoGainNode: GainNode | null = null;
  private violinGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private reverbNode: ConvolverNode | GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;

  private currentSong: Song | null = null;
  private isPlaying = false;
  private startTime = 0; // AudioContext timeline anchor
  private pauseOffset = 0; // Offset in seconds
  private animationFrameId: number | null = null;

  private activeNotesMap = new Set<string>(); // Keep track of playing notes
  private onTimeUpdateCallback?: (currentTime: number, activePianoNotes: string[], activeViolinNotes: string[]) => void;
  private onEndedCallback?: () => void;

  private activeNodes: { stop: (delay?: number) => void }[] = [];

  constructor() {
    // Lazy init audio context on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.value = 0.85;

      this.pianoGainNode = this.ctx.createGain();
      this.pianoGainNode.gain.value = 0.8;

      this.violinGainNode = this.ctx.createGain();
      this.violinGainNode.gain.value = 0.8;

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 256;

      // Reverb simulation using delay/feedback network
      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.12;
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.35;
      const filter = this.ctx.createBiquadFilter();
      filter.frequency.value = 2200;

      delay.connect(feedback);
      feedback.connect(filter);
      filter.connect(delay);

      this.pianoGainNode.connect(this.masterGainNode);
      this.violinGainNode.connect(this.masterGainNode);

      // Reverb send
      this.pianoGainNode.connect(delay);
      this.violinGainNode.connect(delay);
      delay.connect(this.masterGainNode);

      this.masterGainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public loadSong(song: Song) {
    this.stop();
    this.currentSong = song;
    this.pauseOffset = 0;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.currentSong) return;

    this.isPlaying = true;
    this.startTime = this.ctx.currentTime - this.pauseOffset;

    this.scheduleNotes();
    this.startProgressLoop();
  }

  public pause() {
    if (!this.isPlaying || !this.ctx) return;
    this.isPlaying = false;
    this.pauseOffset = this.ctx.currentTime - this.startTime;
    this.stopAllActiveAudio();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  public stop() {
    this.pause();
    this.pauseOffset = 0;
    this.activeNotesMap.clear();
  }

  public seek(seconds: number) {
    const wasPlaying = this.isPlaying;
    if (this.isPlaying) {
      this.pause();
    }
    this.pauseOffset = Math.max(0, Math.min(seconds, this.currentSong?.duration || 0));
    if (wasPlaying) {
      this.play();
    }
  }

  public setPianoVolume(vol: number) {
    if (this.pianoGainNode) {
      this.pianoGainNode.gain.value = vol;
    }
  }

  public setViolinVolume(vol: number) {
    if (this.violinGainNode) {
      this.violinGainNode.gain.value = vol;
    }
  }

  public playNoteManual(pitch: string, instrument: 'piano' | 'violin', duration = 1.5) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (instrument === 'piano') {
      this.triggerPianoNote(pitch, now, duration, 0.8);
    } else {
      this.triggerViolinNote(pitch, now, duration, 0.8, true);
    }
  }

  private stopAllActiveAudio() {
    this.activeNodes.forEach(node => {
      try {
        node.stop(0);
      } catch {}
    });
    this.activeNodes = [];
  }

  private scheduleNotes() {
    if (!this.ctx || !this.currentSong) return;

    this.stopAllActiveAudio();

    const currentPos = this.pauseOffset;
    const ctxNow = this.ctx.currentTime;

    // Schedule Piano Notes
    this.currentSong.pianoNotes.forEach(note => {
      if (note.startTime >= currentPos) {
        const scheduleTime = ctxNow + (note.startTime - currentPos);
        this.triggerPianoNote(note.pitch, scheduleTime, note.duration, note.velocity || 0.7);
      }
    });

    // Schedule Violin Notes
    this.currentSong.violinNotes.forEach(note => {
      if (note.startTime >= currentPos) {
        const scheduleTime = ctxNow + (note.startTime - currentPos);
        this.triggerViolinNote(note.pitch, scheduleTime, note.duration, note.velocity || 0.75, note.vibrato ?? true);
      }
    });
  }

  // Synthesis for Piano: Warm felt piano sound using sine + triangle overtones & hammer attack decay
  private triggerPianoNote(pitch: string, time: number, duration: number, velocity: number) {
    if (!this.ctx || !this.pianoGainNode) return;

    const freq = noteToFreq(pitch);

    // Fundamental (sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = freq;

    // Harmonic 2 (triangle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = freq * 2;

    const noteGain = this.ctx.createGain();
    const gainVal = velocity * 0.45;

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(gainVal, time + 0.015); // Fast piano attack
    noteGain.gain.exponentialRampToValueAtTime(gainVal * 0.4, time + 0.3); // Decay to sustain
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration); // Long sustained release

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = Math.min(3500, freq * 4); // Soft acoustic filter

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.pianoGainNode);

    osc1.start(time);
    osc2.start(time);

    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);

    const activeItem = {
      stop: (d = 0) => {
        try {
          osc1.stop(this.ctx!.currentTime + d);
          osc2.stop(this.ctx!.currentTime + d);
        } catch {}
      }
    };
    this.activeNodes.push(activeItem);
  }

  // Synthesis for Violin: Sawtooth sound through body resonance formant filter with bow swelling & vibrato LFO
  private triggerViolinNote(pitch: string, time: number, duration: number, velocity: number, hasVibrato: boolean) {
    if (!this.ctx || !this.violinGainNode) return;

    const freq = noteToFreq(pitch);

    // Main Sawtooth
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    // Vibrato LFO
    let lfo: OscillatorNode | null = null;
    let lfoGain: GainNode | null = null;
    if (hasVibrato) {
      lfo = this.ctx.createOscillator();
      lfo.frequency.value = 5.3; // 5.3 Hz expressive vibrato
      lfoGain = this.ctx.createGain();
      lfoGain.gain.value = freq * 0.018; // 1.8% pitch bend depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(time + 0.15); // Vibrato sets in after bow attack
      lfo.stop(time + duration);
    }

    // Acoustic Body Formant Filter
    const bodyFilter = this.ctx.createBiquadFilter();
    bodyFilter.type = 'bandpass';
    bodyFilter.frequency.value = 1800; // Violin body resonance peak
    bodyFilter.Q.value = 2.2;

    const noteGain = this.ctx.createGain();
    const peakGain = velocity * 0.4;

    // Emotional Bow Swell Envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(peakGain, time + Math.min(0.25, duration * 0.3)); // Emotional bow swell
    noteGain.gain.setValueAtTime(peakGain * 0.9, time + duration - 0.2);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration); // Gentle release

    osc.connect(bodyFilter);
    bodyFilter.connect(noteGain);
    noteGain.connect(this.violinGainNode);

    osc.start(time);
    osc.stop(time + duration + 0.05);

    const activeItem = {
      stop: (d = 0) => {
        try {
          osc.stop(this.ctx!.currentTime + d);
          if (lfo) lfo.stop(this.ctx!.currentTime + d);
        } catch {}
      }
    };
    this.activeNodes.push(activeItem);
  }

  private startProgressLoop() {
    const update = () => {
      if (!this.isPlaying || !this.ctx || !this.currentSong) return;

      const elapsed = this.ctx.currentTime - this.startTime;

      if (elapsed >= this.currentSong.duration) {
        this.stop();
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
        return;
      }

      // Calculate active notes for UI visualization
      const activePiano: string[] = [];
      const activeViolin: string[] = [];

      this.currentSong.pianoNotes.forEach(n => {
        if (elapsed >= n.startTime && elapsed <= n.startTime + n.duration) {
          activePiano.push(n.pitch);
        }
      });

      this.currentSong.violinNotes.forEach(n => {
        if (elapsed >= n.startTime && elapsed <= n.startTime + n.duration) {
          activeViolin.push(n.pitch);
        }
      });

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(elapsed, activePiano, activeViolin);
      }

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  public setCallbacks(
    onTimeUpdate: (time: number, activePianoNotes: string[], activeViolinNotes: string[]) => void,
    onEnded: () => void
  ) {
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndedCallback = onEnded;
  }

  public getAnalyserData(dataArray: Uint8Array): void {
    if (this.analyserNode) {
      this.analyserNode.getByteFrequencyData(dataArray);
    }
  }
}

export const audioEngine = new AudioEngine();
