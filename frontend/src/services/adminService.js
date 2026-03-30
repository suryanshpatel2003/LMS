import axios from "axios";

const API = "http://localhost:5000/api";

export const createCourse = async (formData, token) => {
  return axios.post(`${API}/courses`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addContent = async (formData, token) => {
  return axios.post(`${API}/content`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCourses = async () => {
  return axios.get(`${API}/courses`);
};