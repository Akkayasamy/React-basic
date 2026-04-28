import { useState } from "react";
import { authService } from "../services/authService";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.875rem",
  border: "1.5px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  background: "#fff",
  color: "#111827",
  transition: "border-color 0.2s",
  display: "block",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 6,
  letterSpacing: "0.02em",
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={labelStyle}>Email address</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: loading ? "#6366f1" : "#1e1b4b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.03em",
          marginTop: 4,
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => {
          if (!loading) e.target.style.background = "#4f46e5";
        }}
        onMouseOut={(e) => {
          if (!loading) e.target.style.background = "#1e1b4b";
        }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
}