import React from "react";
import { Info, FileText, ShieldCheck, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-indigo-600">Resume Evaluator</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              An intelligent platform that streamlines your hiring process by leveraging advanced 
              parsing and matching techniques to identify the most suitable candidates.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Sparkles size={28} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Smart Matching</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our AI-driven algorithm evaluates resumes against job descriptions and required skill sets, 
              providing comprehensive relevance scores to help you make informed decisions quickly.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <ShieldCheck size={28} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Reliable & Secure</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We prioritize data security and candidate privacy. All resume data is processed using 
              enterprise-grade encryption, ensuring sensitive information remains protected at all times.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText size={28} className="text-yellow-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">PDF Resume Support</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Effortlessly upload and process multiple resume formats, including PDF, DOCX, and plain text. 
              Our intelligent parser extracts key information for immediate evaluation and comparison.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Info size={28} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">User Friendly</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Designed with recruiters in mind, our intuitive interface requires no technical expertise. 
              Get actionable insights within seconds, helping you identify top talent faster than ever.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-indigo-600 text-white py-10 px-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to streamline your hiring process?</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Join thousands of recruiters who are saving time and finding better candidates with Resume Evaluator.
            </p>
            <button className="bg-white text-indigo-600 font-medium py-3 px-8 rounded-lg shadow-md hover:bg-indigo-50 transition">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;