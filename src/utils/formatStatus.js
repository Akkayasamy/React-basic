export const formatStatus = (status) => {
  if (!status) return "—";
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};


export const STATUS_COLORS = {
  todo: { bg: "#e2e8f0", text: "#475569" },
  pending: { bg: "#e2e8f0", text: "#475569" },
  in_progress: { bg: "#dbeafe", text: "#1e40af" },
  in_review: { bg: "#fef3c7", text: "#92400e" },
  blocked: { bg: "#fee2e2", text: "#991b1b" },
  on_hold: { bg: "#ffedd5", text: "#9a3412" },
  done: { bg: "#dcfce7", text: "#166534" },
  cancelled: { bg: "#f1f5f9", text: "#64748b" },
  completed: { bg: "#dcfce7", text: "#166534" },
  delayed: { bg: "#fee2e2", text: "#991b1b" },
};


export const capitalizeFirst = (value = "") => {
  if (!value) return "";
  return value?.charAt(0)?.toUpperCase();
};