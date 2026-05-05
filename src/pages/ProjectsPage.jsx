import { useEffect, useState, useCallback } from "react";
import { ProjectModal } from "../components/ProjectModal";
import { fetchProjectsAPI } from "../graphql/projectMutations";
import { STATUS_COLORS, formatStatus } from "../utils/formatStatus";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Added for the header stats
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditData(p);
    setModalOpen(true);
  };

  // Fixed to accept and use the search term
  const loadProjects = useCallback(async (page = currentPage, searchTerm = search) => {
    setLoading(true);
    const data = await fetchProjectsAPI(searchTerm, page);

    if (data?.status === 200) {
      setProjects(data.results || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      setTotalCount(data.totalCount || 0);
    } else {
      console.error(data?.errorMessage || "Failed to load projects");
      setProjects([]);
      setTotalCount(0);
    }
    setLoading(false);
  }, [currentPage, search]);

  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleSuccess = () => {
    loadProjects(currentPage, search);
  };

  useEffect(() => {
    loadProjects(currentPage, search);
  }, [currentPage, search, loadProjects]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER - Integrated search bar layout */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold m-0 text-gray-900">Projects</h1>
          {!loading && totalCount != null ? (
            <p className="text-[13px] text-slate-400 mt-1">
              {totalCount} project{totalCount !== 1 ? "s" : ""} found
              {search && ` for "${search}"`}
            </p>
          ) : (
            <p className="text-[13px] text-slate-400 mt-1">
              Manage all your projects
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={handleSearch} />

          <button
            onClick={openCreate}
            className="px-4 h-[38px] bg-sky-500 text-white border-0 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-1 whitespace-nowrap hover:bg-sky-600 transition"
          >
            + New Project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-slate-400 text-[13px]">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 px-4 text-slate-400">
          <div className="text-[52px]">📁</div>
          <p className="font-semibold">No projects found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Title", "Project Name", "Project Code", "Status",
                  "Start", "End", "Budget", "Manager", "Action",
                ].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-slate-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {projects.map((p, i) => {
                const statusColors = STATUS_COLORS[p.status] || STATUS_COLORS.todo;
                return (
                  <tr key={p.id} className={i % 2 ? "bg-[#fafafa]" : "bg-white"}>
                    <td className="py-3 px-4 font-semibold">{p.title}</td>
                    <td className="py-3 px-4">{p.projectname}</td>
                    <td className="py-3 px-4">{p.projectcode}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{ background: statusColors.bg, color: statusColors.text }}
                      >
                        {formatStatus(p.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{p?.startdate || "—"}</td>
                    <td className="py-3 px-4">{p?.enddate || "—"}</td>
                    <td className="py-3 px-4">{p?.budgethours || "—"}</td>
                    <td className="py-3 px-4">{p?.manager?.name || "—"}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openEdit(p)}
                        className="border border-slate-200 px-2.5 py-1 rounded-md text-xs text-sky-500 bg-white cursor-pointer transition hover:bg-violet-50 hover:border-sky-500"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages ?? 1}
            onPageChange={handlePageChange}
          />
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