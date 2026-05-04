import React, { useState } from "react";
import ProjectTree from "../components/ProjectTree.jsx";
import { useProjectTree } from "../graphql/projectMutations.js";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const OverViewPage = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // Track which project is currently expanded
    const [expandedProjectId, setExpandedProjectId] = useState(null);

    const { data: projects, loading, errorMessage, totalPages, totalCount, refetch } =
        useProjectTree({ search, currentPage });

    const handleSearch = (val) => {
        setSearch(val);
        setCurrentPage(1); 
        setExpandedProjectId(null); // Reset expansion on search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setExpandedProjectId(null); // Reset expansion on page change
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleProject = (id) => {
        setExpandedProjectId(prevId => (prevId === id ? null : id));
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: 24 }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>

                {/* ── Page Header + Search ── */}
                <div style={{
                    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                    marginBottom: 24, flexWrap: "wrap", gap: 12,
                }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>
                            Projects Overview
                        </h1>
                        {!loading && totalCount != null && (
                            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9ca3af" }}>
                                {totalCount} project{totalCount !== 1 ? "s" : ""} found
                                {search && ` for "${search}"`}
                            </p>
                        )}
                    </div>
                    <SearchBar value={search} onChange={handleSearch} />
                </div>

                {/* ── Loading spinner ── */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "40vh", gap: 14 }}>
                        <div style={{
                            width: 32, height: 32,
                            border: "3px solid #e5e7eb",
                            borderTop: "3px solid #3b82f6",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                        }} />
                        <span style={{ color: "#9ca3af", fontSize: 14 }}>Loading projects...</span>
                    </div>
                )}

                {/* ── Error ── */}
                {!loading && errorMessage && (
                    <div style={{ padding: 16, background: "#fee2e2", color: "#dc2626", borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
                        {errorMessage}
                    </div>
                )}

                {/* ── Project list ── */}
                {!loading && projects?.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    
                    return (
                        <div key={project.id} style={{ marginBottom: 12 }}>
                            {/* Project Row / Header - Clickable */}
                            <div 
                                onClick={() => toggleProject(project.id)}
                                style={{
                                    background: "#fff",
                                    borderRadius: isExpanded ? "10px 10px 0 0" : 10,
                                    border: "1px solid #e5e7eb",
                                    padding: "16px 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                                    borderBottom: isExpanded ? "1px solid #f1f5f9" : "1px solid #e5e7eb"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {/* Small arrow indicator */}
                                    <span style={{ 
                                        transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", 
                                        transition: "transform 0.2s",
                                        fontSize: 10,
                                        color: "#9ca3af"
                                    }}>▶</span>
                                    
                                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#111827" }}>
                                        {project.title || project.projectname}
                                    </h2>
                                    
                                    {project.projectcode && (
                                        <span style={{
                                            fontSize: 10, background: "#eff6ff", color: "#3b82f6",
                                            border: "1px solid #bfdbfe", borderRadius: 4,
                                            padding: "1px 6px", fontWeight: 600,
                                        }}>
                                            {project.projectcode}
                                        </span>
                                    )}
                                </div>

                                <div style={{ fontSize: 13, color: "#6b7280" }}>
                                    {project.manager?.name || "No Manager"}
                                </div>
                            </div>

                            {/* Collapsible Milestone Section */}
                            {isExpanded && (
                                <div style={{
                                    background: "#fff",
                                    borderRadius: "0 0 10px 10px",
                                    border: "1px solid #e5e7eb",
                                    borderTop: "none",
                                    padding: "16px 20px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}>
                                    <ProjectTree milestones={project.milestones || []} refetch={refetch} />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* ── Pagination ── */}
                {!loading && (
                    <div style={{ marginTop: 24 }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages ?? 1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default OverViewPage;