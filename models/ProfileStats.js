import mongoose from "mongoose";
const viewSchema = new mongoose.Schema({
  views: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const profileStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  views: {
    type: [viewSchema],
    default: [],
  },
});

module.exports =
  mongoose.models.ProfileStats ||
  mongoose.model("ProfileStats", profileStatsSchema);
