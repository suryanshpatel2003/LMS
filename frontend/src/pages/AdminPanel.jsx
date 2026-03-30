import { useState, useEffect } from "react";
import { createCourse, addContent, getCourses } from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  PlusCircle,
  Upload,
  Link as LinkIcon,
  FileVideo,
  FileText,
  Layout,
  CheckCircle2,
  Loader2,
  BookOpen,
  Sparkles,
  ShieldAlert
} from "lucide-react";

const AdminPanel = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  const [courseLoading, setCourseLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const [courseForm, setCourseForm] = useState({ title: "", description: "", price: 500, thumbnail: "" });
  const [contentForm, setContentForm] = useState({ courseId: "", title: "", type: "video", videoUrl: "", textContent: "" });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  const [thumbMode, setThumbMode] = useState("url");
  const [videoMode, setVideoMode] = useState("url");
  const [docMode, setDocMode] = useState("text");

  // 🔹 DEBUGGING: Check what role is coming
  useEffect(() => {
    console.log("Logged in user:", user);
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) { console.error("Fetch failed"); }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setCourseLoading(true);
    const formData = new FormData();
    formData.append("title", courseForm.title);
    formData.append("description", courseForm.description);
    formData.append("price", courseForm.price);

    if (thumbMode === "upload" && thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    } else {
      formData.append("thumbnailUrl", courseForm.thumbnail);
    }

    try {
      await createCourse(formData, user.token);
      toast.success("Course Created Successfully! 🚀");
      setCourseForm({ title: "", description: "", price: 500, thumbnail: "" });
      setThumbnailFile(null);
      fetchCourses();
    } catch (err) { 
      toast.error("Error creating course."); 
    }
    setCourseLoading(false);
  };

  const handleAddContent = async (e) => {
    e.preventDefault();
    setContentLoading(true);
    const formData = new FormData();
    formData.append("courseId", contentForm.courseId);
    formData.append("title", contentForm.title);
    formData.append("type", contentForm.type);

    if (contentForm.type === "video") {
      if (videoMode === "upload" && videoFile) formData.append("file", videoFile);
      else formData.append("videoUrl", contentForm.videoUrl);
    } else {
      if (docMode === "file" && docFile) formData.append("file", docFile);
      else formData.append("textContent", contentForm.textContent);
    }

    try {
      await addContent(formData, user.token);
      toast.success("New Content Published! ✅");
      setContentForm({ courseId: "", title: "", type: "video", videoUrl: "", textContent: "" });
      setVideoFile(null);
      setDocFile(null);
      fetchCourses();
    } catch (err) { 
      toast.error("Error adding content."); 
    }
    setContentLoading(false);
  };

  // 🔹 FIX: SMART ROLE CHECKING (Handles different object structures)
  const userRole = user?.role || user?.user?.role || "";
  
  if (userRole.toLowerCase() !== "admin") {
    return (
      <div style={pageWrapperStyle} className="d-flex align-items-center justify-content-center">
        <div className="text-center p-5 rounded-4 shadow-lg border border-danger border-opacity-25" style={glassCardStyle}>
          <ShieldAlert size={60} color="#ef4444" className="mb-3" />
          <h2 className="text-danger fw-bold">Access Denied</h2>
          <p className="text-white-50">Admin privileges are required to view this panel.</p>
          <div className="mt-4 p-2 rounded bg-dark bg-opacity-50 border border-white border-opacity-5">
              <small className="text-info">Detected Role: <b>{userRole || "Guest"}</b></small>
          </div>
          <button className="btn btn-outline-info mt-4 px-4 rounded-pill" onClick={() => window.location.href='/login'}>
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapperStyle}>
      <div style={blueGlow}></div>
      <div style={greenGlow}></div>

      <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
        <div className="mb-4 text-center text-lg-start">
          
          <h2 className="display-6 fw-bold text-white">Admin Dashboard</h2>
        </div>

        <div className="row g-3">
          <div className="col-lg-5">
            <div className="p-3 p-md-4 rounded-4 shadow-lg border border-white border-opacity-5" style={glassCardStyle}>
              <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-white border-opacity-5">
                <PlusCircle size={20} color="#60a5fa" />
                <h5 className="text-white m-0 h6 fw-bold">Create Course</h5>
              </div>

              <form onSubmit={handleCreateCourse} className="small">
                <input className="form-control premium-input mb-2" placeholder="Course Title" style={inputStyle}
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} required />

                <textarea className="form-control premium-input mb-2" placeholder="Description" rows="2" style={inputStyle}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} required />

                <div className="input-group mb-2">
                  <span className="input-group-text border-0" style={{ background: "rgba(255,255,255,0.05)", color: "#60a5fa" }}>₹</span>
                  <input type="number" className="form-control premium-input" placeholder="Price" style={inputStyle}
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} required />
                </div>

                <div className="mb-2">
                  <div className="btn-group w-100 p-1 rounded-3" style={{ background: "rgba(30, 41, 59, 0.5)" }}>
                    <button type="button" onClick={() => setThumbMode("url")} className="btn btn-sm py-1" style={thumbMode === "url" ? activeToggle : inactiveToggle}>URL</button>
                    <button type="button" onClick={() => setThumbMode("upload")} className="btn btn-sm py-1" style={thumbMode === "upload" ? activeToggle : inactiveToggle}>Upload</button>
                  </div>
                </div>

                {thumbMode === "url" ? (
                  <input className="form-control premium-input mb-3" placeholder="Thumbnail URL" style={inputStyle}
                    value={courseForm.thumbnail}
                    onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })} />
                ) : (
                  <input type="file" className="form-control premium-input mb-3" style={inputStyle}
                    onChange={(e) => setThumbnailFile(e.target.files[0])} />
                )}

                <button className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2" style={primaryBtnStyle} disabled={courseLoading}>
                  {courseLoading ? <Loader2 className="spinner" size={18} /> : <><CheckCircle2 size={16} /> Save Course</>}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="p-3 p-md-4 rounded-4 shadow-lg border border-white border-opacity-5" style={glassCardStyle}>
              <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-white border-opacity-5">
                <Layout size={20} color="#4ade80" />
                <h5 className="text-white m-0 h6 fw-bold">Manage Materials</h5>
              </div>

              <form onSubmit={handleAddContent} className="small">
                <div className="row g-2">
                    <div className="col-md-6">
                        <select className="form-select premium-input mb-2" style={inputStyle}
                        value={contentForm.courseId}
                        onChange={(e) => setContentForm({ ...contentForm, courseId: e.target.value })} required>
                        <option value="" style={{background: '#0f172a'}}>Target Course</option>
                        {courses.map((c) => <option key={c._id} value={c._id} style={{ background: "#0f172a" }}>{c.title}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control premium-input mb-2" placeholder="Title (e.g. Intro)" style={inputStyle}
                        value={contentForm.title}
                        onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })} required />
                    </div>
                </div>

                <div className="row g-2 mb-2">
                    <div className="col-md-4">
                        <div className="btn-group w-100 p-1 rounded-3 h-100 align-items-center" style={{ background: "rgba(30, 41, 59, 0.5)" }}>
                            <button type="button" onClick={() => setContentForm({ ...contentForm, type: "video" })} className="btn btn-sm py-1 h-100" style={contentForm.type === "video" ? activeToggleGreen : inactiveToggle}>Video</button>
                            <button type="button" onClick={() => setContentForm({ ...contentForm, type: "document" })} className="btn btn-sm py-1 h-100" style={contentForm.type === "document" ? activeToggleGreen : inactiveToggle}>Doc</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {contentForm.type === "video" ? (
                            <div className="btn-group w-100 p-1 rounded-3" style={{ background: "rgba(30, 41, 59, 0.5)" }}>
                                <button type="button" onClick={() => setVideoMode("url")} className="btn btn-sm py-1" style={videoMode === "url" ? activeToggleGray : inactiveToggle}>URL</button>
                                <button type="button" onClick={() => setVideoMode("upload")} className="btn btn-sm py-1" style={videoMode === "upload" ? activeToggleGray : inactiveToggle}>Upload</button>
                            </div>
                        ) : (
                            <div className="btn-group w-100 p-1 rounded-3" style={{ background: "rgba(30, 41, 59, 0.5)" }}>
                                <button type="button" onClick={() => setDocMode("text")} className="btn btn-sm py-1" style={docMode === "text" ? activeToggleGray : inactiveToggle}>Write</button>
                                <button type="button" onClick={() => setDocMode("file")} className="btn btn-sm py-1" style={docMode === "file" ? activeToggleGray : inactiveToggle}>PDF</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    {contentForm.type === "video" ? (
                        videoMode === "url" ? 
                        <input className="form-control premium-input" placeholder="Video Link" style={inputStyle} value={contentForm.videoUrl} onChange={(e) => setContentForm({ ...contentForm, videoUrl: e.target.value })} />
                        : <input type="file" className="form-control premium-input" style={inputStyle} onChange={(e) => setVideoFile(e.target.files[0])} />
                    ) : (
                        docMode === "text" ? 
                        <textarea className="form-control premium-input" placeholder="Write content..." rows="3" style={inputStyle} value={contentForm.textContent} onChange={(e) => setContentForm({ ...contentForm, textContent: e.target.value })} />
                        : <input type="file" className="form-control premium-input" style={inputStyle} onChange={(e) => setDocFile(e.target.files[0])} />
                    )}
                </div>

                <button className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2" style={successBtnStyle} disabled={contentLoading}>
                  {contentLoading ? <Loader2 className="spinner" size={18} /> : <><Upload size={16} /> Publish Material</>}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="p-3 p-md-4 rounded-4 shadow-lg" style={glassCardStyle}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <BookOpen size={18} color="#60a5fa" />
                <h6 className="text-white m-0 fw-bold">Active Catalog</h6>
              </div>

              <div className="table-responsive custom-scrollbar" style={{maxHeight: '300px'}}>
                <table className="w-100 small" style={{ color: "#94a3b8" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">TITLE</th>
                      <th className="py-2 px-3">PRICE</th>
                      <th className="py-2 px-3 text-center">CONTENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={course._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                        <td className="py-2 px-3">{index + 1}</td>
                        <td className="py-2 px-3 text-white fw-medium">{course.title}</td>
                        <td className="py-2 px-3 text-info fw-bold">₹{course.price}</td>
                        <td className="py-2 px-3 text-center">
                          <span className="badge rounded-pill bg-dark border border-white border-opacity-10 text-success">
                            {course.contentCount || 0} items
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .premium-input { font-size: 0.85rem; }
        .premium-input::placeholder { color: rgba(148, 163, 184, 0.4) !important; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

/* --- STYLING --- */
const pageWrapperStyle = { backgroundColor: "#0f172a", minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: '80px' };
const blueGlow = { position: "absolute", width: "600px", height: "600px", top: "-100px", left: "-100px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)", zIndex: 1 };
const greenGlow = { position: "absolute", width: "500px", height: "500px", bottom: "-100px", right: "-100px", background: "radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 70%)", zIndex: 1 };
const glassCardStyle = { background: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.05)" };
const darkBadge = { background: "rgba(30, 41, 59, 0.6)", padding: "6px 14px", borderRadius: "100px", fontSize: "0.65rem", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.2)" };
const inputStyle = { background: "rgba(15, 23, 42, 0.5)", color: "#f8fafc", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" };
const primaryBtnStyle = { background: "linear-gradient(90deg, #3b82f6, #2563eb)", color: "#fff", fontWeight: "600", border: "none", borderRadius: "10px" };
const successBtnStyle = { background: "linear-gradient(90deg, #10b981, #059669)", color: "#fff", fontWeight: "600", border: "none", borderRadius: "10px" };

const activeToggle = { background: "#3b82f6", color: "#fff", fontWeight: "600", borderRadius: "6px" };
const activeToggleGreen = { background: "#10b981", color: "#fff", fontWeight: "600", borderRadius: "6px" };
const activeToggleGray = { background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: "600", borderRadius: "6px" };
const inactiveToggle = { color: "#64748b", border: "none", background: "transparent" };

export default AdminPanel;