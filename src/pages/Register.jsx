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

  const inputClass =
    "block w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 outline-none transition-colors duration-200 focus:border-sky-600 pr-10";

  const inputErrorClass =
    "block w-full px-3.5 py-2.5 border border-red-400 rounded-lg text-sm bg-white text-gray-900 outline-none transition-colors duration-200 focus:border-red-500 pr-10";

  const labelClass = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  const passwordMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  return (
    <div className="flex flex-col gap-3.5">

      {/* First + Last name row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className={labelClass}>First name</label>
          <input
            name="firstName"
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Last name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email address</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Password */}
      <div>
        <label className={labelClass}>Password</label>
        <div className="relative">
          <input
            name="password"
            type={show.password ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => toggleShow("password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {show.password ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className={labelClass}>Confirm password</label>
        <div className="relative">
          <input
            name="confirmPassword"
            type={show.confirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className={passwordMismatch ? inputErrorClass : inputClass}
          />
          <button
            type="button"
            onClick={() => toggleShow("confirmPassword")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {show.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {passwordMismatch && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full py-3 mt-1 text-white border-none rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 ${
          loading
            ? "bg-sky-500 cursor-not-allowed"
            : "bg-sky-400 cursor-pointer hover:bg-sky-500"
        }`}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </div>
  );
}