import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  expires: {
    type: Date,
    trim: true,
  },
  sessionToken: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    ref: "User",
  },
});

module.exports =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
