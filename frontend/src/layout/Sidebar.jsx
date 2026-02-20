import { NavLink } from "react-router-dom";
import { Users, BarChart2, User } from "lucide-react";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 min-h-screen 
                    bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#111827]
                    text-white p-6 shadow-2xl">

      <h2 className="text-2xl font-bold mb-10 text-transparent bg-clip-text 
                     bg-gradient-to-r from-indigo-400 to-blue-400">
        Dashboard
      </h2>

      <nav className="space-y-4">

        {/* Candidates */}
        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-white/10"
            }`
          }
        >
          <Users size={20} />
          <span>Candidates</span>
        </NavLink>

        {/* Results */}
        <NavLink
          to="/results"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-white/10"
            }`
          }
        >
          <BarChart2 size={20} />
          <span>{role === "admin" ? "Admin Panel" : "Results"}</span>
        </NavLink>

        {/* ADMIN OPTIONS */}
        {role === "admin" && (
          <>
            <NavLink
              to="/add-candidate"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
            >
              ➕ Add Candidate
            </NavLink>

          <NavLink
    to="/history"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
        isActive
          ? "bg-indigo-600 shadow-lg shadow-indigo-500/30"
          : "hover:bg-white/10"
      }`
    }
  >
    <BarChart2 size={20} />
    <span className="font-medium">Voting History</span>
  </NavLink>
     


            <NavLink
              to="/delete-candidate"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
            >
              ❌ Delete Candidate
            </NavLink>
          </>
        )}

        {/* PROFILE (FOR BOTH USER & ADMIN) */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-indigo-600 shadow-lg"
                : "hover:bg-white/10"
            }`
          }
        >
          <User size={20} />
          <span>Your Profile</span>
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;
