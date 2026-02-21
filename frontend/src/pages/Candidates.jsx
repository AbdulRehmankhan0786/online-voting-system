import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";
import API_URL from "../api";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* =========================
     AUTH CHECK
  ========================== */
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  /* =========================
     FETCH CANDIDATES
  ========================== */
  const fetchCandidates = async () => {
    try {
      const res = await fetch(`${API_URL}/candidate/results`);

      if (!res.ok) {
        toast.error("Failed to fetch candidates");
        return;
      }

      const data = await res.json();
      setCandidates(data);
      setLoading(false);

    } catch (error) {
      console.log("FETCH ERROR:", error);
      toast.error("Server error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* =========================
     VOTE FUNCTION
  ========================== */
  const vote = async (candidateId) => {
    try {
      const res = await fetch(`${API_URL}/candidate/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ candidateId }),
      });

      const data = await res.json();

      if (res.status === 400 && data.message === "You already voted") {
        toast.error("⚠ You have already voted!", {
          position: "top-center",
        });
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Error occurred", {
          position: "top-center"
        });
        return;
      }

      toast.success("🎉 Vote Cast Successfully!", {
        position: "top-center",
      });

      fetchCandidates();

    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center"
      });
    }
  };

  /* =========================
     LOADING UI
  ========================== */
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center text-white text-xl">
          Loading candidates...
        </div>
      </DashboardLayout>
    );
  }

  /* =========================
     MAIN UI
  ========================== */
  return (
    <DashboardLayout>
      <div className="min-h-[80vh] 
                      bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 
                      p-10 rounded-3xl">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 to-blue-400 mb-12">
          Cast Your Vote 🗳
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {candidates.map((c) => (
            <div
              key={c._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20
                         rounded-2xl p-6 shadow-xl
                         hover:shadow-indigo-500/30 hover:scale-[1.02]
                         transition duration-300 flex gap-6 items-center"
            >

              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src={
                    c.gender === "female"
                      ? "https://e7.pngegg.com/pngimages/915/966/png-clipart-computer-icons-female-woman-avatar-person-hand-people-thumbnail.png"
                      : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                  }
                  alt="avatar"
                  className="w-full h-full object-cover rounded-xl border-2 border-indigo-400 shadow-md"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  {c.name}
                </h2>

                <p className="text-indigo-300 mt-1 font-medium">
                  {c.party}
                </p>

                <p className="text-gray-300 mt-2">
                  Age: {c.age}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-indigo-200 font-semibold">
                    {c.voteCount} Votes
                  </span>

                  <button
                    onClick={() => vote(c._id)}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 
                               text-white rounded-lg shadow-lg hover:opacity-90 transition"
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Candidates;