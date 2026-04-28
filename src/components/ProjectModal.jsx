import { useEffect, useState } from "react";
import { saveProject } from "../graphql/projectMutations";

const EMPTY_FORM = {
  title: "",
  projectname: "",
  startdate: "",
  enddate: "",
  budgethours: "",
  status: "active",
  project_managerid: "",
  remarks: "",
};

const STATUS_OPTIONS = [
  "todo",
  "in_progress",
  "in_review",
  "blocked",
  "on_hold",
  "done",
  "cancelled",
];
const STATUS_COLORS = {
  todo: { bg: "#f1f5f9", text: "#64748b" },
  in_progress: { bg: "#eff6ff", text: "#2563eb" },
  in_review: { bg: "#fef9c3", text: "#ca8a04" },
  blocked: { bg: "#fee2e2", text: "#dc2626" },
  on_hold: { bg: "#fff7ed", text: "#ea580c" },
  done: { bg: "#f0fdf4", text: "#16a34a" },
  cancelled: { bg: "#f3f4f6", text: "#6b7280" },
};

export function ProjectModal({ isOpen, onClose, editData, onSuccess }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(editData || EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        projectname: editData.projectname || "",
        status: editData.status || "",
        startdate: editData.startdate || "",
        enddate: editData.enddate || "",
        budgethours: editData.budgethours || "",
        project_managerid: editData.project_managerid || "",
      });
    } else {
      // reset when creating new
      setForm({
        title: "",
        projectname: "",
        status: "",
        startdate: "",
        enddate: "",
        budgethours: "",
        project_managerid: "",
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const field = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.projectname.trim()) { setError("Project name is required."); return; }
    setError(""); setLoading(true);
    try {
      const vars = {
        ...form,
        budgethours: form.budgethours ? parseInt(form.budgethours) : undefined,
        id: isEdit ? editData.id : undefined,
      };
      const result = await saveProject(vars);
      if (result?.status == 200) {
        setSuccess(isEdit ? "Project updated!" : "Project created!");
        setSuccess("");
        onSuccess?.();
        onClose();
      } else {
        setError(result?.errorMessage || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "0.55rem 0.75rem",
    border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 13, color: "#0f172a", outline: "none",
    boxSizing: "border-box", background: "#f8fafc",
  };
  const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5 };

  return (
    <>
      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-14px) scale(.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pm-field:focus { border-color: #6366f1 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(99,102,241,.1); }
      `}</style>

      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(15,23,42,.45)", backdropFilter: "blur(3px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        }}
      >

        <div style={{
          background: "#fff", borderRadius: 14, width: "100%", maxWidth: 560,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,.2)",
          animation: "modalSlideIn .18s ease",
        }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.3rem 1.5rem 0" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                {isEdit ? "Update Project" : "Create New Project"}
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
                {isEdit ? "Edit the project details below" : "Fill in the details to create a project"}
              </p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18, padding: 6, borderRadius: 6, lineHeight: 1 }}>✕</button>
          </div>

          <div style={{ padding: "1.25rem 1.5rem" }}>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "0.55rem 0.9rem", color: "#dc2626", fontSize: 12, marginBottom: "1rem" }}>⚠️ {error}</div>}
            {success && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "0.55rem 0.9rem", color: "#16a34a", fontSize: 12, marginBottom: "1rem" }}>✅ {success}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Title <span style={{ color: "#ef4444" }}>*</span></label>
                <input className="pm-field" style={inputStyle} value={form.title} onChange={field("title")} placeholder="e.g. Phase 1" />
              </div>
              <div>
                <label style={labelStyle}>Project Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input className="pm-field" style={inputStyle} value={form.projectname} onChange={field("projectname")} placeholder="e.g. Website Redesign" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input className="pm-field" type="date" style={inputStyle} value={form.startdate} onChange={field("startdate")} />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input className="pm-field" type="date" style={inputStyle} value={form.enddate} onChange={field("enddate")} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Budget Hours</label>
                <input className="pm-field" type="number" min="0" style={inputStyle} value={form.budgethours} onChange={field("budgethours")} placeholder="e.g. 200" />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <div style={{ position: "relative" }}>
                  <select className="pm-field" style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.status} onChange={field("status")}>
                    {STATUS_OPTIONS.map(o => (
                      <option key={o} value={o}>{o.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: 10 }}>▾</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Project Manager ID</label>
              <input className="pm-field" style={inputStyle} value={form.project_managerid} onChange={field("project_managerid")} placeholder="e.g. user_123" />
            </div>

            <div>
              <label style={labelStyle}>Remarks</label>
              <textarea className="pm-field" style={{ ...inputStyle, resize: "vertical", minHeight: 72, fontFamily: "inherit" }} value={form.remarks} onChange={field("remarks")} placeholder="Any additional notes..." />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "1rem 1.5rem 1.4rem", borderTop: "1px solid #f1f5f9" }}>
            <button onClick={onClose} style={{ padding: "0.55rem 1.2rem", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer" }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: "0.55rem 1.4rem", borderRadius: 8, border: "none",
                background: loading ? "#a5b4fc" : "#6366f1",
                fontSize: 13, fontWeight: 600, color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              {loading && <span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />}
              {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}