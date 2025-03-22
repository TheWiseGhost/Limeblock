"use client";

import React from "react";
import { Code } from "../global/Code";
import Sidebar from "./Sidebar";

const HowToExport = () => {
  // Code snippets stored as variables to avoid syntax errors
  const installCode = `npm install @limeblock/react`;
  const yarnInstallCode = `yarn add @limeblock/react`;
  const importCode = `import { ChatWidget } from '@limeblock/react';`;
  const apiKeyCode = `// Example of using your API key
const API_KEY = "lime_YOUR_API_KEY";`;
  const contextParamsCode = `// Example context parameters
const contextParams = {
  board_id: "YOUR_BOARD_ID",
  user_id: "USER_ID",
  // Any other context parameters you want to include
};`;
  const basicImplementationCode = `// Basic implementation
<ChatWidget
  apiKey={API_KEY}
  contextParams={contextParams}
/>`;
  const customImplementationCode = `// Customized implementation
<ChatWidget
  apiKey={API_KEY}
  contextParams={contextParams}
    // Customize everything about your block in the limeblock app, not in the code
/>`;
  const completeExampleCode = `import React from 'react';
import { ChatWidget } from '@limeblock/react';

const MyApp = () => {
  const API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY || "lime_YOUR_API_KEY";
  
  const contextParams = {
    board_id: "679fdb26a14496f9423891fe",
    user_id: "user_2tFLPXZyEnTmNQsenlQXNU3Q5Z4",
  };
  
  return (
    <div>
      {/* Your application content */}
      <h1>Welcome to My App</h1>
      
      {/* Limeblock ChatWidget */}
      <ChatWidget
        apiKey={API_KEY}
        contextParams={contextParams}
      />
    </div>
  );
};

export default MyApp;`;
  const nextjsImplementationCode = `// pages/_app.js or app/layout.js (for App Router)
import { ChatWidget } from '@limeblock/react';

export default function Layout({ children }) {
  const contextParams = {
    board_id: process.env.NEXT_PUBLIC_LIMEBLOCK_BOARD_ID,
    user_id: "anonymous", // You might want to use a dynamic user ID
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
}`;

  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Main Content */}
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

            <p className="mb-4">Or if you prefer yarn:</p>

            <Code
              code={yarnInstallCode}
              language="bash"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 2: Import the ChatWidget Component
            </h2>
            <p className="mb-4">
              Import the ChatWidget component into your React component:
            </p>

            <Code
              code={importCode}
              language="jsx"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 3: Configure Your API Key
            </h2>
            <p className="mb-4">
              You'll need to provide your Limeblock API key to authenticate your
              requests. You can find this in your Limeblock dashboard under API
              settings.
            </p>

            <Code
              code={apiKeyCode}
              language="jsx"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important:</strong> Never expose your API key in
                client-side code in production. Consider using environment
                variables and server-side authentication for security.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 4: Add Context Parameters (Optional)
            </h2>
            <p className="mb-4">
              Context parameters help personalize the chat experience by
              providing additional information like user ID, board ID, or any
              custom parameters your implementation requires.
            </p>

            <Code
              code={contextParamsCode}
              language="jsx"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 5: Add the ChatWidget to Your Component
            </h2>
            <p className="mb-4">
              Now, add the ChatWidget component to your JSX with the required
              props:
            </p>

            <Code
              code={basicImplementationCode}
              language="jsx"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 6: Customization Options
            </h2>
            <p className="mb-4">
              Limeblock offers several customization options to match your
              application's design:
            </p>

            <Code
              code={customImplementationCode}
              language="jsx"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Complete Implementation Example
            </h2>
            <p className="mb-4">
              Here's a complete example of implementing the Limeblock chat
              widget in a React component:
            </p>

            <Code
              code={completeExampleCode}
              language="jsx"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Next.js Specific Implementation
            </h2>
            <p className="mb-4">
              If you're using Next.js, here's how you can add the widget to your
              layout or page:
            </p>

            <Code
              code={nextjsImplementationCode}
              language="jsx"
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
                <p>
                  Ensure your API key is correct and that you've included all
                  required props.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Authentication errors
                </h3>
                <p>
                  Check that your API key is valid and has not expired. You can
                  verify this in your Limeblock dashboard.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Custom styling not applying
                </h3>
                <p>
                  Ensure you are using # in your hex codes and that you hit the
                  save button
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Getting Help
            </h2>
            <p className="mb-4">
              If you encounter any issues or have questions about implementing
              Limeblock:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Contact our founder at{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  byjuaditya@gmail.com
                </a>{" "}
                for personalized support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToExport;
