import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/auth";
import theme from "../theme";

const navItems = [
  {
    label: "Dashboard", path: "/dashboard",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  },
  {
    label: "Projects", path: "/projects",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    label: "Milestones", path: "/milestones",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    label: "Tasks", path: "/tasks",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    label: "Subtasks", path: "/subtasks",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  },
  {
    label: "Timesheets", path: "/timesheets",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const logout = () => { removeToken(); window.location.href = "/"; };

  return (
    <div style={{
      height: 64,
      background: theme.navBg,
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center",
      paddingLeft: "1.5rem", paddingRight: "1.5rem",
      borderBottom: `1px solid ${theme.borderDark}`,
      boxShadow: theme.navShadow,
    }}>

      {/* Logo */}
      <div onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: 9, marginRight: "2rem", cursor: "pointer", flexShrink: 0 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: theme.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: theme.glowShadow,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span style={{ color: theme.textWhite, fontWeight: 800, fontSize: 16, letterSpacing: "-0.03em" }}>
          Remarkable
        </span>
      </div>

      {/* Nav items */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflowX: "auto" }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "0.45rem 0.875rem", borderRadius: theme.radiusSm,
              border: "none", cursor: "pointer", fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#fff" : theme.textWhiteDim,
              background: isActive ? "rgba(124,58,237,0.35)" : "transparent",
              transition: "all 0.15s", whiteSpace: "nowrap", flexShrink: 0,
            }}
              onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; } }}
              onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textWhiteDim; } }}
            >
              <span style={{ color: isActive ? "#c4b5fd" : "rgba(255,255,255,0.35)" }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "rgba(255,255,255,0.08)",
          border: `1px solid ${theme.borderDark}`,
          borderRadius: theme.radiusSm, padding: "0.4rem 0.75rem",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Search..." style={{
            border: "none", outline: "none", background: "transparent",
            fontSize: 13, color: "rgba(255,255,255,0.7)", width: 120,
          }} />
        </div>

        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowMenu(!showMenu); setShowNotif(false); }} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.08)", border: `1px solid ${theme.borderDark}`,
            borderRadius: theme.radiusSm, padding: "0.35rem 0.65rem 0.35rem 0.4rem",
            cursor: "pointer",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: theme.gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff",
              boxShadow: theme.glowShadow,
            }}>U</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>User</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {showMenu && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "#1e1b4b", border: `1px solid ${theme.borderDark}`,
              borderRadius: theme.radius, padding: "0.4rem",
              minWidth: 180, zIndex: 200, boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}>
              <div style={{ padding: "0.6rem 0.75rem 0.75rem", borderBottom: `1px solid ${theme.borderDark}`, marginBottom: "0.3rem" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0 }}>User</p>
                <p style={{ fontSize: 11, color: theme.textWhiteFade, margin: 0, marginTop: 2 }}>user@example.com</p>
              </div>
              {[{ label: "Profile", emoji: "👤" }, { label: "Settings", emoji: "⚙️" }, { label: "Help", emoji: "💬" }].map(item => (
                <button key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 9,
                  width: "100%", padding: "0.5rem 0.75rem",
                  background: "none", border: "none", borderRadius: theme.radiusSm,
                  cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "left",
                }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseOut={e => e.currentTarget.style.background = "none"}>
                  <span>{item.emoji}</span>{item.label}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${theme.borderDark}`, margin: "0.3rem 0" }} />
              <button onClick={logout} style={{
                display: "flex", alignItems: "center", gap: 9,
                width: "100%", padding: "0.5rem 0.75rem",
                background: "none", border: "none", borderRadius: theme.radiusSm,
                cursor: "pointer", fontSize: 13, color: "#f87171", textAlign: "left",
              }}
                onMouseOver={e => e.currentTarget.style.background = theme.dangerLight}
                onMouseOut={e => e.currentTarget.style.background = "none"}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
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