import React, { useState } from "react";
import axios from "axios";
import { Check, ChevronRight, AlertTriangle, Send, Clipboard, ArrowLeft } from "lucide-react";

const Tab2 = ({ goToNextTab }) => {
  const [form, setForm] = useState({
    jd: "",
    skills: "",
    threshold: 50,
    meeting_link: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleThresholdChange = (e) => {
    setForm({ ...form, threshold: parseInt(e.target.value) });
  };

  const validateForm = () => {
    if (!form.jd.trim()) {
      setErrorMsg("Please enter a job description");
      return false;
    }
    if (!form.skills.trim()) {
      setErrorMsg("Please enter required skills");
      return false;
    }
    if (!form.meeting_link.trim()) {
      setErrorMsg("Please enter a meeting link");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setResponseMsg("");
    setErrorMsg("");

    try {
      const payload = {
        jd: form.jd,
        skills: form.skills,
        threshold: form.threshold,
        meeting_link: form.meeting_link,
      };

      console.log("Sending payload:", payload); 
      const res = await axios.post("http://localhost:3001/score-resumes", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from backend:", res.data);
      setResponseMsg("Data sent to backend successfully! Proceeding to next step...");
      setTimeout(() => goToNextTab(), 2000); 
    } catch (err) {
      console.error("Error submitting data:", err.response ? err.response.data : err.message); // Detailed error logging
      setErrorMsg(err.response?.data?.message || "Error evaluating resumes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const suggestedSkills = [
    "JavaScript", "React", "Python", "Data Analysis",
    "SQL", "Project Management", "Communication"
  ];

  const addSkill = (skill) => {
    const currentSkills = form.skills.split(',').map(s => s.trim()).filter(s => s !== "");
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill].join(", ");
      setForm({ ...form, skills: newSkills });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Evaluate Resumes</h2>
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"}`}></span>
            <span className={`w-2 h-2 rounded-full ${currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"}`}></span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {currentStep === 1 && (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <div className="relative">
                  <textarea
                    name="jd"
                    rows="4"
                    value={form.jd}
                    onChange={handleChange}
                    placeholder="Enter the full job description here..."
                    className="w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  {form.jd && (
                    <div className="absolute right-3 top-3 text-green-500">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <div className="mt-1 flex justify-between">
                  <p className="text-xs text-gray-500">Used to match candidate qualifications</p>
                  <p className="text-xs text-gray-500">{form.jd.length} characters</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                <div className="relative">
                  <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="e.g., Python, React, Machine Learning"
                    className="w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  {form.skills && (
                    <div className="absolute right-3 top-3 text-green-500">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => goToNextTab("tab1")}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!form.jd.trim() || !form.skills.trim()}
                className={`flex items-center gap-1 px-6 py-2 rounded-lg text-white font-medium transition-all ${
                  !form.jd.trim() || !form.skills.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Continue
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification Threshold: {form.threshold}%</label>
                <input
                  type="range"
                  name="threshold"
                  min="0"
                  max="100"
                  value={form.threshold}
                  onChange={handleThresholdChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Less Strict</span>
                  <span>More Strict</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interview Meeting Link</label>
                <div className="relative">
                  <input
                    type="url"
                    name="meeting_link"
                    value={form.meeting_link}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/..."
                    className="w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  {form.meeting_link && (
                    <div className="absolute right-3 top-3 text-green-500">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">This link will be sent to qualified candidates</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <div className="text-blue-500 mt-0.5">
                  <Clipboard size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700">Summary</h3>
                  <ul className="mt-1 text-sm text-blue-600 space-y-1">
                    <li>• Job Description: {form.jd.substring(0, 50)}...</li>
                    <li>• Skills: {form.skills}</li>
                    <li>• Threshold: {form.threshold}%</li>
                  </ul>
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Processing resumes...</p>
              </div>
            )}

            {responseMsg && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <p>{responseMsg}</p>
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !form.meeting_link.trim()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all ${
                  loading || !form.meeting_link.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Evaluate Resumes"}
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tab2;