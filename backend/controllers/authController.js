import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

/* ================================
   🔹 REGISTER USER
================================ */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔸 Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔸 Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔸 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔸 Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 🔸 Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses, // ✅ IMPORTANT
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   🔹 LOGIN USER
================================ */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔸 Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // 🔸 Find user
    const user = await User.findOne({ email });

    // 🔸 Check password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔸 Response (WITH enrolledCourses)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses, // ✅ IMPORTANT
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   🔹 GET CURRENT USER (BEST PRACTICE 🔥)
================================ */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses, // ✅ ALWAYS INCLUDE
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};