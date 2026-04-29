import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/logo.png"; // <-- add your image here

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex min-h-screen">

      {/* ── LEFT PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden p-10 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_60%,#312e81_100%)]">

        {/* Glow blobs */}
        <div className="absolute -top-10 -left-10 w-[220px] h-[220px] rounded-full bg-indigo-500/15" />
        <div className="absolute -bottom-8 -right-8 w-[180px] h-[180px] rounded-full bg-indigo-600/10" />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* LOGO CENTER */}
          <img
            src={logo}
            alt="logo"
            className="w-32 h-auto mx-auto"
          />
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col bg-white">

        {/* Top nav */}
        <div className="flex justify-end gap-6 px-8 py-5 border-b border-gray-100">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium capitalize pb-[2px] transition
                ${
                  activeTab === tab
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-400 border-b-2 border-transparent"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-[340px]">

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
                    className="text-indigo-600 font-medium text-[13px]"
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
                    className="text-indigo-600 font-medium text-[13px]"
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