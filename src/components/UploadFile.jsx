"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const UploadFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) console.log(selectedFile);
    if (!selectedFile) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only PDF or DOCX files are allowed.");
      setFile(null);
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      console.log("Upload success:", data);
      // console.log("Data:", data.preview);
      onUploadSuccess?.();
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
    
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg text-gray-900 font-semibold">Your Document</h2>
      </div>

      {/* Upload Area */}
      {!file && (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
        >
          <Upload className="w-8 h-8 text-gray-500" />
          <p className="text-sm text-gray-900 text-center">
            Click to upload or drag & drop <br />
            <span className="text-xs text-gray-400">PDF, DOCX (Max 10MB)</span>
          </p>
        </label>
      )}

      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      {/* Selected File Preview */}
      {file && (
        <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-900 font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={removeFile}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition
    ${
      file
        ? "bg-indigo-600 text-white hover:bg-indigo-700"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
      >
        <Upload className="w-4 h-4" />
        Upload Document
      </button>
    </div>
  );
};

export default UploadFile;
