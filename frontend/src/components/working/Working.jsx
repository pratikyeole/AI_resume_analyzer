import React from "react";

const steps = [
  {
    id: 1,
    title: "Upload Your Resume",
    desc: "Upload your resume in PDF or DOC format. It’s secure and processed instantly.",
    icon: "📤",
  },
  {
    id: 2,
    title: "AI Processing",
    desc: "Our advanced NLP model extracts skills, experience, ATS score, and job match metrics.",
    icon: "🤖",
  },
  {
    id: 3,
    title: "Get Detailed Report",
    desc: "Download a full AI-powered breakdown with suggestions to boost your resume.",
    icon: "📄",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-32 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">
          How It Works
        </h2>

        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          Get your resume analyzed in three simple AI-driven steps.
        </p>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>

              <h3 className="text-xl font-semibold text-indigo-200">
                {step.title}
              </h3>

              <p className="text-gray-300 mt-2">{step.desc}</p>

              {/* Gradient line */}
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mx-auto mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
