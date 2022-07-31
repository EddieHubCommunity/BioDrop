import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  views: {
    type: Number,
    default: 0,
    links: {
      type: Map,
      of: String,
      default: [],
    },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
