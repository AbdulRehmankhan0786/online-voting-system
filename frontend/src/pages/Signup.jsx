import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharCardNumber: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Account created successfully ✅");
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#111827]
                    relative overflow-hidden px-6">

      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] 
                      bg-indigo-500 rounded-full blur-[160px] opacity-30"></div>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] 
                      bg-blue-500 rounded-full blur-[160px] opacity-30"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl
                      border border-white/20
                      p-14 rounded-3xl shadow-2xl
                      w-full max-w-xl">

        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 to-blue-400 
                       text-center mb-10">
          Create Account ✨
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">

          {[
            { name: "name", placeholder: "Full Name" },
            { name: "age", placeholder: "Age" },
            { name: "email", placeholder: "Email" },
            { name: "mobile", placeholder: "Mobile Number" },
            { name: "address", placeholder: "Address" },
            { name: "aadharCardNumber", placeholder: "Aadhaar Number" },
            { name: "password", placeholder: "Password", type: "password" }
          ].map((field, index) => (
            <input
              key={index}
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full px-5 py-4 rounded-xl 
                         bg-white/20 text-white placeholder-gray-300
                         border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}

          <button
            type="submit"
            className="w-full py-4 rounded-xl 
                       bg-gradient-to-r from-indigo-500 to-blue-500
                       text-white text-lg font-semibold
                       hover:scale-105 transition duration-300"
          >
            Sign Up
          </button>

        </form>

        {/* 👇 Important Line */}
        <p className="text-center text-gray-300 mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {message && (
          <p className="text-green-400 text-center mt-6 text-sm">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Signup;
