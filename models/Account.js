import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      trim: true,
    },
    providerAccountId: {
      type: String,
      trim: true,
    },
    refresh_token: {
      type: String,
      trim: true,
    },
    access_token: {
      type: String,
      trim: true,
    },
    expires_at: {
      type: Number,
      trim: true,
    },
    token_type: {
      type: String,
      trim: true,
    },
    scope: {
      type: String,
      trim: true,
    },
    id_token: {
      type: String,
      trim: true,
    },
    session_state: {
      type: String,
      trim: true,
    },
    oauth_token_secret: {
      type: String,
      trim: true,
    },
    oauth_token: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
