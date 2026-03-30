import instance from "../utils/razorpay.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

// 🔹 CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const options = {
      amount: 500 * 100, // ₹500 in paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    // Save initial payment
    const payment = await Payment.create({
      userId: req.user._id,
      courseId,
      razorpay_order_id: order.id,
      amount: options.amount,
      status: "created",
    });

    res.json({
      order,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ Update payment
    const payment = await Payment.findById(paymentId);
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    // ✅ ENROLL USER (FIXED)
    const user = await User.findById(req.user._id);

    const alreadyEnrolled = user.enrolledCourses.some(
      (id) => id.toString() === courseId.toString()
    );

    if (!alreadyEnrolled) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.json({
      success: true,
      message: "Payment successful, course unlocked",
      enrolledCourses: user.enrolledCourses, // 🔥 IMPORTANT
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};