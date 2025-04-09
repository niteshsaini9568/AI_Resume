import React from "react";
import { Mail, Linkedin, Github, Globe, MessageCircle, BookOpen, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto pt-16 pb-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">Resume Evaluator</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering recruiters with AI-driven tools to make smarter, faster, and fairer hiring decisions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:support@resumeevaluator.com" 
                className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="LinkedIn"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com" 
                className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="GitHub"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
              <a 
                href="/" 
                className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full"></span>
                  About
                </a>
              </li>
              <li>
                <a href="/evaluation" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full"></span>
                  Evaluate
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-indigo-500 rounded-full"></span>
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <BookOpen size={14} />
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <MessageCircle size={14} />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Phone size={14} />
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest features and updates.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Resume Evaluator. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;