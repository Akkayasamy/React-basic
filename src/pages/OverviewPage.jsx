import React, { useState } from "react";
import ProjectTree from "../components/ProjectTree.jsx";
import { useProjectTree } from "../graphql/projectMutations.js";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const OverViewPage = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedProjectId, setExpandedProjectId] = useState(null);

    const { data: projects, loading, errorMessage, totalPages, totalCount, refetch } =
        useProjectTree({ search, currentPage });

    const handleSearch = (val) => {
        setSearch(val);
        setCurrentPage(1);
        setExpandedProjectId(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setExpandedProjectId(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleProject = (id) => {
        setExpandedProjectId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6 font-['Inter','Segoe_UI',sans-serif]">
            <div className="max-w-[1400px] mx-auto">

                {/* ── Page Header + Search ── */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                    <div>
                        <h1 className="m-0 text-[22px] font-bold text-gray-900">
                            Projects Overview
                        </h1>
                        {!loading && totalCount != null && (
                            <p className="mt-[3px] mb-0 text-[12px] text-gray-400">
                                {totalCount} project{totalCount !== 1 ? "s" : ""} found
                                {search && ` for "${search}"`}
                            </p>
                        )}
                    </div>
                    <SearchBar value={search} onChange={handleSearch} />
                </div>

                {/* ── Loading spinner ── */}
                {loading && (
                    <div className="flex flex-col items-center justify-center h-[40vh] gap-[14px]">
                        <div className="w-8 h-8 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-gray-400 text-sm">Loading projects...</span>
                    </div>
                )}

                {/* ── Error ── */}
                {!loading && errorMessage && (
                    <div className="p-4 bg-red-100 text-red-600 rounded-lg text-sm mb-4">
                        {errorMessage}
                    </div>
                )}

                {/* ── Project list ── */}
                {!loading && projects?.map((project) => {
                    const isExpanded = expandedProjectId === project.id;
                    
                    return (
                        <div key={project.id} className="mb-3">
                            {/* Project Row / Header - Clickable */}
                            <div 
                                onClick={() => toggleProject(project.id)}
                                className={`
                                    bg-white px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-200 shadow-sm border border-gray-200
                                    ${isExpanded ? "rounded-t-[10px] border-b-slate-50" : "rounded-[10px]"}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Small arrow indicator */}
                                    <span className={`
                                        text-[10px] text-gray-400 transition-transform duration-200
                                        ${isExpanded ? "rotate-90" : "rotate-0"}
                                    `}>▶</span>
                                    
                                    <h2 className="m-0 text-base font-semibold text-gray-900">
                                        {project.title || project.projectname}
                                    </h2>
                                    
                                    {project.projectcode && (
                                        <span className="text-[10px] bg-blue-50 text-blue-500 border border-blue-200 rounded px-1.5 py-[1px] font-semibold">
                                            {project.projectcode}
                                        </span>
                                    )}
                                </div>

                                <div className="text-[13px] text-gray-500">
                                    {project.manager?.name || "No Manager"}
                                </div>
                            </div>

                            {/* Collapsible Milestone Section */}
                            {isExpanded && (
                                <div className="bg-white px-5 py-4 border border-gray-200 border-t-0 rounded-b-[10px] shadow-md">
                                    <ProjectTree milestones={project.milestones || []} refetch={refetch} />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* ── Pagination ── */}
                {!loading && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages ?? 1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverViewPage;