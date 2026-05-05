// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { generateAIInsight } = require("../controller/ai-cont");

router.post("/:id", generateAIInsight);

module.exports = router;