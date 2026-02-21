import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";
import API_URL from "../services/api";

function VotingHistory() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/candidate/history`, {
        headers: { Authorization: token },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setHistory(data);
    } catch (error) {
      toast.error("Failed to load history");
    }
  };

 useEffect(() => {
  fetchHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex justify-center 
                      bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 
                      p-12 rounded-3xl">

        <div className="w-full max-w-7xl">

          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                         bg-gradient-to-r from-indigo-400 to-blue-400 mb-12">
            Voting History 📜
          </h1>

          <div className="bg-white/5 backdrop-blur-2xl 
                          border border-white/10 
                          rounded-3xl shadow-2xl overflow-x-auto">

            <table className="w-full text-left text-white min-w-[1100px]">

              <thead className="bg-white/10 text-indigo-300">
                <tr>
                  <th className="p-5">Voter Name</th>
                  <th className="p-5">Aadhaar</th>
                  <th className="p-5">Phone</th>
                  <th className="p-5">Email</th>
                  <th className="p-5">Candidate</th>
                  <th className="p-5">Voted At</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-10 text-gray-400">
                      No voting history found
                    </td>
                  </tr>
                ) : (
                  history.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/10 
                                 hover:bg-white/5 transition duration-300"
                    >
                      <td className="p-5 font-semibold">
                        {item.voterName}
                      </td>

                      <td className="p-5">
                        {item.aadhar}
                      </td>

                      <td className="p-5">
                        {item.mobile || "N/A"}
                      </td>

                      <td className="p-5">
                        {item.email || "N/A"}
                      </td>

                      <td className="p-5 text-indigo-300 font-semibold">
                        {item.candidateName}
                      </td>

                      <td className="p-5 text-gray-400">
                        {new Date(item.votedAt).toLocaleString()}
                      </td>

                      <td className="p-5">
                        <span className="px-3 py-1 text-sm rounded-full 
                                         bg-green-500/20 text-green-400 border border-green-500/30">
                          Voted
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default VotingHistory;