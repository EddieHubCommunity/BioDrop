import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    group: {
      type: String,
      required: false,
      min: 2,
      max: 64,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 64,
    },
    url: {
      type: String,
      required: true,
      min: 2,
      max: 256,
    },
    icon: {
      type: String,
      required: true,
      min: 2,
      max: 32,
    },
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
  },
  { timestamps: true }
);

LinkSchema.index({ username: 1, url: 1 });

module.exports = mongoose.models.Link || mongoose.model("Link", LinkSchema);
