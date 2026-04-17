import { useState } from "react";
import { authService } from "../services/authService";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await authService.login(form.email, form.password);
      if (res?.status == 200) {
        setToken(res.token);
        
        toast.success("Login successful 🎉");
        window.location.href = "/dashboard";
      }

    } catch (err) {
      console.log("Error:", err)
    }
  };

  return (
    <div>
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}