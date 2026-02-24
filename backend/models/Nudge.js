import mongoose from "mongoose";

const nudgeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["warning", "motivation", "success"],
      default: "motivation",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Nudge", nudgeSchema);
