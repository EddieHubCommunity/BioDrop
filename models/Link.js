import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  username: String, // TODO: is this username needed after forms?
  group: String,
  name: String,
  url: String,
  icon: String,
  isEnabled: Boolean,
  isPinned: Boolean,
  order: Number,
  clicks: {
    type: Number,
    default: 0,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

LinkSchema.index({ username: 1, url: 1 });

module.exports = mongoose.models.Link || mongoose.model("Link", LinkSchema);
