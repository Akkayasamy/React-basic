import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/logo.png";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      <div className="hidden md:flex w-[44%] flex-shrink-0 flex-col relative overflow-hidden bg-[#1a1f8f] p-8 text-white">

        <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#2832b0] rounded-full opacity-50" />
        <div className="absolute -bottom-16 right-10 w-64 h-64 bg-[#1228a0] rounded-full opacity-40" />
        <div className="absolute top-44 right-5 w-24 h-24 bg-[#3a45cc] rounded-full opacity-30" />

        <div className="relative z-10 flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center">
            <img src={logo} alt="logo" className="w-7 h-auto" />
          </div>
          <div>
            <div className="text-[19px] font-bold">
              NIJA <span className="text-black">TECH</span>
            </div>
            <div className="text-[10px] text-white/40 tracking-wide">
              Project Management System
            </div>
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <h1 className="text-[28px] font-extrabold leading-tight mb-2">
            Manage Projects.<br />
            Deliver Results.<br />
            <span className="text-blue-400">Drive Success.</span>
          </h1>
          <div className="w-10 h-[3px] bg-[#4f5bd5] rounded mb-3" />
          <p className="text-[13px] text-white/50 leading-relaxed">
            Plan projects, track progress, manage tasks,<br />
            and collaborate with your team – all in one<br />
            powerful platform.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {[
            {
              bg: "bg-[#3b4fd4]", title: "Projects & Milestones", desc: "Plan, organize and track project milestones with ease.",
              icon: <svg className="w-[18px] h-[18px]" fill="white" viewBox="0 0 20 20"><rect x="2" y="2" width="7" height="7" rx="1" /><rect x="11" y="2" width="7" height="7" rx="1" /><rect x="2" y="11" width="7" height="7" rx="1" /><rect x="11" y="11" width="7" height="7" rx="1" /></svg>
            },
            {
              bg: "bg-[#0f6e56]", title: "Tasks & Subtasks", desc: "Break down work, assign tasks and monitor progress.",
              icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="2" /><path strokeLinecap="round" d="M6 10l3 3 5-5" /></svg>
            },
            {
              bg: "bg-[#6d3fc0]", title: "Timesheet & Tracking", desc: "Track time, manage workload and improve productivity.",
              icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" /><path strokeLinecap="round" d="M10 6v4l2.5 2.5" /></svg>
            },
            {
              bg: "bg-[#c2410c]", title: "Reports & Insights", desc: "Get real-time insights and make data-driven decisions.",
              icon: <svg className="w-[18px] h-[18px]" fill="white" viewBox="0 0 20 20"><rect x="2" y="11" width="3" height="7" rx="1" /><rect x="8" y="7" width="3" height="11" rx="1" /><rect x="14" y="3" width="3" height="15" rx="1" /></svg>
            },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className={`${f.bg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
                {f.icon}
              </div>
              <div>
                <div className="text-[13px] font-bold">{f.title}</div>
                <div className="text-[11px] text-white/40 leading-tight">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-10">
          <p className="text-[11px] text-white/30 tracking-wider">
            © 2026 NIJA TECH. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-[#f0f2f8] flex flex-col items-center justify-center px-6 overflow-hidden">

        <div className="bg-white rounded-2xl p-6 w-full max-w-[420px] border border-gray-100 shadow-sm flex flex-col">

          {activeTab === "login" ? (
            <>
              <h2 className="text-[20px] font-extrabold text-gray-900 text-center mb-1">
                Welcome Back!
              </h2>
              <p className="text-[12px] text-gray-500 text-center mb-5">
                Sign in to your ProManage account
              </p>
              <Login setActiveTab={setActiveTab} />
              <p className="text-center mt-4 text-[12px] text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("register")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-[20px] font-extrabold text-gray-900 text-center mb-1">
                Create Account
              </h2>
              <p className="text-[12px] text-gray-500 text-center mb-5">
                Join ProManage and get started today
              </p>

              <div className="register-form-container">
                <Register setActiveTab={setActiveTab} />
              </div>

              <p className="text-center mt-4 text-[12px] text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
            <path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 15c2.5-1 5-3.5 5-6.5v-4L8 2z" />
          </svg>
          Your data is secure with us
        </div>
      </div>

    </div>
  );
}