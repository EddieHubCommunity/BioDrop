import mongoose, { Schema } from "mongoose";

const RepoSchema = new Schema({
  url: {
    type: String,
    required: true,
    min: 2,
    max: 256,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 256,
  },
  fullname: {
    type: String,
    required: true,
    min: 2,
    max: 256,
  },
  owner: {
    type: String,
    required: true,
    min: 2,
    max: 256,
  },
  description: {
    type: String,
    required: false,
    min: 2,
    max: 256,
  },
  stats: {
    forks: Number,
    stars: Number,
    issues: Number,
    subscribers: Number,
    watchers: Number,
  },
  topics: [],
  dates: {
    createdAt: Date,
    updatedAt: Date,
    pushedAt: Date,
  },
  updatedAt: Date,
});

RepoSchema.pre("save", () => {
  throw new Error("This is a nested document, no need to save it directly");
});

module.exports = {
  RepoSchema,
  Repo: mongoose.models.Repo || mongoose.model("Repo", RepoSchema),
};
