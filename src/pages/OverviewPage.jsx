import React, { useState } from "react";
import ProjectTree from "../components/ProjectTree.jsx";
import { useProjectTree } from "../graphql/projectMutations.js";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const OverViewPage = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: projects, loading, errorMessage, totalPages, totalCount } =
        useProjectTree({ search, currentPage });

    const handleSearch = (val) => {
        setSearch(val);
        setCurrentPage(1); // reset to page 1 on new search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

                {/* ── Empty state ── */}
                {!loading && !errorMessage && !projects?.length && (
                    <div style={{
                        padding: 60, textAlign: "center", color: "#9ca3af",
                        border: "1px dashed #e5e7eb", borderRadius: 10, background: "#fff",
                    }}>
                        {search ? `No projects found for "${search}"` : "No projects found."}
                    </div>
                )}

                {/* ── Project list ── */}
                {!loading && projects?.map((project) => (
                    <div key={project.id} style={{ marginBottom: 28 }}>

                        <div style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>
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
                                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                                        · {project.manager.name}
                                    </span>
                                )}
                            </div>
                            <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                                Track project milestones and their progress.
                            </p>
                        </div>

                        <div style={{
                            background: "#fff", borderRadius: 10,
                            border: "1px solid #e5e7eb", padding: "16px 20px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                        }}>
                            <ProjectTree milestones={project.milestones || []} />
                        </div>

                    </div>
                ))}

                {/* ── Pagination ── */}
                {!loading && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages ?? 1}
                        onPageChange={handlePageChange}
                    />
                )}

            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default OverViewPage;
