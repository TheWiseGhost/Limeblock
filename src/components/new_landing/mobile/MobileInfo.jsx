"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoLoading from "../../global/VideoLoading";

const MobileInfo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const tabs = [
    {
      title: "API Endpoints",
      description: "Add API endpoints to your project",
      videoSrc: "/CroppedAddAPIEndpoint.mp4",
    },
    {
      title: "Analytics",
      description: "View token usage and stats",
      videoSrc: "/analytics_demo.mp4",
    },
    {
      title: "Example Use",
      description: "How we used Limeblock",
      videoSrc: "/limeblockexamplecase.mp4",
    },
    {
      title: "App Runthrough",
      description: "Limeblock dev app overview",
      videoSrc: "/limeblockrunthrough.mp4",
    },
  ];

  // Reset loading state when the active tab changes
  useEffect(() => {
    setIsLoading(true);
    if (videoRef.current?.readyState >= 3) setIsLoading(false);
  }, [activeTab]);

  return (
    <div className="w-full bg-white px-4 flex flex-col font-inter items-center py-20">
      {/* Tab selector */}
      <div className="w-full mb-4">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2 px-1 rounded-lg text-center transition-all duration-200 focus:outline-none text-xs leading-snug
                ${
                  activeTab === idx
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <div className="font-medium">{tab.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Video area */}
      <div className="w-full relative rounded-lg overflow-hidden border border-gray-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <VideoLoading />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.video
            key={activeTab}
            ref={videoRef}
            src={tabs[activeTab].videoSrc}
            className="w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onLoadedData={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileInfo;
