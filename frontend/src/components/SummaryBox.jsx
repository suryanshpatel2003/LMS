import { useState } from "react";
import { summarizeText } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Sparkles, Loader2, Check, Copy, X, FileWarning, RefreshCcw } from "lucide-react";

const SummaryBox = ({ text }) => {
  const { user } = useAuth();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSummarize = async () => {
    if (!text || text.trim().length < 20) {
      toast.error("Text is too short to summarize!");
      return;
    }

    setIsModalOpen(true);
    setLoading(true);
    setError("");
    setSummary("");

    const urlRegex = /(https?:\/\/[^\s]+(\.pdf))/g;
    const containsPdfUrl = urlRegex.test(text);

    if (text.trim().match(urlRegex) && text.trim().split(' ').length === 1) {
      setLoading(false);
      setError("I cannot read external PDF links directly. Please copy and paste the actual text content.");
      return;
    }

    let textToSummarize = text;
    if (containsPdfUrl) {
      textToSummarize = text.replace(urlRegex, '[PDF Link removed]');
    }

    try {
      const res = await summarizeText(textToSummarize, user.token);
      setSummary(res.summary);
    } catch (err) {
      setError("Failed to generate summary. AI server busy.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3">
      {/* Action Button */}
      <button
        className="btn d-flex align-items-center gap-2 transition-all hover-scale"
        style={aiBtnStyle}
        onClick={handleSummarize}
      >
        <Sparkles size={16} /> <span>AI Summary</span>
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={modalBackdropStyle} onClick={() => setIsModalOpen(false)}>
          <div 
            className="p-4 rounded-4 shadow-lg mx-3 animate-in" 
            style={modalCardStyle} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div style={iconBg}>
                  <Sparkles size={14} color="#60a5fa" />
                </div>
                <span className="text-white fw-bold small" style={{ letterSpacing: "1px" }}>AI INSIGHTS</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn p-1 border-0" style={{ background: 'transparent' }}>
                <X size={20} color="#94a3b8" />
              </button>
            </div>

            {/* Content States */}
            <div className="py-2">
                {loading && (
                  <div className="text-center py-4">
                    <Loader2 size={32} color="#60a5fa" className="spinner mb-3" />
                    <p className="text-info small mb-0 fw-medium">Processing contents...</p>
                  </div>
                )}

                {error && (
                  <div className="text-center py-3">
                    <FileWarning size={32} color="#f87171" className="mb-2" />
                    <p className="text-white-50 small px-3">{error}</p>
                  </div>
                )}

                {summary && !loading && (
                  <>
                    <div className="custom-scrollbar pr-2 mb-4" style={summaryWrapperStyle}>
                      <p className="text-white-50" style={summaryContentStyle}>{summary}</p>
                    </div>
                    
                    <div className="d-flex gap-2 border-top border-white border-opacity-5 pt-3">
                        <button onClick={copyToClipboard} className="btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-2" style={secondaryBtnStyle}>
                           {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Done" : "Copy"}
                        </button>
                        <button onClick={handleSummarize} className="btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-2" style={secondaryBtnStyle}>
                           <RefreshCcw size={14} /> Retry
                        </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .hover-scale:hover { transform: scale(1.02); filter: brightness(1.1); }
        .animate-in { animation: modalIn 0.3s ease-out; }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

/* --- PREMIUM UI STYLES --- */

const aiBtnStyle = {
  background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "700",
  fontSize: "0.8rem",
  padding: "10px 20px",
  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
};

const modalBackdropStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(15, 23, 42, 0.8)",
  backdropFilter: "blur(12px)",
  zIndex: 10000,
  display: "flex", alignItems: "center", justifyContent: "center"
};

const modalCardStyle = {
  background: "rgba(30, 41, 59, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  maxWidth: "500px",
  width: "100%",
};

const iconBg = {
  width: "24px", height: "24px",
  background: "rgba(59, 130, 246, 0.1)",
  borderRadius: "6px",
  display: "flex", alignItems: "center", justifyContent: "center"
};

const summaryWrapperStyle = {
  maxHeight: "350px",
  overflowY: "auto",
};

const summaryContentStyle = {
  fontSize: "0.9rem",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap",
};

const secondaryBtnStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "10px",
  padding: "8px 15px",
  fontSize: "0.75rem",
  fontWeight: "600"
};

export default SummaryBox;