import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
  {
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
    totalProfiles: {
      type: Number,
      default: 0,
    },
    jsonProfiles: {
      type: Number,
      default: 0,
    },
    formProfiles: {
      type: Number,
      default: 0,
    },
    disabledProfiles: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: new Date(),
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
