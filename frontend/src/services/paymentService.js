import axios from "axios";

const API = "http://localhost:5000/api/payment";

// 🔹 CREATE ORDER
export const createOrder = async (courseId, token) => {
  const res = await axios.post(
    `${API}/create-order`,
    { courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// 🔹 VERIFY PAYMENT
export const verifyPayment = async (data, token) => {
  const res = await axios.post(`${API}/verify-payment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};