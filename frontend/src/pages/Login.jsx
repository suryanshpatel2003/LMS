import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast"; 
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      // 1. Backend API Call
      const data = await loginUser(form);
      
      // 2. State Update (AuthContext mein user data save ho jayega)
      login(data);

      toast.success("Welcome Back! 🚀");

      // 3. 🔥 ADMIN REDIRECTION LOGIC (SMART CHECK)
      // Check kar rahe hain ki role backend se kis structure mein aa raha hai
      const userRole = data?.user?.role || data?.role;

      if (userRole === "admin") {
        // Agar MongoDB mein 'admin' assign hai toh yahan bhejega
        navigate("/admin");
      } else {
        // Baaki normal students ke liye dashboard
        navigate("/dashboard");
      }

    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Background Glows */}
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      <div className="container d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "100vh", zIndex: 10 }}>
        
        <div className="p-4 rounded-4 shadow-lg mx-2" style={loginCardStyle}>
          
          {/* Compact Header */}
          <div className="text-center mb-3">
            <div className="d-inline-flex align-items-center gap-2 mb-2" style={darkBadge}>
               <Sparkles size={12} color="#60a5fa" />
               <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>SECURE ACCESS</span>
            </div>
            <h3 className="fw-bold text-white mb-1" style={{ letterSpacing: "-1px" }}>Welcome Back</h3>
            <p className="small text-secondary mb-0">Sign in to continue learning.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-2">
              <label className="text-white-50 small mb-1 fw-bold">Email Address</label>
              <div className="position-relative">
                <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-info opacity-50">
                  <Mail size={16} />
                </span>
                <input
                  className="form-control premium-input" 
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="text-white-50 small mb-1 fw-bold">Password</label>
              <div className="position-relative">
                <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-info opacity-50">
                  <Lock size={16} />
                </span>
                <input
                  className="form-control premium-input" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={inputStyle}
                />
                <span 
                  className="position-absolute end-0 top-50 translate-middle-y me-3" 
                  style={{ cursor: "pointer", color: "#60a5fa", opacity: 0.6 }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 shadow hover-scale" 
              type="submit"
              disabled={loading}
              style={premiumBtnStyle}
            >
              {loading ? <Loader2 size={18} className="spinner" /> : <><span>Sign In</span><LogIn size={18} /></>}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-3 pt-2 border-top border-white border-opacity-5">
            <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "700" }}>
                Apply Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .premium-input:focus {
           background: rgba(15, 23, 42, 0.8) !important;
           border-color: #3b82f6 !important;
           color: white !important;
           box-shadow: 0 0 10px rgba(59, 130, 246, 0.1) !important;
        }
        .hover-scale:hover { transform: translateY(-2px); opacity: 0.9; }
      `}</style>
    </div>
  );
};

/* --- STYLES --- */
const pageWrapperStyle = {
  backgroundColor: "#0f172a",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const blueGlow = {
  position: "absolute",
  width: "400px", height: "400px",
  top: "-100px", left: "-100px",
  background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
  zIndex: 1
};

const greenGlow = {
  position: "absolute",
  width: "300px", height: "300px",
  bottom: "-50px", right: "-50px",
  background: "radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 70%)",
  zIndex: 1
};

const loginCardStyle = {
  background: "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "24px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
};

const darkBadge = {
  background: "rgba(30, 41, 59, 0.8)",
  padding: "4px 12px",
  borderRadius: "100px",
  color: "#60a5fa",
  border: "1px solid rgba(59, 130, 246, 0.2)",
};

const inputStyle = {
  background: "rgba(15, 23, 42, 0.6)",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "10px 10px 10px 40px",
  fontSize: "0.85rem",
  borderRadius: "12px",
  transition: "all 0.3s ease"
};

const premiumBtnStyle = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  fontSize: "0.9rem",
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.2)",
};

export default Login;