import express from "express";
import { summarizeText } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Summarize route (protected)
router.post("/summarize", protect, summarizeText);

export default router;