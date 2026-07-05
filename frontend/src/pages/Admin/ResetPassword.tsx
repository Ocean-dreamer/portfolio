// frontend/src/pages/Admin/ResetPassword.tsx
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const ResetPassword = () => {
  const [input, setInput] = useState(""); // could be email/username or token
  const [newPassword, setNewPassword] = useState(""); // optional new password
  const [stage, setStage] = useState<"request" | "confirm">("request"); // stage control

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (stage === "request") {
        await axios.post(`${API_BASE_URL}/irican/reset_password`, { identifier: input });
        console.log("Reset token generated. Check server console for token!");
        setStage("confirm");
        setInput(""); // clear input for token
      } else if (stage === "confirm") {
        await axios.post(`${API_BASE_URL}/irican/reset_password/confirm`, {
          token: input,
          newPassword,
        });
        alert("Password successfully updated!");
        setStage("request");
        setInput("");
        setNewPassword("");
      }
    } catch (err) {
      const inputEls = document.querySelectorAll("input");
      inputEls.forEach((el) => {
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
          {stage === "request" ? (
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.classList.remove("border-red-500", "animate-shake");
              }}
              className="w-full p-4 border text-black"
            />
          ) : (
            <>
              <input
                type="password"
                placeholder="Token"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.classList.remove("border-red-500", "animate-shake");
                }}
                className="w-full p-4 border text-black"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-4 border text-black"
              />
            </>
          )}
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
            {stage === "request" ? "🔄 REQUEST RESET 🔄" : "💾 SET NEW PASSWORD 💾"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
