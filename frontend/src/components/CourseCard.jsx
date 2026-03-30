import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// 🔥 Lucide Icons
import { ArrowRight, Lock, BookOpen, Info, CheckCircle2, Star, Zap } from "lucide-react";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isEnrolled = user?.enrolledCourses?.includes(course._id);

  const handleEnrollment = () => {
    navigate("/payment", { state: { courseId: course._id } });
  };

  return (
    <div className="card h-100 border-0 shadow-lg premium-course-card" style={cardStyle}>
      {/* 🔹 Gradient Light effect on Top */}
      <div style={neonGlowStyle}></div>

      {/* Thumbnail Section */}
      <div className="position-relative overflow-hidden group" style={{ height: "185px", borderRadius: "18px 18px 0 0" }}>
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            className="w-100 h-100 transition-all duration-700 course-img-zoom"
            style={{ objectFit: "cover" }}
            alt={course.title}
          />
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(45deg, #0f172a, #334155)" }}>
            <BookOpen size={40} className="text-white opacity-10" />
          </div>
        )}
        
        {/* Dark to Transparent Overlay for text readability */}
        <div className="position-absolute bottom-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.9), transparent)" }}></div>

        {/* Status Badge - Modernized */}
        <span style={isEnrolled ? enrolledBadgeStyle : lockedBadgeStyle}>
          {isEnrolled ? (
            <><CheckCircle2 size={11} /> ENROLLED</>
          ) : (
            <><Lock size={11} /> PREMIUM</>
          )}
        </span>

        {/* Rating and Reviews (Extra attractive touch) */}
        {!isEnrolled && (
            <div className="position-absolute top-0 start-0 m-3 d-flex align-items-center gap-1 px-2 py-1 rounded-pill" style={ratingBadgeStyle}>
                <Star size={10} fill="#fbbf24" color="#fbbf24" />
                <span className="text-white fw-bold" style={{ fontSize: '0.6rem' }}>4.8</span>
                <span className="text-white-50" style={{ fontSize: '0.6rem' }}>(1.2k)</span>
            </div>
        )}
      </div>

      {/* Content Section */}
      <div className="card-body p-4 d-flex flex-column" style={{ zIndex: 2 }}>
        <h5 className="text-white fw-bold mb-2 text-truncate" title={course.title} style={{ letterSpacing: '-1px', fontSize: '1.2rem' }}>
            {course.title}
        </h5>
        <p className="card-text small mb-4" style={descriptionStyle}>
          {course.description}
        </p>
        
        <div className="mt-auto">
          {/* Pricing & Offer Section */}
          <div className="p-3 mb-3 rounded-3" style={pricingBoxStyle}>
              {isEnrolled ? (
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} color="#4ade80" />
                    <span className="fw-bold" style={{ color: "#4ade80", fontSize: "1rem" }}>
                      Access Unlocked
                    </span>
                  </div>
              ) : (
                  <div className="d-flex justify-content-between align-items-center">
                     <div>
                        <span className="d-block text-white-50" style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '1px' }}>PRICE</span>
                        <span className="fw-bold fs-4 text-white">
                            ₹{course.price || 500}
                        </span>
                     </div>
                     <div className="text-end">
                        <span className="text-decoration-line-through text-white-50 small d-block">₹1,999</span>
                        <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>75% OFF</span>
                     </div>
                  </div>
              )}
          </div>

          {/* Dual Button Layout */}
          <div className="d-flex gap-2">
            <Link
              to={`/course/${course._id}`}
              className="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 transition-all hover-scale"
              style={ghostBtnStyle}
            >
              <Info size={14} /> Details
            </Link>

            {isEnrolled ? (
              <Link
                to={`/course/${course._id}`}
                className="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 transition-all hover-scale"
                style={secondaryBtnStyle}
              >
                Launch <ArrowRight size={14} />
              </Link>
            ) : (
              <button
                onClick={handleEnrollment}
                className="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2 transition-all hover-scale-bright"
                style={primaryBtnStyle}
              >
                Enroll Now <Zap size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .premium-course-card { transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); position: relative; }
        .premium-course-card:hover { transform: translateY(-12px) scale(1.01); box-shadow: 0 30px 60px rgba(0,0,0,0.6) !important; }
        .premium-course-card:hover .course-img-zoom { transform: scale(1.1); }
        .hover-scale:hover { transform: scale(1.03); opacity: 0.9; }
        .hover-scale-bright:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(59, 130, 246, 0.5) !important; opacity: 1 !important; }
      `}</style>
    </div>
  );
};

/* --- PREMIUM UI STYLES --- */

const cardStyle = {
  background: "linear-gradient(165deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "20px",
  overflow: "hidden",
};

const neonGlowStyle = {
  position: "absolute",
  top: 0, left: 0, right: 0,
  height: "2px",
  background: "linear-gradient(90deg, #3b82f6, #60a5fa, #4ade80)",
  zIndex: 3
};

const descriptionStyle = {
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontSize: "0.8rem",
  color: "#94a3b8",
  lineHeight: '1.6',
  opacity: '0.8'
};

const pricingBoxStyle = {
  background: "rgba(15, 23, 42, 0.6)",
  border: "1px solid rgba(255, 255, 255, 0.03)",
};

const ratingBadgeStyle = {
    background: "rgba(0,0,0,0.4)", 
    backdropFilter: "blur(5px)", 
    border: "1px solid rgba(255,255,255,0.08)"
};

const lockedBadgeStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#60a5fa",
  fontSize: "0.6rem",
  fontWeight: "800",
  padding: "6px 14px",
  borderRadius: "100px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(96, 165, 250, 0.2)",
  letterSpacing: '1px'
};

const enrolledBadgeStyle = {
  ...lockedBadgeStyle,
  color: "#4ade80",
  border: "1px solid rgba(74, 222, 128, 0.2)"
};

const primaryBtnStyle = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  fontWeight: "800",
  padding: "14px",
  fontSize: "0.8rem",
  boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  letterSpacing: '0.5px'
};

const secondaryBtnStyle = {
  background: "rgba(74, 222, 128, 0.1)",
  color: "#4ade80",
  border: "1px solid rgba(74, 222, 128, 0.2)",
  borderRadius: "14px",
  fontWeight: "700",
  padding: "14px",
  fontSize: "0.8rem",
};

const ghostBtnStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  color: "#f8fafc",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: "14px",
  fontWeight: "600",
  padding: "14px",
  fontSize: "0.8rem",
};

export default CourseCard;