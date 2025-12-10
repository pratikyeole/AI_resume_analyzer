import React from "react";

export default function FeatureCard({ icon, title, desc, index }) {
  return (
    <div
              key={index}
              className="group p-8 bg-white/30 backdrop-blur-xl border border-white/40
                         rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2
                         transition-all duration-300 relative"
            >
              {/* Icon with Glow */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center 
                              rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 
                              text-white shadow-lg group-hover:scale-110 transition">
                {icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-indigo-200">
                {title}
              </h3>

              <p className="text-gray-300 mt-3 leading-relaxed">
                {desc}
              </p>

              {/* Background Glow */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-400 blur-2xl rounded-full opacity-30"></div>
            </div>
  );
}
