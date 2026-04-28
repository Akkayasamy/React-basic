import { useEffect, useState } from "react";
import { ProjectModal } from "../components/ProjectModal";
import { fetchProjectsAPI } from "../graphql/projectMutations";

const STATUS_COLORS = {
  active: { bg: "#dcfce7", text: "#166534" },
  inactive: { bg: "#fee2e2", text: "#991b1b" },
  pending: { bg: "#fef9c3", text: "#854d0e" },
};

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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Projects</h1>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>Manage all your projects</p>
        </div>

        <button
          onClick={openCreate}
          style={{
            padding: "0.6rem 1rem",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
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
                const sc = STATUS_COLORS[p.status] || STATUS_COLORS.inactive;

                return (
                  <tr key={p.id} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                    <td style={{ padding: "0.7rem 1rem", fontWeight: 600 }}>{p.title}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.projectname}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.projectcode}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>
                      <span
                        style={{
                          background: sc.bg,
                          color: sc.text,
                          padding: "2px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td style={{ padding: "0.7rem 1rem" }}>{p.startdate || "—"}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.enddate || "—"}</td>
                    <td style={{ padding: "0.7rem 1rem" }}>{p.budgethours || "—"}</td>

                    {/* FIXED */}
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
                          cursor: "pointer",
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