const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "open" },
  priority: { type: String, default: "medium" },
  assignedAgent: String
}, { timestamps: true });

ticketSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Ticket", ticketSchema);