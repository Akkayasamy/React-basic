import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/auth";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Projects",
    path: "/projects",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Milestones",
    path: "/milestones",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "Subtasks",
    path: "/subtasks",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    label: "Timesheets",
    path: "/timesheets",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const logout = () => {
    removeToken();
    window.location.href = "/";
  };

  return (
    <div style={{
      height: 64,
      background: "#0f172a",
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate("/dashboard")}
        style={{
          display: "flex", alignItems: "center", gap: 9,
          marginRight: "2rem", cursor: "pointer", flexShrink: 0,
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: "rgba(99,102,241,0.25)",
          border: "1px solid rgba(165,180,252,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span style={{
          color: "#fff", fontWeight: 700, fontSize: 15,
          letterSpacing: "-0.02em",
        }}>
          Remarkable
        </span>
      </div>

      {/* Nav items */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: 2, flex: 1, overflowX: "auto",
      }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "0.45rem 0.875rem",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                background: isActive
                  ? "rgba(99,102,241,0.15)"
                  : "transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              <span style={{ color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.35)" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "0.4rem 0.75rem",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.35)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search..."
            style={{
              border: "none", outline: "none",
              background: "transparent",
              fontSize: 13, color: "rgba(255,255,255,0.7)",
              width: 120,
            }}
          />
        </div>

        {/* Notification bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowMenu(false); }}
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span style={{
              position: "absolute", top: 7, right: 7,
              width: 7, height: 7, borderRadius: "50%",
              background: "#6366f1", border: "1.5px solid #0f172a",
            }} />
          </button>

          {showNotif && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "0.5rem",
              minWidth: 280, zIndex: 200,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            }}>
              <p style={{
                fontSize: 12, fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                padding: "0.4rem 0.75rem", margin: 0,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>Notifications</p>
              {[
                { text: "Alice created a new project", time: "2 min ago", dot: "#6366f1" },
                { text: "Bob updated team settings", time: "15 min ago", dot: "#10b981" },
                { text: "New user joined workspace", time: "1 hr ago", dot: "#f59e0b" },
              ].map((n, i) => (
                <div key={i}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "0.6rem 0.75rem", borderRadius: 8, cursor: "pointer",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: n.dot, marginTop: 4, flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, marginTop: 2 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar + dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setShowMenu(!showMenu); setShowNotif(false); }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "0.35rem 0.65rem 0.35rem 0.4rem",
              cursor: "pointer",
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff",
            }}>U</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
              User
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showMenu && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "0.4rem",
              minWidth: 180, zIndex: 200,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                padding: "0.6rem 0.75rem 0.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "0.3rem",
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0 }}>User</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0, marginTop: 2 }}>
                  user@example.com
                </p>
              </div>

              {[
                { label: "Profile", emoji: "👤" },
                { label: "Settings", emoji: "⚙️" },
                { label: "Help", emoji: "💬" },
              ].map((item) => (
                <button key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 9,
                  width: "100%", padding: "0.5rem 0.75rem",
                  background: "none", border: "none",
                  borderRadius: 7, cursor: "pointer",
                  fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "left",
                }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "none"}
                >
                  <span style={{ fontSize: 14 }}>{item.emoji}</span>
                  {item.label}
                </button>
              ))}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "0.3rem 0" }} />

              <button
                onClick={logout}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  width: "100%", padding: "0.5rem 0.75rem",
                  background: "none", border: "none",
                  borderRadius: 7, cursor: "pointer",
                  fontSize: 13, color: "#f87171", textAlign: "left",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                onMouseOut={(e) => e.currentTarget.style.background = "none"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
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