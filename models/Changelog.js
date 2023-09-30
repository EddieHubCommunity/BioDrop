import mongoose from "mongoose";
 
const ChangelogSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    docId: mongoose.Schema.Types.ObjectId,
    model: String,
    operation: String,
    changesBefore: mongoose.Schema.Types.Mixed,
    changesAfter: mongoose.Schema.Types.Mixed,
    diff: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Changelog || mongoose.model("Changelog", ChangelogSchema);
