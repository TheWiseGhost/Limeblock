import React from "react";
import { Code } from "../global/Code";

const GettingStarted = () => {
  // Code snippets stored as variables to avoid syntax errors
  const createAccountCode = `// No code needed - just visit limeblock.io and sign up`;
  const createButtonCode = `// Give the widget the color and size you want in Limeblock - no code needed`;
  const navigationConfigCode = `// Example of page navigation configuration in the Limeblock app
{
  "pages": [
    {
      "title": "Home",
      "path": "/",
      "description": "Welcome page with introduction"
    },
    {
      "title": "Documentation",
      "path": "/docs",
      "description": "Help documentation and guides"
    },
    {
      "title": "Settings",
      "path": "/settings",
      "description": "Configure your Limeblock settings"
    }
  ]
}`;
  const backendEndpointCode = `// Example JSON schema provided Limeblock backend integration

// For the API Endpoint - Create Board
const url = {https://example_endpoint.com/api/create_board/}

// Schema with context params and fully filled in 
// This an example template for the AI to use
const schema = {
  "settings": {
    "borders": "#FFFFFF",
    "boardBackground": "#FFFFFF",
    "pageBackground": "#F1F1F1",
    "titleColor": "#000000",
    "subtitleColor": "#000000",
    "dateRange": "#333333",
    "tableHeaders": "#0b0b0b",
    "ranks": "#333333",
    "rankingField": "#333333",
    "nameField": "#333333",
    "title": "My Limeblock Dashboard",
    "subtitle": "Real-time data visualization",
    "rankingTitle": "Score",
    "nameTitle": "User",
    "titleFont": "'Roboto', sans-serif",
    "subtitleFont": "'Roboto', sans-serif",
    "boardRankTitleFont": "'Roboto', sans-serif",
    "boardRankFont": "'Roboto', sans-serif",
    "boardNameTitleFont": "'Roboto', sans-serif",
    "boardNameFont": "'Roboto', sans-serif"
  },
  "board_id": "{board_id}",
  "user_id": "{user_id}"
};`;
  const apiKeyUsageCode = `// Using your API key from settings
const LIMEBLOCK_API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY || "lime_YOUR_API_KEY";`;
  const finalImplementationCode = `// For Vue, check out the export docs
  
import React from 'react';
import { ChatWidget } from '@limeblock/react';

const MyApp = () => {
  // Your API key from Limeblock settings
  const API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY;
  
  // Context parameters configured in Limeblock dashboard
  const contextParams = {
    board_id: "YOUR_BOARD_ID_FROM_DASHBOARD",
    user_id: "current_user_id", // Dynamic user identification
    // Additional context parameters as needed
  };
  
  return (
    <div className="my-app-container">
      {/* Your application content */}
      <main>
        <h1>Welcome to My Application</h1>
        <p>This is where your content lives</p>
      </main>
      
      {/* Limeblock Chat Widget */}
      <ChatWidget
        apiKey={API_KEY}
        contextParams={contextParams}
        widgetPosition="bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]"
        chatPosition="bottom-[0px] right-[0px]"
        // All styling is configured in the Limeblock dashboard - only position is handled here
      />
    </div>
  );
};

export default MyApp;`;

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
            Getting Started with Limeblock
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              Welcome to Limeblock! This guide will walk you through the process
              of setting up your Limeblock chat widget from account creation to
              final implementation. Follow these steps to add an AI-powered chat
              experience to your application.
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 1: Create Your Limeblock Account
            </h2>
            <p className="mb-4">
              First, you'll need to create an account on the Limeblock platform:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>
                Visit{" "}
                <a
                  href="https://limeblock.io"
                  className="text-blue-600 hover:underline"
                >
                  limeblock.io
                </a>
              </li>
              <li>Click on "Sign Up" and follow the registration process</li>
              <li>Add your email address + team members</li>
              <li>Choose a plan or upgrade when ready</li>
            </ol>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-700">
                <strong>Tip:</strong> For team environments, consider setting up
                a shared organizational account that multiple team members can
                access. You can add multiple emails in your settings or when you
                create an account.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 2: Create a New Limeblock Widget
            </h2>
            <p className="mb-4">
              Once your account is set up, you'll need to create a widget. Add a
              button to your application's admin interface to quickly access the
              creation page:
            </p>

            <Code
              code={createButtonCode}
              language="info"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <p className="mb-4">When creating your widget, you'll need to:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Give your widget a name (e.g., "Help Assistant")</li>
              <li>
                Select the primary function (customer support, documentation,
                etc.)
              </li>
              <li>Choose an initial template or start from scratch</li>
              <li>Configure the knowledge base sources</li>
            </ol>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 3: Style Your Widget in the Frontend Page
            </h2>
            <p className="mb-4">
              Limeblock offers comprehensive styling options directly in the
              dashboard. You can customize:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Chat bubble colors and positioning</li>
              <li>Font styles and sizes</li>
              <li>Widget header and footer appearance</li>
              <li>Custom CSS overrides for advanced styling</li>
              <li>Mobile and desktop responsive behaviors</li>
            </ul>

            <p className="mb-4">
              All styling is managed through the Limeblock dashboard - no custom
              code needed! This approach ensures consistent updates and easier
              maintenance.
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 4: Set Up Page Navigations
            </h2>
            <p className="mb-4">
              Configure how your widget interacts with your application's pages:
            </p>

            <Code
              code={navigationConfigCode}
              language="in-app"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <p className="mb-4">In the Limeblock app:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to the "Frontend" tab</li>
              <li>Add each page in your application</li>
              <li>Configure when and how the widget suggests navigations</li>
              <li>Set up transition animations between pages</li>
              <li>Test the navigation flows before publishing</li>
            </ol>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 5: Set Up Backend API Endpoints
            </h2>
            <p className="mb-4">
              For full functionality, you'll need to set up backend endpoints:
            </p>

            <Code
              code={backendEndpointCode}
              language="in-app"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to the "Backend" tab</li>
              <li>Add API endpoints in your application</li>
              <li>Configure them</li>
              <li>Test the navigation flows before publishing</li>
              <li>Reference Backend Docs for more info</li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important Note:</strong> You'll need to give Limeblock
                access to your backend by following the instructions in the
                Backend Integration page of the dashboard. This includes setting
                up proper authentication and defining the allowed scope of
                operations.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 6: Get Your API Key
            </h2>
            <p className="mb-4">
              To connect your application with Limeblock, you'll need your API
              key:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Go to the Settings page in your Limeblock dashboard</li>
              <li>Navigate to the "API Keys" section</li>
              <li>Generate a new API key (or use an existing one)</li>
              <li>
                Copy the key and store it securely as an environment variable
              </li>
            </ol>

            <Code
              code={apiKeyUsageCode}
              language="javascript"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 7: Export and Implement Your Widget
            </h2>
            <p className="mb-4">
              Follow the Export documentation to implement the widget in your
              application:
            </p>

            <Code
              code={finalImplementationCode}
              language="jsx"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Important Note:</strong> If you are using NextJS please
                add "use client"; to the top of the page
              </p>
            </div>

            <p className="mb-4">
              For more detailed implementation instructions, please refer to our
              <a href="/docs/export" className="text-blue-600 hover:underline">
                {" "}
                Export Documentation
              </a>
              .
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Widget not appearing
                </h3>
                <p>
                  Check your API key and ensure the widget is fully built with
                  right colors in the dashboard. Delete the position params and
                  check if it works now - This means you are incorrectly setting
                  location or not using proper tailwind styling.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Backend connection issues
                </h3>
                <p>
                  Verify your webhook endpoints are configured correctly and
                  accessible to Limeblock's servers.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Navigation not working
                </h3>
                <p>
                  Ensure your page paths in the Limeblock dashboard exactly
                  match your application's routing structure.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Getting Help
            </h2>
            <p className="mb-4">
              If you need assistance with your Limeblock implementation:
            </p>
            <ul className="list-disc pl-6 mb-6">
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
      </div>
    </div>
  );
};

export default GettingStarted;
