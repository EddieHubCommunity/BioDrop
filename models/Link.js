import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  username: String,
  url: String,
  clicks: {
    type: Number,
    default: 0,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
});

module.exports = mongoose.models.Link || mongoose.model("Link", LinkSchema);
