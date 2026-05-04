import React, { useState } from "react";
import { AVATAR_COLORS, STATUS_STYLES, fullName, getInitials, getAvatarColor } from "../utils/common";

const Avatar = ({ name = "", size = 22 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: getAvatarColor(name), color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
  }}>
    {getInitials(name)}
  </div>
);

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || { background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" };
  return (
    <span style={{ ...s, padding: "2px 38px", borderRadius: 999, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
      {status || "—"}
    </span>
  );
};

const ProgressBar = ({ value = 0 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 100, height: 7, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", background: "#22c55e", borderRadius: 999 }} />
    </div>
    <span style={{ fontSize: 12, color: "#374151", minWidth: 32 }}>{value}%</span>
  </div>
);

const Chevron = ({ open }) => (
  <svg width={14} height={14} viewBox="0 0 16 16" fill="none"
    style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
    <path d="M6 4l4 4-4 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionLabel = ({ label, color, open, onToggle }) => (
  <div onClick={onToggle} style={{
    display: "flex", alignItems: "center", gap: 6,
    padding: "5px 12px", cursor: "pointer", userSelect: "none",
  }}>
    <Chevron open={open} />
    <span style={{ fontSize: 13, fontWeight: 600, color }}>{label}</span>
  </div>
);

const TH = ({ children, style = {} }) => (
  <th style={{
    padding: "7px 12px", textAlign: "left", fontWeight: 600,
    fontSize: 12, color: "#374151", borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb", whiteSpace: "nowrap", ...style,
  }}>
    {children}
  </th>
);

const TD = ({ children, style = {} }) => (
  <td style={{ padding: "8px 12px", fontSize: 13, color: "#374151", verticalAlign: "middle", ...style }}>
    {children}
  </td>
);

const TimesheetSection = ({ timesheets = [] }) => {
  const [open, setOpen] = useState(false);
  if (!timesheets.length) return null;

  return (
    <div style={{ background: "#fffdf5" }}>
      <SectionLabel
        label="Timesheet (Hours Logged)"
        color="#d97706"
        open={open}
        onToggle={() => setOpen((p) => !p)}
      />
      {open && (
        <div style={{ paddingLeft: 24, paddingBottom: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <TH>Work Date</TH>
                <TH>Remarks</TH>
                <TH>Hours Worked</TH>
                <TH>Approval Status</TH>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((ts, i) => (
                <tr
                  key={ts.id || i}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fef3c7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <TD>{ts.workDate || "—"}</TD>
                  <TD>{ts.remarks || "—"}</TD>
                  <TD>{ts.hoursWorked != null ? Number(ts.hoursWorked).toFixed(2) : "—"}</TD>
                  <TD><StatusBadge status={ts.approvalStatus} /></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Subtasks ────────────────────────────────────────────────────────────────
// Fields: id, title, assignee{first_name, last_name}, startDate, dueDate, status, timesheets

const SubtaskSection = ({ subtasks = [] }) => {
  const [open, setOpen] = useState(true);
  if (!subtasks.length) return null;

  return (
    <div style={{ background: "#f8faff" }}>
      <SectionLabel label="Subtasks" color="#3b82f6" open={open} onToggle={() => setOpen((p) => !p)} />
      {open && (
        <div style={{ paddingLeft: 24, paddingBottom: 4 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <TH style={{ width: 32 }}>#</TH>
                <TH>Subtask</TH>
                <TH>Assignee</TH>
                <TH>Start Date</TH>
                <TH>Due Date</TH>
                <TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {subtasks.map((st, i) => {
                const name = fullName(st.assignee);
                return (
                  <React.Fragment key={st.id || i}>
                    <tr
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <TD style={{ color: "#9ca3af" }}>{i + 1}</TD>
                      <TD style={{ fontWeight: 500 }}>{st.title || "—"}</TD>
                      <TD>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <Avatar name={name} />
                          <span style={{ fontSize: 12 }}>{name || "—"}</span>
                        </div>
                      </TD>
                      <TD style={{ color: "#6b7280", fontSize: 12 }}>{st.startDate || "—"}</TD>
                      <TD style={{ color: "#6b7280", fontSize: 12 }}>{st.dueDate || "—"}</TD>
                      <TD><StatusBadge status={st.status} /></TD>
                    </tr>
                    {/* Subtask timesheets */}
                    {st.timesheets?.length > 0 && (
                      <tr>
                        <td colSpan={6} style={{ padding: 0 }}>
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

// ─── Tasks ───────────────────────────────────────────────────────────────────
// Fields: id, title, assignee{first_name, last_name}, startDate, status, timesheets, subtasks

const TaskRow = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = task.subtasks?.length > 0 || task.timesheets?.length > 0;
  const name = fullName(task.assignee);

  return (
    <div style={{ borderBottom: "1px solid #f3f4f6" }}>
      <div
        onClick={() => hasChildren && setOpen((p) => !p)}
        style={{
          display: "grid",
          gridTemplateColumns: "20px 28px 1fr 200px 140px 140px",
          alignItems: "center",
          padding: "9px 12px",
          cursor: hasChildren ? "pointer" : "default",
          gap: 4,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span>{hasChildren && <Chevron open={open} />}</span>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>{index + 1}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{task.title || "—"}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Avatar name={name} />
          <span style={{ fontSize: 12, color: "#374151" }}>{name || "—"}</span>
        </div>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{task.startDate || "—"}</span>
        <StatusBadge status={task.status} />
      </div>

      {open && (
        <div style={{ paddingLeft: 16, borderTop: "1px solid #f3f4f6" }}>
          <SubtaskSection subtasks={task.subtasks || []} />
          <TimesheetSection timesheets={task.timesheets || []} />
        </div>
      )}
    </div>
  );
};

const TaskSection = ({ tasks = [] }) => {
  const [open, setOpen] = useState(true);
  if (!tasks.length) return null;

  return (
    <div style={{ background: "#f9fafb" }}>
      <SectionLabel label="Tasks" color="#3b82f6" open={open} onToggle={() => setOpen((p) => !p)} />
      {open && (
        <div style={{ paddingLeft: 20, paddingBottom: 4 }}>
          {/* Task column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "20px 28px 1fr 200px 140px 140px",
            padding: "6px 12px",
            fontSize: 11, fontWeight: 700, color: "#9ca3af",
            textTransform: "uppercase", letterSpacing: "0.05em",
            borderBottom: "1px solid #e5e7eb", gap: 4,
          }}>
            <span /><span>#</span>
            <span>Task</span><span>Assignee</span>
            <span>Start Date</span><span>Status</span>
          </div>
          {tasks.map((task, i) => (
            <TaskRow key={task.id || i} task={task} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Milestone ───────────────────────────────────────────────────────────────
// Fields: id, title, startDate, endDate, status, tasks

const MilestoneRow = ({ milestone, index }) => {
  const [open, setOpen] = useState(true);
  const hasTasks = milestone.tasks?.length > 0;

  return (
    <div style={{
      border: "1px solid #e5e7eb", borderRadius: 8,
      marginBottom: 10, overflow: "hidden",
      background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      <div
        onClick={() => hasTasks && setOpen((p) => !p)}
        style={{
          display: "grid",
          gridTemplateColumns: "20px 28px 1fr 140px 140px 140px 36px",
          alignItems: "center",
          padding: "11px 16px",
          gap: 4,
          cursor: hasTasks ? "pointer" : "default",
          borderBottom: open && hasTasks ? "1px solid #e5e7eb" : "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
      >
        <span>{hasTasks && <Chevron open={open} />}</span>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{index + 1}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{milestone.title || "—"}</span>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{milestone.startDate || "—"}</span>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{milestone.endDate || "—"}</span>
        <StatusBadge status={milestone.status} />
        <button
          onClick={(e) => e.stopPropagation()}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20, lineHeight: 1, padding: "2px 4px" }}
        >⋮</button>
      </div>

      {open && hasTasks && <TaskSection tasks={milestone.tasks} />}
    </div>
  );
};

// ─── ProjectTree (default export) ────────────────────────────────────────────

const ProjectTree = ({ milestones = [] }) => {
  if (!milestones.length) return (
    <div style={{ padding: 40, textAlign: "center", color: "#9ca3af", border: "1px dashed #e5e7eb", borderRadius: 8 }}>
      No milestones found.
    </div>
  );

  return (
    <div>
      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "20px 28px 1fr 140px 140px 140px 36px",
        padding: "6px 16px 8px",
        gap: 4,
        fontSize: 11, fontWeight: 700, color: "#9ca3af",
        textTransform: "uppercase", letterSpacing: "0.05em",
        borderBottom: "2px solid #e5e7eb", marginBottom: 8,
      }}>
        <span /><span>#</span>
        <span>Milestone</span>
        <span>Start Date</span><span>Due Date</span>
        <span>Status</span><span>Actions</span>
      </div>

      {milestones.map((m, i) => (
        <MilestoneRow key={m.id || i} milestone={m} index={i} />
      ))}
    </div>
  );
};

export default ProjectTree;
