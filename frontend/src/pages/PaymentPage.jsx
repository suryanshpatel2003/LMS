import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../services/paymentService";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast"; // 🔥 Premium Toast
import { ShieldCheck, CreditCard, ArrowRight, Loader2, Lock } from "lucide-react";

const PaymentPage = () => {
  const { user, setUser } = useAuth(); // Context se user data update karne ke liye
  const navigate = useNavigate();
  const location = useLocation();

  const courseId = location.state?.courseId;
  const [loading, setLoading] = useState(false);

  // Razorpay SDK load karne ka script handler
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!courseId) {
      toast.error("Course ID not found! Please try again from course page.");
      return;
    }

    setLoading(true);
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Order Create karna backend se
      const { order, paymentId } = await createOrder(courseId, user.token);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "LMS Platform",
        description: "Premium Course Purchase",
        order_id: order.id,

        // Step 2: Payment Handler (Success hone par execute hoga)
        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment(
              {
                ...response,
                paymentId,
                courseId,
              },
              user.token
            );

            if (verifyRes.success) {
              // 🔥 FIX: Manual State Update taaki refresh bina hi course unlock dikhe
              const updatedUser = { 
                ...user, 
                enrolledCourses: [...(user.enrolledCourses || []), courseId] 
              };
              
              setUser(updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));

              toast.success("Payment successful! Welcome to the course 🎉", {
                duration: 5000,
                position: "top-center",
                style: {
                    background: "#0f172a",
                    color: "#4ade80",
                    border: "1px solid rgba(74, 222, 128, 0.2)"
                }
              });

              navigate(`/course/${courseId}`); // Success ke baad direct course pe
            }
          } catch (err) {
            toast.error("Verification failed! Contact support if amount deducted.");
          }
        },

        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3b82f6", // Premium Midnight Blue theme matching dashboard
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        toast.error("Payment failed! Please try again.");
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Ambient background glows */}
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      <div className="container d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "90vh", zIndex: 10 }}>
        
        <div className="p-4 rounded-4 shadow-lg text-center mx-auto" style={checkoutCardStyle}>
          
          <div style={iconWrapperStyle}>
            <CreditCard size={28} color="#60a5fa" />
          </div>

          <div className="d-inline-flex align-items-center gap-2 mb-3" style={badgeStyle}>
             <Lock size={12} />
             <span>SECURE CHECKOUT</span>
          </div>
          
          <h2 className="display-6 fw-bold text-white mb-2">Complete Payment</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Unlock premium modules and start your learning journey.
          </p>

          <div className="p-3 my-4 rounded-4 text-start" style={priceBoxStyle}>
            <div className="d-flex justify-content-between align-items-center mb-2 small">
              <span className="text-secondary">Premium Course</span>
              <span className="text-white fw-bold">₹500.00</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2 small">
              <span className="text-secondary">Processing Fee</span>
              <span className="text-success fw-bold">₹0.00</span>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '12px 0' }}></div>
            <div className="d-flex justify-content-between align-items-center pt-1">
              <span className="text-white-50 fw-bold small">TOTAL AMOUNT</span>
              <span className="h3 m-0 fw-bold" style={{ color: "#60a5fa" }}>₹500.00</span>
            </div>
          </div>

          <button
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3 py-3 shadow-lg transition-all hover-scale"
            style={premiumBtnStyle}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? <Loader2 size={22} className="spinner" /> : <>Pay Securely <ArrowRight size={20} /></>}
          </button>

          <div className="d-flex align-items-center justify-content-center gap-2 text-white-50 small mt-4 opacity-50">
            <ShieldCheck size={16} />
            <span style={{ fontSize: '0.75rem' }}>Fully encrypted via Razorpay Gateway</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .hover-scale:hover { transform: translateY(-3px); opacity: 0.95; }
      `}</style>
    </div>
  );
};

/* --- STYLING CONSTANTS --- */

const pageWrapperStyle = {
  backgroundColor: "#0f172a",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  paddingTop: "60px"
};

const blueGlow = {
  position: "absolute",
  width: "600px", height: "600px",
  top: "-10%", left: "-10%",
  background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
  zIndex: 1
};

const greenGlow = {
  position: "absolute",
  width: "500px", height: "500px",
  bottom: "-10%", right: "-10%",
  background: "radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%)",
  zIndex: 1
};

const checkoutCardStyle = {
  background: "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  maxWidth: "450px",
  width: "90%",
  borderRadius: "32px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
};

const iconWrapperStyle = {
  width: "56px", height: "56px",
  background: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  borderRadius: "16px",
  display: "flex", justifyContent: "center", alignItems: "center",
  margin: "0 auto 15px auto",
};

const badgeStyle = {
  color: "#60a5fa",
  fontSize: "0.65rem",
  fontWeight: "800",
  letterSpacing: "1.5px",
  background: "rgba(59, 130, 246, 0.1)",
  padding: "4px 12px",
  borderRadius: "100px",
};

const priceBoxStyle = {
  background: "rgba(15, 23, 42, 0.5)",
  border: "1px solid rgba(255, 255, 255, 0.03)",
};

const premiumBtnStyle = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#ffffff",
  border: "none",
  borderRadius: "16px",
  fontWeight: "700",
  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
};

export default PaymentPage;