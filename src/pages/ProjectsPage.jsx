import { useEffect, useState } from "react";
import { ProjectModal } from "../components/ProjectModal";
import { fetchProjectsAPI } from "../graphql/projectMutations";
import { STATUS_COLORS ,formatStatus} from "../utils/formatStatus";

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [projects, setProjects] = useState([]);

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditData(p);
    setModalOpen(true);
  };

  const loadProjects = async () => {
    const data = await fetchProjectsAPI("", 1);

    if (data?.status === 200) {
      setProjects(data.results);
    } else {
      console.error(data?.errorMessage || "Failed to load projects");
      setProjects([]);
    }
  };

  const handleSuccess = () => {
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HEADER */}
   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
  <div>
    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Projects</h1>
    <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0 0" }}>Manage all your projects</p>
  </div>

  <button
    onClick={openCreate}
    style={{
      padding: "8px 16px",
      height: "38px",
      background: "#6366f1",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      whiteSpace: "nowrap",
    }}
  >
    + New Project
  </button>
</div>

      {/* EMPTY STATE */}
      {projects.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 1rem", color: "#94a3b8" }}>
          <div style={{ fontSize: 52 }}>📁</div>
          <p style={{ fontWeight: 600 }}>No projects yet</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Title", "Project Name", "Project Code", "Status", "Start", "End", "Budget", "Manager", "Action"].map((h) => (
                  <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {projects.map((p, i) => {
                const statusColors = STATUS_COLORS[p.status] || STATUS_COLORS.todo;
                
                return (
                  <tr key={p.id} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                    <td style={{ padding: "0.7rem 1rem", fontWeight: 600 }}>{p.title}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.projectname}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.projectcode}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>
                      <span
                        style={{
                          background: statusColors.bg,
                          color: statusColors.text,
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 500,
                          display: "inline-block",
                        }}
                      >
                        {formatStatus(p.status)}
                      </span>
                    </td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.startdate || "—"}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.enddate || "—"}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.budgethours || "—"}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>
                      {p.manager?.name || "—"}
                    </td>
                    <td style={{ padding: "0.7rem 1rem" }}>
                      <button
                        onClick={() => openEdit(p)}
                        style={{
                          border: "1px solid #e2e8f0",
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 12,
                          color: "#6366f1",
                          backgroundColor: "white",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f5f3ff";
                          e.target.style.borderColor = "#6366f1";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.borderColor = "#e2e8f0";
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={handleSuccess}
      />
    </div>
  );
}