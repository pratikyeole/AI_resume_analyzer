import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate()
  const handleAnalyzeClick = () => {
    navigate('/upload-resume')
  }

  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden flex items-center">
      
      {/* Gradient Mesh Background Circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300 animate-pulse">
              AI-Powered Resume Analyzer
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg">
            Get instant, accurate analysis of your resume with ATS score, skills extraction,
            job match percentage, and personalized improvement suggestions.
          </p>

          <button onClick={handleAnalyzeClick} className="px-8 py-4 w-fit bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
            Analyze Resume
          </button>

          {/* STAT HIGHLIGHTS */}
          <div className="flex gap-6 mt-4">
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-md">
              <h3 className="text-3xl font-bold text-indigo-300">10k+</h3>
              <p className="text-gray-400 text-sm">Resumes Analyzed</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-md">
              <h3 className="text-3xl font-bold text-indigo-300">98%</h3>
              <p className="text-gray-400 text-sm">Accuracy</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – Resume Preview Card */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-80 h-[420px] bg-gray-600/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 text-gray-300 transform hover:-translate-y-2 transition">
            
            {/* Fake Resume Layout */}
            <div className="h-4 w-3/4 bg-gray-500 rounded mb-3"></div>
            <div className="h-3 w-1/2 bg-gray-400 rounded mb-6"></div>

            <div className="space-y-3">
              <div className="h-3 w-full bg-gray-500 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-500 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-500 rounded"></div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-3 w-3/4 bg-gray-500 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-500 rounded"></div>
            </div>

            {/* Floating AI Glow */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-500 random-full blur-xl opacity-40"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
