import mongoose from "mongoose";
 
const ChangelogSchema = new mongoose.Schema(
  {
    username: String,
    collectionId: mongoose.Schema.Types.ObjectId,
    collectionName: String,
    changesBefore: mongoose.Schema.Types.Mixed,
    changesAfter: mongoose.Schema.Types.Mixed,
    diff: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Changelog || mongoose.model("Changelog", ChangelogSchema);
