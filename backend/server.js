import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Connect Database
connectDB();


// --------------------
// Middleware
// --------------------

// JSON parser
app.use(express.json());

// CORS
app.use(cors());


// --------------------
// Base Route (Test)
// --------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);


// --------------------
// Server Listen
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});