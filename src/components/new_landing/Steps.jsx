import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Steps() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "User Research", icon: "📚" },
    { id: 1, label: "Design", icon: "🎨" },
    { id: 2, label: "Product Management", icon: "📊" },
    { id: 3, label: "Marketing", icon: "📣" },
  ];

  const tabContent = [
    {
      title: "Capture user insights faster than ever before",
      description:
        "Quickly collect and analyze user feedback and behavior at scale to maximize the impact of your research and drive data-backed product decisions.",
      cta: "Explore Sprig for User Research Teams",
    },
    {
      title: "Design with real user feedback",
      description:
        "Create intuitive experiences guided by actual user behavior and preferences to ensure your designs solve real problems.",
      cta: "Explore Sprig for Design Teams",
    },
    {
      title: "Make data-driven product decisions",
      description:
        "Prioritize features and roadmap items based on quantitative and qualitative user insights rather than guesswork.",
      cta: "Explore Sprig for Product Teams",
    },
    {
      title: "Optimize marketing messaging",
      description:
        "Test marketing copy and campaigns with your target audience to maximize conversion and engagement metrics.",
      cta: "Explore Sprig for Marketing Teams",
    },
  ];

  return (
    <div className="w-full bg-white justify-center items-center flex flex-col pb-16 pt-16 font-inter">
      <div className="text-center mb-16">
        <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl">
          <img className="size-5 mr-2" src="/LimeblockLogo.png" />
          <span className="text-sm font-medium">Use Limeblock</span>
        </div>
        <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
          Setup to Production in minutes
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          You could have your chat widget up and running on your app today
        </p>
      </div>
      <div className="w-2/3 mx-auto bg-white justify-center items-start flex flex-col">
        {/* Tab Navigation */}
        <div className="flex items-start rounded-t-lg space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 flex items-center rounded-t-lg justify-center text-sm font-medium transition-colors relative z-10 ${
                activeTab === tab.id
                  ? "text-gray-800 bg-white border border-black border-b-white"
                  : "text-gray-500 hover:text-gray-700 bg-gray-100"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="px-16 py-12 bg-white border border-black -mt-0.5"
          >
            <h2 className="text-4xl font-medium text-gray-900 mb-6 font-aeonik">
              {tabContent[activeTab].title}
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              {tabContent[activeTab].description}
            </p>

            <a
              href="#"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group"
            >
              {tabContent[activeTab].cta}
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
