import { GoogleGenAI, Type } from "@google/genai";
import { Song, NoteEvent, LyricLine, ChordItem } from '../types';

let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY || process.env.API_KEY) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
}

const songResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Poetic English song title" },
    subtitle: { type: Type.STRING, description: "Subheading e.g. 'A Slow Piano & Violin Elegie'" },
    keySignature: { type: Type.STRING, description: "Musical key e.g. 'D Minor', 'F Minor', 'A Minor'" },
    bpm: { type: Type.NUMBER, description: "Tempo in BPM (must be slow, e.g. 52-65)" },
    mood: { type: Type.STRING, description: "Emotional description e.g. 'Slow, Deeply Emotional, Solitary'" },
    storyContext: { type: Type.STRING, description: "Background story or theme behind the composition" },
    lyrics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          section: { type: Type.STRING, description: "Intro, Verse 1, Pre-Chorus, Chorus, Verse 2, Violin Solo, or Outro" },
          text: { type: Type.STRING, description: "Poetic English lyric line or instrumental instruction" },
          chord: { type: Type.STRING, description: "Chord symbol e.g. 'Dm', 'B♭', 'F', 'C'" },
          translationIndo: { type: Type.STRING, description: "Indonesian translation of the lyric line" }
        },
        required: ["section", "text", "chord"]
      }
    },
    chords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.NUMBER, description: "Timestamp in seconds" },
          chord: { type: Type.STRING, description: "Chord symbol" },
          notes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Piano chord pitches e.g. ['D3', 'F3', 'A3', 'D4']"
          }
        },
        required: ["time", "chord", "notes"]
      }
    },
    pianoNotes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          pitch: { type: Type.STRING, description: "Pitch e.g. 'D3', 'F3', 'A3', 'D4'" },
          startTime: { type: Type.NUMBER, description: "Start time in seconds" },
          duration: { type: Type.NUMBER, description: "Duration in seconds" },
          velocity: { type: Type.NUMBER, description: "Dynamic level 0.5 to 1.0" }
        },
        required: ["pitch", "startTime", "duration"]
      }
    },
    violinNotes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          pitch: { type: Type.STRING, description: "Pitch e.g. 'A4', 'D5', 'F5', 'A5'" },
          startTime: { type: Type.NUMBER, description: "Start time in seconds" },
          duration: { type: Type.NUMBER, description: "Duration in seconds" },
          velocity: { type: Type.NUMBER, description: "Dynamic level 0.5 to 1.0" },
          vibrato: { type: Type.BOOLEAN, description: "Whether to apply violin vibrato" }
        },
        required: ["pitch", "startTime", "duration"]
      }
    },
    abcNotation: { type: Type.STRING, description: "ABC Sheet Music notation string" }
  },
  required: ["title", "subtitle", "keySignature", "bpm", "mood", "storyContext", "lyrics", "chords", "pianoNotes", "violinNotes"]
};

export async function generateSongWithGemini(
  userTheme: string,
  preferredKey = "D Minor",
  preferredBpm = 60
): Promise<Song> {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your environment.");
  }

  const prompt = `You are a world-class classical & modern cinematic composer specializing strictly in SLOW, EMOTIONAL DUETS FOR PIANO AND VIOLIN ONLY.
The user wants a slow, deeply emotional song written in ENGLISH inspired by the theme: "${userTheme}".
Preferred Key: ${preferredKey}, Preferred Tempo: ${preferredBpm} BPM.

STRICT INSTRUCTIONS:
1. The song MUST be composed exclusively for Piano and Violin instruments.
2. The lyrics MUST be in English, poetic, deeply emotional, mournful yet beautiful. Include an Indonesian translation field ('translationIndo') for user clarity.
3. Generate realistic, musical pitch arrays for piano (low/mid chords and arpeggios) and violin (high soaring legato melody lines with vibrato).
4. Provide a total duration between 60 and 90 seconds with precise timestamps for lyrics and notes.
5. Return strictly valid JSON adhering to the required schema. No text outside JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: songResponseSchema,
      temperature: 0.7,
    }
  });

  const responseText = response.text || '';
  const cleaned = responseText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  // Format into Song model
  const duration = Math.max(
    ...parsed.lyrics.map((l: { startTime?: number }) => (l.startTime || 0) + 8),
    ...parsed.violinNotes.map((n: { startTime?: number; duration?: number }) => (n.startTime || 0) + (n.duration || 0)),
    70
  );

  const formattedLyrics: LyricLine[] = parsed.lyrics.map((l: any, index: number) => ({
    id: `g_lyric_${index}`,
    startTime: l.startTime !== undefined ? l.startTime : index * 8,
    endTime: l.endTime !== undefined ? l.endTime : (index + 1) * 8,
    text: l.text,
    chord: l.chord,
    section: l.section || 'Verse 1',
    translationIndo: l.translationIndo
  }));

  const formattedPianoNotes: NoteEvent[] = parsed.pianoNotes.map((n: any) => ({
    pitch: n.pitch,
    startTime: n.startTime,
    duration: n.duration,
    velocity: n.velocity || 0.7,
    instrument: 'piano'
  }));

  const formattedViolinNotes: NoteEvent[] = parsed.violinNotes.map((n: any) => ({
    pitch: n.pitch,
    startTime: n.startTime,
    duration: n.duration,
    velocity: n.velocity || 0.8,
    instrument: 'violin',
    vibrato: n.vibrato !== false
  }));

  const formattedChords: ChordItem[] = parsed.chords.map((c: any) => ({
    time: c.time,
    chord: c.chord,
    notes: c.notes || []
  }));

  const newSong: Song = {
    id: `gemini-${Date.now()}`,
    title: parsed.title,
    subtitle: parsed.subtitle,
    composer: 'Gemini AI & Piano-Violin Ensemble',
    keySignature: parsed.keySignature || preferredKey,
    bpm: parsed.bpm || preferredBpm,
    timeSignature: '4/4',
    duration: Math.ceil(duration),
    mood: parsed.mood,
    description: `AI-composed slow emotional piece for Piano & Violin inspired by "${userTheme}".`,
    storyContext: parsed.storyContext,
    lyrics: formattedLyrics,
    chords: formattedChords,
    pianoNotes: formattedPianoNotes,
    violinNotes: formattedViolinNotes,
    abcNotation: parsed.abcNotation || `% ABC notation generated for ${parsed.title}`
  };

  return newSong;
}
