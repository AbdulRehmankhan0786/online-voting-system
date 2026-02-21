import API_URL from "../api";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");

  const token = localStorage.getItem("token");

  const fetchCandidates = async () => {
    const res = await fetch(`${API_URL}/candidate/results`);
    const data = await res.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* ================= ADD ================= */
  const addCandidate = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/candidate/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, party, age }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Candidate Added ✅");
    setName("");
    setParty("");
    setAge("");
    fetchCandidates();
  };

  /* ================= DELETE ================= */
  const deleteCandidate = async (id) => {
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
  };

  const totalVotes = candidates.reduce(
    (sum, c) => sum + c.voteCount,
    0
  );

  const topCandidate =
    candidates.length > 0
      ? candidates.reduce((prev, curr) =>
          prev.voteCount > curr.voteCount ? prev : curr
        )
      : null;

  const chartData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.voteCount),
        backgroundColor: "rgba(99,102,241,0.8)",
        borderRadius: 10,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#111827] p-12 rounded-3xl">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 to-blue-400 mb-12">
          Admin Dashboard 👑
        </h1>

        {/* ================= STATS ROW ================= */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 
                          p-8 rounded-3xl shadow-2xl text-white">
            <p className="opacity-80">Total Candidates</p>
            <h2 className="text-3xl font-bold mt-2">
              {candidates.length}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 
                          p-8 rounded-3xl shadow-2xl text-white">
            <p className="opacity-80">Total Votes</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalVotes}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 
                          p-8 rounded-3xl shadow-2xl text-white">
            <p className="opacity-80">Leading Candidate</p>
            <h2 className="text-2xl font-bold mt-2">
              {topCandidate ? topCandidate.name : "N/A"}
            </h2>
          </div>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* LEFT SIDE → ADD FORM */}
          <div className="bg-white/10 backdrop-blur-2xl 
                          p-10 rounded-3xl shadow-2xl border border-white/20">

            <h2 className="text-2xl font-bold text-white mb-8">
              Add New Candidate
            </h2>

            <form onSubmit={addCandidate} className="space-y-6">

              <input
                placeholder="Candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none"
                required
              />

              <input
                placeholder="Party Name"
                value={party}
                onChange={(e) => setParty(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none"
                required
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/20 focus:outline-none"
                required
              />

              <button
                className="w-full py-4 rounded-xl 
                           bg-gradient-to-r from-indigo-500 to-blue-500
                           text-white font-semibold hover:scale-105 transition"
              >
                Add Candidate
              </button>

            </form>
          </div>

          {/* RIGHT SIDE → CHART */}
          <div className="bg-white/10 backdrop-blur-2xl 
                          p-10 rounded-3xl shadow-2xl border border-white/20">

            <h2 className="text-2xl font-bold text-white mb-6">
              Voting Overview 📊
            </h2>

            <Bar data={chartData} />
          </div>

        </div>

        {/* ================= CANDIDATE LIST ================= */}
        <h2 className="text-2xl font-bold text-white mb-8">
          Manage Candidates
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {candidates.map((c) => (
            <div
              key={c._id}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl 
                         hover:scale-105 transition duration-300"
            >
              <h3 className="text-white text-xl font-bold">
                {c.name}
              </h3>

              <p className="text-indigo-300 mt-2">
                {c.party}
              </p>

              <p className="text-gray-300 mt-2">
                {c.voteCount} Votes
              </p>

              <button
                onClick={() => deleteCandidate(c._id)}
                className="mt-6 w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
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

export default Admin;
