import theme from "../theme";

const stats = [
  {
    label: "Total Revenue", value: "$48,295", change: "+12.5%", up: true,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    color: theme.primary, bg: theme.primaryLight,
    gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)",
  },
  {
    label: "Active Users", value: "3,842", change: "+8.1%", up: true,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    color: theme.success, bg: theme.successLight,
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    label: "New Projects", value: "128", change: "-3.2%", up: false,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    color: theme.warning, bg: theme.warningLight,
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    label: "Uptime", value: "99.9%", change: "+0.1%", up: true,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    color: theme.info, bg: theme.infoLight,
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
];

const recentActivity = [
  { user: "Alice M.",  action: "Created a new project",         time: "2 min ago",  avatar: "AM", color: theme.primary  },
  { user: "Bob K.",   action: "Updated team settings",          time: "15 min ago", avatar: "BK", color: theme.success  },
  { user: "Carol S.", action: "Uploaded 3 files",               time: "1 hr ago",   avatar: "CS", color: theme.warning  },
  { user: "David R.", action: "Left a comment on Dashboard",    time: "3 hr ago",   avatar: "DR", color: theme.info     },
  { user: "Emma T.",  action: "Joined the workspace",           time: "Yesterday",  avatar: "ET", color: "#ec4899"      },
];

const projects = [
  { name: "Website Redesign",   progress: 78, status: "On Track",    color: theme.primary  },
  { name: "Mobile App v2",      progress: 45, status: "In Progress", color: theme.success  },
  { name: "API Integration",    progress: 91, status: "Almost Done", color: theme.info     },
  { name: "Marketing Campaign", progress: 22, status: "Early Stage", color: theme.warning  },
];

export default function Dashboard() {
  return (
    <div style={{ padding: "2rem", background: theme.pageBg, minHeight: "100vh" }}>

      {/* Page header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 4, height: 28, borderRadius: 99,
            background: theme.gradient,
          }} />
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: theme.textPrimary, margin: 0, letterSpacing: "-0.03em" }}>
            Overview
          </h1>
        </div>
        <p style={{ fontSize: 13, color: theme.textMuted, marginLeft: 16 }}>
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: "2rem" }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: theme.cardBg, borderRadius: theme.radius,
            padding: "1.4rem", border: `1px solid ${theme.border}`,
            boxShadow: theme.cardShadow, position: "relative", overflow: "hidden",
          }}>
            {/* Top glow strip */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: stat.gradient, borderRadius: "12px 12px 0 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 8 }}>
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: theme.textPrimary, letterSpacing: "-0.03em", margin: 0 }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: stat.gradient,
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${stat.color}40`,
              }}>
                {stat.icon}
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 99,
                background: stat.up ? theme.successLight : theme.dangerLight,
                color: stat.up ? theme.success : theme.danger,
              }}>
                {stat.up ? "↑" : "↓"} {stat.change}
              </span>
              <span style={{ fontSize: 12, color: theme.textMuted }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Recent Activity */}
        <div style={{ background: theme.cardBg, borderRadius: theme.radius, border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow, overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.4rem", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 99, background: theme.gradient }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>Recent Activity</h2>
            </div>
            <button style={{ fontSize: 12, color: theme.primary, background: theme.primaryLight, border: "none", cursor: "pointer", fontWeight: 600, padding: "4px 10px", borderRadius: 99 }}>
              View all
            </button>
          </div>

          <div style={{ padding: "0.5rem 0" }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.75rem 1.4rem", borderBottom: i < recentActivity.length - 1 ? `1px solid ${theme.border}` : "none" }}
                onMouseOver={e => e.currentTarget.style.background = theme.pageBg}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: item.color + "18",
                  border: `2px solid ${item.color}30`,
                  color: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>
                  {item.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>{item.user}</p>
                  <p style={{ fontSize: 12, color: theme.textMuted, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.action}</p>
                </div>
                <span style={{ fontSize: 11, color: theme.textMuted, flexShrink: 0, background: theme.pageBg, padding: "2px 8px", borderRadius: 99, border: `1px solid ${theme.border}` }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ background: theme.cardBg, borderRadius: theme.radius, border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow, overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.4rem", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 3, height: 16, borderRadius: 99, background: theme.gradient }} />
              <h2 style={{ fontSize: 14, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>Projects</h2>
            </div>
            <button style={{ fontSize: 12, color: theme.primary, background: theme.primaryLight, border: "none", cursor: "pointer", fontWeight: 600, padding: "4px 10px", borderRadius: 99 }}>
              View all
            </button>
          </div>

          <div style={{ padding: "1rem 1.4rem", display: "flex", flexDirection: "column", gap: 20 }}>
            {projects.map((proj) => (
              <div key={proj.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>{proj.name}</p>
                    <p style={{ fontSize: 11, color: theme.textMuted, margin: 0, marginTop: 2 }}>{proj.status}</p>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 800, color: proj.color,
                    background: proj.color + "15",
                    padding: "3px 10px", borderRadius: 99,
                  }}>
                    {proj.progress}%
                  </span>
                </div>
                <div style={{ height: 7, background: theme.pageBg, borderRadius: 99, overflow: "hidden", border: `1px solid ${theme.border}` }}>
                  <div style={{
                    height: "100%", width: `${proj.progress}%`,
                    background: `linear-gradient(90deg, ${proj.color}, ${proj.color}cc)`,
                    borderRadius: 99, transition: "width 0.5s ease",
                    boxShadow: `0 0 8px ${proj.color}60`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}