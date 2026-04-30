import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { capitalizeFirst } from "../utils/formatStatus.js";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

export default function Navbar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { data, loading } = useUser();
  if (loading) return null;

  const logout = () => { removeToken(); window.location.href = "/"; };

  return (
    <div className="h-16 bg-[#0d1b3e] fixed top-0 left-0 right-0 z-[100] flex items-center px-4 border-b border-white/[0.07]">

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg hover:bg-white/[0.08] transition-colors shrink-0 mr-4 border-none bg-transparent cursor-pointer"
      >
        <span className={`block h-[2px] bg-white/70 rounded-full transition-all duration-300 ${isOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
        <span className={`block h-[2px] bg-white/70 rounded-full transition-all duration-300 ${isOpen ? "opacity-0 w-5" : "w-4"}`} />
        <span className={`block h-[2px] bg-white/70 rounded-full transition-all duration-300 ${isOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
      </button>

      {/* Logo */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2.5 cursor-pointer shrink-0"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <img src={logo} alt="logo" className="w-5 h-auto" />
        </div>
        <div className="hidden sm:block">
          <div className="text-white font-bold text-[14px] leading-tight">ProManage</div>
          <div className="text-white/35 text-[9.5px] leading-tight">Project Management System</div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Avatar dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-lg pl-1.5 pr-3 py-1.5 cursor-pointer hover:bg-white/[0.12] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[11px] font-bold text-white">
            {capitalizeFirst(data?.first_name)?.charAt(0)}
          </div>
          <span className="text-[13px] font-medium text-white/85 hidden sm:block">
            {data?.first_name}
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {showMenu && (
          <div className="absolute top-[calc(100%+10px)] right-0 bg-[#0d1b3e] border border-white/10 rounded-xl p-1.5 min-w-[190px] z-[200] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="px-3 pt-2.5 pb-3 border-b border-white/[0.07] mb-1">
              <p className="text-[13px] font-semibold text-white m-0">
                {data?.first_name} {data?.last_name}
              </p>
              <p className="text-[11px] text-white/40 m-0 mt-0.5">{data?.email}</p>
            </div>

            {[
              { label: "Profile", icon: "👤" },
              { label: "Settings", icon: "⚙️" },
              { label: "Help", icon: "💬" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2.5 w-full px-3 py-2 bg-transparent border-none rounded-lg cursor-pointer text-[13px] text-white/65 text-left hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}

            <div className="border-t border-white/[0.07] my-1" />

            <button
              onClick={logout}
              className="flex items-center gap-2.5 w-full px-3 py-2 bg-transparent border-none rounded-lg cursor-pointer text-[13px] text-red-400 text-left hover:bg-red-500/10 transition-colors"
            >
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
  );
}