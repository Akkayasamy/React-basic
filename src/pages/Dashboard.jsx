import React from 'react';
import theme from "../theme";
// import { useDashboardData } from '../hooks/useDashboard';
import { useDashboardData } from '../graphql/useDashboard';

export default function Dashboard() {
  const { loading, error, data } = useDashboardData();

  if (loading) return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error.message}</div>;

  const dashboard = data?.getDashboardData || {};
  const { stats, recentProjects, myTasks } = dashboard;

  const statCards = [
    { label: "Total Projects", value: stats?.totalProjects || 0, icon: "📁", grad: "linear-gradient(135deg, #7c3aed, #4f46e5)" },
    { label: "Completed Milestones", value: stats?.completedMilestones || 0, icon: "🎯", grad: "linear-gradient(135deg, #10b981, #059669)" },
    { label: "Open Tasks", value: stats?.openTasks || 0, icon: "📝", grad: "linear-gradient(135deg, #f59e0b, #d97706)" },
    { label: "Logged Hours", value: `${stats?.totalLoggedHours || 0}h`, icon: "⏱️", grad: "linear-gradient(135deg, #3b82f6, #2563eb)" },
  ];

  return (
    <div style={{ padding: "2rem", background: theme.pageBg, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: theme.textPrimary, margin: 0 }}>Overview</h1>
        <p style={{ fontSize: 13, color: theme.textMuted }}>Live project statistics and activity.</p>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: "2rem" }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: theme.cardBg, padding: "1.4rem", borderRadius: theme.radius, border: `1px solid ${theme.border}`, position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.grad }} />
            <p style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase" }}>{s.label}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.8rem", fontWeight: 800 }}>{s.value}</span>
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Recent Projects Table */}
        <div style={{ background: theme.cardBg, borderRadius: theme.radius, border: `1px solid ${theme.border}` }}>
          <div style={{ padding: "1rem", borderBottom: `1px solid ${theme.border}`, fontWeight: 700 }}>Recent Projects</div>
          <div style={{ padding: "1rem" }}>
            {recentProjects?.map(proj => (
              <div key={proj.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${theme.border}50` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{proj.projectname}</span>
                <span style={{ fontSize: 11, color: theme.primary, background: theme.primaryLight, padding: "2px 8px", borderRadius: 10 }}>{proj.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks List */}
        <div style={{ background: theme.cardBg, borderRadius: theme.radius, border: `1px solid ${theme.border}` }}>
          <div style={{ padding: "1rem", borderBottom: `1px solid ${theme.border}`, fontWeight: 700 }}>My Tasks</div>
          <div style={{ padding: "1rem" }}>
            {myTasks?.map(task => (
              <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.success }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{task.title}</p>
                  <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{task.project?.projectname}</p>
                </div>
                <span style={{ fontSize: 11 }}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}