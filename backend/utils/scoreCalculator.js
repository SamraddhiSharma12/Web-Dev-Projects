// Har task ko uski complexity ke hisaab se weight dena
export const calculateWeights = (numTasks) => {
    if (numTasks === 0) return [];
    const baseWeight = Math.floor(100 / numTasks);
    return new Array(numTasks).fill(baseWeight);
};
// 1. Perception Score (Jo aapne likha hai)
export function calculateDailyScore({
  timeSpent,
  qualityRating,
  sleepHours,
  progress,
}) {
  const timeScore = Math.min(timeSpent / 120, 1) * 100; // cap at 2 hrs
  const qualityScore = (qualityRating / 5) * 100;
  const sleepScore = Math.min(sleepHours / 8, 1) * 100;

  return Math.round(
    timeScore * 0.4 +
    qualityScore * 0.3 +
    sleepScore * 0.2 +
    progress * 0.1
  );
}

// 2. Task Weightage (Naya function for Step 4)
// Jab AI tasks banayega, har task ko ek default importance dega
export function assignTaskWeights(numTasks) {
    if (numTasks === 0) return [];
    const equalWeight = parseFloat((100 / numTasks).toFixed(2));
    return new Array(numTasks).fill(equalWeight);
}