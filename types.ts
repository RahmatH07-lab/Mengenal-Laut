export type AppMode = 'story' | 'explorer' | 'quiz' | 'ask_kiki' | 'ocean_playground';

export interface SeaCreature {
  id: string;
  name: string;
  scientificName: string;
  category: 'Ikan' | 'Mamalia Laut' | 'Reptil Laut' | 'Moluska & Lainnya';
  icon: string;
  emoji: string;
  badgeColor: string;
  gradient: string;
  shadowColor: string;
  soundType: 'dolphin' | 'whale' | 'splash' | 'bubbles' | 'harp' | 'pop';
  shortDesc: string;
  funFacts: string[];
  superpower: string;
  voiceScript: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface StoryScene {
  id: number;
  creatureId: string;
  title: string;
  subtitle: string;
  kikiExpression: 'happy' | 'excited' | 'thinking' | 'waving' | 'surprised';
  dialogue: string;
  highlightText: string;
  backgroundGradient: string;
  ambientFish: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOption: number | null;
  isAnswered: boolean;
  isCorrect: boolean;
  totalAnswered: number;
}

export interface MusicTheme {
  id: string;
  name: string;
  description: string;
  tempo: number;
  scaleType: 'nursery' | 'calm_ocean' | 'bubble_dance';
}
