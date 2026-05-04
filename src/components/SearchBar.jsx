
const SearchBar = ({ value, onChange }) => (
  <div style={{ position: "relative", width: 280 }}>
    <svg
      width={16} height={16} viewBox="0 0 20 20" fill="none"
      style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
    >
      <circle cx="9" cy="9" r="6" stroke="#9ca3af" strokeWidth="1.8" />
      <path d="M15 15l-3.5-3.5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    <input
      type="text"
      placeholder="Search projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 32px 8px 34px",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        fontSize: 13,
        color: "#374151",
        background: "#fff",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#3b82f6";
        e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#e5e7eb";
        e.target.style.boxShadow = "none";
      }}
    />
    {value && (
      <button
        onClick={() => onChange("")}
        style={{
          position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: "#9ca3af", fontSize: 18, lineHeight: 1, padding: 2,
        }}
      >×</button>
    )}
  </div>
);

export default SearchBar;
