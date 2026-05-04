import React from "react";
import ProjectTree from "../components/ProjectTree.jsx";
import { useProjectTree } from "../graphql/projectMutations.js";

const OverViewPage = () => {
  const { data: projects, loading, errorMessage } = useProjectTree();

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "#9ca3af", fontSize: 14 }}>
      Loading projects...
    </div>
  );

  if (errorMessage) return (
    <div style={{ margin: 24, padding: 16, background: "#fee2e2", color: "#dc2626", borderRadius: 8, fontSize: 14 }}>
      {errorMessage}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {projects?.map((project) => (
          <div key={project.id} style={{ marginBottom: 32 }}>

            {/* Project header */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>
                  {project.title || project.projectname}
                </h2>
                {project.projectcode && (
                  <span style={{
                    fontSize: 11, background: "#eff6ff", color: "#3b82f6",
                    border: "1px solid #bfdbfe", borderRadius: 4,
                    padding: "1px 7px", fontWeight: 600,
                  }}>
                    {project.projectcode}
                  </span>
                )}
                {project.manager?.name && (
                  <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
                    · {project.manager.name}
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                Track project milestones and their progress.
              </p>
            </div>

            {/* ProjectTree for this project's milestones */}
            <div style={{
              background: "#fff", borderRadius: 10,
              border: "1px solid #e5e7eb", padding: "16px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <ProjectTree milestones={project.milestones || []} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewPage;
