"use client";

import React, { useState } from "react";
import { Code } from "../global/Code";
import { IconBrandReact, IconBrandVue } from "@tabler/icons-react";

const HowToExport = () => {
  const [framework, setFramework] = useState("react");

  // Code snippets
  const installCode =
    framework === "react"
      ? `npm install @limeblock/react`
      : `npm install @limeblock/vue @tabler/icons-vue`;

  const importCode =
    framework === "react"
      ? `import { ChatWidget } from '@limeblock/react';`
      : `import { ChatWidget } from '@limeblock/vue';`;

  const apiKeyCode =
    framework === "react"
      ? `const API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY || "lime_YOUR_API_KEY";`
      : `const API_KEY = import.meta.env.VITE_LIMEBLOCK_API_KEY || 'lime_YOUR_API_KEY'`;

  const contextParamsCode = `const contextParams = {
  board_id: "YOUR_BOARD_ID",
  user_id: "USER_ID",
};`;

  const basicImplementationCode =
    framework === "react"
      ? `<ChatWidget
  apiKey={API_KEY}
  contextParams={contextParams}
  widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
  chatPosition="bottom-[0px] right-[0px]"
/>`
      : `<ChatWidget
  :api-key="API_KEY"
  :context-params="contextParams"
  widget-position="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
  chat-position="bottom-[0px] right-[0px]"
/>`;

  const customImplementationCode =
    framework === "react"
      ? `<ChatWidget
  apiKey={API_KEY}
  contextParams={contextParams}
  widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
  chatPosition="bottom-[0px] right-[0px]"
/>`
      : `<ChatWidget
  :api-key="API_KEY"
  :context-params="contextParams"
  widget-position="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
  chat-position="bottom-[0px] right-[0px]"
/>`;

  const completeExampleCode =
    framework === "react"
      ? `import React from 'react';
import { ChatWidget } from '@limeblock/react';

const MyApp = () => {
  const API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY || "lime_YOUR_API_KEY";
  
  const contextParams = {
    board_id: "679fdb26a14496f9423891fe",
    user_id: "user_2tFLPXZyEnTmNQsenlQXNU3Q5Z4",
  };
  
  return (
    <div>
      <ChatWidget
        apiKey={API_KEY}
        contextParams={contextParams}
      />
    </div>
  );
};`
      : `<template>
  <div>
    <ChatWidget
      :api-key="API_KEY"
      :context-params="contextParams"
    />
  </div>
</template>

<script setup>
const API_KEY = import.meta.env.VITE_LIMEBLOCK_API_KEY || 'lime_YOUR_API_KEY'

const contextParams = {
  board_id: '679fdb26a14496f9423891fe',
  user_id: 'user_2tFLPXZyEnTmNQsenlQXNU3Q5Z4'
}
</script>`;

  const nextjsImplementationCode =
    framework === "react"
      ? `// pages/_app.js or app/layout.js (for App Router)
  
"use client";
import { ChatWidget } from '@limeblock/react';

export default function Layout({ children }) {
  const contextParams = {
    board_id: process.env.NEXT_PUBLIC_LIMEBLOCK_BOARD_ID,
    user_id: "anonymous",
  };

  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget
          apiKey={process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY}
          contextParams={contextParams}
        />
      </body>
    </html>
  );
}`
      : `// plugins/limeblock.js (for Nuxt 3)
import { defineNuxtPlugin } from '#app';
import { ChatWidget } from '@limeblock/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ChatWidget', ChatWidget);
});`;

  return (
    <div className="flex flex-row min-h-screen w-full">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
          <div className="flex flex-row space-x-2 items-center mb-6">
            <img src="/LimeblockLogo.png" className="size-6" />
            <p className="font-aeonik text-sm text-gray-900 text-center">
              Limeblock Docs
            </p>
          </div>
          <h1 className="text-4xl font-aeonik font-medium mb-8">
            How to Export Limeblock to Your Project
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              This guide will walk you through the steps to integrate the
              Limeblock chat widget into your project. Follow these instructions
              to get your AI-powered chat widget up and running in no time.
            </p>
            <h1 className="font-aeonik font-medium text-2xl mr-2 pt-4">
              Choose Framework:
            </h1>
            <div className="flex gap-2 bg-white pb-4 pt-3 items-center space-x-4">
              <div
                onClick={() => setFramework("react")}
                className={`flex items-center p-3 border rounded-lg ${
                  framework == "react"
                    ? "bg-cyan-100 border-black"
                    : "bg-white border-gray-700 cursor-pointer"
                } w-32 justify-center`}
              >
                <div className="flex flex-col items-center">
                  <IconBrandReact className="text-cyan-600 size-7" />
                  <span className="mt-1 font-medium">React</span>
                </div>
              </div>
              <div
                onClick={() => setFramework("vue")}
                className={`flex items-center p-3 border rounded-lg ${
                  framework == "vue"
                    ? "bg-green-100 border-black"
                    : "bg-white border-gray-700 cursor-pointer"
                } w-32 justify-center`}
              >
                <div className="flex flex-col items-center">
                  <IconBrandVue className="text-green-600 size-7" />
                  <span className="mt-1 font-medium">Vue</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 1: Installation
            </h2>
            <p className="mb-4">
              First, install the Limeblock package using npm or yarn:
            </p>

            <Code
              code={installCode}
              language="bash"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 2: Import the ChatWidget Component
            </h2>
            <p className="mb-4">
              Import the ChatWidget component into your {framework} component:
            </p>

            <Code
              code={importCode}
              language={framework === "react" ? "jsx" : "javascript"}
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 3: Configure Your API Key
            </h2>
            <p className="mb-4">
              You'll need to provide your Limeblock API key to authenticate your
              requests:
            </p>

            <Code
              code={apiKeyCode}
              language="javascript"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important:</strong> Never expose your API key in
                client-side code in production. Use environment variables and
                proper security measures.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 4: Add Context Parameters (Optional)
            </h2>
            <p className="mb-4">
              Context parameters help personalize the chat experience by
              providing additional information like user ID, board ID, or any
              custom parameters your implementation requires. These are
              essential to backend API actions. Make sure you format them in
              proper casing (same as you did in the API endpoint tree).
            </p>

            <Code
              code={contextParamsCode}
              language="javascript"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 5: Add the ChatWidget
            </h2>
            <p className="mb-4">
              Add the ChatWidget component to your{" "}
              {framework === "react" ? "JSX" : "template"} with these props
              (position props not required):
            </p>

            <Code
              code={basicImplementationCode}
              language={framework === "react" ? "jsx" : "vue"}
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 6: Customization Options
            </h2>
            <p className="mb-4">
              Limeblock offers several customization options to match your
              application's design (position props not required):
            </p>

            <Code
              code={customImplementationCode}
              language={framework === "react" ? "jsx" : "vue"}
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Complete Implementation Example
            </h2>
            <Code
              code={completeExampleCode}
              language={framework === "react" ? "jsx" : "vue"}
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important Note:</strong>{" "}
                {framework === "react"
                  ? 'If you are using NextJS please add "use client"; to the top of the page'
                  : "For Nuxt, add to plugins or import directly"}
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              {framework === "react" ? "Next.js" : "Nuxt"} Implementation
            </h2>
            <Code
              code={nextjsImplementationCode}
              language={framework === "react" ? "jsx" : "javascript"}
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Widget not displaying
                </h3>
                <p>Ensure your API key is correct and properly configured</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Authentication errors
                </h3>
                <p>Verify API key validity and environment configuration</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Styling issues
                </h3>
                <p>Check Tailwind configuration and purge settings</p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Getting Help
            </h2>
            <p className="mb-4">Contact support for additional assistance:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Email:{" "}
                <a
                  href="mailto:byjuaditya@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  byjuaditya@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToExport;
