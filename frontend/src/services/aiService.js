import axios from "axios";

const API = "http://localhost:5000/api/ai";

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