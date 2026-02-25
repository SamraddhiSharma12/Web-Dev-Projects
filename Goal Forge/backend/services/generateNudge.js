import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateNudgeMessage = async (type, goalTitle) => {
  const promptMap = {
    motivation: `Encourage the user for consistent progress on "${goalTitle}" in 1–2 lines.`,
    warning: `Motivate the user to resume work on "${goalTitle}" politely.`,
    inactive: `Send a gentle reminder to restart work on "${goalTitle}".`,
  };

  const res = await client.models.generateContent({
    model: "models/gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: promptMap[type] }] }],
  });

  return res.text;
};
