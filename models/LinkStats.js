import mongoose from "mongoose";

const linkStatsSchema = new mongoose.Schema({
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
    default: new Date(new Date().toLocaleDateString()),
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
});

module.exports =
  mongoose.models.LinkStats || mongoose.model("LinkStats", linkStatsSchema);
