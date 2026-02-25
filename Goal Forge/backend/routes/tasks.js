import { calculateContribution } from "../utils/contributionCalculator.js";

router.put("/tasks/:taskId/complete", completeTask);
router.post("/checkin/:taskId", async (req, res) => {
  const { timeSpent, qualityRating, sleepHours, progress } = req.body;

  const score = calculateContribution({
    timeSpent,
    qualityRating,
    sleepHours,
    progress,
  });

  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    {
      timeSpent,
      qualityRating,
      sleepHours,
      contributionScore: score,
      status: progress === 100 ? "completed" : "in-progress",
    },
    { new: true }
  );

  res.json(task);
});
