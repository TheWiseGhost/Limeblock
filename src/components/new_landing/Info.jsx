"use client";

import {
  IconBinaryTree2,
  IconBulb,
  IconFileText,
  IconLayoutSidebar,
} from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoLoading from "../global/VideoLoading";

const Info = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const tabs = [
    {
      title: "Page Navigation",
      description: "Add page navigation to your project",
      icon: <IconFileText className="size-5 mr-2" />,
      video: {
        src: "/CroppedAddPageEndpoint.mp4",
      },
    },
    {
      title: "API Endpoints",
      description: "Add API endpoints to your project",
      icon: <IconBinaryTree2 className="size-5 mr-2" />,
      video: {
        src: "/CroppedAddAPIEndpoint.mp4",
      },
    },
    {
      title: "Example Use",
      description: "How we used Limeblock ourselves",
      icon: <IconBulb className="size-5 mr-2" />,
      video: {
        src: "/UpdateWidgetColor.mp4",
      },
    },
    {
      title: "App Runthrough",
      description: "What you'll see in Limeblock's dev app",
      icon: <IconLayoutSidebar className="size-5 mr-2" />,
      video: {
        src: "/LimeblockDemo.mp4",
      },
    },
  ];

  // Reset loading state when the active tab changes
  useEffect(() => {
    setIsLoading(true);

    // Check if video is already loaded when tab changes
    if (videoRef.current?.readyState >= 3) {
      setIsLoading(false);
    }
  }, [activeTab]);

  return (
    <div className="w-full bg-white h-fit py-16 flex flex-col items-center justify-center">
      <div className="flex w-11/12 mx-auto bg-white rounded-xl overflow-hidden font-inter">
        {/* Left sidebar with links */}
        <div className="w-[36%] p-6 pl-10 flex flex-col border-r border-gray-100">
          <h2 className="text-4xl font-medium text-gray-900 mb-10 mt-4 font-aeonik">
            Highlighted Features
          </h2>

          <div className="space-y-2">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredTab(index)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <button
                  onClick={() => setActiveTab(index)}
                  className={`relative w-full text-left p-3 rounded-lg transition-all duration-200 z-10 ${
                    activeTab === index
                      ? "text-black"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <motion.div
                    animate={{
                      x: activeTab === index ? 4 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center">
                      {tab.icon && tab.icon}
                      <h3 className="font-medium text-base">{tab.title}</h3>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        activeTab === index ? "text-gray-800" : "text-gray-600"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </motion.div>

                  {activeTab === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-lime rounded-l-md z-20"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>

                {hoveredTab === index && activeTab !== index && (
                  <motion.div
                    className="absolute inset-0 bg-gray-200 bg-opacity-30 rounded-lg -z-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right content area with video */}
        <div className="w-[64%] p-6 flex flex-col pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col w-full"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="min-w-full h-full rounded-lg overflow-hidden border border-gray-200 relative"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-none">
                    <VideoLoading />
                  </div>
                )}
                <video
                  ref={videoRef}
                  src={tabs[activeTab].video.src}
                  className="object-cover w-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  onLoadedData={() => setIsLoading(false)}
                  onCanPlay={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)} // Fallback in case of errors
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Info;
