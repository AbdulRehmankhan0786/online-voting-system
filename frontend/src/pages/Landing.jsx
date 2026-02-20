import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden
                    bg-gradient-to-br from-[#0b1120] via-[#1e1b4b] to-[#111827]">

      {/* Background Glow Effects */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] 
                      bg-purple-600 rounded-full blur-[200px] opacity-30"></div>

      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] 
                      bg-blue-500 rounded-full blur-[200px] opacity-30"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center
                      min-h-screen px-6 text-center">

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-extrabold 
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400
                       leading-tight mb-8">
          Digital Voting <br /> Reinvented 🇮🇳
        </h1>

        {/* Sub Text */}
        <p className="text-gray-300 text-xl max-w-2xl mb-14">
          A modern, secure and transparent voting platform built with
          cutting-edge technology for reliable digital democracy.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-8">

          <button
            onClick={() => navigate("/signup")}
            className="px-12 py-5 rounded-2xl
                       bg-gradient-to-r from-indigo-600 to-blue-600
                       text-white text-lg font-semibold
                       shadow-xl shadow-indigo-200/20
                       hover:scale-110 hover:shadow-indigo-500/50
                       transition duration-300"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-12 py-5 rounded-2xl
                       bg-white/10 backdrop-blur-lg
                       border border-white/20
                       text-white text-lg font-semibold
                       hover:bg-white/20 hover:scale-105
                       transition duration-300"
          >
            Login
          </button>

        </div>

        {/* Feature Badges */}
        <div className="flex gap-6 mt-16 text-sm text-gray-400">
          <span className="bg-white/10 px-4 py-2 rounded-full">
            🔐 Secure
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            ⚡ Fast
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            📊 Transparent
          </span>
        </div>

      </div>
    </div>
  );
}

export default Landing;
