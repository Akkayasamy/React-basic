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

export default function Register({ setActiveTab }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill in all fields");
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* First + Last name row */}
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>First name</label>
          <input
            name="firstName"
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Last name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>
      </div>

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
        onClick={handleRegister}
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
        {loading ? "Creating account..." : "Create account"}
      </button>
    </div>
  );
}