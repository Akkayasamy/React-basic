import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/logo.png";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    // "h-screen" and "overflow-hidden" prevents the whole page from bouncing
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── LEFT PANEL (Fixed) ── */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative p-10 bg-[linear-gradient(to_right,#e0f2fe_0%,#7dd3fc_50%,#ffffff_100%)]">
        <div className="relative z-10 text-center">
          <a href="https://nijatech.com/" target="_blank" rel="noreferrer">
            <img
              src={logo}
              alt="logo"
              className="w-32 h-auto mx-auto"
            />
          </a>
        </div>
      </div>

      {/* ── RIGHT PANEL (Scrollable) ── */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white">

        {/* Sticky Top Nav: Stays at top while form scrolls under it */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm flex justify-end gap-8 px-10 py-6">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[13px] font-semibold uppercase tracking-wider transition-all duration-300
                ${activeTab === tab
                  ? "text-sky-400 border-b-2 border-sky-400 pb-1"
                  : "text-gray-500 hover:text-gray-400 border-b-2 border-transparent pb-1"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form area: items-center ensures it stays centered if height allows */}
        <div className="flex-1 flex items-center justify-center p-2 min-h-fit">
          <div className="w-full max-w-[340px] py-1">

            {activeTab === "login" ? (
              <>
                <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-1">
                  Welcome back
                </p>
                <h3 className="text-[1.6rem] font-normal text-gray-900 mb-7 font-serif">
                  Sign in
                </h3>
                <Login setActiveTab={setActiveTab} />
                <p className="text-center mt-5 text-[13px] text-gray-400">
                  No account?{" "}
                  <button
                    onClick={() => setActiveTab("register")}
                    className="text-sky-600 font-medium text-[13px] hover:underline"
                  >
                    Register →
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-1">
                  Get started
                </p>
                <h3 className="text-[1.6rem] font-normal text-gray-900 mb-7 font-serif">
                  Create account
                </h3>
                <Register setActiveTab={setActiveTab} />
                <p className="text-center mt-5 text-[13px] text-gray-400">
                  Have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-sky-600 font-medium text-[13px] hover:underline"
                  >
                    Sign in →
                  </button>
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}