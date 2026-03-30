import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createCourse,
  getCourses,
  getCourseById,
} from "../controllers/courseController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 ADMIN: Create course
router.post("/", protect, isAdmin, upload.single("thumbnail"), createCourse);

// 🔹 GET ALL COURSES
router.get("/", getCourses);

// 🔹 GET SINGLE COURSE
router.get("/:id", getCourseById);

export default router;