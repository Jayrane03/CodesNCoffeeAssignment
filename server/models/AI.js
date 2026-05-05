const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema({
  ticketId: mongoose.Schema.Types.ObjectId,
  summary: String,
  sentiment: String,
  suggestedPriority: String,
  nextAction: String,
  confidenceScore: Number,
}, { timestamps: true });

module.exports = mongoose.model("AIInsight", aiSchema);