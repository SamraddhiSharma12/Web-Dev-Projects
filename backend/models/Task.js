import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  
  // Weights for the progress bar
  contributionScore: { type: Number, default: 33.3 }, // Default for 3 tasks
  
  // Perception data (For the calculator)
  timeSpent: { type: Number, default: 0 },
  qualityRating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);