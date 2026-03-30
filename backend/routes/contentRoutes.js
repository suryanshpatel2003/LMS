import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  addContent,
  getContentByCourse,
} from "../controllers/contentController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 ADMIN: Add content
router.post("/", protect, isAdmin, upload.single("file"), addContent);

// 🔹 GET content by course
router.get("/:courseId", protect, getContentByCourse);

export default router;