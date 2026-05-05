import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllUsers } from "../graphql/getUserQuery.js";
import { useTasks } from "../graphql/taskQuery.js";
import { useSubtasks } from "../graphql/subtaskQuery.js";
import { saveTimesheet } from "../graphql/timesheetQuery.js";

const EMPTY_FORM = {
  title: "",
  employeeId: "",
  taskId: "",
  subtaskId: "",
  workDate: new Date().toISOString().split('T')[0],
  hoursWorked: "",
  remarks: "",
  approvalStatus: "pending"
};

const REQUIRED_FIELDS = [
  { key: "title", label: "Work Description" },
  { key: "employeeId", label: "Employee" },
  { key: "taskId", label: "Task" },
  { key: "workDate", label: "Work Date" },
  { key: "hoursWorked", label: "Hours Worked" },
];

export function TimesheetModal({ isOpen, onClose, editData, onSuccess }) {
  const isEdit = !!editData;
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { data: users = [] } = useGetAllUsers();
  const { data: taskData } = useTasks({ page: 1, search: "" });
  const { data: subtaskData } = useSubtasks({ taskId: form.taskId, page: 1 });

  const tasks = taskData?.getTasks?.results || [];
  const subtasks = subtaskData?.getSubtasks?.results || [];

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        employeeId: editData.employee?.id || "",
        taskId: editData.task?.id || "",
        subtaskId: editData.subtask?.id || "",
        workDate: editData.workDate || "",
        hoursWorked: editData.hoursWorked || "",
        remarks: editData.remarks || "",
        approvalStatus: editData.approvalStatus || "pending",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFieldErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const field = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "taskId" ? { subtaskId: "" } : {})
    }));
    setFieldErrors((prev) => ({ ...prev, [key]: false }));
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

    // ✅ block zero or negative
    if (Number(form.hoursWorked) <= 0) {
      setFieldErrors({ hoursWorked: true });
      toast.error("Hours Worked must be greater than 0", { toastId: "hoursWorked" });
      return false;
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
        subtaskId: form.subtaskId ? parseInt(form.subtaskId) : null,
        hoursWorked: parseFloat(form.hoursWorked),
        employeeId: form.employeeId.toString()
      };

      const result = await saveTimesheet(vars);
      if (result?.status === 200) {
        toast.success(isEdit ? "Entry updated!" : "Time logged successfully!");
        onSuccess?.();
        onClose();
      } else {
        toast.error(result?.errorMessage || "Error saving timesheet");
      }
    } catch (e) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const errorRing = (key) =>
    fieldErrors[key] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50";

  const inputClass = (key) =>
    `w-full px-3 py-2 rounded-lg text-[13px] border-[1.5px] outline-none transition-colors ${errorRing(key)}`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[1000] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-xl max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="font-bold text-slate-800">{isEdit ? "Edit Entry" : "Log New Time"}</h2>
            <p className="text-[11px] text-slate-400">Record your working hours for tasks</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">

          <div className="col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Work Description <span className="text-red-500">*</span>
            </label>
            <input className={inputClass("title")} value={form.title} onChange={field("title")} />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Employee <span className="text-red-500">*</span>
            </label>
            <select className={inputClass("employeeId")} value={form.employeeId} onChange={field("employeeId")}>
              <option value="">Select Employee</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Work Date <span className="text-red-500">*</span>
            </label>
            <input type="date" className={inputClass("workDate")} value={form.workDate} onChange={field("workDate")} />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Task <span className="text-red-500">*</span>
            </label>
            <select className={inputClass("taskId")} value={form.taskId} onChange={field("taskId")}>
              <option value="">Select Task</option>
              {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Subtask</label>
            <select className={inputClass("subtaskId")} value={form.subtaskId} onChange={field("subtaskId")} disabled={!form.taskId}>
              <option value="">No Subtask</option>
              {subtasks.map(st => <option key={st.id} value={st.id}>{st.subTaskName}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Hours Worked <span className="text-red-500">*</span>
            </label>
            <input type="number" step="0.5" className={inputClass("hoursWorked")} value={form.hoursWorked} onChange={field("hoursWorked")} />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Status</label>
            <select className={inputClass("approvalStatus")} value={form.approvalStatus} onChange={field("approvalStatus")}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Remarks</label>
            <textarea className={`${inputClass("remarks")} h-20 resize-none`} value={form.remarks} onChange={field("remarks")} />
          </div>

        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0">
          <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-slate-600">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-sky-600 text-white rounded-lg text-[13px] font-semibold disabled:opacity-50">
            {loading ? "Saving..." : isEdit ? "Update Entry" : "Save Entry"}
          </button>
        </div>

      </div>
    </div>
  );
}