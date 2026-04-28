import { useState } from "react";

export default function TimesheetsPage() {
  
  return (
    <div style={{ padding: "2rem", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Timesheets</h1>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Track and manage your logged hours</p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "0.6rem 1.1rem", background: "#6366f1",
          color: "#fff", border: "none", borderRadius: 8,
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          + Log Time
        </button>
      </div>

    </div>
  );
}