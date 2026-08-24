// Child Voice Narration Service (Bahasa Indonesia)

export class KidsVoiceService {
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onSpeakingStateChange?: (isSpeaking: boolean) => void;
  private onBoundaryCallback?: (charIndex: number) => void;

  constructor() {
    // Check speech synthesis support
  }

  public setCallbacks(
    onSpeakingChange: (isSpeaking: boolean) => void,
    onBoundary?: (charIndex: number) => void
  ) {
    this.onSpeakingStateChange = onSpeakingChange;
    this.onBoundaryCallback = onBoundary;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported on this browser.');
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    // Clean text of emojis before passing to speech synthesizer
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.pitch = 1.35; // Cute, cheerful, friendly kid/narrator voice pitch
    utterance.rate = 0.92;  // Slightly relaxed speed so 5-year-old kids can absorb every word clearly

    // Select Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indoVoice = voices.find(v => v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia'));
    if (indoVoice) {
      utterance.voice = indoVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onSpeakingStateChange) {
        this.onSpeakingStateChange(true);
      }
    };

    utterance.onboundary = (event) => {
      if (this.onBoundaryCallback) {
        this.onBoundaryCallback(event.charIndex);
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onSpeakingStateChange) {
        this.onSpeakingStateChange(false);
      }
      if (onEnd) {
        onEnd();
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onSpeakingStateChange) {
        this.onSpeakingStateChange(false);
      }
      if (onEnd) {
        onEnd();
      }
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    if (this.onSpeakingStateChange) {
      this.onSpeakingStateChange(false);
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const kidsVoiceService = new KidsVoiceService();
