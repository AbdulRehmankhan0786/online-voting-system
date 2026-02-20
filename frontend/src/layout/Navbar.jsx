import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 h-16 px-8 flex items-center justify-between
                    bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900
                    backdrop-blur-xl border-b border-white/10 shadow-xl">

      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <div className="text-3xl">🗳️</div>
        <h1 className="text-2xl font-extrabold tracking-wide
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300">
          Smart Voting
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="relative px-6 py-2.5 rounded-full
                   bg-gradient-to-r from-red-500 to-rose-600
                   text-white font-semibold
                   shadow-lg
                   hover:from-red-600 hover:to-rose-700
                   hover:scale-105 hover:shadow-red-500/30
                   active:scale-95
                   transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
