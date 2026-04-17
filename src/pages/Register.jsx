import { useState } from "react";
import { authService } from "../services/authService";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

export default function Register({ setActiveTab }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
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
      alert(err.message);
    }
  };

  return (
    <div>
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}