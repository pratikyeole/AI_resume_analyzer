import React from "react";

const testimonials = [
  {
    name: "Aarav Shah",
    feedback:
      "Insane accuracy! My resume improved drastically after the AI suggestions.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    job: "Software Developer",
  },
  {
    name: "Priya Mehta",
    feedback:
      "The job match feature helped me target better companies. Super useful!",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    job: "Data Analyst",
  },
  {
    name: "Rahul Patil",
    feedback:
      "Very clean UI and the report is extremely detailed. Worth using!",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    job: "Full Stack Engineer",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">

      {/* Background Accents */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">
          What Users Say
        </h2>

        <p className="mt-4 text-lg text-gray-300">
          Real feedback from people who improved their resumes with AI.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <img
                src={t.img}
                alt={`${t.name} testimonial`}
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-400 shadow-lg"
              />

              <p className="mt-6 text-gray-300 italic">"{t.feedback}"</p>

              <h3 className="mt-4 text-indigo-200 font-semibold text-lg">
                {t.name}
              </h3>

              <p className="text-gray-400 text-sm">{t.job}</p>

              {/* Gradient line */}
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mx-auto mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
