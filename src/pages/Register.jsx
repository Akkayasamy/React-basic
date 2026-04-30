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

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="15" rx="2" />
    <path strokeLinecap="round" d="M2 8l10 6 10-6" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

export default function Register({ setActiveTab }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleRegister = async () => {
    const fields = [
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" },
      { key: "email", label: "Email address" },
      { key: "password", label: "Password" },
      { key: "confirmPassword", label: "Confirm password" },
    ];

    for (const field of fields) {
      if (!form[field.key]) {
        toast.error(`${field.label} is required to continue.`);
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.register(
        form.firstName,
        form.lastName,
        form.email,
        form.password
      );
      if (res?.status == 200) {
        setToken(res.token);
        toast.success("Registration successful 🎉");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-[13.5px] bg-white text-gray-900 outline-none transition-colors focus:border-blue-500";

  const inputError =
    "block w-full pl-10 pr-10 py-3 border border-red-400 rounded-xl text-[13.5px] bg-white text-gray-900 outline-none transition-colors focus:border-red-500";

  const labelClass = "block text-[12.5px] font-semibold text-gray-700 mb-1.5";

  const passwordMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  return (
    <div className="flex flex-col gap-4">

      {/* First + Last name row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className={labelClass}>First Name</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <UserIcon />
            </span>
            <input
              name="firstName"
              type="text"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
        </div>
        <div className="flex-1">
          <label className={labelClass}>Last Name</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <UserIcon />
            </span>
            <input
              name="lastName"
              type="text"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <MailIcon />
          </span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className={labelClass}>Password</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <LockIcon />
          </span>
          <input
            name="password"
            type={show.password ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={inputBase}
          />
          <button
            type="button"
            onClick={() => toggleShow("password")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {show.password ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className={labelClass}>Confirm Password</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <LockIcon />
          </span>
          <input
            name="confirmPassword"
            type={show.confirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className={passwordMismatch ? inputError : inputBase}
          />
          <button
            type="button"
            onClick={() => toggleShow("confirmPassword")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {show.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {passwordMismatch && (
          <p className="text-[12px] text-red-500 mt-1.5 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            Passwords do not match
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full py-3.5 mt-1 text-white border-none rounded-xl text-[14px] font-bold tracking-wide transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 cursor-pointer hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

    </div>
  );
}