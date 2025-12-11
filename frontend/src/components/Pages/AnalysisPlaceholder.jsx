import React from "react";

export default function AnalysisPlaceHolder({ title, data, isList = true }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
        {title}
      </h3>

      {isList ? (
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {data?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 leading-relaxed">{data}</p>
      )}
    </div>
  );
}
