import Goal from "../models/Goals.js";
import Task from "../models/Task.js";
import { generateEmbeddings, getAIResponse } from "../services/aiService.js";
import { calculateDailyScore } from "../utils/scoreCalculator.js";

import { assignTaskWeights } from "../utils/scoreCalculator.js"; // Task weights ke liye

export const forgeGoal = async (req, res) => {
    const { userId, title } = req.body;

    if (!userId || !title) {
        return res.status(400).json({ error: "Mission objective (title) is required." });
    }

    try {
        // 1. Generate Vector Embedding (For RAG Memory)
        const vector = await generateEmbeddings(title);

        // 2. Create the Goal Document
        const goal = await Goal.create({ userId, title, vector });

        // 3. Prompt AI to break goal into exactly 3 actionable units
        const prompt = `
            You are a Strategic Planner Agent. 
            Break the goal "${title}" into 3 high-impact actionable tasks.
            Return ONLY a valid JSON array of objects like this: 
            [{"title": "Task Name", "description": "Short action step"}]
        `;

        // 4. Robust AI Response Handling
        let tasksData;
        try {
            const aiText = await getAIResponse(prompt);
            tasksData = JSON.parse(aiText);
        } catch (jsonErr) {
            console.error("AI JSON Parse Error:", jsonErr);
            // Fallback tasks agar AI garbage response de
            tasksData = [
                { title: "Initial Research", description: "Analyze the core requirements of the goal." },
                { title: "Execution Phase", description: "Start the primary implementation steps." },
                { title: "Review & Refine", description: "Optimize the results for final output." }
            ];
        }

        // 5. Assign Weights & Create Tasks
        const weights = assignTaskWeights(tasksData.length); // e.g., [33.3, 33.3, 33.3]

        const tasks = await Promise.all(
            tasksData.map((t, idx) => 
                Task.create({ 
                    goalId: goal._id, 
                    title: t.title,
                    description: t.description,
                    contributionScore: weights[idx] // Har task ka progress weight
                })
            )
        );

        // Success response
        res.status(201).json({ 
            message: "Goal Forged successfully!", 
            goalId: goal._id, 
            tasks 
        });

    } catch (err) {
        console.error("Forge Error:", err);
        res.status(500).json({ error: "System failed to forge the goal. Please try again." });
    }
};
export const getGoalsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const completeTask = async (req, res) => {
    const { taskId } = req.params;
    const { timeSpent, qualityRating, sleepHours } = req.body; // Frontend se aayega

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.status = "completed";
        task.timeSpent = timeSpent;
        task.qualityRating = qualityRating;
        
        
        // Asli Math yahan chalega
        const contribution = calculateDailyScore({
            timeSpent,
            qualityRating,
            sleepHours,
            progress: 100 // Kyunki task complete ho gaya hai
        });

        task.contributionScore = contribution;
        await task.save();

        // --- WELLNESS AGENT: AUTONOMOUS ACTION ---
        // Agar quality bohot low hai ya sleep deficit hai, toh agent nudge dega
        let agentMessage = "";
        let nudgeType = "motivation";

        if (qualityRating <= 2) {
            agentMessage = `Samra, I noticed the quality for "${task.title}" was low. Maybe a 5-min walk could reset your focus?`;
            nudgeType = "wellness";
        } else if (sleepHours < 6 && qualityRating < 4) {
            agentMessage = "High effort detected with low sleep. Consider resting before the next Unit.";
            nudgeType = "wellness";
        } else if (qualityRating >= 4 && timeSpent > 60) {
            agentMessage = "Excellent deep work session! System efficiency is peaking.";
            nudgeType = "insight";
        }

        if (agentMessage) {
            await Nudge.create({
                userId,
                goalId: task.goalId,
                message: agentMessage,
                type: nudgeType
            });
        }

        res.status(200).json({ message: "Task Forged & Completed!", contribution,
            nudge:agentMessage
         });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getTasksByGoal = async (req, res) => {
  const tasks = await Task.find({ goalId: req.params.goalId });
  res.json(tasks);
};