"use client";

import React, { useState } from "react";
import { Code } from "../global/Code";
import { motion } from "framer-motion";

const CodeExport = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const exampleCode = `const handleAIAction = async (userPrompt) => {
  const payload = {
    prompt: userPrompt, // You control how to get prompts
    endpoint_id: "endpoint_1745333462205",
    folder_id: "folder_1741747825504",
    api_key: API_KEY,
    formatting_needed: true,   // Request formatted string response
    context: { 
      user_id: "current_user_id",
    },
  };


  try {
    const response = await fetch("https://limeblockbackend.onrender.com/api/ai_action/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.error("Request failed:", error);
  }
};`;

  const executeExample = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResponse({
      success: true,
      message: "AI action processed successfully!",
      formatted_response: "This is a simulated response.",
    });

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-5 md:px-8 pt-32 pb-8 font-inter">
      <h1 className="font-aeonik text-gray-950 font-medium text-4xl md:text-6xl pb-4 md:pb-12">
        Headless Implementation
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Title and Controls */}
        <div className="lg:w-2/5">
          <div className="mb-4 md:mb-6">
            <p className="mb-0 md:mb-16 mt-2 text-sm md:text-base text-gray-600">
              Integrate AI capabilities with a single function call to our API.
              You control everything about implementation for each endpoint to
              match your app, UX, and UI.
            </p>
          </div>

          <div className="hidden md:block p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex flex-row items-center space-x-4">
              <h2 className="font-inter font-medium">Test the Function:</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={executeExample}
                disabled={loading}
                className={`px-5 py-2 rounded-lg font-medium text-sm ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-950"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Run Simulation"
                )}
              </motion.button>
            </div>

            {response && (
              <div className="mt-8">
                <h3 className="mb-2">Response:</h3>
                <Code
                  code={JSON.stringify(response, null, 2)}
                  language="json"
                  className="rounded-xl max-h-64 overflow-auto text-xs"
                  codeSize="text-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Code */}
        <div className="lg:w-3/5">
          <div className="h-full flex flex-col">
            <div className="flex-grow rounded-xl overflow-hidden">
              <Code
                code={exampleCode}
                language="javascript"
                showLineNumbers={true}
                copyButton={true}
                highlightedLines={[9]} // Highlight the fetch URL line
                className="h-full"
                codeSize="text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExport;
