import Content from "../models/Content.js";
import Course from "../models/Course.js";
import cloudinary from "../utils/cloudinary.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// 🔥 PDF TEXT EXTRACTOR (SAFE)
const extractPdfText = async (buffer) => {
  try {
    if (!buffer) return "No file buffer";

    // ✅ IMPORTANT FIX (Buffer → Uint8Array)
    const uint8Array = new Uint8Array(buffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map(item => item.str).join(" ");
      extractedText += pageText + "\n\n";
    }

    return extractedText.trim() || "No readable text found";
  } catch (error) {
    console.error("PDF parsing error:", error.message);
    return "PDF parsing failed";
  }
};

export const addContent = async (req, res) => {
  try {
    const { courseId, title, type, videoUrl, textContent } = req.body;

    // 🔍 Course check
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let finalVideoUrl = videoUrl || "";
    let finalText = textContent || "";

    // ================= VIDEO =================
    if (type === "video" && req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "videos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const content = await Content.create({
        courseId,
        title,
        type,
        videoUrl: result.secure_url,
      });

      return res.status(201).json(content);
    }

    // ================= DOCUMENT (PDF) =================
    if (type === "document" && req.file) {
      // 🔥 1. Upload PDF
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "docs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      // 🔥 2. Extract text
      const extractedText = await extractPdfText(req.file.buffer);

      // 🔥 3. Save
      const content = await Content.create({
        courseId,
        title,
        type,
        fileUrl: result.secure_url,
        textContent: extractedText,
      });

      return res.status(201).json(content);
    }

    // ================= NORMAL =================
    const content = await Content.create({
      courseId,
      title,
      type,
      videoUrl: finalVideoUrl,
      textContent: finalText,
    });

    res.status(201).json(content);
  } catch (err) {
    console.error("ADD CONTENT ERROR:", err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// 🔹 GET CONTENT BY COURSE
export const getContentByCourse = async (req, res) => {
  try {
    const contents = await Content.find({
      courseId: req.params.courseId,
    }).sort({ createdAt: 1 });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};