import mongoose from "mongoose";

const StandupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      min: 2,
      max: 1024,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    expireAt: {
      type: Date,
      expires: 60 * 60 * 24 * 7 * 180, // 180 days
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Standup || mongoose.model("Standup", StandupSchema);
