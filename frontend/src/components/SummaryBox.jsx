import { useState } from "react";
import { summarizeText } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
// 🔥 Lucide Icons
import { Sparkles, Loader2, Check, Copy, X, FileWarning } from "lucide-react";

const SummaryBox = ({ text }) => {
  const { user } = useAuth();

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  
  // 🪟 State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔍 Function to check if text is purely a URL or contains URLs
  const handleSummarize = async () => {
    setIsModalOpen(true);
    setLoading(true);
    setError("");
    setSummary("");

    // Regex to detect URLs (especially ending with .pdf)
    const urlRegex = /(https?:\/\/[^\s]+(\.pdf))/g;
    const containsPdfUrl = urlRegex.test(text);

    // Case 1: If text is ONLY a URL
    if (text.trim().match(urlRegex) && text.trim().split(' ').length === 1) {
      setLoading(false);
      setError("I cannot read external PDF links directly. Please copy and paste the actual text content from the PDF here to summarize it!");
      return;
    }

    // Case 2: Mixed text. We clean the text by removing the PDF URL before sending it to AI
    let textToSummarize = text;
    if (containsPdfUrl) {
      textToSummarize = text.replace(urlRegex, '[PDF Link removed for processing]');
    }

    try {
      const res = await summarizeText(textToSummarize, user.token);
      setSummary(res.summary);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeOverlay = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      
      {/* 🔘 AI Action Button */}
      <button
        className="btn d-flex align-items-center gap-2 card-hover-effect"
        style={aiBtnStyle}
        onClick={handleSummarize}
        disabled={!text}
      >
        <Sparkles size={16} /> Summarize with AI
      </button>

      {/* 🎭 MODAL OVERLAY (Backdrop with Blur) */}
      {isModalOpen && (
        <div style={modalBackdropStyle} onClick={closeOverlay}>
          
          {/* 🪟 Modal Card (Exactly at Center) */}
          <div 
            className="p-4 p-md-5 rounded-4 position-relative" 
            style={modalCardStyle} 
            onClick={(e) => e.stopPropagation()} // Card pe click karne se modal close nahi hoga
          >
            
            {/* ❌ Close Button */}
            <button 
              onClick={closeOverlay} 
              className="position-absolute btn p-2 d-flex align-items-center justify-content-center" 
              style={closeBtnStyle}
            >
              <X size={20} color="rgba(255,255,255,0.6)" />
            </button>

            {/* ⏳ Glowing Loader State */}
            {loading && (
              <div className="text-center py-5">
                <Loader2 size={36} color="#CEF17B" className="spinner mb-3" />
                <h5 style={{ color: "#CEF17B", letterSpacing: "1px" }} className="fw-bold">AI IS ANALYZING CONTENT</h5>
                <p className="text-white-50 m-0 small">Reading through the lesson materials...</p>
              </div>
            )}

            {/* ❌ Error State / PDF URL Warning */}
            {error && (
              <div className="text-center py-5">
                <FileWarning size={36} color="#ff4757" className="mb-3" />
                <h5 style={{ color: "#ff4757" }} className="fw-bold">Notice</h5>
                <p className="text-white-50 small mb-4" style={{ maxWidth: "400px", margin: "0 auto 1.5rem" }}>
                  {error}
                </p>
                <button className="btn btn-sm" style={aiBtnStyle} onClick={closeOverlay}>
                  Got it
                </button>
              </div>
            )}

            {/* ✅ Premium Summary Output */}
            {summary && !loading && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center gap-2">
                    <div style={iconBg}>
                      <Sparkles size={14} color="#CEF17B" />
                    </div>
                    <span className="text-white fw-bold small" style={{ letterSpacing: "1px" }}>
                      AI GENERATED SUMMARY
                    </span>
                  </div>
                  
                  {/* Copy Action */}
                  <button 
                    onClick={copyToClipboard} 
                    className="btn btn-sm text-white-50 d-flex align-items-center gap-1 p-0"
                    style={{ background: "transparent", border: "none" }}
                  >
                    {copied ? <Check size={14} color="#CEF17B" /> : <Copy size={14} />}
                    <span className="small">{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                
                <div className="text-white-50 mb-4" style={summaryContentStyle}>
                  {summary}
                </div>
                
                {/* Subtle Regenerate trigger */}
                <div className="pt-3 border-top d-flex justify-content-end" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <button className="btn btn-sm text-white-50 p-0 small" onClick={handleSummarize} style={{ fontSize: "0.8rem" }}>
                    Not satisfied? <span style={{ color: "#CEF17B" }}>Regenerate</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spinner animation */}
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

/* 🔥 STYLING OBJECTS */

const aiBtnStyle = {
  backgroundColor: "rgba(206, 241, 123, 0.1)",
  color: "#CEF17B",
  border: "1px solid rgba(206, 241, 123, 0.2)",
  borderRadius: "10px",
  fontWeight: "700",
  fontSize: "0.85rem",
  padding: "10px 18px",
  letterSpacing: "0.5px"
};

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.75)", 
  backdropFilter: "blur(12px)", 
  zIndex: 99999, 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalCardStyle = {
  background: "#0c1a14", 
  border: "1px solid rgba(206, 241, 123, 0.1)", // Halki si green theme match karne ke liye border
  maxWidth: "600px",
  width: "90%", 
  boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
  maxHeight: "85vh",
  overflowY: "auto",
};

const closeBtnStyle = {
  top: "15px",
  right: "15px",
  background: "rgba(255,255,255,0.03)",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px"
};

const iconBg = {
  width: "28px",
  height: "28px",
  background: "rgba(206, 241, 123, 0.1)",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const summaryContentStyle = {
  fontSize: "0.95rem",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap"
};

export default SummaryBox;