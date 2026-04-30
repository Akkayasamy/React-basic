import { useState } from "react";
import { authService } from "../services/authService";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.084-3.411M6.53 6.53A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.97 9.97 0 01-1.347 2.617M6.53 6.53L3 3m3.53 3.53l11.94 11.94M9.88 9.88a3 3 0 104.24 4.24" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="15" rx="2"/>
    <path strokeLinecap="round" d="M2 8l10 6 10-6"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4"/>
  </svg>
);

export default function Login({ setActiveTab }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!form.email) { toast.error("Please provide your email address."); return; }
    if (!form.password) { toast.error("Please provide your password."); return; }
    try {
      setLoading(true);
      const res = await authService.login(form.email, form.password);
      if (res?.status == 200) {
        setToken(res.token);
        toast.success("Login successful 🎉");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-[13.5px] bg-white text-gray-900 outline-none transition-colors focus:border-blue-500";

  return (
    <div className="flex flex-col gap-5">

      {/* Email */}
      <div>
        <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <MailIcon />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <LockIcon />
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className={inputBase}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="accent-blue-600 w-4 h-4 rounded"
          />
          Remember me
        </label>
        <a href="#" className="text-[13px] text-blue-600 font-medium hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full py-3.5 rounded-xl text-white text-[14px] font-bold tracking-wide transition-colors ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-[12px] text-gray-400">or continue with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 16 16">
            <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.6 2.41v2h2.59c1.52-1.4 2.39-3.46 2.39-5.87z" fill="#4285F4"/>
            <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.14-2.52H.96v2.07A8 8 0 008 16z" fill="#34A853"/>
            <path d="M3.56 9.54A4.8 4.8 0 013.56 6.46V4.39H.96a8 8 0 000 7.22l2.6-2.07z" fill="#FBBC05"/>
            <path d="M8 3.2c1.22 0 2.31.42 3.17 1.24l2.37-2.37A8 8 0 00.96 4.4l2.6 2.06C4.2 4.47 5.92 3.2 8 3.2z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 16 16">
            <rect x="0" y="0" width="7.5" height="7.5" fill="#f25022"/>
            <rect x="8.5" y="0" width="7.5" height="7.5" fill="#7fba00"/>
            <rect x="0" y="8.5" width="7.5" height="7.5" fill="#00a4ef"/>
            <rect x="8.5" y="8.5" width="7.5" height="7.5" fill="#ffb900"/>
          </svg>
          Microsoft
        </button>
      </div>
    </div>
  );
}