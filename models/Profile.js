import mongoose, { Schema } from "mongoose";

import { MilestoneSchema } from "./Profile/Milestone";
import { EventSchema } from "./Profile/Event";

import config from "@config/app.json";

const ProfileSchema = new Schema(
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
        values: config.layouts,
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
      unique: true,
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
      type: [{ type: Schema.Types.ObjectId, ref: "Link" }],
    },
    milestones: {
      type: [MilestoneSchema],
      default: [],
    },
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
        isPinned: Boolean,
      },
    ],
    events: {
      type: [EventSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
