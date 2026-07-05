// frontend/src/pages/Admin/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

// (EDIT - add withCredentials)

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", identifier: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    e.target.classList.remove("border-red-500", "animate-shake"); // remove red when typing
  };

  // frontend/src/pages/Admin/Login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted:", form);

  try {
    console.log("Sending request to backend..."); // ADD THIS
    
    const res = await axios.post(
      `${API_BASE_URL}/irican`,
      {
        password: form.password,
        usernameOrEmail: form.identifier,
      },
      { withCredentials: true }
    );

    console.log("Response received:", res.data); // ADD THIS

    if (res.data.success) {
      console.log("Login successful, navigating..."); // ADD THIS
      navigate("/irican/dashboard");
      console.log("Navigate called");
    } else {
      console.log("Login failed"); // ADD THIS
    }
  } catch (err: any) {
    console.error("Login error:", err); // This should show
    console.error("Error response:", err.response?.data); // ADD THIS
    
    const inputs = document.querySelectorAll("input");
    inputs.forEach((el) => {
      el.classList.add("border-red-500", "animate-shake");
      setTimeout(() => el.classList.remove("animate-shake"), 500);
    });
  }
};

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/pages/login/login-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-[500px] -mt-32">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 border text-black"
          />
          <input
            type="password"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            className="w-full p-4 border text-black"
          />
          <button
            type="submit"
            className="relative w-full p-4 rounded-lg text-white font-bold
                       overflow-hidden transition-all duration-500
                       bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                       hover:scale-105 hover:rotate-1
                       before:absolute before:inset-0 before:bg-white/20
                       before:translate-x-[-100%] hover:before:translate-x-[100%]
                       before:transition-transform before:duration-700"
          >
            🚀 ACCESS PORTAL 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
