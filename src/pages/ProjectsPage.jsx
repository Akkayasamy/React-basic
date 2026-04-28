export default function ProjectsPage() {
  const projects = [
    { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", dueDate: "2025-06-30", progress: 78 },
    { id: 2, name: "Mobile App v2", status: "Planning", priority: "Medium", dueDate: "2025-08-15", progress: 45 },
    { id: 3, name: "API Integration", status: "Completed", priority: "Low", dueDate: "2025-05-01", progress: 100 },
    { id: 4, name: "Marketing Campaign", status: "On Hold", priority: "High", dueDate: "2025-07-20", progress: 22 },
  ];

  const statusColors = {
    "In Progress": { bg: "rgba(99,102,241,0.1)", color: "#6366f1" },
    "Planning":    { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    "Completed":   { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
    "On Hold":     { bg: "rgba(239,68,68,0.1)",  color: "#ef4444" },
  };

  const priorityColors = {
    High:   { bg: "rgba(239,68,68,0.1)",  color: "#ef4444" },
    Medium: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    Low:    { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  };

  return (
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Projects</h1>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Manage all your projects</p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "0.6rem 1.1rem", background: "#6366f1",
          color: "#fff", border: "none", borderRadius: 8,
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          + New Project
        </button>
      </div>
    </div>
  );
}