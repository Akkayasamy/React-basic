import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { capitalizeFirst } from "../utils/formatStatus.js"
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "Dashboard", path: "/dashboard",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  },
  {
    label: "Projects", path: "/projects",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  },
  {
    label: "Milestones", path: "/milestones",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  },
  {
    label: "Tasks", path: "/tasks",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  },
  {
    label: "Subtasks", path: "/subtasks",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
  },
  {
    label: "Timesheets", path: "/timesheets",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { data, loading } = useUser();
  if (loading) return null;

  const logout = () => { removeToken(); window.location.href = "/"; };

  return (
    <div className="h-16 bg-[#0f0a1e] fixed top-0 left-0 right-0 z-[100] flex items-center px-6 border-b border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.4)]">

      {/* Logo */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-[9px] mr-8 cursor-pointer shrink-0"
      >
        <div className="w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)]">
          <img
            src={logo}
            alt="logo"
            className="w-32 h-auto mx-auto"
          />
        </div>
        <span className="text-white font-bold text-base tracking-tight">
          Project Management
        </span>
      </div>

      {/* Nav items */}
      <div className="flex items-center gap-0.5 flex-1 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-[7px] px-[14px] py-[7px] rounded-md border-none cursor-pointer text-[13px] whitespace-nowrap shrink-0 transition-all duration-150
                ${isActive
                  ? "font-semibold text-white bg-sky-600/35"
                  : "font-normal text-white/50 bg-transparent hover:bg-white/[0.08] hover:text-white"
                }`}
            >
              <span className={isActive ? "text-sky-300" : "text-white/35"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5 shrink-0">

        {/* Search */}
        {/* <div className="flex items-center gap-[7px] bg-white/[0.08] border border-white/10 rounded-md px-3 py-[7px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search..."
            className="border-none outline-none bg-transparent text-[13px] text-white/70 w-[120px]"
          />
        </div> */}

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-md pl-[6px] pr-[10px] py-[5px] cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-600 to-sky-700 flex items-center justify-center text-[11px] font-bold text-white">
              {capitalizeFirst(data?.first_name)}
            </div>
            <span className="text-[13px] font-medium text-white/85">{data?.first_name}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute top-[calc(100%+10px)] right-0 bg-[#1e1b4b] border border-white/10 rounded-xl p-1.5 min-w-[180px] z-[200] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <div className="px-3 pt-2.5 pb-3 border-b border-white/10 mb-1">
                <p className="text-[13px] font-semibold text-white m-0">{data?.first_name}</p>
                <p className="text-[11px] text-white/40 m-0 mt-0.5">{data?.email}</p>
              </div>

              {[{ label: "Profile", emoji: "👤" }, { label: "Settings", emoji: "⚙️" }, { label: "Help", emoji: "💬" }].map(item => (
                <button
                  key={item.label}
                  className="flex items-center gap-[9px] w-full px-3 py-2 bg-transparent border-none rounded-md cursor-pointer text-[13px] text-white/70 text-left hover:bg-white/[0.08] transition-colors"
                >
                  <span>{item.emoji}</span>{item.label}
                </button>
              ))}

              <div className="border-t border-white/10 my-1" />

              <button
                onClick={logout}
                className="flex items-center gap-[9px] w-full px-3 py-2 bg-transparent border-none rounded-md cursor-pointer text-[13px] text-red-400 text-left hover:bg-red-500/10 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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