export const AVATAR_COLORS = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed"];

export const fullName = (assignee) =>
    assignee ? `${assignee.first_name || ""} ${assignee.last_name || ""}`.trim() : "—";

export const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

export const getAvatarColor = (name = "") =>
    AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];

export const STATUS_STYLES = {
    todo: { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" },
    pending: { background: "#fff7ed", color: "#c2410c", border: "1px solid #ffedd5" },
    in_progress: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #dbeafe" },
    in_review: { background: "#faf5ff", color: "#7e22ce", border: "1px solid #f3e8ff" },
    blocked: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fee2e2" },
    on_hold: { background: "#fffbeb", color: "#b45309", border: "1px solid #fef3c7" },
    done: { background: "#f0fdf4", color: "#15803d", border: "1px solid #dcfce7" },
    completed: { background: "#f0fdf4", color: "#15803d", border: "1px solid #dcfce7" },
    cancelled: { background: "#f8fafc", color: "#64748b", border: "1px solid #f1f5f9" },
    delayed: { background: "#fff1f2", color: "#be123c", border: "1px solid #ffe4e6" },
};
