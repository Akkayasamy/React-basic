import { useState } from "react";
import { SubtaskModal } from "../components/SubtaskModal.jsx";
import { useSubtasks } from "../graphql/subtaskQuery.js";
import { formatStatus, STATUS_COLORS } from "../utils/formatStatus.js";
import Pagination from "../components/Pagination.jsx";

export default function SubtasksPage({ taskId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);

  // Synchronized with the Milestones pattern
  const { data, loading, refetch } = useSubtasks({ taskId, page, search: "" });

  const subtasks = data?.getSubtasks?.results || [];
  const totalCount = data?.getSubtasks?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 10);

  const openCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (st) => {
    setEditData(st);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

 const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* HEADER - Exact same style as Milestones */}
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-2xl font-bold m-0">Subtasks</h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Manage all your subtasks
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 h-[38px] bg-sky-500 text-white border-0 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-1 whitespace-nowrap hover:bg-sky-600 transition"
        >
          + New Subtask
        </button>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-24 text-slate-400 text-[13px]">
          Loading...
        </div>
      ) : subtasks.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-24 px-4 text-slate-400">
          <div className="text-[52px]">📝</div>
          <p className="font-semibold">No subtasks yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Project Title",
                  "Milestone Title",
                  "Task Title",
                  "Subtask",
                  "Assignee",
                  "Hours (Est/Act)",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-slate-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {subtasks.map((st, i) => {
                const statusColors =
                  STATUS_COLORS[st.status] || STATUS_COLORS.todo;

                return (
                  <tr
                    key={st.id}
                    className={i % 2 ? "bg-[#fafafa]" : "bg-white"}
                  >
                    <td className="py-3 px-4">{st.project?.title || "—"}</td>
                    <td className="py-3 px-4">{st.milestone?.title || "—"}</td>
                    <td className="py-3 px-4">{st.task?.title || "—"}</td>
                    <td className="py-3 px-4 font-semibold">{st.subTaskName}</td>
                    <td className="py-3 px-4">{st.assignee?.first_name || "—"}</td>
                    <td className="py-3 px-4">
                      {st.estimatedHours}h / <span className="font-semibold">{st.actualHours}h</span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{
                          background: statusColors.bg,
                          color: statusColors.text,
                        }}
                      >
                        {formatStatus(st.status)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => openEdit(st)}
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

          {!loading && <Pagination
            currentPage={page}
            totalPages={totalPages ?? 1}
            onPageChange={handlePageChange}
          />}
        </div>
      )}

      <SubtaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={handleSuccess}
        parentTaskId={taskId}
      />
    </div>
  );
}