import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      // If successful, redirect to login
      res.data && navigate("/login");
    } catch (err) {
      console.log(err);  
      setError(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0F0F1A] overflow-hidden">
     {/* Moving Background Blobs */}
<div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500 rounded-full filter blur-[100px] opacity-30 animate-blob"></div>
<div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
<div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">Join Goal Forge</h2>
        <p className="text-slate-400 text-center mb-8">Start your journey to productivity</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-bold rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/20"
          >
            Create Account
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-4 text-center">Something went wrong. Please try again.</p>}

        <p className="text-slate-400 text-center mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;