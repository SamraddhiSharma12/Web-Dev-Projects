import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [draftGoal, setDraftGoal] = useState("");
  const [goals, setGoals] = useState([]);
  const [activeGoal, setActiveGoal] = useState(null);
  const [tasksByGoal, setTasksByGoal] = useState({}); // Back to your original task mapping
  const [loading, setLoading] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id || user?.id;

  // 1. Fetch Goals (Separately, like before)
  const fetchGoals = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/goals/${userId}`);
      setGoals(res.data);
      if (res.data.length > 0 && !activeGoal) {
        setActiveGoal(res.data[0]._id);
      }
    } catch (err) {
      console.error("Goal Fetch Error:", err);
    }
  }, [userId, activeGoal]);

  // 2. Fetch Tasks for the ACTIVE goal only (This prevents 404s on non-existent routes)
  const fetchTasks = useCallback(async (goalId) => {
    if (!goalId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/goals/tasks/${goalId}`);
      setTasksByGoal(prev => ({ ...prev, [goalId]: res.data }));
    } catch (err) {
      console.error("Task Fetch Error:", err);
    }
  }, []);

  useEffect(() => {
    if (!userId) navigate("/login");
    else fetchGoals();
  }, [userId, fetchGoals, navigate]);

  useEffect(() => {
    if (activeGoal) fetchTasks(activeGoal);
  }, [activeGoal, fetchTasks]);

  const handleForge = async (e) => {
    e.preventDefault();
    if (!userId || !draftGoal.trim()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/goals/forge", { userId, title: draftGoal });
      setDraftGoal("");
      fetchGoals(); // Refresh list
    } catch (err) { console.error("Forge Error:", err); }
    setLoading(false);
  };

  const handleCompleteTask = async (taskId) => {
    const timeSpent = document.getElementById(`time-${taskId}`).value;
    const qualityRating = document.getElementById(`quality-${taskId}`).value;
    try {
      await axios.put(`http://localhost:5000/api/goals/tasks/${taskId}/complete`, {
        timeSpent, qualityRating, sleepHours: 7, userId
      });
      setActiveTaskId(null);
      fetchTasks(activeGoal); // Refresh only current tasks
    } catch (err) { console.error("Completion Error:", err); }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#0b0f19] text-white font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f172a]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6">
        <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-10 tracking-tighter">
          GOALFORGE
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {goals.map((goal) => (
            <button
              key={goal._id}
              onClick={() => setActiveGoal(goal._id)}
              className={`text-left px-4 py-3 rounded-2xl text-xs transition-all font-bold ${
                activeGoal === goal._id ? "bg-blue-600 shadow-lg" : "bg-white/5 hover:bg-white/10 text-slate-400"
              }`}
            >
              <div className="truncate">{goal.title}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
          
          {/* FORGE INPUT - Back to Original Style */}
          <div className="w-full lg:w-[400px] bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex flex-col justify-center">
            <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Forge Logic</h2>
            <form onSubmit={handleForge} className="relative flex items-center">
              <input
                type="text" value={draftGoal} onChange={(e) => setDraftGoal(e.target.value)}
                placeholder="New Mission..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-blue-500 transition-all"
              />
              <button disabled={loading} className="absolute right-2 bg-white text-black px-4 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest">
                {loading ? "..." : "Forge"}
              </button>
            </form>
          </div>

   {/* TARGET STATUS & PROGRESS BAR */}
<div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl">
  <div className="flex-1 pr-4">
    <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Target Status</h2>
    <div className="text-xl font-black break-words leading-tight">
      {activeGoal ? goals.find(g => g._id === activeGoal)?.title : "Select Goal"}
    </div>
  </div>

  {activeGoal && tasksByGoal[activeGoal] && (() => {
    const tasks = tasksByGoal[activeGoal];
    const completedCount = tasks.filter(t => t.status === "completed").length;
    const percentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
    const circumference = 220;

    return (
      <div className="flex items-center gap-8">
        {/* Dynamic Stickman Animation */}
        <div className="hidden md:flex flex-col items-center border-r border-white/5 pr-8">
          <div className="relative w-24 h-12 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              <motion.line 
                x1={(percentage / 100) * 60 + 15} y1="30" 
                x2="100" y2="30" 
                stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 2"
                animate={{ opacity: percentage === 100 ? 0 : 1 }}
              />
            </svg>
            <motion.div 
              animate={{ x: (percentage / 100) * 70 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="absolute left-0 bottom-2 text-2xl"
            >
              {percentage === 100 ? "🏆" : (percentage > 0 ? "🏋️" : "😴")}
            </motion.div>
            <div className="absolute right-0 bottom-2 w-1 h-6 bg-blue-500/50 rounded-full" />
          </div>
          <span className="text-[8px] font-black text-slate-600 uppercase mt-1 tracking-widest">
            {percentage === 100 ? "Mission Accomplished" : "Drive Efficiency"}
          </span>
        </div>

        {/* Circular Progress */}
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
            <motion.circle 
              cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" 
              className="text-blue-500" strokeDasharray={circumference}
              animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
              transition={{ duration: 1 }} strokeLinecap="round" 
            />
          </svg>
          <span className="absolute text-[10px] font-black">{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  })()}
</div>
        </div>

        {/* TASK GRID - Restored Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          <AnimatePresence>
            {activeGoal && tasksByGoal[activeGoal]?.map((t, idx) => (
              <motion.div
                key={t._id}
                layout
                whileHover={{ y: -5 }}
                onClick={() => setActiveTaskId(activeTaskId === t._id ? null : t._id)}
                className={`relative p-[1.5px] rounded-3xl transition-all cursor-pointer h-fit ${
                  activeTaskId === t._id ? "bg-blue-500 shadow-xl" : "bg-white/10"
                }`}
              >
                <div className={`relative p-6 rounded-[calc(1.5rem-1px)] h-full ${activeTaskId === t._id ? "bg-[#0b101d]" : "bg-[#161b2c]"}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-500">UNIT_0{idx + 1}</span>
                    <div className={`w-2 h-2 rounded-full ${t.status === "completed" ? "bg-green-500" : (activeTaskId === t._id ? "bg-blue-400 animate-pulse" : "bg-slate-700")}`} />
                  </div>
                  <h3 className={`font-bold text-md mb-2 leading-tight ${t.status === "completed" ? "text-green-400" : "text-white"}`}>{t.title}</h3>
                  <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">{t.description}</p>

                  {activeTaskId === t._id && t.status !== "completed" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-white/5 space-y-3" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-2 gap-2">
                        <input id={`time-${t._id}`} type="number" placeholder="Mins" className="bg-black/40 border border-white/10 p-2 rounded-lg text-[10px]" />
                        <input id={`quality-${t._id}`} type="number" placeholder="1-5" className="bg-black/40 border border-white/10 p-2 rounded-lg text-[10px]" />
                      </div>
                      <button onClick={() => handleCompleteTask(t._id)} className="w-full bg-blue-600 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Finalize</button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;