import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY || process.env.API_KEY) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
}

export async function askKikiOceanQuestion(question: string): Promise<{ answer: string; funFact: string; creatureEmoji: string }> {
  if (!ai) {
    // Graceful offline fallback with kid-friendly wisdom
    return {
      answer: `Wah, pertanyaan adik hebat sekali tentang "${question}"! Di dalam laut yang luas, semua hewan laut memiliki keajaiban dan tugasnya masing-masing. Mereka hidup berdampingan dengan saling menyayangi dan menjaga terumbu karang tetap indah! 🌊✨`,
      funFact: "Tahukah kamu? Lebih dari 70% permukaan bumi kita diselimuti oleh air laut yang biru!",
      creatureEmoji: "🐬"
    };
  }

  const prompt = `Kamu adalah Kiki, seorang anak kecil berusia 7 tahun berpakaian kapten penyelam yang sangat ceria, ramah, dan pintar tentang hewan laut.
Ada adik kecil berusia 5 tahun bertanya kepadamu: "${question}".

Instruksi khusus:
1. Jawablah dengan bahasa Indonesia yang sangat manis, hangat, ceria, dan mudah dipahami oleh anak usia 5 tahun (gunakan panggilan "Halo adik manis / teman kecilku!", gunakan analogi sederhana yang dekat dengan dunia anak).
2. Maksimal 3-4 kalimat ringkas agar anak tidak bosan dan bisa dibacakan oleh suara narator.
3. Berikan satu fakta unik seru ("funFact") yang membuat anak terkagum-kagum.
4. Pilih satu emoji hewan laut yang paling relevan ("creatureEmoji").
5. Format keluaran harus berupa JSON valid dengan kunci: "answer", "funFact", "creatureEmoji".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      answer: parsed.answer || "Laut itu penuh keajaiban, adikku tersayang!",
      funFact: parsed.funFact || "Hewan laut sangat suka air yang bersih dan jernih!",
      creatureEmoji: parsed.creatureEmoji || "🐠"
    };
  } catch (error) {
    console.error("Gemini AI error:", error);
    return {
      answer: `Pertanyaanmu keren sekali tentang "${question}"! Sahabat-sahabat laut kita selalu punya cara ajaib untuk hidup dan berenang gembira di dalam air biru! 🌊`,
      funFact: "Di laut dalam ada makhluk yang bisa menyala seperti lampu lilin!",
      creatureEmoji: "🐙"
    };
  }
}
