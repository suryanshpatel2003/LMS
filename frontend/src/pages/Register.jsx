import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, Loader2 } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(form);
      login(data);
      toast.success("Account created successfully! 🚀");
      
      // Auto-redirection logic based on response
      if (data?.user?.role === "admin" || data?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Background Ambient Glows */}
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      <div className="container d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "100vh", zIndex: 10 }}>
        <div className="p-4 rounded-4 shadow-lg mx-auto" style={registerCardStyle}>
          
          {/* Header */}
          <div className="text-center mb-3">
            <div className="d-inline-flex align-items-center gap-2 mb-2" style={darkBadge}>
               <Sparkles size={12} color="#60a5fa" />
               <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>GET STARTED</span>
            </div>
            <h3 className="fw-bold text-white mb-1" style={{ letterSpacing: "-1px" }}>Create Account</h3>
            <p className="small text-secondary mb-0">Join our community today.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-2">
              <label className="text-white-50 small mb-1 fw-bold">Full Name</label>
              <div className="position-relative">
                <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-info opacity-50">
                  <User size={16} />
                </span>
                <input
                  className="form-control premium-input"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

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

            {/* Register Button */}
            <button
              className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 shadow hover-scale" 
              type="submit"
              disabled={loading}
              style={premiumBtnStyle}
            >
              {loading ? (
                <Loader2 size={18} className="spinner" />
              ) : (
                <>
                  <span>Sign Up</span>
                  <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-3 pt-2 border-top border-white border-opacity-5">
            <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "700" }}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .premium-input:focus {
           background: rgba(15, 23, 42, 0.8) !important;
           border-color: #3b82f6 !important;
           box-shadow: 0 0 10px rgba(59, 130, 246, 0.1) !important;
           color: white !important;
        }
        .hover-scale:hover { transform: translateY(-2px); opacity: 0.9; }
      `}</style>
    </div>
  );
};

/* --- UI OBJECTS --- */

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

const registerCardStyle = {
  background: "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  width: "90%",
  maxWidth: "400px",
  borderRadius: "24px",
  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
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

export default Register;