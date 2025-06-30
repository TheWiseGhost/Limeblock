import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plug, ArrowRight, Bolt, Eye } from "lucide-react";

export default function MobileSteps() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Add Endpoints", icon: <FileText size={18} /> },
    { id: 1, label: "Give Access", icon: <Plug size={18} /> },
    { id: 2, label: "Integrate AI", icon: <Bolt size={18} /> },
    { id: 3, label: "Monitor Usage", icon: <Eye size={18} /> },
  ];

  const tabContent = [
    {
      title: "Add Endpoints",
      description:
        "Create your own AI Actions by defining custom endpoints for AI to trigger. Limeblock's endpoint tree allows you to easily manage and visualize your API structure.",
      linkText: "Learn how to add endpoints",
      linkUrl: "/docs/backend/",
    },
    {
      title: "Give Access to your Backend",
      description:
        "Give access to our 2 links so your AI Actions can be triggered. Don't worry, we handle authentication and security extremely well.",
      linkText: "Explore documentation",
      linkUrl: "/docs/backend/",
    },
    {
      title: "Integrate AI",
      description:
        "All you have to do to trigger your newly made AI Actions and connect to Limeblock is simply hit our endpoint with your api key (along with other a few other things). Freely code however you want your UI and UX to feel.",
      linkText: "Installation guide with specifics",
      linkUrl: "/docs/export/",
    },
    {
      title: "Monitor Usage of your AI Actions",
      description:
        "Track monthly and lifetime stats on token usage and number of hits on each endpoint. Everything is easily viewable on our analytics dashboard.",
      linkText: "Try Limeblock",
      linkUrl: "/sign_up/",
    },
  ];

  return (
    <div className="w-full bg-white justify-center items-center flex flex-col pb-8 pt-8 px-4 font-inter">
      <div className="text-center mb-6 sm:mb-16">
        <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl">
          <img
            className="size-4 mr-2"
            src="/LimeblockLogo.png"
            alt="Limeblock Logo"
          />
          <span className="text-xs font-medium">Use Limeblock</span>
        </div>
        <h1 className="text-2xl font-medium font-aeonik text-gray-900 mt-6 sm:text-5xl sm:mt-8">
          Setup to Production in minutes
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto sm:mt-4 sm:text-base">
          You could have your AI running on your app today
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-white">
        {/* Tab Navigation - Mobile: Grid 2x2, Desktop: Horizontal */}
        <div className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:justify-center sm:gap-3 sm:mb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors relative z-10 sm:flex-row sm:rounded-t-lg sm:py-3 sm:px-4 sm:min-w-[140px] ${
                activeTab === tab.id
                  ? "bg-white border border-black shadow-sm sm:border-b-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <span className="mb-1 sm:mb-0 sm:mr-2">{tab.icon}</span>
              <span className="text-center px-1 sm:px-0 sm:text-left">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4 py-6 bg-white border border-black rounded-xl sm:rounded-tl-none mt-5"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-3 font-aeonik sm:text-3xl sm:mb-4">
              {tabContent[activeTab].title}
            </h2>

            <p className="text-sm text-gray-600 mb-5 sm:text-base sm:max-w-3xl sm:mb-6">
              {tabContent[activeTab].description}
            </p>

            <div className="mt-4 sm:mt-6">
              <a
                href={tabContent[activeTab].linkUrl}
                className="group inline-flex items-center text-sm font-medium text-gray-600 relative sm:text-base"
              >
                <span className="mr-2 relative">
                  {tabContent[activeTab].linkText}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
