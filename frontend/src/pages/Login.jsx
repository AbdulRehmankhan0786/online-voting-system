import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser({
        aadharCardNumber: aadhar,
        password,
      });

      if (result && result.user && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("role", result.user.role);

        navigate("/candidates", { replace: true });
      } else {
        setMessage(result.message || "Login failed");
      }

    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#111827]
                    relative overflow-hidden px-6">

      {/* Glow Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] 
                      bg-indigo-500 rounded-full blur-[160px] opacity-30"></div>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] 
                      bg-blue-500 rounded-full blur-[160px] opacity-30"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl
                      border border-white/20
                      p-14 rounded-3xl shadow-2xl
                      w-full max-w-xl">

        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 to-blue-400 
                       text-center mb-10">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-8">

          <div>
            <label className="text-gray-300 text-sm">
              Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="w-full mt-2 px-5 py-4 rounded-xl 
                         bg-white/20 text-white placeholder-gray-300
                         border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Aadhaar Number"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-5 py-4 rounded-xl 
                         bg-white/20 text-white placeholder-gray-300
                         border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl 
                       bg-gradient-to-r from-indigo-500 to-blue-500
                       text-white text-lg font-semibold
                       hover:scale-105 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* 👇 NEW LINE ADDED */}
        <p className="text-center text-gray-300 mt-8 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

        {message && (
          <p className="text-red-400 text-center mt-6 text-sm">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;
