import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    window.location.href = "/";
  };

  return (
    <div style={{
      height: 60,
      background: "#fff",
      borderBottom: "1px solid #f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      position: "fixed",
      top: 0,
      left: 220,
      right: 0,
      zIndex: 99,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>

      {/* Left — Page title + breadcrumb */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>
          Dashboard
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
          Welcome back 👋
        </div>
      </div>

      {/* Right — Search + Notif + Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderRadius: 8, padding: "0.4rem 0.75rem",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search..."
            style={{
              border: "none", outline: "none", background: "transparent",
              fontSize: 13, color: "#475569", width: 140,
            }}
          />
        </div>

        {/* Notification bell */}
        <button style={{
          width: 36, height: 36, borderRadius: 8,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {/* Badge */}
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, borderRadius: "50%",
            background: "#6366f1", border: "1.5px solid #fff",
          }} />
        </button>

        {/* Avatar dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: 8, padding: "0.35rem 0.75rem 0.35rem 0.4rem",
              cursor: "pointer",
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff",
            }}>U</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>User</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 10, padding: "0.4rem",
              minWidth: 160, zIndex: 200,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}>
              {[
                { label: "Profile", icon: "👤" },
                { label: "Settings", icon: "⚙️" },
              ].map((item) => (
                <button key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  width: "100%", padding: "0.5rem 0.75rem",
                  background: "none", border: "none",
                  borderRadius: 6, cursor: "pointer",
                  fontSize: 13, color: "#374151", textAlign: "left",
                }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseOut={(e) => e.currentTarget.style.background = "none"}
                >
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #f1f5f9", margin: "0.3rem 0" }} />
              <button
                onClick={logout}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  width: "100%", padding: "0.5rem 0.75rem",
                  background: "none", border: "none",
                  borderRadius: 6, cursor: "pointer",
                  fontSize: 13, color: "#ef4444", textAlign: "left",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#fef2f2"}
                onMouseOut={(e) => e.currentTarget.style.background = "none"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}