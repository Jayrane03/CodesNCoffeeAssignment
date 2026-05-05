const AI = require("../models/AI.js");
const Ticket = require("../models/Ticket");
const { generateAI } = require("../services/aiServices.js");

exports.generateAIInsight = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  const aiData = await generateAI(ticket);

  const saved = await AI.create({
    ticketId: ticket._id,
    ...aiData
  });

  res.json(saved);
};