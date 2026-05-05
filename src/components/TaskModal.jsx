import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatStatus } from "../utils/formatStatus";
import { useProjects } from "../graphql/projectMutations.js";
import { useManagers } from "../graphql/managerQuery.js";
import { saveTask } from "../graphql/taskQuery.js";
import { useMilestonesByProject } from "../graphql/taskQuery.js";
import { useGetAllUsers } from "../graphql/getUserQuery.js";

const EMPTY_FORM = {
    title: "",
    taskName: "",
    projectId: "",
    milestoneId: "",
    assignedTo: "",
    startDate: "",
    dueDate: "",
    priority: "low",
    status: "todo",
};

const STATUS_OPTIONS = ['todo', 'in_progress', 'resolved', 'done', 're_open', 'hold'];
const PRIORITY_OPTIONS = ["low", "normal", "high"];

const REQUIRED_FIELDS = [
    { key: "title", label: "Title" },
    { key: "taskName", label: "Task Name" },
    { key: "projectId", label: "Project" },
    { key: "milestoneId", label: "Milestone" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "startDate", label: "Start Date" },
    { key: "dueDate", label: "Due Date" },
];

export function TaskModal({ isOpen, onClose, editData, onSuccess }) {
    const isEdit = !!editData;

    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const { data: projects = [], loading: loadingProjects } = useProjects();
    const { data: managers = [], loading: loadingManagers } = useManagers();
    const { data: milestoneData, loading: loadingMilestones } = useMilestonesByProject(form.projectId);
    const { data: users = [], loading: loadingUsers } = useGetAllUsers();


    const milestones = milestoneData?.getMilestones?.results || [];

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || "",
                taskName: editData.taskName || "",
                projectId: editData.project?.id || "",
                milestoneId: editData.milestone?.id || "",
                assignedTo: editData.assignee?.id || "",
                startDate: editData.startDate || "",
                dueDate: editData.dueDate || "",
                priority: editData.priority || "normal",
                status: editData.status || "todo",
            });
        } else {
            setForm(EMPTY_FORM);
        }
        setFieldErrors({});
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const field = (k) => (e) => {
        const value = e.target.value;
        setForm((f) => ({
            ...f,
            [k]: value,
            // reset milestone when project changes
            ...(k === "projectId" ? { milestoneId: "" } : {}),
        }));
        setFieldErrors((prev) => ({ ...prev, [k]: false }));
    };

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
                projectId: form.projectId ? parseInt(form.projectId) : undefined,
                milestoneId: form.milestoneId ? parseInt(form.milestoneId) : undefined,
                id: isEdit ? Number(editData.id) : undefined,
            };
            const result = await saveTask(vars);
            if (result?.status == 200) {
                toast.success(isEdit ? "Task updated!" : "Task created!");
                onSuccess?.();
                onClose();
            } else {
                toast.error(result?.errorMessage || "Something went wrong.");
            }
        } catch (e) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const errorRing = (key) =>
        fieldErrors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50";

    const inputClass = (key) =>
        `w-full px-3 py-2 rounded-lg text-[13px] text-slate-900 outline-none border-[1.5px] box-border transition-colors ${errorRing(key)}`;

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[1000] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-[0_24px_64px_rgba(0,0,0,0.2)]">

                {/* Header */}
                <div className="flex justify-between items-start px-6 pt-5">
                    <div>
                        <h2 className="m-0 text-[1.05rem] font-bold text-slate-900">
                            {isEdit ? "Update Task" : "Create New Task"}
                        </h2>
                        <p className="mt-1 text-[12px] text-slate-400">
                            {isEdit ? "Edit the task details below" : "Fill in the details to create a task"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 text-lg leading-none bg-transparent border-none cursor-pointer transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-3">

                    {/* Title + Task Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                className={inputClass("title")}
                                value={form.title}
                                onChange={field("title")}
                                placeholder="Enter title"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Task Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                className={inputClass("taskName")}
                                value={form.taskName}
                                onChange={field("taskName")}
                                placeholder="Enter task name"
                            />
                        </div>
                    </div>

                    {/* Project */}
                    <div>
                        <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                            Project <span className="text-red-500">*</span>
                        </label>
                        <select
                            className={inputClass("projectId")}
                            value={form.projectId}
                            onChange={field("projectId")}
                        >
                            <option value="">
                                {loadingProjects ? "Loading..." : "Select Project"}
                            </option>
                            {!loadingProjects &&
                                projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.projectname} {p.projectcode ? `(${p.projectcode})` : ""}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Milestone — only enabled after project selected */}
                    <div>
                        <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                            Milestone<span className="text-red-500">*</span>
                        </label>
                        <select
                            className={inputClass("milestoneId")}
                            value={form.milestoneId}
                            onChange={field("milestoneId")}
                            disabled={!form.projectId}
                        >
                            <option value="">
                                {!form.projectId
                                    ? "Select a project first"
                                    : loadingMilestones
                                        ? "Loading..."
                                        : "Select Milestone"}
                            </option>
                            {!loadingMilestones &&
                                milestones.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.milestoneName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                            Assigned To <span className="text-red-500">*</span>
                        </label>
                        <select
                            className={inputClass("assignedTo")}
                            value={form.assignedTo}
                            onChange={field("assignedTo")}
                        >
                            <option value="">
                                {loadingManagers ? "Loading..." : "Select Assignee"}
                            </option>
                            {!loadingManagers &&
                                users.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.first_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className={inputClass("startDate")}
                                value={form.startDate}
                                onChange={field("startDate")}
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className={inputClass("dueDate")}
                                value={form.dueDate}
                                onChange={field("dueDate")}
                            />
                        </div>
                    </div>

                    {/* Priority + Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Priority
                            </label>
                            <select
                                className={inputClass("priority")}
                                value={form.priority}
                                onChange={field("priority")}
                            >
                                {PRIORITY_OPTIONS.map((p) => (
                                    <option key={p} value={p}>
                                        {formatStatus(p)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                                Status
                            </label>
                            <select
                                className={inputClass("status")}
                                value={form.status}
                                onChange={field("status")}
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                        {formatStatus(s)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 flex justify-end gap-2.5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-[13px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm"
                    >
                        {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
                    </button>
                </div>
            </div>
        </div>
    );
}