import React from "react";
import { Code } from "../global/Code";

const HaveBot = () => {
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
        widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]" 
        chatPosition="bottom-[0px] right-[0px]"
      />
    </div>
  );
};

export default MyApp;`;

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
        <div className="flex flex-row space-x-2 items-center mb-6">
          <img src="/LimeblockLogo.png" className="size-6" />
          <p className="font-aeonik text-sm text-gray-900 text-center">
            Limeblock Docs
          </p>
        </div>
        <h1 className="text-4xl font-aeonik font-medium mb-8">
          Have an existng Chatbot Widget?
        </h1>

        <div className="text-sm max-w-none">
          <p className="mb-4">
            Don't worry! It makes perfect sense to have another chatbot widget
            that is better suited for customer support or demos.
            <br />
            <br />
            Limeblock's Chat Widget includes position parameters (widgetPosition
            and chatPosition) so the widget and chat panel can have custom
            locations -{" "}
            <span className="underline">
              No need to worry about overlap conflicts
            </span>
            .
          </p>
        </div>
        <div className="flex flex-row w-full pt-6 pb-4">
          <Code
            code={exampleCode}
            language="jsx"
            showLineNumbers={true}
            copyButton={true}
            className="w-full"
          />
        </div>
        <div className="bg-yellow-50 border-l-4 text-sm border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Warning:</strong> Make sure the position parameters are done
            using proper Tailwind syntax
          </p>
        </div>
        <div className="flex flex-row space-x-4 items-center mt-6">
          <a
            href="/"
            className="text-sm w-fit rounded-lg px-4 py-3 font-inter text-white bg-gray-900 hover:bg-gray-800 transition duration-200"
          >
            Home Page
          </a>
          <a
            href="/dashboard"
            className="text-sm w-fit rounded-lg px-4 py-3 font-inter text-white bg-gray-900 hover:bg-gray-800 transition duration-200"
          >
            Dashboard
          </a>
        </div>

        <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
          Getting Help
        </h2>
        <p className="mb-4 text-sm">
          If you need assistance with your Limeblock implementation:
        </p>
        <ul className="list-disc pl-6 mb-6 text-sm">
          <li>
            Contact our founder directly at{" "}
            <a
              href="mailto:byjuaditya@gmail.com"
              className="text-blue-600 hover:underline"
            >
              byjuaditya@gmail.com
            </a>{" "}
            for personalized support
          </li>
          <li>
            Check our comprehensive{" "}
            <a href="/docs" className="text-blue-600 hover:underline">
              documentation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HaveBot;
