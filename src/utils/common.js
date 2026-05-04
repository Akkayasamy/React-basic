export const AVATAR_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];

export const fullName = (assignee) =>
    assignee ? `${assignee.first_name || ""} ${assignee.last_name || ""}`.trim() : "—";

export const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

export const getAvatarColor = (name = "") =>
    AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];

export const STATUS_STYLES = {
    todo: { background: "#e2e8f0", text: "#475569" },
    pending: { background: "#bdad97", text: "#a16207", color: "#a16207" },
    in_progress: { background: "#dbeafe", text: "#1e40af", color: "#1d4ed8" },
    in_review: { background: "#fef3c7", text: "#92400e", color: "#a16207" },
    blocked: { background: "#fee2e2", text: "#991b1b", color: "#dc2626" },
    on_hold: { background: "#ffedd5", text: "#9a3412", color: "#dc2626" },
    done: { background: "#dcfce7", text: "#166534", color: "#16a34a", },
    cancelled: { background: "#f1f5f9", text: "#64748b", color: "#dc2626" },
    completed: { background: "#dcfce7", text: "#166534", color: "#16a34a", },
    delayed: { background: "#fee2e2", text: "#991b1b", color: "#dc2626" },
};