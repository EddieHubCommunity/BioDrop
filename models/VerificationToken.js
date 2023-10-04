import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema(
  {
    expires: {
      type: Date,
      trim: true,
    },
    token: {
      type: String,
      trim: true,
    },
    identifier: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", VerificationTokenSchema);
