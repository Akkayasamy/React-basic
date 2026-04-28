export const formatStatus = (status) => {
  if (!status) return "—";
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};


export const STATUS_COLORS = {
  todo: { bg: "#e2e8f0", text: "#475569" },        // Gray - Not started
  in_progress: { bg: "#dbeafe", text: "#1e40af" },  // Blue - Active work
  in_review: { bg: "#fef3c7", text: "#92400e" },    // Yellow - Under review
  blocked: { bg: "#fee2e2", text: "#991b1b" },      // Red - Blocked/Issues
  on_hold: { bg: "#ffedd5", text: "#9a3412" },      // Orange - Paused
  done: { bg: "#dcfce7", text: "#166534" },         // Green - Completed
  cancelled: { bg: "#f1f5f9", text: "#64748b" },    // Slate - Cancelled
};
