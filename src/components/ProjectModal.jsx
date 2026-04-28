import { useEffect, useState } from "react";
import { saveProject } from "../graphql/projectMutations";
import { fetchManagersAPI } from "../graphql/managerQuery";
import { formatStatus } from "../utils/formatStatus";

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

export function ProjectModal({ isOpen, onClose, editData, onSuccess }) {
  const isEdit = !!editData;

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

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
        remarks: editData.remarks || "",
      });
      setSuccess("")
      setError("")
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editData, isOpen]);

  useEffect(() => {
    const loadManagers = async () => {
      try {
        setLoadingManagers(true);
        const res = await fetchManagersAPI();
        setManagers(res?.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingManagers(false);
      }
    };

    if (isOpen) loadManagers();
  }, [isOpen]);

  if (!isOpen) return null;

  const field = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.projectname.trim())
      return setError("Project name is required.");

    setError("");
    setLoading(true);

    try {
      const vars = {
        ...form,
        budgethours: form.budgethours
          ? parseInt(form.budgethours)
          : undefined,
        id: isEdit ? Number(editData.id) : undefined,
      };

      const result = await saveProject(vars);

      if (result?.status == 200) {
        setSuccess(isEdit ? "Project updated!" : "Project created!");
        onSuccess?.();
        onClose();
      } else {
        setError(result?.errorMessage || "Something went wrong.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.55rem 0.75rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 13,
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    background: "#f8fafc",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#475569",
    marginBottom: 5,
  };

  return (
    <>
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(15,23,42,.45)",
          backdropFilter: "blur(3px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            width: "100%",
            maxWidth: 560,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1.3rem 1.5rem 0",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                {isEdit ? "Update Project" : "Create New Project"}
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
                {isEdit
                  ? "Edit the project details below"
                  : "Fill in the details to create a project"}
              </p>
            </div>

            <button
              onClick={onClose}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "1.25rem 1.5rem" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            {/* Title + Project */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  className="pm-field"
                  style={inputStyle}
                  value={form.title}
                  onChange={field("title")}
                />
              </div>

              <div>
                <label style={labelStyle}>Project Name *</label>
                <input
                  className="pm-field"
                  style={inputStyle}
                  value={form.projectname}
                  onChange={field("projectname")}
                />
              </div>
            </div>

            {/* Dates */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  className="pm-field"
                  style={inputStyle}
                  value={form.startdate}
                  onChange={field("startdate")}
                />
              </div>

              <div>
                <label style={labelStyle}>End Date</label>
                <input
                  type="date"
                  className="pm-field"
                  style={inputStyle}
                  value={form.enddate}
                  onChange={field("enddate")}
                />
              </div>
            </div>

            {/* Budget + Status */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
              <div>
                <label style={labelStyle}>Budget Hours</label>
                <input
                  type="number"
                  className="pm-field"
                  style={inputStyle}
                  value={form.budgethours}
                  onChange={field("budgethours")}
                />
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <select
                  className="pm-field"
                  style={inputStyle}
                  value={form.status}
                  onChange={field("status")}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {formatStatus(s)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ✅ ONLY CHANGED FIELD (PROJECT MANAGER) */}
            <div style={{ marginTop: 10 }}>
              <label style={labelStyle}>Project Manager</label>

              <select
                className="pm-field"
                style={inputStyle}
                value={form.project_managerid}
                onChange={field("project_managerid")}
              >
                <option value="">Select Manager</option>

                {loadingManagers ? (
                  <option>Loading...</option>
                ) : (
                  managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Remarks */}
            <div style={{ marginTop: 10 }}>
              <label style={labelStyle}>Remarks</label>
              <textarea
                className="pm-field"
                style={{ ...inputStyle, minHeight: 80 }}
                value={form.remarks}
                onChange={field("remarks")}
              />
            </div>
          </div>

          <div style={{ padding: 15, display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onClose}>Cancel</button>

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}