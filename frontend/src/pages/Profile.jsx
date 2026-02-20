import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/me", {
        headers: { Authorization: token },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setUser(data);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Profile Updated ✅");
      setEditMode(false);
      fetchProfile();

    } catch {
      toast.error("Update failed");
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-white p-10">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
  <DashboardLayout>
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 relative overflow-hidden">

      {/* Soft Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[160px] opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[160px] opacity-20"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-3xl 
                      bg-white/5 backdrop-blur-3xl
                      border border-white/10
                      rounded-3xl shadow-2xl p-12">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                         bg-gradient-to-r from-indigo-400 to-blue-400">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Manage your personal information
          </p>
        </div>

        {/* PROFILE INFO GRID */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">

          <ProfileInput
            label="Full Name"
            value={user.name}
            onChange={(val) => setUser({ ...user, name: val })}
            editMode={editMode}
          />

          <ProfileInput
            label="Email Address"
            value={user.email || ""}
            onChange={(val) => setUser({ ...user, email: val })}
            editMode={editMode}
          />

          <ProfileInput
            label="Mobile Number"
            value={user.mobile || ""}
            onChange={(val) => setUser({ ...user, mobile: val })}
            editMode={editMode}
          />

          <ProfileInput
            label="Age"
            value={user.age}
            onChange={(val) => setUser({ ...user, age: val })}
            editMode={editMode}
          />

          <ProfileInput
            label="Address"
            value={user.address}
            onChange={(val) => setUser({ ...user, address: val })}
            editMode={editMode}
          />

          <ProfileField label="Aadhaar Number" value={user.aadharCardNumber} />
          <ProfileField label="Role" value={user.role.toUpperCase()} />
          <ProfileField label="Voting Status" value={user.hasVoted ? "Voted" : "Not Voted"} />

        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-12">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500
                         text-white font-semibold rounded-xl
                         shadow-lg hover:scale-105 transition duration-300"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="px-8 py-3 bg-green-600 text-white font-semibold
                           rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="px-8 py-3 bg-gray-600 text-white font-semibold
                           rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  </DashboardLayout>
);


    

}

/* ================= COMPONENTS ================= */

function ProfileField({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-3">
      <span className="text-indigo-300 font-medium">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

function ProfileInput({ label, value, onChange, editMode }) {
  return (
    <div className="flex justify-between items-center border-b border-white/20 pb-3">
      <span className="text-indigo-300 font-medium">{label}</span>

      {editMode ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none"
        />
      ) : (
        <span className="text-white font-semibold">{value}</span>
      )}
    </div>
  );
}

export default Profile;
