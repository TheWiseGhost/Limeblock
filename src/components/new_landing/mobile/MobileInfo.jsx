"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoLoading from "../../global/VideoLoading";
import { FileText, BarChart, Smartphone, PlayCircle } from "lucide-react";

const MobileInfo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const tabs = [
    {
      id: 0,
      title: "API Endpoints",
      description: "Add API endpoints to your project",
      videoSrc: "/CroppedAddAPIEndpoint.mp4",
      icon: <FileText size={16} />,
    },
    {
      id: 1,
      title: "Analytics",
      description: "View token usage and stats",
      videoSrc: "/analytics_demo.mp4",
      icon: <BarChart size={16} />,
    },
    {
      id: 2,
      title: "Example Use",
      description: "How we used Limeblock",
      videoSrc: "/limeblockexamplecase.mp4",
      icon: <Smartphone size={16} />,
    },
    {
      id: 3,
      title: "App Runthrough",
      description: "Limeblock dev app overview",
      videoSrc: "/limeblockrunthrough.mp4",
      icon: <PlayCircle size={16} />,
    },
  ];

  // Reset loading state when the active tab changes
  useEffect(() => {
    setIsLoading(true);
    if (videoRef.current?.readyState >= 3) setIsLoading(false);
  }, [activeTab]);

  return (
    <div className="w-full bg-white px-4 flex flex-col font-inter items-center py-16 sm:py-20">
      {/* Header section */}
      <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium font-aeonik text-gray-900 sm:text-4xl">
          See Limeblock in Action
        </h2>
        <p className="text-gray-600 mt-3 sm:text-lg">
          Watch how easily you can integrate AI into your app
        </p>
      </div>

      {/* Tab selector - Grid layout */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-6 sm:flex sm:justify-center sm:gap-4 sm:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors relative z-10 sm:flex-row sm:rounded-t-lg sm:py-3 sm:px-4 sm:min-w-[140px] ${
                activeTab === tab.id
                  ? "bg-white border border-gray-500 shadow-sm sm:border-b-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <span className="mb-1 sm:mb-0 sm:mr-2">{tab.icon}</span>
              <span className="text-center px-1 sm:px-0 sm:text-left">
                {tab.title}
              </span>
            </button>
          ))}
        </div>

        {/* Video area */}
        <div className="w-full relative rounded-xl overflow-hidden border border-gray-300 bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
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

          {/* Video description */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="text-sm font-medium">{tabs[activeTab].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileInfo;
