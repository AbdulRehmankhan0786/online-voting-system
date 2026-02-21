import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";
import API_URL from "../api";

function AddCandidate() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const token = localStorage.getItem("token");

  const addCandidate = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/candidate/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, party, age, gender }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Candidate Added Successfully 🎉");
    setName("");
    setParty("");
    setAge("");
    setGender("male");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-12 rounded-3xl">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 to-blue-400 mb-12">
          Add New Candidate ✨
        </h1>

        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-2xl 
                        border border-white/20 rounded-3xl shadow-2xl p-10">

          <form onSubmit={addCandidate} className="space-y-6">

            <Input label="Full Name" value={name} setValue={setName} />
            <Input label="Party Name" value={party} setValue={setParty} />
            <Input label="Age" value={age} setValue={setAge} type="number" />

            <div>
              <label className="text-indigo-300 text-sm">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 
                           text-white border border-white/20 focus:ring-2 
                           focus:ring-indigo-500 outline-none"
              >
                <option value="male" className="text-black">Male</option>
                <option value="female" className="text-black">Female</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-lg
                         bg-gradient-to-r from-indigo-500 to-blue-500
                         hover:scale-105 transition duration-300 shadow-lg"
            >
              Add Candidate
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Input({ label, value, setValue, type = "text" }) {
  return (
    <div>
      <label className="text-indigo-300 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 text-white
                   border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
        required
      />
    </div>
  );
}

export default AddCandidate;
