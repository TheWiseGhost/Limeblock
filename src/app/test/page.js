"use client";

import React, { useState } from "react";

const AIActionPage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  // Configuration - you can modify these values as needed
  const config = {
    endpoint_id: "endpoint_1745333462205",
    folder_id: "folder_1741747825504",
    api_key: process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY,
    formatting_needed: false,
    context: { user_id: "67c2322d207e9b2e1c17fd27" },
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const requestData = {
        prompt: prompt,
        endpoint_id: config.endpoint_id,
        folder_id: config.folder_id,
        api_key: config.api_key,
        formatting_needed: config.formatting_needed,
        context: config.context,
      };

      const res = await fetch("http://127.0.0.1:8000/api/ai_action/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
      } else {
        setError(data.error || data.message || "An error occurred");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          AI Action Test Interface
        </h1>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your prompt:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your AI prompt here... (Ctrl+Enter to submit)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                "Send to AI Action"
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Response
            </h2>

            <div className="space-y-4">
              {/* Status and Endpoint Info */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-800">Status:</span>
                    <span className="ml-2 text-green-700">
                      {response.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-green-800">
                      Endpoint Used:
                    </span>
                    <span className="ml-2 text-green-700">
                      {response.endpoint_used}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Type:</span>
                    <span className="ml-2 text-green-700">
                      {response.endpoint_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Raw Response */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Raw Response
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(response.response, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Formatted Response (if available) */}
              {response.formatted_response && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Formatted Response
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {response.formatted_response}
                    </p>
                  </div>
                </div>
              )}

              {/* Request Data */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Request Data
                </h3>
                <div className="bg-yellow-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(response.request_data, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Current Configuration
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Endpoint ID: {config.endpoint_id}</div>
            <div>Folder ID: {config.folder_id}</div>
            <div>
              API Key:{" "}
              {config.api_key ? "***" + config.api_key.slice(-4) : "Not set"}
            </div>
            <div>
              Formatting: {config.formatting_needed ? "Enabled" : "Disabled"}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Update the config object in the code to change these values.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIActionPage;
