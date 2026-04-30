import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatStatus } from "../utils/formatStatus";
import { useGetAllUsers } from "../graphql/getUserQuery.js";
import { saveSubtask } from "../graphql/subtaskQuery.js";
import { useTasks } from "../graphql/taskQuery.js"; // Import the task hook

const EMPTY_FORM = {
    title: "",
    subTaskName: "",
    taskId: "",
    assignedTo: "",
    startDate: "",
    dueDate: "",
    status: "todo",
    estimatedHours: 0,
    actualHours: 0,
};

const STATUS_OPTIONS = ['todo', 'in_progress', 'resolved', 'done', 're_open', 'hold'];

export function SubtaskModal({ isOpen, onClose, editData, onSuccess, parentTaskId }) {
    const isEdit = !!editData;
    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);

    // Fetching Tasks for the dropdown and Users for assignment
    const { data: taskData, loading: loadingTasks } = useTasks({ page: 1, search: "" });
    const { data: users = [] } = useGetAllUsers();

    const tasks = taskData?.getTasks?.results || [];

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || "",
                subTaskName: editData.subTaskName || "",
                taskId: editData.task?.id || parentTaskId || "",
                assignedTo: editData.assignee?.id || "",
                startDate: editData.startDate || "",
                dueDate: editData.dueDate || "",
                status: editData.status || "todo",
                estimatedHours: editData.estimatedHours || 0,
                actualHours: editData.actualHours || 0,
            });
        } else {
            setForm({ ...EMPTY_FORM, taskId: parentTaskId || "" });
        }
    }, [editData, isOpen, parentTaskId]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!form.title || !form.subTaskName || !form.taskId) {
            return toast.error("Title, Subtask Name, and Task are required");
        }
        setLoading(true);
        try {
            const vars = {
                ...form,
                id: isEdit ? Number(editData.id) : undefined,
                taskId: parseInt(form.taskId),
                estimatedHours: parseFloat(form.estimatedHours),
                actualHours: parseFloat(form.actualHours),
            };
            const result = await saveSubtask(vars);
            if (result?.status === 200) {
                toast.success(isEdit ? "Subtask updated!" : "Subtask created!");
                onSuccess?.();
                onClose();
            } else {
                toast.error(result?.errorMessage || "Error saving subtask");
            }
        } catch (e) {
            toast.error("Network error.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-3 py-2 rounded-lg text-[13px] border border-slate-200 bg-slate-50 outline-none focus:border-sky-400 transition-colors";

    return (
        <div className="fixed inset-0 z-[1000] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="font-bold text-slate-800">{isEdit ? "Edit Subtask" : "New Subtask"}</h2>
                        <p className="text-[11px] text-slate-400">Manage subtask details and timeline</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
                </div>

                <div className="p-6 grid grid-cols-2 gap-4">
                    {/* Parent Task Dropdown */}
                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Task <span className="text-red-500">*</span></label>
                        <select 
                            className={inputClass} 
                            value={form.taskId} 
                            onChange={(e) => setForm({...form, taskId: e.target.value})}
                            disabled={!!parentTaskId && !isEdit} // Disable if passed from task-specific view
                        >
                            <option value="">{loadingTasks ? "Loading tasks..." : "Select Task"}</option>
                            {tasks.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.taskCode ? `[${t.taskCode}] ` : ""}{t.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Title <span className="text-red-500">*</span></label>
                        <input className={inputClass} value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g., API Implementation" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Subtask Name <span className="text-red-500">*</span></label>
                        <input className={inputClass} value={form.subTaskName} onChange={(e) => setForm({...form, subTaskName: e.target.value})} placeholder="e.g., Auth Module" />
                    </div>

                    {/* Date Fields */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Start Date</label>
                        <input type="date" className={inputClass} value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Due Date</label>
                        <input type="date" className={inputClass} value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Assignee</label>
                        <select className={inputClass} value={form.assignedTo} onChange={(e) => setForm({...form, assignedTo: e.target.value})}>
                            <option value="">Select User</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.first_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status</label>
                        <select className={inputClass} value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Est. Hours</label>
                        <input type="number" className={inputClass} value={form.estimatedHours} onChange={(e) => setForm({...form, estimatedHours: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Actual Hours</label>
                        <input type="number" className={inputClass} value={form.actualHours} onChange={(e) => setForm({...form, actualHours: e.target.value})} />
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0">
                    <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                    <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-[13px] font-semibold shadow-sm disabled:opacity-50 transition-colors">
                        {loading ? "Saving..." : isEdit ? "Update Subtask" : "Create Subtask"}
                    </button>
                </div>
            </div>
        </div>
    );
}