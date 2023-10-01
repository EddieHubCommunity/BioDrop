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
  isSpeaking: Boolean,
  speakingTopic: {
    type: String,
    max: 256,
  },
  color: {
    type: String,
    min: 2,
    max: 16,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: [String],
    default: [],
  }
});

EventSchema.pre("save", () => {
  throw new Error("This is a nested document, no need to save it directly");
});

module.exports = {
  EventSchema,
  Event: mongoose.models.Event || mongoose.model("Event", EventSchema),
};
