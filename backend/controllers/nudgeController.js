import Nudge from "../models/Nudge.js";
import Goal from "../models/Goals.js";
import { getAIResponse } from "../services/aiService.js";

// 1. GET User Nudges (Existing)
export const getUserNudges = async (req, res) => {
  try {
    const { userId } = req.params;
    const nudges = await Nudge.find({ userId }).sort({ createdAt: -1 }).limit(5);
    res.status(200).json(nudges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. NEW: Create Agentic Nudge (The Proactive Logic)
export const createAgenticNudge = async (req, res) => {
  const { userId } = req.body;
  try {
    // Latest goal uthao context ke liye
    const latestGoal = await Goal.findOne({ userId }).sort({ updatedAt: -1 });
    
    if (!latestGoal) return res.status(404).json({ message: "No goals found." });

    // AI se personalized motivation mangwao
    const prompt = `User is working on the goal: "${latestGoal.title}". 
    Write a short, punchy, 1-line motivational nudge (under 15 words) to keep them going. 
    Use a professional yet supportive tone.`;
    
    const nudgeMessage = await getAIResponse(prompt);

    // DB mein save karo
    const newNudge = await Nudge.create({
      userId,
      goalId: latestGoal._id,
      message: nudgeMessage,
      type: "motivation"
    });

    res.status(201).json(newNudge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};