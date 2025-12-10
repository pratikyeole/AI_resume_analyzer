import React, { useRef, useState, useCallback } from "react";
import { Paperclip, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export default function ResumeUploadCard() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const uploadResumeToServer = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData)
  try {
    const res = await fetch("http://127.0.0.1:8000/resume/upload-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data" , data.staus)
    if (data.extracted_text) {
      return data.extracted_text; // extracted resume text
    } else {
      console.error("❌ Upload error:", data.message);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
};

const handleAnalyzeResume = async () => {
  if (!file) return alert("Please upload a file first.");

  const extractedText = await uploadResumeToServer(file);

  if (!extractedText) return alert("Failed to extract resume text.");

  // Send extracted text to backend analysis route
  const res = await fetch("http://127.0.0.1:8000/resume/analyze-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: extractedText }),
  });

  const data = await res.json();

  // Save analysis result to state OR navigate to result page
  console.log("Analysis:", data);
  navigate("/analysis", { state: { analysis: data.analysis } });
};


  const handleFiles = useCallback((files) => {
    setError("");
    if (!files || files.length === 0) return;
    const f = files[0];

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Unsupported format. Please upload PDF, DOCX, DOC, or TXT.");
      return;
    }
    setFile(f);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const dt = e.dataTransfer;
      if (dt && dt.files) handleFiles(dt.files);
    },
    [handleFiles]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onChooseFile = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const onAnalyze = () => {
    if (!file) {
      setError("Please upload a resume before analyzing.");
      return;
    }

    // In real app: upload file to backend -> get response -> navigate to results
    // For now navigate to a placeholder analysis page with filename as state
    navigate("/analysis", { state: { fileName: file.name } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900">Upload Your Resume</h2>
      <p className="mt-2 text-gray-600">Supported formats: PDF, DOCX, TXT</p>

      {/* Upload area */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`mt-8 rounded-xl border-2 ${
          dragActive ? "border-indigo-400 bg-indigo-50/40" : "border-dashed border-gray-200 bg-white"
        } p-6 flex flex-col md:flex-row items-center gap-6 transition-all`}
        role="button"
        aria-label="Drag and drop your resume here"
      >
        {/* Left: Icon */}
        <div className="flex-none">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
            <UploadCloud size={28} className="text-white" />
          </div>
        </div>

        {/* Middle: Instructions / File */}
        <div className="flex-1 min-w-0">
          {!file ? (
            <>
              <p className="text-gray-700 font-medium">Drag & Drop your resume here</p>
              <p className="text-sm text-gray-500 mt-1">
                or{" "}
                <button
                  onClick={onChooseFile}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  click to upload
                </button>
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={onFileInputChange}
              />
            </>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Paperclip size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-900 font-semibold truncate">{file.name}</div>
                  <div className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFile(null);
                    setError("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="px-4 py-2 rounded-md text-sm border hover:bg-gray-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>

        {/* Right: CTA */}
        <div className="flex-none">
          <button
            onClick={handleAnalyzeResume}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:shadow-2xl transform hover:-translate-y-0.5 transition"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    </div>
  );
}
