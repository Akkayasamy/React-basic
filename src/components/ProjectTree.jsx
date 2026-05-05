import React, { useState } from "react";
import { MilestoneModal } from "../components/MilestoneModal";
import { TaskModal } from "../components/TaskModal.jsx";
import { SubtaskModal } from "./SubtaskModal.jsx";
import { TimesheetModal } from "../components/TimesheetModal.jsx"; // New Import

import {
  fullName,
  getInitials,
  getAvatarColor,
  STATUS_STYLES
} from "../utils/common";

/* ================= COMPONENTS ================= */

const Avatar = ({ name = "", size = 24 }) => (
  <div
    className="rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm"
    style={{
      width: size,
      height: size,
      background: getAvatarColor(name),
      fontSize: size * 0.4,
    }}
  >
    {getInitials(name)}
  </div>
);

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.todo;
  return (
    <span
      className="px-3 py-[2px] rounded-full text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap shadow-sm"
      style={s}
    >
      {status?.replace("_", " ") || "—"}
    </span>
  );
};

const Chevron = ({ open, color = "#94a3b8" }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 16 16"
    fill="none"
    className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
  >
    <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionLabel = ({ label, color, open, onToggle, bgColor }) => (
  <div 
    onClick={onToggle} 
    className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors rounded-t-md"
    style={{ backgroundColor: bgColor }}
  >
    <Chevron open={open} color={color} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
      {label}
    </span>
  </div>
);

const TH = ({ children }) => (
  <th className="px-3 py-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50 text-left border-b border-slate-100">
    {children}
  </th>
);

const TD = ({ children, className = "" }) => (
  <td className={`px-3 py-2 text-sm text-slate-600 border-b border-slate-50/50 ${className}`}>{children}</td>
);

const ActionBtn = ({ onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    className="text-slate-300 text-lg px-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all cursor-pointer"
  >
    ⋮
  </button>
);

/* ================= TIMESHEET SECTION ================= */

const TimesheetSection = ({ timesheets = [], onEditTimesheet }) => {
  const [open, setOpen] = useState(false);
  if (!timesheets.length) return null;

  return (
    <div className="bg-orange-50/30 border border-orange-100 rounded-md mt-2 overflow-hidden shadow-sm">
      <SectionLabel
        label="Timesheet (Hours Logged)"
        color="#9a3412"
        bgColor="#fff7ed"
        open={open}
        onToggle={() => setOpen((p) => !p)}
      />

      {open && (
        <div className="p-2 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
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
                <tr key={i} className="hover:bg-orange-100/40 transition-colors">
                  <TD>{ts.workDate || "—"}</TD>
                  <TD className="italic text-slate-500">{ts.remarks || ts.title || "—"}</TD>
                  <TD className="font-semibold text-orange-700">{ts.hoursWorked || "0"}h</TD>
                  <TD><StatusBadge status={ts.approvalStatus} /></TD>
                  <TD><ActionBtn onClick={() => onEditTimesheet?.(ts)} /></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ================= SUBTASK SECTION ================= */

const SubtaskSection = ({ subtasks = [], onEditSubtask, onEditTimesheet }) => {
  const [open, setOpen] = useState(false);
  if (!subtasks.length) return null;

  return (
    <div className="bg-indigo-50/20 border border-indigo-100 rounded-md mt-2 overflow-hidden shadow-sm">
      <SectionLabel
        label="Subtasks"
        color="#4338ca"
        bgColor="#eef2ff"
        open={open}
        onToggle={() => setOpen((p) => !p)}
      />

      {open && (
        <div className="p-2 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
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
                    <tr className="hover:bg-indigo-50/50 transition-colors group">
                      <TD className="text-slate-400 font-mono text-xs">{i + 1}</TD>
                      <TD className="font-semibold text-slate-700">{st.title}</TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <Avatar name={name} size={22} />
                          <span className="text-xs font-medium">{name}</span>
                        </div>
                      </TD>
                      <TD className="text-xs">{st.startDate}</TD>
                      <TD className="text-xs font-medium text-slate-500">{st.dueDate}</TD>
                      <TD><StatusBadge status={st.status} /></TD>
                      <TD><ActionBtn onClick={() => onEditSubtask?.(st)} /></TD>
                    </tr>
                    {st.timesheets?.length > 0 && (
                      <tr>
                        <td colSpan={7} className="p-2 bg-white/50">
                          <TimesheetSection 
                            timesheets={st.timesheets} 
                            onEditTimesheet={onEditTimesheet}
                          />
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

/* ================= TASK ROW ================= */

const TaskRow = ({ task, index, onEditTask, onEditSubtask, onEditTimesheet }) => {
  const [open, setOpen] = useState(false);
  const hasChild = task.subtasks?.length || task.timesheets?.length;
  const name = fullName(task.assignee);

  return (
    <div className="mb-2 border border-slate-100 rounded-lg bg-white shadow-sm overflow-hidden">
      <div
        onClick={() => hasChild && setOpen(!open)}
        className="grid grid-cols-[30px_40px_1fr_180px_120px_130px_60px] items-center px-4 py-3 hover:bg-slate-50 cursor-pointer transition-all"
      >
        <span>{hasChild && <Chevron open={open} />}</span>
        <span className="text-slate-300 font-mono text-xs">{index + 1}</span>
        <span className="font-bold text-slate-700 text-sm tracking-tight">{task.title}</span>

        <div className="flex items-center gap-2">
          <Avatar name={name} size={26} />
          <span className="text-xs font-semibold text-slate-600">{name}</span>
        </div>

        <span className="text-xs text-slate-400 font-medium">{task.startDate}</span>
        <div className="flex justify-start">
            <StatusBadge status={task.status} />
        </div>

        <div className="flex justify-end">
            <ActionBtn onClick={() => onEditTask(task)} />
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 bg-slate-50/30 border-t border-slate-50">
          <SubtaskSection 
            subtasks={task.subtasks} 
            onEditSubtask={onEditSubtask} 
            onEditTimesheet={onEditTimesheet}
          />
          <TimesheetSection 
            timesheets={task.timesheets} 
            onEditTimesheet={onEditTimesheet}
          />
        </div>
      )}
    </div>
  );
};

/* ================= MILESTONE ROW ================= */

const MilestoneRow = ({ milestone, index, onEdit, refetch }) => {
  const [open, setOpen] = useState(false);
  
  // Modal States
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskEditData, setTaskEditData] = useState(null);
  
  const [subtaskModalOpen, setSubtaskModalOpen] = useState(false);
  const [subtaskEditData, setSubtaskEditData] = useState(null);

  const [tsModalOpen, setTsModalOpen] = useState(false);
  const [tsEditData, setTsEditData] = useState(null);

  // Open Handlers
  const openEditTask = (task) => { setTaskEditData(task); setTaskModalOpen(true); };
  const openEditSubtask = (st) => { setSubtaskEditData(st); setSubtaskModalOpen(true); };
  const openEditTimesheet = (ts) => { setTsEditData(ts); setTsModalOpen(true); };

  // Success Handlers
  const onTaskSuccess = () => { setTaskModalOpen(false); refetch(); };
  const onSubtaskSuccess = () => { setSubtaskModalOpen(false); refetch(); };
  const onTsSuccess = () => { setTsModalOpen(false); refetch(); };

  return (
    <div className="rounded-xl mb-4 bg-white border border-slate-200 shadow-md overflow-hidden transition-all duration-300">
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-[40px_40px_1fr_120px_120px_140px_60px] px-5 py-4 items-center hover:bg-slate-50 cursor-pointer bg-gradient-to-r from-white to-slate-50/50"
      >
        <Chevron open={open} color="#6366f1" />
        <span className="text-slate-300 font-mono">{index + 1}</span>
        <span className="font-extrabold text-slate-800 text-base">{milestone.title}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter italic">{milestone.startDate}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter italic">{milestone.endDate}</span>
        <div className="flex justify-start">
            <StatusBadge status={milestone.status} />
        </div>
        <div className="flex justify-end">
            <ActionBtn onClick={() => onEdit(milestone)} />
        </div>
      </div>

      {open && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3 px-1">
             <div className="h-[2px] w-4 bg-indigo-500 rounded-full"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Task Breakdown</span>
          </div>
          {milestone.tasks?.map((t, i) => (
            <TaskRow
              key={i}
              task={t}
              index={i}
              onEditTask={openEditTask}
              onEditSubtask={openEditSubtask}
              onEditTimesheet={openEditTimesheet}
            />
          ))}
        </div>
      )}

      {/* Modals scoped to Milestone level for simplicity */}
      <TaskModal isOpen={taskModalOpen} onClose={() => setTaskModalOpen(false)} editData={taskEditData} onSuccess={onTaskSuccess} />
      <SubtaskModal isOpen={subtaskModalOpen} onClose={() => setSubtaskModalOpen(false)} editData={subtaskEditData} onSuccess={onSubtaskSuccess} />
      <TimesheetModal isOpen={tsModalOpen} onClose={() => setTsModalOpen(false)} editData={tsEditData} onSuccess={onTsSuccess} />
    </div>
  );
};

/* ================= PROJECT TREE MAIN ================= */

const ProjectTree = ({ milestones = [], refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openEdit = (milestone) => { setEditData(milestone); setModalOpen(true); };
  const onSuccess = () => { setModalOpen(false); refetch(); };

  if (!milestones.length) {
    return (
      <div className="p-16 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 font-medium">
        No project data found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-[40px_40px_1fr_120px_120px_140px_60px] px-5 py-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
        <span />
        <span>#</span>
        <span>Milestone Name</span>
        <span>Start</span>
        <span>End</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {milestones.map((m, i) => (
        <MilestoneRow key={i} milestone={m} index={i} onEdit={openEdit} refetch={refetch} />
      ))}

      <MilestoneModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editData={editData} onSuccess={onSuccess} />
    </div>
  );
};

export default ProjectTree;