import { useState } from "react";
import { SubtaskModal } from "../components/SubtaskModal.jsx";
import { useSubtasks } from "../graphql/subtaskQuery.js";
import { formatStatus } from "../utils/formatStatus.js";

const STATUS_COLORS = {
    todo: "bg-slate-100 text-slate-600",
    done: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
};

export default function SubtasksPage({ taskId }) {
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, loading, refetch } = useSubtasks({ taskId, search });
    const subtasks = data?.getSubtasks?.results || [];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Subtasks</h1>
                <button
                    onClick={() => { setEditData(null); setModalOpen(true); }}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg text-[13px] font-semibold"
                >
                    + New Subtask
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-[13px] text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Project Title</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Milestone Title</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Task Title</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Subtask</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Assignee</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Hours (Est/Act)</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Status</th>
                            <th className="px-5 py-3 text-slate-500 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-10 text-slate-400">Loading...</td></tr>
                        ) : subtasks.map(st => (
                            <tr key={st.id} className="border-b border-slate-50 hover:bg-slate-50">
                                 <td className="px-5 py-3">
                                    {st.project?.title}
                                </td>
                                 <td className="px-5 py-3">
                                    {st.milestone?.title}
                                </td>
                                <td className="px-5 py-3">
                                    {st.task?.title}
                                </td>
                                <td className="px-5 py-3 font-medium">{st.subTaskName}</td>
                                <td className="px-5 py-3">{st.assignee?.first_name || "—"}</td>
                                <td className="px-5 py-3 text-slate-600">
                                    {st.estimatedHours}h / <span className="font-semibold">{st.actualHours}h</span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${STATUS_COLORS[st.status]}`}>
                                        {formatStatus(st.status)}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <button
                                        onClick={() => { setEditData(st); setModalOpen(true); }}
                                        className="text-sky-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <SubtaskModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                editData={editData}
                onSuccess={() => refetch()}
                parentTaskId={taskId}
            />
        </div>
    );
}