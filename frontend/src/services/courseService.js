import axios from "axios";

const API = "https://lms-75vr.onrender.com/api";

// 🔹 GET ALL COURSES
export const getCourses = async () => {
  const res = await axios.get(`${API}/courses`);
  return res.data;
};

// 🔹 GET SINGLE COURSE
export const getCourseById = async (id) => {
  const res = await axios.get(`${API}/courses/${id}`);
  return res.data;
};

// 🔹 GET COURSE CONTENT
export const getCourseContent = async (courseId, token) => {
  const res = await axios.get(`${API}/content/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};