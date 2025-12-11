import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import AnalysisPlaceHolder from "../../components/Pages/AnalysisPlaceHolder";

export default function AnalysisPage() {
  const { state } = useLocation();

  const fileName = state?.fileName ?? "uploaded_resume";
  const analysisRaw = state?.analysis;

  let analysisData = null;

try {
  if (analysisRaw) {
    // Extract clean JSON block between ```json and ```
    const jsonBlockMatch = analysisRaw.match(/```json([\s\S]*?)```/);

    if (jsonBlockMatch) {
      const jsonText = jsonBlockMatch[1].trim();
      analysisData = JSON.parse(jsonText);
    } else {
      console.log("No JSON block found in analysis");
    }
  }
} catch (err) {
  console.log("Error parsing analysis:", err);
}


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-indigo-700">
            Resume Analysis Report
          </h2>

          <p className="mt-1 text-gray-500 text-sm">File: {fileName}</p>

          {/* -------------------- NO ANALYSIS AVAILABLE -------------------- */}
          {!analysisData ? (
            <div className="mt-6">
              <p className="text-gray-600">
                No analysis found. Please upload your resume again.
              </p>

              <div className="mt-8">
                <div className="animate-pulse h-3 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="animate-pulse h-3 w-1/3 bg-gray-200 rounded" />
              </div>
            </div>
          ) : (
            /* -------------------- ANALYSIS DISPLAY -------------------- */
            <div className="mt-8 space-y-6">

              <AnalysisPlaceHolder
                title="Skills"
                data={analysisData.skills}
              />

              <AnalysisPlaceHolder
                title="Strengths"
                data={analysisData.strengths}
              />

              <AnalysisPlaceHolder
                title="Weaknesses"
                data={analysisData.weaknesses}
              />

              <AnalysisPlaceHolder
                title="Improvement Suggestions"
                data={analysisData.improvement_suggestions}
              />

              <AnalysisPlaceHolder
                title="Predicted Job Titles"
                data={analysisData.predicted_job_titles}
              />

              <AnalysisPlaceHolder
                title="Summary"
                data={analysisData.summary}
                isList={false}
              />

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
