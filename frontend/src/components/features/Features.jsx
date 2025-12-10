import React from "react";
import { FiTrendingUp, FiList, FiCheckCircle, FiBarChart } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <FiList size={32} />,
    title: "Skill Extraction",
    desc: "Automatically extract technical & soft skills using powerful NLP models.",
  },
  {
    icon: <FiBarChart size={32} />,
    title: "ATS Score",
    desc: "Get an accurate ATS compatibility score with improvement suggestions.",
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: "Job Match %",
    desc: "Compare your resume against job descriptions and get a match score.",
  },
  {
    icon: <FiCheckCircle size={32} />,
    title: "Smart Recommendations",
    desc: "AI suggests enhancements to boost your resume’s clarity & impact.",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

      {/* Gradient Mesh Background */}
      <div className="absolute -top-40 -left-32 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">
          Powerful AI-Driven Features
        </h2>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          Our analyzer provides deep insights into your resume using advanced AI,
          NLP and ATS algorithms.
        </p>

        {/* Cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <FeatureCard  icon = {item.icon} title={item.title} desc={item.desc} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
}
