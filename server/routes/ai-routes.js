// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { generateAIInsight , getAIInsight , updateAIInsight} = require("../controller/ai-cont");

router.post("/:id", generateAIInsight);
router.get("/:id", getAIInsight);
router.put("/:id", updateAIInsight);
module.exports = router;