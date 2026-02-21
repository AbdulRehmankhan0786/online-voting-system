import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";
import API_URL from "../services/api";

function DeleteCandidate() {
  const [candidates, setCandidates] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCandidates = async () => {
    try {
      const res = await fetch(`${API_URL}/candidate/results`);
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      toast.error("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const deleteCandidate = async (id) => {
    try {
      const res = await fetch(
        `${API_URL}/candidate/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Candidate Deleted ❌");
      fetchCandidates();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-12 rounded-3xl">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-red-400 to-pink-400 mb-12">
          Delete Candidate 🗑
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {candidates.map((c) => (
            <div
              key={c._id}
              className="bg-white/10 backdrop-blur-xl border border-white/20
                         rounded-3xl p-8 shadow-xl hover:scale-105 
                         transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-white">
                {c.name}
              </h2>

              <p className="text-indigo-300 mt-2">
                {c.party}
              </p>

              <p className="text-gray-300 mt-2">
                {c.voteCount} Votes
              </p>

              <button
                onClick={() => deleteCandidate(c._id)}
                className="mt-6 w-full py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-red-500 to-pink-600
                           hover:opacity-90 transition"
              >
                Delete Candidate
              </button>
            </div>
          ))}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default DeleteCandidate;