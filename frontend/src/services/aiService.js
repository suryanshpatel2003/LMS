import axios from "axios";

const API = "https://lms-75vr.onrender.com/api/ai";

// 🔹 SUMMARIZE TEXT
export const summarizeText = async (text, token) => {
  const res = await axios.post(
    `${API}/summarize`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};