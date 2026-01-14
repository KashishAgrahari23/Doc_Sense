import React from 'react'
import { Upload, FileText } from "lucide-react";

const UploadFile = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Your Document</h2>
      </div>

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
      >
        <Upload className="w-8 h-8 text-gray-500" />
        <p className="text-sm text-gray-600 text-center">
          Click to upload or drag & drop <br />
          <span className="text-xs text-gray-400">
            PDF, DOCX (Max 10MB)
          </span>
        </p>
      </label>

      <input id="file-upload" type="file" className="hidden" />

      <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition">
        <Upload className="w-4 h-4" />
        Upload Document
      </button>
    </div>
  )
}

export default UploadFile
