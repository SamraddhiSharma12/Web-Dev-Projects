import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
console.log("Gemini key prefix:", process.env.GEMINI_API_KEY.slice(0, 6));

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const response = await client.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [{ role: "user", parts: [{ text: "Reply only OK" }] }],
  });

  console.log("Gemini response:", response.text);
} catch (err) {
  console.error("PROVE KEY ERROR:", err);
}
