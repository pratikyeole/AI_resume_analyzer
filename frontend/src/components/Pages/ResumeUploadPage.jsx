import React from "react";
import Navbar from "../navbar/Navbar";
import ResumeUploadCard from "../resumeUpload/ResumeUploadCard";
import FeatureGrid from "../resumeUpload/FeatureGrid";
// import Footer from "../shared/Footer";

export default function ResumeUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Centered Upload Card */}
        <section className="max-w-4xl mx-auto px-6">
          <ResumeUploadCard />
        </section>

        {/* Feature Grid */}
        <section id="features" className="max-w-6xl mx-auto px-6 mt-12">
          <FeatureGrid />
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
