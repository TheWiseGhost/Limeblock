"use client";

import React, { useState } from "react";
import { Code } from "../global/Code";
import { motion } from "framer-motion";
import { IconBrandReact, IconBrandVue } from "@tabler/icons-react";

const CodeImplementation = () => {
  const [framework, setFramework] = useState("react");

  const exampleCode = {
    react: `import { ChatWidget } from '@limeblock/react';

const MyApp = () => {  
  return (
    <div>
      <ChatWidget
        apiKey={API_KEY}
        contextParams={contextParams}
        widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
        chatPosition="bottom-[0px] right-[0px]"
      />
    </div>
  );
};


export default MyApp;`,
    vue: `<template>
  <div>
    <ChatWidget
      :api-key="API_KEY"
      :context-params="contextParams"
      widget-position="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
      chat-position="bottom-[0px] right-[0px]"
    />
  </div>
</template>

<script setup>
const API_KEY = import.meta.env.VITE_LIMEBLOCK_API_KEY || 'lime_YOUR_API_KEY'
const contextParams = {
  board_id: 'YOUR_BOARD_ID',
  user_id: 'USER_ID'
}
</script>`,
  };

  return (
    <div className="container mx-auto px-5 md:px-8 pt-24 pb-8 font-inter">
      <div className="flex flex-row space-x-3 items-center mb-10">
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

      <div className="flex gap-4 justify-start text-sm">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFramework("react")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
            framework === "react"
              ? "text-black border border-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <IconBrandReact className="size-5" />
          <span className="font-medium">React</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFramework("vue")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
            framework === "vue"
              ? "text-black border border-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <IconBrandVue className="size-5" />
          <span className="font-medium">Vue</span>
        </motion.button>
      </div>

      <div className="flex flex-row w-full space-x-6 mt-8">
        <Code
          code={exampleCode[framework]}
          language={framework === "react" ? "jsx" : "vue"}
          showLineNumbers={true}
          copyButton={true}
          className="w-full border-black border-2"
        />
      </div>
    </div>
  );
};

export default CodeImplementation;
