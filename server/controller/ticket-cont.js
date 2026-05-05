const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      ...req.body,
      status: "open", // default
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};