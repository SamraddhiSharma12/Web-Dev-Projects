import express from "express";
import Nudge from "../models/Nudge.js";
import { evaluateUserState } from "../agents/NudgeAgent.js";
import { generateNudgeMessage } from "../services/generateNudge.js";
import Goal from "../models/Goals.js";
import { getUserNudges } from "../controllers/nudgeController.js";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("NUDGE requested for user:", userId);

  const tasks = await Task.find({
    userId,
    status: { $ne: "completed" },
  }).sort({ updatedAt: -1 });

  if (!tasks.length) {
    return res.json({
      nudge: "All tasks completed. Take a break 🎉",
    });
  }

  res.json({
    nudge: `Focus today on: ${tasks[0].title}`,
  });
});
router.post("/run/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Get the latest active goal
    const latestGoal = await Goal.findOne({ userId }).sort({ updatedAt: -1 });
    if (!latestGoal) return res.json({ message: "No goals found to nudge." });

    // 2. VECTOR SEARCH: Find similar past hurdles or goals
    // Isse Agent ko pata chalega ki user pehle kahan atka tha
    const relevantContext = await Goal.aggregate([
      {
        "$vectorSearch": {
          "index": "vector_index",
          "path": "vector",
          "queryVector": latestGoal.vector, 
          "numCandidates": 10,
          "limit": 3
        }
      }
    ]);

    // 3. AI Evaluator (The Wellness Agent logic)
    // Hum context bhejenge generateNudgeMessage ko
    const decision = await evaluateUserState(userId); 
    const message = await generateNudgeMessage(
        decision, 
        latestGoal.title, 
        relevantContext.map(c => c.title) // Context passed to AI
    );

    const nudge = await Nudge.create({
      userId,
      goalId: latestGoal._id,
      type: decision,
      message,
    });

    res.json(nudge);
  } catch (err) {
    console.error("Nudge Logic Error:", err);
    res.status(500).json({ error: "Agent failed to perceive state." });
  }
});

export default router;
