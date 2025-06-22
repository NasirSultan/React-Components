import React from "react";
import {
  Rocket,
  Bot,
  Globe,
  Code,
  Server,
  Send,
  Smartphone,
  CloudUpload,
} from "lucide-react";

const PosterBanner = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white px-12 py-20 md:px-20 md:py-24 rounded-3xl shadow-2xl max-w-7xl mx-auto mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Left content */}
        <div className="flex-1 space-y-10">
          <h1 className="text-7xl md:text-6xl font-extrabold leading-tight">
            <span className="inline-flex items-center gap-4">
             
              Full-Stack AI React Apps
            </span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 text-lg">
            <div className="flex items-center gap-3">
              <Bot className="text-cyan-400 w-7 h-7" />
              AI Integration
            </div>
            <div className="flex items-center gap-3">
              <Code className="text-yellow-400 w-7 h-7" />
              React Frontend
            </div>
            <div className="flex items-center gap-3">
              <Server className="text-purple-400 w-7 h-7" />
              Node.js Backend
            </div>
            <div className="flex items-center gap-3">
              <CloudUpload className="text-pink-400 w-7 h-7" />
              Deployment Ready
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="text-lime-400 w-7 h-7" />
              Mobile Responsive
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-blue-400 w-7 h-7" />
              SEO Friendly
            </div>
          </div>

          <button className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-yellow-400 text-black text-xl font-semibold hover:bg-yellow-300 transition">
            <Send size={22} /> Get Started
          </button>
        </div>

        {/* Right React logo (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            className="w-80 h-80 opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default PosterBanner;
