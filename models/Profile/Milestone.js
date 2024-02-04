import mongoose, { Schema } from "mongoose";

const MilestoneSchema = new Schema({
  url: {
    type: String,
    required: false,
    min: 2,
    max: 256,
  },
  date: {
    type: Date,
    required: true,
    min: '1970-01-01'
  },
  dateFormat: {
    type: String,
    default: "dd/mm/yyyy",
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
});

MilestoneSchema.pre("save", () => {
  throw new Error("This is a nested document, no need to save it directly");
});

module.exports = {
  MilestoneSchema,
  Milestone:
    mongoose.models.Milestone || mongoose.model("Milestone", MilestoneSchema),
};
