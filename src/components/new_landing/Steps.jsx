import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plug,
  Package,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function LimeblockSteps() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Add Pages", icon: <FileText size={18} /> },
    { id: 1, label: "Add Endpoints", icon: <Plug size={18} /> },
    { id: 2, label: "Import Widget", icon: <Package size={18} /> },
    { id: 3, label: "Use Widget", icon: <MessageCircle size={18} /> },
  ];

  const tabContent = [
    {
      title: "Add your app pages",
      description:
        "Set up pages, including contact and documentation pages, to provide quick links that help users without needed a customer support agent.",
      linkText: "Learn more about page setup",
      linkUrl: "/docs/frontend/",
    },
    {
      title: "Add API endpoints hooked to your backend",
      description:
        "Set up the required API endpoints to handle any in app action by just adding an example schema to send and the url to send it to. Limeblock will take care of the rest.",
      linkText: "Explore API documentation",
      linkUrl: "/docs/backend/",
    },
    {
      title: "Add the Limeblock widget to your application",
      description:
        "Import our lightweight widget into your React or Vue app using npm. With just a few lines of code, you'll have a fully functional AI chat interface ready to customize.",
      linkText: "Installation guide",
      linkUrl: "/docs/export/",
    },
    {
      title: "Customize and deploy your AI chat experience",
      description:
        "Configure your widget's appearance, behavior, and AI capabilities to match your brand. Then deploy and start collecting valuable user insights and providing assistance.",
      linkText: "Deployment documentation",
      linkUrl: "/docs/",
    },
  ];

  return (
    <div className="w-full bg-white justify-center items-center flex flex-col pb-16 pt-24 font-inter">
      <div className="text-center mb-16">
        <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl">
          <img
            className="size-5 mr-2"
            src="/LimeblockLogo.png"
            alt="Limeblock Logo"
          />
          <span className="text-sm font-medium">Use Limeblock</span>
        </div>
        <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
          Setup to Production in minutes
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          You could have your AI chat widget up and running on your app today
        </p>
      </div>
      <div className="w-fit mx-auto bg-white justify-center items-start flex flex-col">
        {/* Tab Navigation */}
        <div className="flex items-start rounded-t-lg space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 flex items-center rounded-t-lg justify-center text-sm font-medium transition-colors relative z-10 ${
                activeTab === tab.id
                  ? "text-gray-800 bg-white border border-black border-b-white"
                  : "text-gray-700 hover:text-gray-800 bg-gray-200"
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
            className="px-16 py-12 bg-white border border-black rounded-xl rounded-tl-none -mt-[1px]"
          >
            <h2 className="text-4xl font-medium text-gray-900 mb-6 font-aeonik">
              {tabContent[activeTab].title}
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              {tabContent[activeTab].description}
            </p>

            <div className="mt-8">
              <a
                href={tabContent[activeTab].linkUrl}
                className="group inline-flex items-center text-lg font-medium text-gray-600 relative"
              >
                <span className="mr-2 relative">
                  {tabContent[activeTab].linkText}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight size={20} />
                </span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
