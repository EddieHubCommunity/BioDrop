import mongoose from "mongoose";

const profileStatsSchema = new mongoose.Schema({
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
});

profileStatsSchema.index({ username: 1, date: 1 });

module.exports =
  mongoose.models.ProfileStats ||
  mongoose.model("ProfileStats", profileStatsSchema);
