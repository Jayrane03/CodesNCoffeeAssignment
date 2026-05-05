const router = require("express").Router();
const Ticket = require("../models/Ticket"); // ✅ ADD THIS
const { createTicket, getTickets } = require("../controller/ticket-cont");

router.post("/", createTicket);
router.get("/", getTickets);

router.put("/:id", async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status, // optional
      },
      {
        returnDocument: "after", // ✅ fix mongoose warning
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;