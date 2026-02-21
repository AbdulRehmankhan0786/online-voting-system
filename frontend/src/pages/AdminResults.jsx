import API_URL from "../services/api";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
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

function AdminResults() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
   const res = await fetch(`${API_URL}/candidate/results`);
    const data = await res.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const chartData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.voteCount),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ddd" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#ddd" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-10 rounded-3xl">

        <h1 className="text-4xl font-bold text-white mb-10">
          Voting Results 📊
        </h1>

        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
          <Bar data={chartData} options={chartOptions} />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminResults;
