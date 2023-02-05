import mongoose from "mongoose";

const profileStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  views: {
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
  mongoose.models.ProfileStats ||
  mongoose.model("ProfileStats", profileStatsSchema);
