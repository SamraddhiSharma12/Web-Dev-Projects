
import express from "express";
import { forgeGoal, getGoalsByUserId } from "../controllers/goalController.js";
import { completeTask } from "../controllers/goalController.js";
import Task from "../models/Task.js";
const router = express.Router();

// POST: /api/goals/forge
// AI logic and memory generation happens inside the controller
router.post("/forge", forgeGoal);

// GET: /api/goals/:userId
// Simple fetch to show all goals on sidebar
router.get("/:userId", getGoalsByUserId);

router.get("/tasks/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    
    // Find all tasks associated with this specific goal
    const tasks = await Task.find({ goalId: goalId });
    
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found for this goal" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
router.put("/tasks/:taskId/complete", completeTask);

export default router;