const AI = require("../models/AI.js");
const Ticket = require("../models/Ticket");
const { generateAI } = require("../services/aiServices.js");

exports.generateAIInsight = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const aiData = await generateAI(ticket);

    const saved = await AI.findOneAndUpdate(
      { ticketId: ticket._id },
      {
        ...aiData,
        ticketId: ticket._id,
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "AI failed" });
  }
};
exports.getAIInsight = async (req, res) => {
  const ai = await AI.findOne({ ticketId: req.params.id });

  res.json(ai);
};
exports.updateAIInsight = async (req, res) => {
  const updated = await AI.findOneAndUpdate(
    { ticketId: req.params.id },
    req.body,
    { returnDocument: "after" }
  );

  res.json(updated);
};