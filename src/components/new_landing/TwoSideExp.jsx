import { Cpu, FileJson, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ThreeStepProcess() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.7,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const codeBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const iconVariants = {
    hidden: { rotate: -10, scale: 0.9, opacity: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, type: "spring" },
    },
  };

  return (
    <motion.div
      className="w-full bg-white min-h-screen flex flex-col items-center justify-center p-4 font-inter rounded-t-[3rem] pt-12 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Logo and heading */}
      <motion.div className="text-center mb-16" variants={headerVariants}>
        <motion.div
          className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            className="size-5 mr-2"
            src="/LimeblockLogo.png"
            alt="Limeblock Logo"
          />
          <span className="text-sm font-medium">Meet Limeblock</span>
        </motion.div>
        <motion.h1
          className="text-5xl font-medium font-aeonik text-gray-900 mt-8"
          variants={headerVariants}
        >
          AI infrastructure in minutes
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          variants={headerVariants}
        >
          Build production-grade AI capabilities with Limeblock's intuitive
          three-step process
        </motion.p>
      </motion.div>

      {/* Three step process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Step 1: Add Endpoints */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <Cpu className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-dm font-medium">1. Add Endpoints</h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            Define your backend APIs in the Limeblock app for the AI to use.
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4 overflow-x-auto"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">POST</span> /api/add_question
            </pre>
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">POST</span> /api/edit_form
            </pre>
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">POST</span> /api/update_settings
            </pre>
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">GET</span> /api/analytics_stats
            </pre>
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">GET</span> /api/monthly_summary
            </pre>
          </motion.div>
        </motion.div>

        {/* Step 2: Define Schemas */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <FileJson className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-medium font-dm">2. Define Schemas</h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            Define what your endpoints accept so AI knows what and how to send.
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">Edit Form</span> {"{"}
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;user_id:{" "}
              <span className="text-green-600">string</span>
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;form_id:{" "}
              <span className="text-green-600">string</span>
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;title: <span className="text-green-600">string</span>
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;type: <span className="text-green-600">string</span>
            </pre>
            <pre className="text-sm text-gray-700">{"}"}</pre>
          </motion.div>
        </motion.div>

        {/* Step 3: Trigger AI Actions */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <Zap className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-medium font-dm">
              3. Trigger AI Actions
            </h2>
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            Trigger AI action by sending a request to our endpoint with your
            payload.
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <pre className="text-sm text-gray-700">
              <span className="text-purple-600">const</span> payload = {"{"}
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;prompt:{" "}
              <span className="text-green-600">"Add a question box"</span>,
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;endpoint_id:{" "}
              <span className="text-green-600">"ep_123"</span>,
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;api_key:{" "}
              <span className="text-green-600">"lime_..."</span>
            </pre>
            <pre className="text-sm text-gray-700">{"}"}</pre>

            <pre className="text-sm text-gray-700 mt-2">
              <span className="text-purple-600">fetch</span>(
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;
              <span className="text-green-600">"/api/ai_action/"</span>,
            </pre>
            <pre className="text-sm text-gray-700">
              &nbsp;&nbsp;{"{"} method:{" "}
              <span className="text-green-600">"POST"</span>, body: payload
            </pre>
            <pre className="text-sm text-gray-700">);</pre>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
