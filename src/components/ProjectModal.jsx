import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveProject } from "../graphql/projectMutations";
import { formatStatus } from "../utils/formatStatus";
import { useManagers } from "../graphql/managerQuery.js";

const EMPTY_FORM = {
  title: "",
  projectname: "",
  startdate: "",
  enddate: "",
  budgethours: "",
  status: "todo",
  project_managerid: "",
  remarks: "",
};

const STATUS_OPTIONS = [
  "todo",
  "in_progress",
  "in_review",
  "blocked",
  "on_hold",
  "done",
  "cancelled",
];


const REQUIRED_FIELDS = [
  { key: "title", label: "Title" },
  { key: "projectname", label: "Project Name" },
  { key: "startdate", label: "Start Date" },
  { key: "enddate", label: "End Date" },
  { key: "budgethours", label: "Budget Hours" },
  { key: "project_managerid", label: "Project Manager" },
];

export function ProjectModal({ isOpen, onClose, editData, onSuccess }) {
  const isEdit = !!editData;

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { data: managers = [], loading: loadingManagers } = useManagers();

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        projectname: editData.projectname || "",
        status: editData.status || "",
        startdate: editData.startdate || "",
        enddate: editData.enddate || "",
        budgethours: editData.budgethours || "",
        project_managerid: editData.project_managerid || "",
        remarks: editData.remarks || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFieldErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const field = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    // clear error on change
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
        budgethours: form.budgethours ? parseInt(form.budgethours) : undefined,
        id: isEdit ? Number(editData.id) : undefined,
      };

      const result = await saveProject(vars);

      if (result?.status == 200) {
        toast.success(isEdit ? "Project updated!" : "Project created!");
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

  // ✅ Reusable error ring class
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
            <h2 className="m-0 text-[1.05rem]  font-bold text-slate-900">
              {isEdit ? "Update Project" : "Create New Project"}
            </h2>
            <p className="mt-1 text-[12px] text-slate-400">
              {isEdit ? "Edit the project details below" : "Fill in the details to create a project"}
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

          {/* Title + Project Name */}
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
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass("projectname")}
                value={form.projectname}
                onChange={field("projectname")}
                placeholder="Enter project name"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={inputClass("startdate")}
                value={form.startdate}
                onChange={field("startdate")}
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={inputClass("enddate")}
                value={form.enddate}
                onChange={field("enddate")}
              />
            </div>
          </div>

          {/* Budget + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                Budget Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={inputClass("budgethours")}
                value={form.budgethours}
                onChange={field("budgethours")}
                placeholder="e.g. 40"
              />
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

          {/* Project Manager */}
          <div>
            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
              Project Manager <span className="text-red-500">*</span>
            </label>
            <select
              className={inputClass("project_managerid")}
              value={form.project_managerid}
              onChange={field("project_managerid")}
            >
              <option value="">
                {loadingManagers ? "Loading..." : "Select Manager"}
              </option>
              {!loadingManagers &&
                managers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-[12px] font-semibold text-slate-500 mb-1">
              Remarks
            </label>
            <textarea
              className={`${inputClass("remarks")} min-h-[80px] resize-none`}
              value={form.remarks}
              onChange={field("remarks")}
              placeholder="Optional remarks..."
            />
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
            {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}