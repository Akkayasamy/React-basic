const stats = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    up: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "#6366f1", bg: "rgba(99,102,241,0.1)",
  },
  {
    label: "Active Users",
    value: "3,842",
    change: "+8.1%",
    up: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#10b981", bg: "rgba(16,185,129,0.1)",
  },
  {
    label: "New Projects",
    value: "128",
    change: "-3.2%",
    up: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#f59e0b", bg: "rgba(245,158,11,0.1)",
  },
  {
    label: "Uptime",
    value: "99.9%",
    change: "+0.1%",
    up: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "#3b82f6", bg: "rgba(59,130,246,0.1)",
  },
];

const recentActivity = [
  { user: "Alice M.", action: "Created a new project", time: "2 min ago", avatar: "AM", color: "#6366f1" },
  { user: "Bob K.", action: "Updated team settings", time: "15 min ago", avatar: "BK", color: "#10b981" },
  { user: "Carol S.", action: "Uploaded 3 files", time: "1 hr ago", avatar: "CS", color: "#f59e0b" },
  { user: "David R.", action: "Left a comment on Dashboard", time: "3 hr ago", avatar: "DR", color: "#3b82f6" },
  { user: "Emma T.", action: "Joined the workspace", time: "Yesterday", avatar: "ET", color: "#ec4899" },
];

const projects = [
  { name: "Website Redesign", progress: 78, status: "On Track", color: "#6366f1" },
  { name: "Mobile App v2", progress: 45, status: "In Progress", color: "#10b981" },
  { name: "API Integration", progress: 91, status: "Almost Done", color: "#3b82f6" },
  { name: "Marketing Campaign", progress: 22, status: "Early Stage", color: "#f59e0b" },
];

export default function Dashboard() {
  return (
    <div style={{
      padding: "2rem",
      background: "#f8fafc",
      minHeight: "100vh",
    }}>

      {/* Page header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{
          fontSize: "1.5rem", fontWeight: 700,
          color: "#0f172a", margin: 0, letterSpacing: "-0.02em",
        }}>
          Overview
        </h1>
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16, marginBottom: "1.75rem",
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: "#fff",
            borderRadius: 12,
            padding: "1.25rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6, letterSpacing: "0.02em" }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: stat.bg, color: stat.color,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {stat.icon}
              </div>
            </div>
            <div style={{
              marginTop: 12, display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: 500,
              color: stat.up ? "#10b981" : "#ef4444",
            }}>
              <span>{stat.up ? "↑" : "↓"}</span>
              <span>{stat.change} vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom two columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>

        {/* Recent Activity */}
        <div style={{
          background: "#fff", borderRadius: 12,
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "1.1rem 1.25rem",
            borderBottom: "1px solid #f1f5f9",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Recent Activity
            </h2>
            <button style={{
              fontSize: 12, color: "#6366f1", background: "none",
              border: "none", cursor: "pointer", fontWeight: 500,
            }}>View all</button>
          </div>

          <div style={{ padding: "0.5rem 0" }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "0.7rem 1.25rem",
                borderBottom: i < recentActivity.length - 1
                  ? "1px solid #f8fafc" : "none",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: item.color + "20",
                  color: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {item.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", margin: 0 }}>
                    {item.user}
                  </p>
                  <p style={{
                    fontSize: 12, color: "#94a3b8", margin: 0,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {item.action}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: "#cbd5e1", flexShrink: 0 }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{
          background: "#fff", borderRadius: 12,
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "1.1rem 1.25rem",
            borderBottom: "1px solid #f1f5f9",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Projects
            </h2>
            <button style={{
              fontSize: 12, color: "#6366f1", background: "none",
              border: "none", cursor: "pointer", fontWeight: 500,
            }}>View all</button>
          </div>

          <div style={{ padding: "0.75rem 1.25rem", display: "flex", flexDirection: "column", gap: 18 }}>
            {projects.map((proj) => (
              <div key={proj.name}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 8,
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", margin: 0 }}>
                      {proj.name}
                    </p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0, marginTop: 2 }}>
                      {proj.status}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: proj.color,
                  }}>
                    {proj.progress}%
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{
                  height: 6, background: "#f1f5f9",
                  borderRadius: 99, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${proj.progress}%`,
                    background: proj.color,
                    borderRadius: 99,
                    transition: "width 0.4s ease",
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