import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getCourseContent } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import SummaryBox from "../components/SummaryBox";
import { PlayCircle, FileText, Lock, ChevronRight, BookOpen, Clock, Download, Sparkles, Loader2 } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [activeContent, setActiveContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const isEnrolled = user?.enrolledCourses?.includes(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseData = await getCourseById(id);
        setCourse(courseData);

        if (isEnrolled && user?.token) {
          const contentData = await getCourseContent(id, user.token);
          setContent(contentData);
          if (contentData.length > 0) setActiveContent(contentData[0]);
        }
      } catch (err) {
        console.error("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEnrolled, user]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handlePayment = () => navigate("/payment", { state: { courseId: id } });

  if (loading) return (
    <div style={pageWrapperStyle} className="d-flex flex-column justify-content-center align-items-center">
      <Loader2 size={50} color="#3b82f6" className="spinner mb-3" />
      <h5 className="text-info fw-bold">Setting up your classroom...</h5>
    </div>
  );

  return (
    <div style={pageWrapperStyle}>
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      {/* Added pt-4 to give extra breathing room below the navbar margin */}
      <div className="container-fluid container-lg pt-4 pb-5 position-relative" style={{ zIndex: 10 }}>
        {course && (
          <>
            {/* --- COMPACT HEADER --- */}
            <div className="row mb-4 g-3 align-items-center">
              <div className="col-lg-8">
                <h1 className="h3 fw-bold text-white mb-2">{course.title}</h1>
                <p className="text-secondary small mb-0" style={{ maxWidth: "600px" }}>
                  {course.description}
                </p>
              </div>
              <div className="col-lg-4 d-flex justify-content-lg-end align-items-center">
                <div className="d-flex gap-2 bg-dark bg-opacity-50 p-2 rounded-3 border border-white border-opacity-10 shadow-sm">
                  <div className="px-2 py-1 small text-info border-end border-white border-opacity-10 d-flex align-items-center gap-1">
                    <BookOpen size={14} /> {content.length} Lessons
                  </div>
                  <div className="px-2 py-1 small text-success d-flex align-items-center gap-1">
                    <Clock size={14} /> Self-paced
                  </div>
                </div>
              </div>
            </div>

            {!isEnrolled ? (
              <div className="p-4 p-md-5 rounded-4 text-center shadow-lg border border-white border-opacity-5" style={lockedCardStyle}>
                <Lock size={40} color="#60a5fa" className="mb-3" />
                <h3 className="text-white fw-bold h4">Enroll to Access Content</h3>
                <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: "450px" }}>
                  Unlock premium video lectures, hands-on documents, and AI-powered summaries.
                </p>
                <button className="btn px-5 py-2 fw-bold shadow-lg hover-scale" style={premiumBtnStyle} onClick={handlePayment}>
                  Enroll Now @ ₹500
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {/* --- CONTENT VIEWER (Primary Focus on Mobile) --- */}
                <div className="col-lg-8 order-1 order-lg-2">
                  <div className="p-3 p-md-4 rounded-4 shadow-lg border border-white border-opacity-5" style={viewerCardStyle}>
                    {activeContent ? (
                      <>
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-white border-opacity-10 gap-2">
                          <h5 className="text-white fw-bold m-0 h6 text-truncate" style={{maxWidth: '70%'}}>
                             {activeContent.title}
                          </h5>
                          <span className="badge rounded-pill" style={{...typeBadgeStyle, fontSize: '0.65rem'}}>
                            {activeContent.type.toUpperCase()}
                          </span>
                        </div>

                        {activeContent.type === "video" && (
                          <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg border border-white border-opacity-10 bg-black">
                            <iframe src={getEmbedUrl(activeContent.videoUrl)} title="video" allowFullScreen></iframe>
                          </div>
                        )}

                        {activeContent.type === "document" && activeContent.fileUrl ? (
                          <div className="mb-3">
                            <div className="ratio ratio-16x9 rounded-3 overflow-hidden" style={{ minHeight: "350px", maxHeight: "600px", background: "#1e293b" }}>
                              <iframe src={`${activeContent.fileUrl}#toolbar=0`} title="PDF" width="100%" height="100%"></iframe>
                            </div>
                            <div className="mt-3 text-end">
                              <a href={activeContent.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info rounded-pill px-3 transition-all">
                                <Download size={14} className="me-1" /> PDF
                              </a>
                            </div>
                          </div>
                        ) : activeContent.type === "document" && activeContent.textContent && (
                          <div className="p-3 rounded-3 text-white-50 mb-3 small shadow-inner" style={textViewerStyle}>
                            {activeContent.textContent}
                          </div>
                        )}

                        {activeContent.type === "document" && (activeContent.textContent || activeContent.fileUrl) && (
                          <div className="mt-4 border-top border-white border-opacity-10 pt-3">
                            <SummaryBox text={activeContent.textContent || `Summary of ${activeContent.title}`} />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <BookOpen size={40} className="mb-2 opacity-10" />
                        <p className="small text-secondary">Select a lesson from curriculum</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- CURRICULUM SIDEBAR --- */}
                <div className="col-lg-4 order-2 order-lg-1">
                  <div className="p-3 rounded-4 shadow-lg sticky-lg-top" style={{ ...sidebarCardStyle, top: "100px" }}>
                    <h6 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                      <BookOpen size={18} className="text-info" /> Curriculum
                    </h6>
                    <div className="d-flex flex-column gap-1 custom-scrollbar" style={{maxHeight: '60vh', overflowY: 'auto'}}>
                      {content.map((item, index) => (
                        <div
                          key={item._id}
                          onClick={() => {
                            setActiveContent(item);
                            if(window.innerWidth < 992) window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={activeContent?._id === item._id ? activeItemStyle : listItemStyle}
                          className="d-flex align-items-center justify-content-between p-2 rounded-3 transition-all clickable-item"
                        >
                          <div className="d-flex align-items-center gap-2 overflow-hidden">
                            <span className="small opacity-50 fw-bold">{String(index + 1).padStart(2, '0')}</span>
                            {item.type === "video" ? <PlayCircle size={16} /> : <FileText size={16} />}
                            <span className="small fw-medium text-truncate">{item.title}</span>
                          </div>
                          <ChevronRight size={12} className="flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .transition-all { transition: all 0.2s ease; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .clickable-item:hover { background: rgba(255,255,255,0.05); cursor: pointer; }
        .hover-scale:hover { transform: scale(1.02); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

/* --- PREMIUM THEME OBJECTS --- */

const pageWrapperStyle = {
  backgroundColor: "#0f172a",
  minHeight: "100vh",
  color: "#f8fafc",
  position: "relative",
  overflowX: "hidden",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  paddingTop: "90px" // 🔥 This prevents overlapping with fixed navbar
};

const blueGlow = {
  position: "absolute",
  width: "50%", height: "50%",
  top: "-5%", left: "-5%",
  background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
  zIndex: 1
};

const greenGlow = {
  position: "absolute",
  width: "50%", height: "50%",
  bottom: "-10%", right: "-10%",
  background: "radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)",
  zIndex: 1
};

const sidebarCardStyle = {
  background: "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "16px"
};

const viewerCardStyle = {
  background: "rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "16px"
};

const lockedCardStyle = {
  background: "rgba(30, 41, 59, 0.8)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  borderRadius: "24px"
};

const typeBadgeStyle = {
  background: "rgba(96, 165, 250, 0.1)",
  color: "#60a5fa",
  border: "1px solid rgba(96, 165, 250, 0.2)",
  padding: "4px 10px"
};

const listItemStyle = {
  color: "#94a3b8",
  fontSize: "0.85rem"
};

const activeItemStyle = {
  color: "#ffffff",
  background: "rgba(59, 130, 246, 0.2)",
  borderLeft: "3px solid #3b82f6",
  fontSize: "0.85rem"
};

const textViewerStyle = {
  background: "rgba(255,255,255,0.02)",
  lineHeight: "1.6",
  color: "#cbd5e1"
};

const premiumBtnStyle = {
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  fontSize: "0.95rem"
};

export default CourseDetails;