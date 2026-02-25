import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("Backend Response:", res.data); // Yeh check karne ke liye ki data kaisa dikh raha hai
      // Saving the user and token to LocalStorage so they stay logged in
      localStorage.setItem("user", JSON.stringify(res.data));

      localStorage.setItem("token", res.data.token);

      // Redirect to Dashboard (we will create this next!)
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-forge-mesh overflow-hidden">
      {/* Background Overlays */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-[#161625]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-400 to-emerald-500 rounded-xl mb-4 -rotate-12 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-2xl rotate-12">G</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">Enter the Forge to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-4 text-center font-medium">Invalid email or password.</p>}

        <p className="text-center text-slate-500 mt-8 text-sm">
          New to the forge? <Link to="/signup" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;