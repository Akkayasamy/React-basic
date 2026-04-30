import { useState } from "react";
import { toast } from "react-toastify";
import { TaskModal } from "../components/TaskModal.jsx";
import { formatStatus } from "../utils/formatStatus.js";
import { useTasks } from "../graphql/taskQuery.js";

const PRIORITY_COLORS = {
  low: "bg-slate-100 text-slate-600",
  normal: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700"
};

const STATUS_COLORS = {
  todo: "bg-slate-100 text-slate-600",
  in_progress: "bg-blue-100 text-blue-700",
  in_review: "bg-purple-100 text-purple-700",
  blocked: "bg-red-100 text-red-700",
  on_hold: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-slate-200 text-slate-500",
};

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data, loading, refetch } = useTasks({ page, search });

  const response = data?.getTasks;
  const tasks = response?.results || [];
  const totalPages = response?.totalPages || 1;
  const totalCount = response?.totalCount || 0;

  const openCreate = () => { setEditData(null); setModalOpen(true); };
  const openEdit = (task) => { setEditData(task); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditData(null); };
  const handleSuccess = () => refetch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  console.log(tasks, 'tasks')
  return (
    <div className="p-6 min-h-screen bg-slate-50">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tasks</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            {totalCount} task{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm cursor-pointer"
        >
          + New Task
        </button>
      </div>

      {/* Search */}
      {/* <div className="mb-4">
        <input
          className="w-full max-w-sm px-3 py-2 rounded-lg text-[13px] text-slate-900 border border-slate-200 bg-white outline-none focus:border-sky-400 transition-colors"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-500">#</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Title</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Task Name</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Project</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Milestone</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Assignee</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Priority</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-slate-400">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task, i) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-3 text-slate-400">
                    {task.taskCode || `#${(page - 1) * 10 + i + 1}`}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {task.title}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {task.taskName}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {task.project?.projectname || "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {task.milestone?.milestoneName || "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {task.assignee?.first_name || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${PRIORITY_COLORS[task.priority] || "bg-slate-100 text-slate-500"}`}>
                      {formatStatus(task.priority)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_COLORS[task.status] || "bg-slate-100 text-slate-500"}`}>
                      {formatStatus(task.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openEdit(task)}
                      className="text-sky-600 hover:text-sky-800 font-medium transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Previous
          </button>
          <span className="text-[13px] text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={handleClose}
        editData={editData}
        onSuccess={handleSuccess}
      />
    </div>
  );
}