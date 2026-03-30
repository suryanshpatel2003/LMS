import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["video", "document"],
      required: true,
    },

    videoUrl: {
      type: String,
      default: "",
    },

    textContent: {
      type: String,
      default: "",
    },

    fileUrl: { // 🔥 NEW FIELD
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);