import React, { useState } from "react";
import { MilestoneModal } from "../components/MilestoneModal";
import {
  fullName,
  getInitials,
  getAvatarColor,
  STATUS_STYLES,
} from "../utils/common";

const Avatar = ({ name = "", size = 22 }) => (
  <div
    className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
    style={{
      width: size,
      height: size,
      background: getAvatarColor(name),
      fontSize: size * 0.38,
    }}
  >
    {getInitials(name)}
  </div>
);

const StatusBadge = ({ status }) => {
  const s =
    STATUS_STYLES[status] || {
      background: "#f3f4f6",
      color: "#6b7280",
    };

  return (
    <span
      className="px-3 py-[2px] rounded-full text-xs font-medium whitespace-nowrap"
      style={s}
    >
      {status || "—"}
    </span>
  );
};

const Chevron = ({ open }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 16 16"
    fill="none"
    className={`transition-transform ${open ? "rotate-90" : ""}`}
  >
    <path
      d="M6 4l4 4-4 4"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ✅ FIXED ACTION BUTTON */
const ActionBtn = ({ onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); // 🔥 IMPORTANT
      onClick?.();
    }}
    className="text-gray-400 text-lg px-1 hover:text-gray-600 cursor-pointer"
  >
    ⋮
  </button>
);

/* ================= TIMESHEET ================= */

const TimesheetSection = ({ timesheets = [] }) => {
  const [open, setOpen] = useState(false);
  if (!timesheets.length) return null;

  return (
    <div className="bg-yellow-50 rounded-md mt-1">
      <div
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1 cursor-pointer"
      >
        <Chevron open={open} />
        <span className="text-sm font-semibold text-yellow-700">
          Timesheet
        </span>
      </div>

      {open && (
        <div className="pl-6 pb-2">
          {timesheets.map((ts, i) => (
            <div key={i} className="flex justify-between py-1 text-sm">
              <span>{ts.workDate}</span>
              <span>{ts.hoursWorked}h</span>
              <StatusBadge status={ts.approvalStatus} />
              <ActionBtn />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= SUBTASK ================= */

const SubtaskSection = ({ subtasks = [] }) => {
  const [open, setOpen] = useState(true);
  if (!subtasks.length) return null;

  return (
    <div className="bg-blue-50 rounded-md mt-1">
      <div
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1 cursor-pointer"
      >
        <Chevron open={open} />
        <span className="text-sm font-semibold text-blue-600">
          Subtasks
        </span>
      </div>

      {open &&
        subtasks.map((st, i) => {
          const name = fullName(st.assignee);

          return (
            <div key={i} className="pl-6 py-2">
              <div className="flex justify-between items-center">
                <span>{st.title}</span>

                <div className="flex items-center gap-2">
                  <Avatar name={name} />
                  <StatusBadge status={st.status} />
                  <ActionBtn />
                </div>
              </div>

              <TimesheetSection timesheets={st.timesheets} />
            </div>
          );
        })}
    </div>
  );
};

/* ================= TASK ================= */

const TaskRow = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const hasChild = task.subtasks?.length || task.timesheets?.length;
  const name = fullName(task.assignee);

  return (
    <div className="mb-1 rounded-md">
      <div
        onClick={() => hasChild && setOpen(!open)}
        className="grid grid-cols-[20px_30px_1fr_200px_120px_120px_80px] items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
      >
        <span>{hasChild && <Chevron open={open} />}</span>
        <span className="text-gray-400">{index + 1}</span>
        <span className="font-medium">{task.title}</span>

        <div className="flex items-center gap-2">
          <Avatar name={name} />
          <span>{name}</span>
        </div>

        <span>{task.startDate}</span>
        <StatusBadge status={task.status} />

        <ActionBtn />
      </div>

      {open && (
        <div className="pl-4">
          <SubtaskSection subtasks={task.subtasks} />
          <TimesheetSection timesheets={task.timesheets} />
        </div>
      )}
    </div>
  );
};

const TaskSection = ({ tasks = [] }) => {
  const [open, setOpen] = useState(true);
  if (!tasks.length) return null;

  return (
    <div className="bg-gray-50 rounded-md mt-2">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 cursor-pointer"
      >
        <Chevron open={open} />
        <span className="font-semibold text-blue-600">Tasks</span>
      </div>

      {open &&
        tasks.map((t, i) => <TaskRow key={i} task={t} index={i} />)}
    </div>
  );
};

/* ================= MILESTONE ================= */

const MilestoneRow = ({ milestone, index, onEdit }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl mb-3 bg-white shadow-sm">
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-[20px_30px_1fr_120px_120px_120px_80px] px-4 py-3 items-center hover:bg-gray-50 cursor-pointer"
      >
        <Chevron open={open} />
        <span className="text-gray-400">{index + 1}</span>
        <span className="font-bold">{milestone.title}</span>
        <span>{milestone.startDate}</span>
        <span>{milestone.endDate}</span>
        <StatusBadge status={milestone.status} />

        <ActionBtn onClick={() => onEdit(milestone)} />
      </div>

      {open && <TaskSection tasks={milestone.tasks} />}
    </div>
  );
};

/* ================= MAIN ================= */

const ProjectTree = ({ milestones = [], refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openEdit = (milestone) => {
    setEditData(milestone);
    setModalOpen(true);
  };

  const onSuccess = () => {
    setModalOpen(false);
    refetch();
  };

  if (!milestones.length) {
    return (
      <div className="p-10 text-center text-gray-400 border rounded-lg">
        No data
      </div>
    );
  }

  return (
    <div>

      {/* ✅ ADDED HEADER (FIX) */}
      <div className="grid grid-cols-[20px_30px_1fr_120px_120px_120px_80px] px-4 py-2 text-xs text-gray-400 uppercase mb-2">
        <span />
        <span>#</span>
        <span>Milestone</span>
        <span>Start</span>
        <span>End</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {milestones.map((m, i) => (
        <MilestoneRow
          key={i}
          milestone={m}
          index={i}
          onEdit={openEdit}
        />
      ))}

      <MilestoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={() => onSuccess()}
      />
    </div>
  );
};

export default ProjectTree;