import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  source: String,
  isEnabled: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
    index: true,
  },
  name: String,
  bio: String,
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
      url: String,
      date: String,
      isGoal: Boolean,
      title: String,
      icon: String,
      description: String,
      color: String,
      order: Number,
    },
  ],
  testimonials: [
    {
      username: String,
      title: String,
      description: String,
      date: String,
      order: Number,
      isPinned: Boolean,
    },
  ],
  events: [
    {
      isVirtual: Boolean,
      color: String,
      name: String,
      description: String,
      date: {
        start: Date,
        end: Date,
      },
      url: String,
      order: Number,
      price: {
        startingFrom: Number,
      },
    },
  ],
});

module.exports =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
