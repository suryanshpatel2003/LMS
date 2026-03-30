import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { LayoutGrid, Sparkles, Loader2, Rocket } from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={pageWrapperStyle}>
      {/* --- RADIAL AMBIENT GLOWS --- */}
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-5 mt-2"> {/* Added slight mt-2 for extra breathing room */}
          <h1 className="display-3 fw-bolder mb-3" style={mainHeading}>
            Master the <span style={gradientText}>Future</span>
          </h1>
          
          <p className="fs-5 mx-auto" style={{ maxWidth: "700px", color: "#94a3b8", lineHeight: "1.6" }}>
            Experience world-class education with our 
            <span style={{ color: "#f8fafc", fontWeight: "600" }}> optimized learning path</span> and expert-led mentorship.
          </p>
        </div>

        {/* --- COURSE GRID --- */}
        <div className="row g-4 justify-content-center">
          {loading ? (
            <div className="col-12 text-center py-5">
              <Loader2 size={50} color="#3b82f6" className="spinner mb-3" />
              <h5 className="fw-bold" style={{ color: "#3b82f6" }}>Fetching Modules...</h5>
            </div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course._id}>
                <div className="glass-card-container">
                   <CourseCard course={course} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-8 text-center py-5" style={emptyStateDark}>
              <LayoutGrid size={60} className="mb-3 opacity-25" color="#94a3b8" />
              <h3 className="fw-bold text-white">No Courses Available</h3>
              <p style={{ color: "#94a3b8" }}>Stay tuned! We are crafting something special for you.</p>
              <button className="btn btn-outline-info rounded-pill px-4 mt-3">Get Updates</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

        body {
          background-color: #0f172a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 0;
        }

        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .glass-card-container {
          transition: all 0.4s ease;
          border-radius: 20px;
        }

        .glass-card-container:hover {
          transform: translateY(-10px) scale(1.02);
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2));
        }
      `}</style>
    </div>
  );
};

/* --- STYLES --- */

const pageWrapperStyle = {
  backgroundColor: "#0f172a",
  backgroundImage: `
    radial-gradient(at 0% 0%, rgba(30, 41, 59, 1) 0, transparent 50%), 
    radial-gradient(at 100% 100%, rgba(15, 23, 42, 1) 0, transparent 50%)
  `,
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",
  color: "#f8fafc",
  paddingTop: "90px" // 🔥 Navbar overlapping fix yahan add kar diya hai
};

const blueGlow = {
  position: "absolute",
  width: "600px", height: "600px",
  top: "-150px", right: "-100px",
  background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
  zIndex: 1
};

const greenGlow = {
  position: "absolute",
  width: "500px", height: "500px",
  bottom: "-100px", left: "-100px",
  background: "radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, rgba(15, 23, 42, 0) 70%)",
  zIndex: 1
};

const mainHeading = {
  color: "#ffffff",
  letterSpacing: "-2px",
};

const gradientText = {
  background: "linear-gradient(90deg, #60a5fa, #4ade80)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "900"
};

const darkBadge = {
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(10px)",
  padding: "8px 20px",
  borderRadius: "100px",
  fontSize: "0.8rem",
  color: "#94a3b8",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
};

const emptyStateDark = {
  background: "rgba(30, 41, 59, 0.4)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "30px",
  padding: "60px"
};

export default Dashboard;