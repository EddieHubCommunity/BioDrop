import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: {
        values: ["free", "premium"],
        message: "{VALUE} is not a supported data source",
      },
      default: "free",
    },
    stripeCustomerId: {
      type: String,
      trim: true,
    },
    premiumTrialStartDate: {
      type: Date,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Date,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
