import { useEffect, useState } from "react";
import { ProjectModal } from "../components/ProjectModal";
import { fetchProjectsAPI } from "../graphql/projectMutations";
import { STATUS_COLORS, formatStatus } from "../utils/formatStatus";

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
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-2xl font-bold m-0">Projects</h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Manage all your projects
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 h-[38px] bg-indigo-500 text-white border-0 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-1 whitespace-nowrap hover:bg-indigo-600 transition"
        >
          + New Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {projects.length === 0 ? (
        <div className="text-center py-24 px-4 text-slate-400">
          <div className="text-[52px]">📁</div>
          <p className="font-semibold">No projects yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Title",
                  "Project Name",
                  "Project Code",
                  "Status",
                  "Start",
                  "End",
                  "Budget",
                  "Manager",
                  "Action",
                ].map((h) => (
                  <th key={h} className="py-3 px-4 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {projects.map((p, i) => {
                const statusColors =
                  STATUS_COLORS[p.status] || STATUS_COLORS.todo;

                return (
                  <tr
                    key={p.id}
                    className={i % 2 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="py-3 px-4 font-semibold">{p.title}</td>
                    <td className="py-3 px-4">{p.projectname}</td>
                    <td className="py-3 px-4">{p.projectcode}</td>

                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{
                          background: statusColors.bg,
                          color: statusColors.text,
                        }}
                      >
                        {formatStatus(p.status)}
                      </span>
                    </td>

                    <td className="py-3 px-4">{p?.startdate || "—"}</td>
                    <td className="py-3 px-4">{p?.enddate || "—"}</td>
                    <td className="py-3 px-4">{p?.budgethours || "—"}</td>

                    <td className="py-3 px-4">
                      {formatStatus(p?.manager?.name) || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => openEdit(p)}
                        className="border border-slate-200 px-2.5 py-1 rounded-md text-xs text-indigo-500 bg-white cursor-pointer transition hover:bg-violet-50 hover:border-indigo-500"
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