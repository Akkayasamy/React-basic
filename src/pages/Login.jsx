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

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email) {
      toast.error("Please provide your email address.");
      return;
    }

    if (!form.password) {
      toast.error("Please provide your password.");
      return;
    }
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

  const inputClass =
    "block w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 outline-none transition-colors duration-200 focus:border-indigo-600 focus:ring-0";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">
          Email address
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full py-3 mt-1 text-white border-none rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 ${loading
          ? "bg-indigo-500 cursor-not-allowed"
          : "bg-indigo-950 cursor-pointer hover:bg-indigo-600"
          }`}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
}