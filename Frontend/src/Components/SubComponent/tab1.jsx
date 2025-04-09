import React, { useState, useRef } from "react";
import { UploadCloud, File, X, CheckCircle, AlertTriangle, Folder } from "lucide-react";

const Tab1 = ({ goToNextTab }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadDestination, setUploadDestination] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles) => {
    const zipFiles = selectedFiles.filter(file => 
      file.type === 'application/zip' || 
      file.type === 'application/x-zip-compressed' || 
      file.name.toLowerCase().endsWith('.zip')
    );
    
    if (zipFiles.length > 0) {
      setFiles(zipFiles);
      uploadFiles(zipFiles);
    } else {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const uploadFiles = async (zipFiles) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    zipFiles.forEach((file) => {
      formData.append("zipFile", file); // Use a single field name "zipFile" for all files
    });

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadDestination(result.folderPath);
        setIsUploading(false);
        setUploadStatus("success");
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      setIsUploading(false);
      setUploadStatus("error");
      console.error("Upload error:", error);
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setUploadStatus(null);
      setUploadDestination("");
    }
  };

  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Upload Resume Archive</h2>
          <div className="text-sm text-gray-500">{files.length} zip file(s) selected</div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all 
            ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} 
            ${files.length > 0 && !isUploading ? 'border-green-200 bg-green-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className={`p-3 rounded-full ${isDragging ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-400'} ${files.length > 0 && !isUploading ? 'bg-green-100 text-green-500' : ''}`}>
              <UploadCloud size={28} />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700">Upload ZIP Files</h3>
              <p className="text-gray-500 text-sm mt-1">
                Drag and drop your ZIP archive here, or click to browse
              </p>
            </div>
            
            <label className="cursor-pointer mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Select ZIP Files
              </div>
            </label>
            
            <p className="text-gray-400 text-xs mt-2">
              Only ZIP archives are supported (.zip)
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Archives</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                      <File size={16} />
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-800 font-medium truncate max-w-xs">{file.name}</p>
                      <p className="text-gray-500 text-xs">{getFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {isUploading && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Uploading files...</span>
              <span className="text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle size={18} />
              <span>ZIP file(s) uploaded successfully!</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <Folder size={18} className="text-blue-500" />
              <div>
                <span className="text-sm font-medium">Saved to directory:</span>
                <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{uploadDestination}</code>
              </div>
            </div>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertTriangle size={18} />
            <span>Upload failed. Only ZIP files are supported or server error occurred.</span>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all ${
              isUploading || files.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isUploading || files.length === 0}
            onClick={goToNextTab}
          >
            Next: Evaluate Resumes
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab1;