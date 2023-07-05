import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  isVirtual: Boolean,
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
    type: new Schema({
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    }),
    required: true,
  },
  url: {
    type: String,
    required: true,
    min: 2,
    max: 256,
  },
  price: {
    startingFrom: Number,
  },
  userStatus: {
    type: String,
    enum: ["speaking", "not-speaking"],
  },
  speakingTopic: String,
});

EventSchema.pre("save", () => {
  throw new Error("This is a nested document, no need to save it directly");
});

module.exports = {
  EventSchema,
  Event: mongoose.models.Event || mongoose.model("Event", EventSchema),
};
