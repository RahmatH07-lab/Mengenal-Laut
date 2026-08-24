// Kids Cheerful Web Audio Synthesizer & Sound Effects Engine

export class KidsAudioEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private isMusicPlaying = false;
  private musicTimerId: number | null = null;
  private currentStep = 0;
  private currentTheme: 'nursery' | 'bubble_dance' | 'calm_ocean' = 'nursery';

  // Cheerful Upbeat Nursery Scale Notes (C Major / G Pentatonic cheerful progression)
  private nurseryMelody = [
    { pitch: 523.25, dur: 0.25 }, // C5
    { pitch: 587.33, dur: 0.25 }, // D5
    { pitch: 659.25, dur: 0.25 }, // E5
    { pitch: 783.99, dur: 0.4 },  // G5
    { pitch: 659.25, dur: 0.25 }, // E5
    { pitch: 783.99, dur: 0.25 }, // G5
    { pitch: 880.00, dur: 0.5 },  // A5
    { pitch: 783.99, dur: 0.4 },  // G5

    { pitch: 659.25, dur: 0.25 }, // E5
    { pitch: 587.33, dur: 0.25 }, // D5
    { pitch: 523.25, dur: 0.4 },  // C5
    { pitch: 440.00, dur: 0.25 }, // A4
    { pitch: 523.25, dur: 0.25 }, // C5
    { pitch: 587.33, dur: 0.4 },  // D5
    { pitch: 523.25, dur: 0.6 },  // C5
    { pitch: 0, dur: 0.3 }        // Rest
  ];

  private bubbleDanceMelody = [
    { pitch: 659.25, dur: 0.2 },  // E5
    { pitch: 783.99, dur: 0.2 },  // G5
    { pitch: 987.77, dur: 0.3 },  // B5
    { pitch: 880.00, dur: 0.2 },  // A5
    { pitch: 783.99, dur: 0.2 },  // G5
    { pitch: 659.25, dur: 0.3 },  // E5
    { pitch: 587.33, dur: 0.2 },  // D5
    { pitch: 659.25, dur: 0.4 },  // E5
  ];

  private calmOceanMelody = [
    { pitch: 392.00, dur: 0.6 },  // G4
    { pitch: 523.25, dur: 0.6 },  // C5
    { pitch: 659.25, dur: 0.8 },  // E5
    { pitch: 587.33, dur: 0.5 },  // D5
    { pitch: 440.00, dur: 0.6 },  // A4
    { pitch: 523.25, dur: 1.0 },  // C5
  ];

  constructor() {
    // Lazy init on first touch/click
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.35; // pleasant cheerful background level

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.75;

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Set theme: nursery, bubble_dance, calm_ocean
  public setTheme(theme: 'nursery' | 'bubble_dance' | 'calm_ocean') {
    this.currentTheme = theme;
    this.currentStep = 0;
  }

  public startCheerfulMusic() {
    this.init();
    if (!this.ctx || this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    this.scheduleNextNote();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimerId) {
      clearTimeout(this.musicTimerId);
      this.musicTimerId = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startCheerfulMusic();
      return true;
    }
  }

  public setMusicVolume(vol: number) {
    if (this.musicGain) {
      this.musicGain.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  public setSfxVolume(vol: number) {
    if (this.sfxGain) {
      this.sfxGain.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private scheduleNextNote() {
    if (!this.isMusicPlaying || !this.ctx) return;

    const melody = this.currentTheme === 'bubble_dance' 
      ? this.bubbleDanceMelody 
      : this.currentTheme === 'calm_ocean' 
        ? this.calmOceanMelody 
        : this.nurseryMelody;

    const note = melody[this.currentStep % melody.length];
    this.currentStep++;

    if (note.pitch > 0) {
      this.playMarimbaNote(note.pitch, note.dur);
      // occasional sweet bass accompaniment note
      if (this.currentStep % 4 === 1) {
        this.playCuteBass(note.pitch / 2, note.dur * 1.5);
      }
    }

    const nextDelay = (note.dur * 1000) * 0.95;
    this.musicTimerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, nextDelay);
  }

  // Play cheerful marimba/kalimba chime
  private playMarimbaNote(freq: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, now); // Sweet harmonic glockenspiel sparkle

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.1);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.15);
    osc2.stop(now + duration + 0.15);
  }

  // Gentle acoustic walking bass for nursery feel
  private playCuteBass(freq: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // ================= SFX METHODS ================= //

  // Pop! Bubble bursting sound
  public playBubblePop() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08); // Rising pop

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Splash water sound
  public playSplash() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Pink noise burst + lowpass sweep
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.35);
  }

  // Happy success fanfare / cheer chime
  public playCheerChime() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const startTime = now + index * 0.1;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.4, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  // Dolphin whistle / chirp effect
  public playDolphinWhistle() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.linearRampToValueAtTime(3200, now + 0.12);
    osc.frequency.linearRampToValueAtTime(2600, now + 0.24);
    osc.frequency.linearRampToValueAtTime(3800, now + 0.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Deep majestic whale song echo
  public playWhaleSong() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.6);
    osc.frequency.exponentialRampToValueAtTime(140, now + 1.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 1.6);
  }

  // Harp glissando / magical shimmer
  public playHarpSparkle() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const pentatonic = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    pentatonic.forEach((freq, idx) => {
      const startTime = now + idx * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  // Sonar beep
  public playSonarPing() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.65);
  }
}

export const kidsAudioEngine = new KidsAudioEngine();
