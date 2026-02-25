import Goal from "../models/Goals.js";
import Task from "../models/Task.js";

export const evaluateUserState = async (userId) => {
  const tasks = await Task.find({ userId });

  if (tasks.length === 0) return null;

  const completed = tasks.filter(t => t.status === "completed").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;

  const lastActivity = Math.max(
    ...tasks.map(t => new Date(t.updatedAt).getTime())
  );

  const hoursSinceLast = (Date.now() - lastActivity) / 36e5;

  if (completed >= 3) return "motivation";
  if (hoursSinceLast > 48) return "inactive";
  if (inProgress === 0) return "warning";

  return null;
};
