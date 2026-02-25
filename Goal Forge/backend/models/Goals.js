import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    motivationProfile: { type: String, default: "" },
    status: { type: String, enum: ["active", "paused", "completed"], default: "active" },
    // RAG Memory Field
    vector: { type: [Number], default: [] }, 
  },
  { timestamps: true }
);

export default mongoose.model("Goal", GoalSchema);