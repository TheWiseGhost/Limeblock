import React from "react";
import { Code } from "../global/Code";

const GettingStarted = () => {
  // Code snippets stored as variables to avoid syntax errors
  const createAccountCode = `// No code needed - just visit limeblock.io and sign up`;
  const backendEndpointCode = `// Example JSON schema for Limeblock backend integration

// For the API Endpoint - Create Board
const url = "https://example_endpoint.com/api/create_board/"

// Schema with context params and fully filled in 
// This is an example template for the AI to use
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
  const endpointImplementationCode = `// Example implementation - style however you want!
// Just hit our endpoint using this format

const handleAIAction = async (userPrompt) => {
  const requestData = {
    prompt: userPrompt,
    endpoint_id: "endpoint_1745333462205", // From your endpoint tree
    folder_id: "folder_1741747825504",     // From your endpoint tree
    api_key: "lime_YOUR_API_KEY",          // From settings
    formatting_needed: true,               // Optional: get formatted response
    context: { 
      user_id: "current_user_id",          // Your user identification
      // Add any additional context your endpoints need
    },
  };

  try {
    const response = await fetch("https://limeblockbackend.onrender.com/api/ai_action/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Handle successful response
      console.log("AI Response:", data.response);
      console.log("Formatted Response:", data.formatted_response);
      return data;
    } else {
      console.error("Error:", data.error || data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

// Use it in your React component however you want
const MyCustomAIInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  
  const submitToAI = async () => {
    const result = await handleAIAction(prompt);
    setResponse(result);
  };
  
  return (
    <div className="your-custom-styling">
      {/* Style this however you want! */}
      <input 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI anything..."
      />
      <button onClick={submitToAI}>
        Get AI Response
      </button>
      {response && (
        <div>
          <p>{response.formatted_response || response.response}</p>
        </div>
      )}
    </div>
  );
};`;

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
              of setting up your Limeblock AI integration from account creation
              to final implementation. Follow these steps to add AI-powered
              functionality to your application using our flexible API endpoint.
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
              <li>Buy more tokens when needed</li>
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
              Step 2: Set Up Backend API Endpoints
            </h2>
            <p className="mb-4">
              Configure your backend endpoints in the Limeblock dashboard:
            </p>

            <Code
              code={backendEndpointCode}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to the "Backend" tab in your dashboard</li>
              <li>Add API endpoints for your application</li>
              <li>Configure the endpoint schemas and parameters</li>
              <li>Test the endpoints before publishing</li>
              <li>Reference Backend Docs for more detailed information</li>
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
              Step 3: Get Your API Key
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
              Step 4: Get Your Endpoint and Folder IDs
            </h2>
            <p className="mb-4">
              From your Limeblock dashboard, you'll need to get the specific IDs
              for your endpoints (Click the gray id icon):
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to the "Endpoint Tree" section in your dashboard</li>
              <li>Find the endpoint you want to use for AI actions</li>
              <li>
                Copy the <strong>endpoint_id</strong> (e.g.,
                "endpoint_1745333462205")
              </li>
              <li>
                Copy the <strong>folder_id</strong> that contains your endpoint
                (e.g., "folder_1741747825504")
              </li>
              <li>
                Keep these IDs handy - you'll need them in your implementation
              </li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Pro Tip:</strong> You can organize multiple endpoints
                under different folders and use different endpoint/folder
                combinations for different features in your application.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 5: Implement in Your Application
            </h2>
            <p className="mb-4">
              Now you can integrate Limeblock into your application however you
              want! Style your interface any way you like - just hit our
              endpoint using this format:
            </p>

            <Code
              code={endpointImplementationCode}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-700">
                <strong>Complete Freedom:</strong> Unlike traditional AI chat
                plugins, you have complete control over the UI/UX. Create
                buttons, forms, modals, or any interface that fits your
                application's design. Just send the prompt to our endpoint and
                handle the response however works best for your users.
              </p>
            </div>
            <a
              href="/docs/export/"
              className="text-sm mt-4 w-fit rounded-lg px-4 py-3 font-inter text-white bg-gray-900 hover:bg-gray-800 transition duration-200"
            >
              More detail in Export Docs
            </a>

            <h2 className="text-3xl font-aeonik font-medium mt-16 mb-4">
              Implementation Examples
            </h2>
            <p className="mb-4">
              Here are some ways you can integrate Limeblock:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Smart Help Button:</strong> Add a "Get AI Help" button
                that sends the current page context
              </li>
              <li>
                <strong>Form Assistant:</strong> Help users fill out complex
                forms with AI suggestions
              </li>
              <li>
                <strong>Search Enhancement:</strong> Process search queries
                through AI for better results
              </li>
              <li>
                <strong>Custom Dashboard:</strong> Create AI-powered insights
                for your data
              </li>
              <li>
                <strong>Content Generation:</strong> Let users generate content
                with AI assistance
              </li>
            </ul>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  API Connection Issues
                </h3>
                <p>
                  Check your API key, endpoint_id, and folder_id. Ensure they
                  match exactly what's shown in your Limeblock dashboard.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Backend Endpoint Not Found
                </h3>
                <p>
                  Verify your backend endpoints are configured correctly in the
                  dashboard and accessible to Limeblock's servers.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Context Not Working
                </h3>
                <p>
                  Make sure your context parameters match what your backend
                  endpoints expect. Check the endpoint configuration in your
                  dashboard.
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
