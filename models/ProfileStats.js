import mongoose from "mongoose";
import dbChangesLoggerMiddleware from "../utils/functions/dbChangesLogger";

const profileStatsSchema = new mongoose.Schema(
  {
    // TODO: is username still needed after forms?
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
      default: new Date(),
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);

dbChangesLoggerMiddleware(profileStatsSchema);

profileStatsSchema.index({ username: 1, date: 1 });

module.exports =
  mongoose.models.ProfileStats ||
  mongoose.model("ProfileStats", profileStatsSchema);
