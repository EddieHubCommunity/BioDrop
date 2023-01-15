import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
  views: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  users: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(new Date().toLocaleDateString()),
  },
});

module.exports = mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
