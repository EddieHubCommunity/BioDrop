import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      enum: {
        values: ["file", "database"],
        message: "{VALUE} is not a supported data source",
      },
    },
    layout: {
      type: String,
      enum: {
        values: ["classic", "inline"],
        message: "{VALUE} is not a supported profile layout",
      },
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 32,
    },
    bio: {
      type: String,
      required: true,
      min: 2,
      max: 256,
    },
    tags: {
      type: [String],
      default: [],
    },
    location: {
      provided: String,
      name: String,
      lat: Number,
      lon: Number,
      updatedAt: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    links: {
      default: [],
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
    },
    milestones: [
      {
        url: {
          type: String,
          required: true,
          min: 2,
          max: 256,
        },
        date: {
          type: Date,
          required: true,
        },
        isGoal: Boolean,
        title: {
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
        description: {
          type: String,
          required: true,
          min: 2,
          max: 512,
        },
        order: Number,
      },
    ],
    testimonials: [
      {
        username: {
          type: String,
          required: true,
          min: 2,
          max: 256,
        },
        title: {
          type: String,
          required: true,
          min: 2,
          max: 256,
        },
        description: {
          type: String,
          required: true,
          min: 2,
          max: 512,
        },
        date: {
          type: Date,
          required: true,
        },
        order: Number,
        isPinned: Boolean,
      },
    ],
    events: [
      {
        isVirtual: Boolean,
        color: String,
        name: {
          type: String,
          required: true,
          min: 2,
          max: 256,
        },
        description: {
          type: String,
          required: true,
          min: 2,
          max: 512,
        },
        date: {
          start: {
            type: Date,
            required: true,
          },
          end: {
            type: Date,
            required: true,
          },
        },
        url: {
          type: String,
          required: true,
          min: 2,
          max: 256,
        },
        order: Number,
        price: {
          startingFrom: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
