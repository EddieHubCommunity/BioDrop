import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  isGoal: {
    type: Boolean,
    default: false,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  title: String,
  url: String,
  icon: String,
  description: String,
  color: String,
  date: String,
  order: Number,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

// MilestoneSchema.index({ username: 1, url: 1, date: 1 });

module.exports =
  mongoose.models.Milestone || mongoose.model("Milestone", MilestoneSchema);
