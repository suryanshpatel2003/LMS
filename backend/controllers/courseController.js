import Course from "../models/Course.js";
import cloudinary from "../utils/cloudinary.js";
import Content from "../models/Content.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnailUrl } = req.body;

    let thumbnail = thumbnailUrl || "";

    // 👉 FILE UPLOAD FIX
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "courses" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      thumbnail = result.secure_url;
    }

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error); // 🔥 ADD THIS
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET ALL COURSES
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");

    // 🔥 Har course ke liye total uploaded content ka count nikal rahe hain
    const coursesWithContentCount = await Promise.all(
      courses.map(async (course) => {
        const contentCount = await Content.countDocuments({ courseId: course._id });
        
        // Mongoose document ko plain object me badal kar naya key inject kar rahe hain
        return {
          ...course.toObject(),
          contentCount: contentCount, 
        };
      })
    );

    res.json(coursesWithContentCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET SINGLE COURSE DETAILS
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};