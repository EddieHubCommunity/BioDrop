import mongoose from "mongoose";
 
const dbChangeSchema = new mongoose.Schema(
  {
    username: String,
    collection: String,
    doc: String,
    changesBefore: mongoose.Schema.Types.Mixed,
    changesAfter: mongoose.Schema.Types.Mixed,
    date: {
      type: Date,
      default: new Date(),
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.DBChange || mongoose.model("DBChange", dbChangeSchema);