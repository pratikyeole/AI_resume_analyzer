import React from "react";
import { useNavigate } from "react-router-dom";

export default function FeatureCard({ feature }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/feature/${feature.id}`)}
      className="group text-left p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition flex gap-4 items-start"
      aria-label={`Open ${feature.title}`}
    >
      <div
        className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow"
        aria-hidden
      >
        {feature.icon}
      </div>

      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
        <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition">
        <svg
          className="w-5 h-5 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
