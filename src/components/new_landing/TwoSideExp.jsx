import { Database, Layout, Code, FileJson } from "lucide-react";
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
      className="w-full bg-white min-h-screen flex flex-col items-center justify-center p-4 font-inter rounded-t-[3rem] pt-12"
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
          Just add pages, endpoints, schemas.
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          variants={headerVariants}
        >
          Build a chat widget that does the same thing production-grade ai tools
          and MCP <br /> for your app in minutes with Limeblock's intuitive
          three-step process
        </motion.p>
      </motion.div>

      {/* Three step process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Step 1: Add Pages */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{
            y: -8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <Layout className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-semibold">Step 1: Add Pages</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Add your app pages into Limeblock and let users quickly find any
            page they need
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">DashboardPage</span> = () =&gt;{" "}
              {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;
              <span className="text-green-600">Dashboard</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">title</span>=
              <span className="text-green-600">"User Analytics"</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">layout</span>=
              <span className="text-green-600">"grid"</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {"}"};
            </code>
          </motion.div>
        </motion.div>

        {/* Step 2: Add Endpoints */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{
            y: -8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <Code className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-semibold">Step 2: Add Endpoints</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Connect your backend through API endpoints. Limeblock will send
            requests and create the in app magic.
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">export async function</span>{" "}
              <span className="text-blue-600">getUsers</span>() {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">users</span> ={" "}
              <span className="text-purple-600">await</span> db.users.findMany(
              {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">where</span>: {"{"}{" "}
              <span className="text-orange-600">active</span>:{" "}
              <span className="text-purple-600">true</span> {"}"}
              <br />
              &nbsp;&nbsp;{"}"});
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">return</span> {"{"}{" "}
              <span className="text-orange-600">users</span> {"}"};
              <br />
              {"}"}
            </code>
          </motion.div>
        </motion.div>

        {/* Step 3: Add Schema */}
        <motion.div
          className="bg-[#F3F3F5] p-8 rounded-xl shadow-sm"
          variants={cardVariants}
          whileHover={{
            y: -8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <div className="flex items-center mb-4">
            <motion.div variants={iconVariants}>
              <FileJson className="text-lime-600 mr-3" size={24} />
            </motion.div>
            <h2 className="text-xl font-semibold">Step 3: Add Schema</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Define an example schema for each endpoint, and AI will smartly fill
            it to commit actions.
          </p>

          <motion.div
            className="border border-gray-200 bg-white rounded-lg p-4"
            variants={codeBlockVariants}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              borderColor: "#e2e8f0",
            }}
          >
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">UserSchema</span> = {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">id</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">name</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">email</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">role</span>: {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">type</span>:{" "}
              <span className="text-green-600">"enum"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">values</span>: [
              <span className="text-green-600">"admin"</span>,{" "}
              <span className="text-green-600">"user"</span>]
              <br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"}"};
            </code>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
