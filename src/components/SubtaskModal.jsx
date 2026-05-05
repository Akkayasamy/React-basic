import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatStatus } from "../utils/formatStatus";
import { useGetAllUsers } from "../graphql/getUserQuery.js";
import { saveSubtask } from "../graphql/subtaskQuery.js";
import { useTasks } from "../graphql/taskQuery.js";

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

const REQUIRED_FIELDS = [
    { key: "taskId", label: "Task" },
    { key: "title", label: "Title" },
    { key: "subTaskName", label: "Subtask Name" },
    { key: "startDate", label: "Start Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "assignedTo", label: "Assignee" },
];

export function SubtaskModal({ isOpen, onClose, editData, onSuccess, parentTaskId }) {
    const isEdit = !!editData;
    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({});

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
                estimatedHours: editData.estimatedHours || null,
                actualHours: editData.actualHours || null,
            });
        } else {
            setForm({ ...EMPTY_FORM, taskId: parentTaskId || "" });
        }

        setFieldErrors({});
    }, [editData, isOpen, parentTaskId]);

    if (!isOpen) return null;

    // ✅ SAME FIELD HANDLER PATTERN
    const field = (key) => (e) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
        setFieldErrors((prev) => ({ ...prev, [key]: false }));
    };

    // ✅ SAME VALIDATION LOGIC
    const validate = () => {
        const errors = {};

        for (const { key, label } of REQUIRED_FIELDS) {
            if (!form[key]?.toString().trim()) {
                errors[key] = true;
                setFieldErrors(errors);
                toast.error(`Please enter ${label}`, { toastId: key });
                return false;
            }
        }

        setFieldErrors({});
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

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

    // ✅ SAME ERROR STYLE
    const errorRing = (key) =>
        fieldErrors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50";

    const inputClass = (key) =>
        `w-full px-3 py-2 rounded-lg text-[13px] outline-none border-[1.5px] transition-colors ${errorRing(key)}`;

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[1000] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="font-bold text-slate-800">
                            {isEdit ? "Edit Subtask" : "New Subtask"}
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            Manage subtask details and timeline
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
                </div>

                {/* Body */}
                <div className="p-6 grid grid-cols-2 gap-4">

                    {/* Task */}
                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Task <span className="text-red-500">*</span>
                        </label>
                        <select
                            className={inputClass("taskId")}
                            value={form.taskId}
                            onChange={field("taskId")}
                            disabled={!!parentTaskId && !isEdit}
                        >
                            <option value="">{loadingTasks ? "Loading..." : "Select Task"}</option>
                            {tasks.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.taskCode ? `[${t.taskCode}] ` : ""}{t.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={inputClass("title")}
                            value={form.title}
                            onChange={field("title")}
                        />
                    </div>

                    {/* Subtask Name */}
                    <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Subtask Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={inputClass("subTaskName")}
                            value={form.subTaskName}
                            onChange={field("subTaskName")}
                        />
                    </div>

                    {/* Dates */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input type="date" className={inputClass("startDate")} value={form.startDate} onChange={field("startDate")} />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Due Date <span className="text-red-500">*</span>
                        </label>
                        <input type="date" className={inputClass("dueDate")} value={form.dueDate} onChange={field("dueDate")} />
                    </div>

                    {/* Assignee */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Assignee <span className="text-red-500">*</span>
                        </label>
                        <select className={inputClass("assignedTo")} value={form.assignedTo} onChange={field("assignedTo")}>
                            <option value="">Select User</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.first_name}</option>)}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status</label>
                        <select className={inputClass("status")} value={form.status} onChange={field("status")}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
                        </select>
                    </div>

                    {/* Hours */}
                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Est. Hours</label>
                        <input type="number" className={inputClass("estimatedHours")} value={form.estimatedHours} onChange={field("estimatedHours")} />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Actual Hours</label>
                        <input type="number" className={inputClass("actualHours")} value={form.actualHours} onChange={field("actualHours")} />
                    </div>
                </div>

                {/* Footer */}
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