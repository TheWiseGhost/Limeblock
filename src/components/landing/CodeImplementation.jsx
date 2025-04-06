"use client";

import React from "react";
import { Code } from "../global/Code";
import { motion } from "framer-motion";

const CodeImplementation = () => {
  const exampleCode = `import { ChatWidget } from '@limeblock/react';

const MyApp = () => {  
  return (
    <div>
      {/* Your application content */}
      <h1>Welcome to My App</h1>
      
      {/* Limeblock ChatWidget */}
      <ChatWidget
        apiKey={API_KEY}
        contextParams={contextParams}
        widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]" // Have a chat widget already?
        chatPosition="bottom-[0px] right-[0px]" // Just move ours somewhere else on the screen in one line!
      />
    </div>
  );
};

export default MyApp;`;
  return (
    <div className="container mx-auto px-5 md:px-8 pt-24 pb-8 font-inter">
      <div className="flex flex-row space-x-3 items-center mb-12">
        <h1 className="font-aeonik font-medium text-5xl md:text-7xl">
          All in just 3 lines of Code
        </h1>
        <motion.a
          href="/docs"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-8 mt-4 py-3 text-gray-700 hover:text-gray-900 font-medium hidden md:flex items-center gap-2"
        >
          Read Docs
          <motion.svg
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </motion.a>
      </div>

      <div className="flex flex-row w-full space-x-6">
        <Code
          code={exampleCode}
          language="jsx"
          showLineNumbers={true}
          copyButton={true}
          className="w-full border-black border-2"
        />
      </div>
    </div>
  );
};

export default CodeImplementation;
