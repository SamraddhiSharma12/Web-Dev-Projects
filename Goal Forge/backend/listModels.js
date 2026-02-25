import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

  try {
    const res = await axios.get(url);
    console.log("Models available for this key:");
    res.data.models.forEach((m) => console.log("-", m.name));
  } catch (err) {
    console.error("REST listing error:", err.response?.data || err.message);
  }
}

listModels();
