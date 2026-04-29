import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatStatus } from "../utils/formatStatus";
import { useProjects } from "../graphql/projectMutations";
import { useSaveMilestone } from "../graphql/milestoneMutations";

const EMPTY_FORM = {
  title: "",
  milestoneName: "",
  projectId: "",
  startDate: "",
  endDate: "",
  status: "pending",
  milestoneOwner: "",
};

const STATUS_OPTIONS = [
  "pending",
  "in_progress",
  "completed",
  "delayed",
];

const REQUIRED_FIELDS = [
  { key: "title",          label: "Title" },
  { key: "milestoneName",  label: "Milestone Name" },
  { key: "projectId",      label: "Project" },
  { key: "startDate",      label: "Start Date" },
  { key: "endDate",        label: "End Date" },
  { key: "milestoneOwner", label: "Milestone Owner" },
];

export function MilestoneModal({ isOpen, onClose, editData, onSuccess }) {
  const isEdit = !!editData;

  const [form, setForm]               = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});

  const { saveMilestone, loading } = useSaveMilestone();
  const { data: projects = [], loading: loadingProjects } = useProjects();

  useEffect(() => {
    if (editData) {
      setForm({
        title:          editData.title          || "",
        milestoneName:  editData.milestoneName  || "",
        projectId:      editData.project?.id    || "",
        startDate:      editData.startDate      || "",
        endDate:        editData.endDate        || "",
        status:         editData.status         || "pending",
        milestoneOwner: editData.milestoneOwner || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setFieldErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const field = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
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

    const vars = {
      ...form,
      projectId: form.projectId ? parseInt(form.projectId) : undefined,
      id: isEdit ? Number(editData.id) : undefined,
    };

    const result = await saveMilestone(vars);

    if (result?.status == 200) {
      console.log(result,'result<<<<<<<<')
      toast.success(isEdit ? "Milestone updated!" : "Milestone created!");
      onSuccess?.();
      onClose();
    } else {
      toast.error(result?.errorMessage || "Something went wrong.");
    }
  };

  const errorRing = (key) =>
    fieldErrors[key]
      ? "border-red-400 bg-red-50"
      : "border-slate-200 bg-slate-50";

  const inputClass = (key) =>
    `w-full px-3 py-2 rounded-lg text-[13px] text-slate-900 outline-none border-[1.5px] box-border transition-colors ${errorRing(key)}`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[1000] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-[0_24px_64px_rgba(0,0,0,0.2)]">

        <div className="flex justify-between items-start px-6 pt-5">
          <div>
            <h2 className="m-0 text-[1.05rem] font-bold text-slate-900">
              {isEdit ? "Update Milestone" : "Create New Milestone"}
            </h2>
            <p className="mt-1 text-[12px] text-slate-400">
              {isEdit
                ? "Edit the milestone details below"
                : "Fill in the details to create a milestone"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg leading-none bg-transparent border-none cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-3">

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
                Milestone Name <span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass("milestoneName")}
                value={form.milestoneName}
                onChange={field("milestoneName")}
                placeholder="Enter milestone name"
              />
            </div>
          </div>

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
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={inputClass("endDate")}
                value={form.endDate}
                onChange={field("endDate")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 mb-1">
                Milestone Owner <span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass("milestoneOwner")}
                value={form.milestoneOwner}
                onChange={field("milestoneOwner")}
                placeholder="Enter owner name"
              />
            </div>
          </div>
        </div>

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
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Milestone"
              : "Create Milestone"}
          </button>
        </div>
      </div>
    </div>
  );
}
