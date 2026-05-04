import React, { useState } from "react";
import { MilestoneModal } from "../components/MilestoneModal";
import { TaskModal } from "../components/TaskModal.jsx";
import { SubtaskModal } from "./SubtaskModal.jsx";

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
      border: "none",
    };

  return (
    <span
      className="px-6 py-[2px] rounded-full text-xs font-medium whitespace-nowrap"
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
    <path d="M6 4l4 4-4 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SectionLabel = ({ label, color, open, onToggle }) => (
  <div onClick={onToggle} className="flex items-center gap-2 px-3 py-1 cursor-pointer">
    <Chevron open={open} />
    <span className="text-sm font-semibold" style={{ color }}>
      {label}
    </span>
  </div>
);

const TH = ({ children }) => (
  <th className="px-3 py-2 text-xs text-gray-500 font-semibold bg-gray-50 text-left">
    {children}
  </th>
);

const TD = ({ children }) => (
  <td className="px-3 py-2 text-sm text-gray-700">{children}</td>
);

const ActionBtn = ({ onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
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
      <SectionLabel
        label="Timesheet (Hours Logged)"
        color="#d97706"
        open={open}
        onToggle={() => setOpen((p) => !p)}
      />

      {open && (
        <div className="pl-6 pb-2">
          <table className="w-full">
            <thead>
              <tr>
                <TH>Work Date</TH>
                <TH>Remarks</TH>
                <TH>Hours</TH>
                <TH>Status</TH>
                <TH>Actions</TH>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((ts, i) => (
                <tr key={i} className="hover:bg-yellow-100 rounded-md">
                  <TD>{ts.workDate || "—"}</TD>
                  <TD>{ts.remarks || "—"}</TD>
                  <TD>{ts.hoursWorked || "—"}</TD>
                  <TD><StatusBadge status={ts.approvalStatus} /></TD>
                  <TD><ActionBtn /></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ================= SUBTASK ================= */

const SubtaskSection = ({ subtasks = [], onEditSubtask }) => {
  const [open, setOpen] = useState(false);
  if (!subtasks.length) return null;

  return (
    <div className="bg-blue-50 rounded-md mt-1">
      <SectionLabel
        label="Subtasks"
        color="#3b82f6"
        open={open}
        onToggle={() => setOpen((p) => !p)}
      />

      {open && (
        <div className="pl-6 pb-2">
          <table className="w-full">
            <thead>
              <tr>
                <TH>#</TH>
                <TH>Subtask</TH>
                <TH>Assignee</TH>
                <TH>Start</TH>
                <TH>Due</TH>
                <TH>Status</TH>
                <TH>Actions</TH>
              </tr>
            </thead>

            <tbody>
              {subtasks.map((st, i) => {
                const name = fullName(st.assignee);

                return (
                  <React.Fragment key={i}>
                    <tr className="hover:bg-blue-100 rounded-md">
                      <TD>{i + 1}</TD>
                      <TD className="font-medium">{st.title}</TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <Avatar name={name} />
                          <span>{name}</span>
                        </div>
                      </TD>
                      <TD>{st.startDate}</TD>
                      <TD>{st.dueDate}</TD>
                      <TD><StatusBadge status={st.status} /></TD>
                      <TD>
                        <ActionBtn onClick={() => onEditSubtask?.(st)} />
                      </TD>
                    </tr>

                    {st.timesheets?.length > 0 && (
                      <tr>
                        <td colSpan={7}>
                          <TimesheetSection timesheets={st.timesheets} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ================= TASK ================= */

const TaskRow = ({ task, index, onEditTask, onEditSubtask }) => {
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

        <span className="text-gray-500">{task.startDate}</span>
        <StatusBadge status={task.status} />

        <ActionBtn onClick={() => onEditTask(task)} />
      </div>

      {open && (
        <div className="pl-4 mt-1">
          <SubtaskSection
            subtasks={task.subtasks}
            onEditSubtask={onEditSubtask}
          />
          <TimesheetSection timesheets={task.timesheets} />
        </div>
      )}
    </div>
  );
};

/* ================= TASK SECTION ================= */

const TaskSection = ({ tasks = [], onEditTask, onEditSubtask }) => {
  const [open, setOpen] = useState(false);
  if (!tasks.length) return null;

  return (
    <div className="bg-gray-50 rounded-md mt-2">
      <SectionLabel
        label="Tasks"
        color="#3b82f6"
        open={open}
        onToggle={() => setOpen(!open)}
      />

      {open && (
        <div className="pl-4">
          <div className="grid grid-cols-[20px_30px_1fr_200px_120px_120px_80px] px-3 py-2 text-xs text-gray-400 uppercase">
            <span />
            <span>#</span>
            <span>Task</span>
            <span>Assignee</span>
            <span>Start</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {tasks.map((t, i) => (
            <TaskRow
              key={i}
              task={t}
              index={i}
              onEditTask={onEditTask}
              onEditSubtask={onEditSubtask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= MILESTONE ================= */

const MilestoneRow = ({ milestone, index, onEdit, refetch }) => {
  const [open, setOpen] = useState(false);

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskEditData, setTaskEditData] = useState(null);

  const [subtaskModalOpen, setSubtaskModalOpen] = useState(false);
  const [subtaskEditData, setSubtaskEditData] = useState(null);

  const openEditTask = (task) => {
    setTaskEditData(task);
    setTaskModalOpen(true);
  };

  const openEditSubtask = (st) => {
    setSubtaskEditData(st);
    setSubtaskModalOpen(true);
  };

  const onTaskSuccess = () => {
    setTaskModalOpen(false);
    refetch();
  };

  const onSubtaskSuccess = () => {
    setSubtaskModalOpen(false);
    refetch();
  };

  return (
    <div className="rounded-xl mb-3 bg-white shadow-sm">
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-[20px_30px_1fr_120px_120px_120px_80px] px-4 py-3 items-center hover:bg-gray-50 cursor-pointer"
      >
        <Chevron open={open} />
        <span className="text-gray-400">{index + 1}</span>
        <span className="font-bold text-gray-800">{milestone.title}</span>
        <span className="text-gray-500">{milestone.startDate}</span>
        <span className="text-gray-500">{milestone.endDate}</span>
        <StatusBadge status={milestone.status} />

        <ActionBtn onClick={() => onEdit(milestone)} />
      </div>

      {open && (
        <TaskSection
          tasks={milestone.tasks}
          onEditTask={openEditTask}
          onEditSubtask={openEditSubtask}
        />
      )}

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        editData={taskEditData}
        onSuccess={onTaskSuccess}
      />

      <SubtaskModal
        isOpen={subtaskModalOpen}
        onClose={() => setSubtaskModalOpen(false)}
        editData={subtaskEditData}
        onSuccess={onSubtaskSuccess}
      />
    </div>
  );
};

/* ================= PROJECT TREE ================= */

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
      <div className="p-10 text-center text-gray-400 border border-dashed rounded-lg">
        No data
      </div>
    );
  }

  return (
    <div className="rounded-xl mb-3 bg-white shadow-sm">
      <div
        // onClick={() => setOpen(!open)}
        className="grid grid-cols-[20px_30px_1fr_120px_120px_120px_80px] px-4 py-3 items-center hover:bg-gray-50 cursor-pointer"
      >
        <span />
        <span>#</span>
        <span>Milestone</span>
        <span>Start</span>
        <span>End</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {milestones?.map((m, i) => (
        <MilestoneRow
          key={i}
          milestone={m}
          index={i}
          onEdit={openEdit}
          refetch={refetch}
        />
      ))}

      <MilestoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default ProjectTree;