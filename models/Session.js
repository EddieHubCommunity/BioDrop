import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  expires: {
    type: Date,
  },
  sessionToken: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
