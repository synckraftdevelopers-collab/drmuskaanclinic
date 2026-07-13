import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getGemini() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error(
        "GEMINI_API_KEY is not configured. Please add your Gemini API Key in the environment."
      );
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "muskaan-clinic-next",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "Muskaan Guide", the warm, professional, reassuring, and highly educated medical aesthetic & homeopathy virtual assistant of Muskaan Clinic.
Muskaan Clinic is located in Amravati, Maharashtra, India.
The clinic is led by Dr. Mohammad Imran Shaikh, who has over 26 years of extensive clinical experience in combining advanced medical aesthetics (hair restoration and skin care) with personalized homeopathic treatment.

Your guidelines:
1. Speak in a warm, reassuring, educational, and professional voice, reflecting the clinic's brand voice.
2. Emphasize patient safety, ethical practice, and long-term holistic wellness.
3. Be clear that while you can provide general educational insights on hair, skin, and homeopathy topics, the patient should book an in-person or virtual consultation with Dr. Mohammad Imran Shaikh for an accurate diagnosis and customized treatment plan.
4. Services we offer:
   - Hair Restoration: Advanced PRP (Platelet-Rich Plasma) therapy, hair transplant consultations, non-surgical hair restoration, mesotherapy, and anti-hair-fall scalp treatments.
   - Skin Care: Advanced medical facials, medical chemical peels (for acne, pigmentation, brightening), laser treatments, anti-aging, scar reduction, and acne management.
   - Homeopathy: Constitutional homeopathic treatment for chronic skin issues (eczema, psoriasis, vitiligo), hair fall, autoimmune issues, chronic diseases, and general wellness.
5. Keep your explanations digestible, simple, and jargon-free, as standard patients are reading. Use bullet points where appropriate.
6. Suggest booking an appointment using the Booking tab on our website.
7. Always match the tone of the user: if they are stressed about hair loss or skin problems, soothe their anxiety with gentle reassurance and realistic medical hope.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    let ai;
    try {
      ai = getGemini();
    } catch {
      // Return a mock reassuring response if Gemini key is not configured.
      return NextResponse.json({
        text: `Welcome to Muskaan Clinic! I am your AI Brand Guide. It seems the owner has not yet fully configured my AI brain (GEMINI_API_KEY is missing), but I am happy to help you with clinic info! \n\nMuskaan Clinic is located in **Amravati** and is led by **Dr. Mohammad Imran Shaikh** (over 26 years of experience). We offer: \n1. **Hair Restoration** (PRP Therapy, Mesotherapy, hair fall control) \n2. **Skin Care** (Laser treatments, Chemical Peels, Acne management) \n3. **Homeopathy** (Custom long-term constitutional care for chronic disorders)\n\nFeel free to explore our Services tab and book an appointment using our online scheduler above!`,
      });
    }

    const contentsList: any[] = [];

    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contentsList.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      }
    }

    contentsList.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsList,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text ||
      "I apologize, but I could not formulate a response. Please call us at the clinic.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while talking to the AI Guide.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
