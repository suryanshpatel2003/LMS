import axios from "axios";

const API = "http://localhost:5000/api/auth";

// 🔹 REGISTER
export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

// 🔹 LOGIN
export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};