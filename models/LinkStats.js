import mongoose from "mongoose";

const linkStatsSchema = new mongoose.Schema(
  {
    // TODO: is username still needed after forms?
    username: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true },
);

linkStatsSchema.index({ username: 1, date: 1 });

module.exports =
  mongoose.models.LinkStats || mongoose.model("LinkStats", linkStatsSchema);
