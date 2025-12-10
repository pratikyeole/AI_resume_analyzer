import React from "react";
import FeatureCard from "./FeatureCard";
import {
  FileText,
  BarChart2,
  Search,
  Edit3,
  Cpu,
  AlignJustify,
} from "lucide-react";

const FEATURES = [
  {
    id: "skill-gap",
    icon: <FileText size={22} />,
    title: "Skill Gap Analysis",
    desc: "Find missing skills compared to target jobs.",
  },
  {
    id: "ats-score",
    icon: <BarChart2 size={22} />,
    title: "ATS Score Calculation",
    desc: "See how well your resume passes applicant tracking systems.",
  },
  {
    id: "job-match",
    icon: <Search size={22} />,
    title: "Job Match Intelligence",
    desc: "Match your resume to job descriptions using AI.",
  },
  {
    id: "optimization",
    icon: <Edit3 size={22} />,
    title: "Resume Optimization",
    desc: "Get personalized suggestions to improve content & layout.",
  },
  {
    id: "summary",
    icon: <Cpu size={22} />,
    title: "AI-Based Summary",
    desc: "Short summary of your profile for quick sharing.",
  },
  {
    id: "formatting",
    icon: <AlignJustify size={22} />,
    title: "Formatting Check",
    desc: "Check readability, spacing and consistent formatting.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">System Features</h3>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </div>
    </div>
  );
}
