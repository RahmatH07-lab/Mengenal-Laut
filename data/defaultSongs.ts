import { Song } from '../types';

export const DEFAULT_SONGS: Song[] = [
  {
    id: 'whispers-unspoken-light',
    title: 'Whispers in the Unspoken Light',
    subtitle: 'A Slow, Emotional Duet for Piano & Violin',
    composer: 'Piano & Violin Studio',
    keySignature: 'D Minor',
    bpm: 60,
    timeSignature: '4/4',
    duration: 80, // 80 seconds preview track
    mood: 'Slow, Poignant, Melancholy & Hopeful',
    description: 'A deeply intimate composition where tender piano chords lay a gentle foundation for a weeping, expressive violin melody. Built strictly for piano and violin in slow 60 BPM.',
    storyContext: 'Written in a quiet room at midnight as rain tapped against glass. It speaks of words left unsaid, memories that warm the soul, and the quiet comfort of letting go.',
    lyrics: [
      {
        id: 'l1',
        startTime: 0,
        endTime: 8,
        section: 'Intro',
        text: '(Piano plays a soft, falling D minor arpeggio...)',
        chord: 'Dm',
        translationIndo: '(Piano memainkan arpeggio D minor yang lembut...)'
      },
      {
        id: 'l2',
        startTime: 8,
        endTime: 16,
        section: 'Verse 1',
        text: 'The shadows lengthen on the quiet floor,',
        chord: 'Dm',
        translationIndo: 'Bayang-bayang memanjang di lantai yang hening,'
      },
      {
        id: 'l3',
        startTime: 16,
        endTime: 24,
        section: 'Verse 1',
        text: 'And distant memories knock upon my door.',
        chord: 'B♭',
        translationIndo: 'Dan kenangan jauh mengetuk pintu hatiku.'
      },
      {
        id: 'l4',
        startTime: 24,
        endTime: 31,
        section: 'Pre-Chorus',
        text: 'I hold the silence that you left behind,',
        chord: 'F',
        translationIndo: 'Kupeluk keheningan yang kau tinggalkan,'
      },
      {
        id: 'l5',
        startTime: 31,
        endTime: 38,
        section: 'Pre-Chorus',
        text: 'A gentle rhythm woven in my mind.',
        chord: 'C',
        translationIndo: 'Sebuah irama lembut yang teranyam di benakku.'
      },
      {
        id: 'l6',
        startTime: 38,
        endTime: 46,
        section: 'Chorus',
        text: 'Oh, softly play where the golden light turns cold,',
        chord: 'Gm',
        translationIndo: 'Oh, mainkan dengan lembut di mana cahaya keemasan mendingin,'
      },
      {
        id: 'l7',
        startTime: 46,
        endTime: 54,
        section: 'Chorus',
        text: 'Every tear a story never told.',
        chord: 'A7',
        translationIndo: 'Setiap tetes air mata adalah kisah yang tak pernah terucap.'
      },
      {
        id: 'l8',
        startTime: 54,
        endTime: 62,
        section: 'Chorus',
        text: 'In piano notes and violin\'s embrace,',
        chord: 'Dm',
        translationIndo: 'Dalam alunan piano dan pelukan biola,'
      },
      {
        id: 'l9',
        startTime: 62,
        endTime: 70,
        section: 'Violin Solo',
        text: '(Violin swells into a soaring, emotional solo above sustained piano chords...)',
        chord: 'B♭ -> F -> C',
        translationIndo: '(Biola melambung tinggi dalam solo emosional di atas alunan piano...)'
      },
      {
        id: 'l10',
        startTime: 70,
        endTime: 80,
        section: 'Outro',
        text: 'We rest in peace... in time and grace.',
        chord: 'Dm',
        translationIndo: 'Kita beristirahat dalam damai... dalam waktu dan keanggunan.'
      }
    ],
    chords: [
      { time: 0, chord: 'Dm', notes: ['D3', 'F3', 'A3', 'D4'] },
      { time: 8, chord: 'Dm', notes: ['D3', 'F3', 'A3'] },
      { time: 16, chord: 'B♭', notes: ['Bb2', 'D3', 'F3'] },
      { time: 24, chord: 'F', notes: ['F3', 'A3', 'C4'] },
      { time: 31, chord: 'C', notes: ['C3', 'E3', 'G3'] },
      { time: 38, chord: 'Gm', notes: ['G2', 'Bb3', 'D4'] },
      { time: 46, chord: 'A7', notes: ['A2', 'C#3', 'E3', 'G3'] },
      { time: 54, chord: 'Dm', notes: ['D3', 'F3', 'A3'] },
      { time: 62, chord: 'B♭', notes: ['Bb2', 'D3', 'F3'] },
      { time: 70, chord: 'Dm', notes: ['D2', 'F3', 'A3', 'D4'] }
    ],
    pianoNotes: [
      // Intro (0 - 8s)
      { pitch: 'D3', startTime: 0.0, duration: 3.5, velocity: 0.8, instrument: 'piano' },
      { pitch: 'F3', startTime: 0.4, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'A3', startTime: 0.8, duration: 2.8, velocity: 0.7, instrument: 'piano' },
      { pitch: 'D4', startTime: 1.2, duration: 2.5, velocity: 0.75, instrument: 'piano' },
      { pitch: 'F4', startTime: 2.0, duration: 2.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'E4', startTime: 3.0, duration: 2.0, velocity: 0.65, instrument: 'piano' },
      { pitch: 'D4', startTime: 4.0, duration: 3.5, velocity: 0.7, instrument: 'piano' },

      // Verse 1 (8 - 24s)
      { pitch: 'D3', startTime: 8.0, duration: 3.8, velocity: 0.7, instrument: 'piano' },
      { pitch: 'A3', startTime: 8.5, duration: 3.0, velocity: 0.6, instrument: 'piano' },
      { pitch: 'D4', startTime: 9.0, duration: 2.8, velocity: 0.65, instrument: 'piano' },
      { pitch: 'F4', startTime: 10.0, duration: 2.5, velocity: 0.65, instrument: 'piano' },
      { pitch: 'E4', startTime: 12.0, duration: 2.5, velocity: 0.6, instrument: 'piano' },

      { pitch: 'Bb2', startTime: 16.0, duration: 3.8, velocity: 0.75, instrument: 'piano' },
      { pitch: 'F3', startTime: 16.5, duration: 3.0, velocity: 0.65, instrument: 'piano' },
      { pitch: 'Bb3', startTime: 17.0, duration: 2.8, velocity: 0.65, instrument: 'piano' },
      { pitch: 'D4', startTime: 18.0, duration: 2.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'C4', startTime: 20.0, duration: 2.5, velocity: 0.65, instrument: 'piano' },

      // Pre-Chorus (24 - 38s)
      { pitch: 'F2', startTime: 24.0, duration: 3.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'C3', startTime: 24.5, duration: 3.0, velocity: 0.6, instrument: 'piano' },
      { pitch: 'F3', startTime: 25.0, duration: 2.8, velocity: 0.65, instrument: 'piano' },
      { pitch: 'A3', startTime: 26.0, duration: 2.5, velocity: 0.65, instrument: 'piano' },

      { pitch: 'C3', startTime: 31.0, duration: 3.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'G3', startTime: 31.5, duration: 3.0, velocity: 0.6, instrument: 'piano' },
      { pitch: 'C4', startTime: 32.0, duration: 2.8, velocity: 0.65, instrument: 'piano' },
      { pitch: 'E4', startTime: 34.0, duration: 2.5, velocity: 0.65, instrument: 'piano' },

      // Chorus (38 - 62s)
      { pitch: 'G2', startTime: 38.0, duration: 3.8, velocity: 0.8, instrument: 'piano' },
      { pitch: 'D3', startTime: 38.5, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'Bb3', startTime: 39.0, duration: 2.8, velocity: 0.7, instrument: 'piano' },
      { pitch: 'D4', startTime: 40.0, duration: 2.5, velocity: 0.75, instrument: 'piano' },

      { pitch: 'A2', startTime: 46.0, duration: 3.8, velocity: 0.8, instrument: 'piano' },
      { pitch: 'E3', startTime: 46.5, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'A3', startTime: 47.0, duration: 2.8, velocity: 0.7, instrument: 'piano' },
      { pitch: 'C#4', startTime: 48.0, duration: 2.5, velocity: 0.75, instrument: 'piano' },

      { pitch: 'D3', startTime: 54.0, duration: 4.0, velocity: 0.85, instrument: 'piano' },
      { pitch: 'F3', startTime: 54.5, duration: 3.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'A3', startTime: 55.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'D4', startTime: 56.0, duration: 2.5, velocity: 0.75, instrument: 'piano' },

      // Violin Solo Support (62 - 70s)
      { pitch: 'Bb2', startTime: 62.0, duration: 3.8, velocity: 0.8, instrument: 'piano' },
      { pitch: 'F3', startTime: 62.5, duration: 3.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'C3', startTime: 66.0, duration: 3.8, velocity: 0.8, instrument: 'piano' },
      { pitch: 'G3', startTime: 66.5, duration: 3.0, velocity: 0.7, instrument: 'piano' },

      // Outro (70 - 80s)
      { pitch: 'D2', startTime: 70.0, duration: 8.0, velocity: 0.85, instrument: 'piano' },
      { pitch: 'D3', startTime: 71.0, duration: 7.0, velocity: 0.7, instrument: 'piano' },
      { pitch: 'F3', startTime: 72.0, duration: 6.0, velocity: 0.65, instrument: 'piano' },
      { pitch: 'A3', startTime: 73.0, duration: 5.0, velocity: 0.6, instrument: 'piano' },
      { pitch: 'D4', startTime: 74.0, duration: 4.0, velocity: 0.55, instrument: 'piano' }
    ],
    violinNotes: [
      // Intro Violin Entrance (4.0s)
      { pitch: 'A4', startTime: 4.0, duration: 3.5, velocity: 0.65, instrument: 'violin', vibrato: true },
      { pitch: 'D5', startTime: 7.5, duration: 2.5, velocity: 0.7, instrument: 'violin', vibrato: true },

      // Verse 1 Melody (10s - 24s)
      { pitch: 'F5', startTime: 10.0, duration: 2.8, velocity: 0.75, instrument: 'violin', vibrato: true },
      { pitch: 'E5', startTime: 12.8, duration: 1.5, velocity: 0.7, instrument: 'violin', vibrato: true },
      { pitch: 'D5', startTime: 14.3, duration: 2.0, velocity: 0.65, instrument: 'violin', vibrato: true },

      { pitch: 'F5', startTime: 17.0, duration: 2.5, velocity: 0.8, instrument: 'violin', vibrato: true },
      { pitch: 'G5', startTime: 19.5, duration: 2.0, velocity: 0.8, instrument: 'violin', vibrato: true },
      { pitch: 'A5', startTime: 21.5, duration: 2.5, velocity: 0.85, instrument: 'violin', vibrato: true },

      // Pre-Chorus Melody (25s - 38s)
      { pitch: 'C5', startTime: 25.0, duration: 3.0, velocity: 0.7, instrument: 'violin', vibrato: true },
      { pitch: 'A4', startTime: 28.0, duration: 2.5, velocity: 0.65, instrument: 'violin', vibrato: true },

      { pitch: 'G4', startTime: 32.0, duration: 2.5, velocity: 0.7, instrument: 'violin', vibrato: true },
      { pitch: 'B4', startTime: 34.5, duration: 2.0, velocity: 0.75, instrument: 'violin', vibrato: true },
      { pitch: 'C5', startTime: 36.5, duration: 2.0, velocity: 0.8, instrument: 'violin', vibrato: true },

      // Chorus Soaring Melody (38s - 62s)
      { pitch: 'D5', startTime: 38.5, duration: 3.5, velocity: 0.85, instrument: 'violin', vibrato: true },
      { pitch: 'F5', startTime: 42.0, duration: 3.5, velocity: 0.9, instrument: 'violin', vibrato: true },

      { pitch: 'E5', startTime: 46.5, duration: 3.5, velocity: 0.85, instrument: 'violin', vibrato: true },
      { pitch: 'C#5', startTime: 50.0, duration: 3.5, velocity: 0.8, instrument: 'violin', vibrato: true },

      { pitch: 'D5', startTime: 54.5, duration: 3.0, velocity: 0.9, instrument: 'violin', vibrato: true },
      { pitch: 'A5', startTime: 57.5, duration: 4.0, velocity: 0.95, instrument: 'violin', vibrato: true },

      // Violin Solo Peak (62s - 70s)
      { pitch: 'Bb5', startTime: 62.0, duration: 2.5, velocity: 0.95, instrument: 'violin', vibrato: true },
      { pitch: 'A5', startTime: 64.5, duration: 2.0, velocity: 0.9, instrument: 'violin', vibrato: true },
      { pitch: 'G5', startTime: 66.5, duration: 2.0, velocity: 0.85, instrument: 'violin', vibrato: true },
      { pitch: 'F5', startTime: 68.5, duration: 2.0, velocity: 0.8, instrument: 'violin', vibrato: true },

      // Outro Gentle Fade (70s - 80s)
      { pitch: 'E5', startTime: 71.0, duration: 2.5, velocity: 0.7, instrument: 'violin', vibrato: true },
      { pitch: 'D5', startTime: 73.5, duration: 5.5, velocity: 0.6, instrument: 'violin', vibrato: true }
    ],
    abcNotation: `X:1
T:Whispers in the Unspoken Light
C:Piano & Violin Duo
M:4/4
L:1/8
Q:1/4=60
K:Dm
V:1 name="Violin"
| z4 A4 | d4 f3 e | d2 z2 f3 g | a4 c'4 | a4 g3 b | c'4 d'4 | f'4 e'4 | c'#4 d'4 | a'8 | b'2 a'2 g2 f2 | e2 d6 |]
V:2 name="Piano"
| "Dm" D,F,A,D F,E,D,2 | "Dm" D,F,A,D F,E,D,2 | "Bb" B,,F,B,D C,2 B,,2 | "F" F,,C,F,A, C,2 F,,2 | "C" C,,G,,C,E G,2 C,2 | "Gm" G,,D,G,B, D,2 G,,2 | "A7" A,,E,A,C# E,2 A,,2 | "Dm" D,F,A,D F,E,D,2 | "Bb" B,,F,B,D "C" C,,G,,C,E | "Dm" D,,8 |]
`
  },
  {
    id: 'tears-on-ivory-wood',
    title: 'Tears on Ivory & Wood',
    subtitle: 'Solitude & Acceptance in A Minor',
    composer: 'Piano & Violin Studio',
    keySignature: 'A Minor',
    bpm: 58,
    timeSignature: '4/4',
    duration: 72,
    mood: 'Slow, Tender, Intimate & Healing',
    description: 'A slow waltz-like ballad featuring delicate piano arpeggios that intertwine with a sorrowful, crying violin melody.',
    storyContext: 'Inspired by late night reflections after a long separation. The music softly climbs from sorrow into quiet acceptance.',
    lyrics: [
      { id: 't1', startTime: 0, endTime: 8, section: 'Intro', text: '(Soft A minor piano chords resonate quietly...)', chord: 'Am', translationIndo: '(Alunan piano A minor yang lembut bergema...)' },
      { id: 't2', startTime: 8, endTime: 18, section: 'Verse 1', text: 'I close my eyes and hear the rain outside,', chord: 'Am', translationIndo: 'Kupejamkan mata dan kudengar hujan di luar,' },
      { id: 't3', startTime: 18, endTime: 28, section: 'Verse 1', text: 'No words left now for my breaking pride.', chord: 'F', translationIndo: 'Tak ada lagi kata untuk kesombonganku yang hancur.' },
      { id: 't4', startTime: 28, endTime: 38, section: 'Chorus', text: 'Sing to me, silent strings, through the cold night air,', chord: 'C', translationIndo: 'Bernyanyilah padaku, dawai hening, di udara malam yang dingin,' },
      { id: 't5', startTime: 38, endTime: 48, section: 'Chorus', text: 'Tell me that love was never unfair.', chord: 'G', translationIndo: 'Katakan padaku bahwa cinta tak pernah tidak adil.' },
      { id: 't6', startTime: 48, endTime: 60, section: 'Violin Solo', text: '(Violin performs an expressive, emotional ascending phrase...)', chord: 'Dm -> E7 -> Am', translationIndo: '(Biola memainkan nada melambung tinggi yang penuh emosi...)' },
      { id: 't7', startTime: 60, endTime: 72, section: 'Outro', text: 'Fade into peace...', chord: 'Am', translationIndo: 'Pudar dalam kedamaian...' }
    ],
    chords: [
      { time: 0, chord: 'Am', notes: ['A2', 'C3', 'E3', 'A3'] },
      { time: 18, chord: 'F', notes: ['F2', 'A2', 'C3', 'F3'] },
      { time: 28, chord: 'C', notes: ['C3', 'E3', 'G3', 'C4'] },
      { time: 38, chord: 'G', notes: ['G2', 'B2', 'D3', 'G3'] },
      { time: 48, chord: 'Dm', notes: ['D3', 'F3', 'A3'] },
      { time: 54, chord: 'E7', notes: ['E3', 'G#3', 'B3', 'D4'] },
      { time: 60, chord: 'Am', notes: ['A2', 'C3', 'E3', 'A3'] }
    ],
    pianoNotes: [
      { pitch: 'A2', startTime: 0, duration: 4, velocity: 0.75, instrument: 'piano' },
      { pitch: 'C3', startTime: 0.5, duration: 3.5, velocity: 0.65, instrument: 'piano' },
      { pitch: 'E3', startTime: 1.0, duration: 3.0, velocity: 0.65, instrument: 'piano' },
      { pitch: 'A3', startTime: 1.5, duration: 2.5, velocity: 0.7, instrument: 'piano' },

      { pitch: 'F2', startTime: 18, duration: 4, velocity: 0.75, instrument: 'piano' },
      { pitch: 'A2', startTime: 18.5, duration: 3.5, velocity: 0.65, instrument: 'piano' },
      { pitch: 'C3', startTime: 19.0, duration: 3.0, velocity: 0.65, instrument: 'piano' },

      { pitch: 'C3', startTime: 28, duration: 4, velocity: 0.8, instrument: 'piano' },
      { pitch: 'E3', startTime: 28.5, duration: 3.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'G3', startTime: 29.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },

      { pitch: 'G2', startTime: 38, duration: 4, velocity: 0.8, instrument: 'piano' },
      { pitch: 'B2', startTime: 38.5, duration: 3.5, velocity: 0.7, instrument: 'piano' },
      { pitch: 'D3', startTime: 39.0, duration: 3.0, velocity: 0.7, instrument: 'piano' },

      { pitch: 'A2', startTime: 60, duration: 12, velocity: 0.8, instrument: 'piano' }
    ],
    violinNotes: [
      { pitch: 'E5', startTime: 4.0, duration: 3.5, velocity: 0.7, instrument: 'violin', vibrato: true },
      { pitch: 'A5', startTime: 8.0, duration: 4.0, velocity: 0.8, instrument: 'violin', vibrato: true },
      { pitch: 'G5', startTime: 12.0, duration: 3.5, velocity: 0.75, instrument: 'violin', vibrato: true },
      { pitch: 'F5', startTime: 15.5, duration: 2.5, velocity: 0.7, instrument: 'violin', vibrato: true },

      { pitch: 'C5', startTime: 28.0, duration: 4.0, velocity: 0.85, instrument: 'violin', vibrato: true },
      { pitch: 'E5', startTime: 32.0, duration: 4.0, velocity: 0.9, instrument: 'violin', vibrato: true },

      { pitch: 'B5', startTime: 48.0, duration: 3.0, velocity: 0.95, instrument: 'violin', vibrato: true },
      { pitch: 'C6', startTime: 51.0, duration: 3.0, velocity: 0.95, instrument: 'violin', vibrato: true },
      { pitch: 'B5', startTime: 54.0, duration: 3.0, velocity: 0.85, instrument: 'violin', vibrato: true },
      { pitch: 'A5', startTime: 57.0, duration: 3.0, velocity: 0.8, instrument: 'violin', vibrato: true },
      { pitch: 'A4', startTime: 60.0, duration: 10.0, velocity: 0.6, instrument: 'violin', vibrato: true }
    ],
    abcNotation: `X:2
T:Tears on Ivory & Wood
M:4/4
L:1/8
Q:1/4=58
K:Am
V:1 name="Violin"
| z4 E4 | A8 | G6 F2 | C8 | E8 | B4 c4 | B4 A4 | A8 |]
`
  }
];
