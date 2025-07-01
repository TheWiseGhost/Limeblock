"use client";

import React, { useState } from "react";
import { Code } from "../global/Code";

const HowToExport = () => {
  // Code snippets
  const apiKeyCode = `const API_KEY = process.env.NEXT_PUBLIC_LIMEBLOCK_API_KEY || "lime_YOUR_API_KEY";`;

  const payloadStructureCode = `const payload = {
  prompt: "User's question or command",      // User input
  endpoint_id: "endpoint_1745333462205",     // From your endpoint tree
  folder_id: "folder_1741747825504",         // Parent folder ID
  api_key: API_KEY,                          // Your Limeblock API key
  formatting_needed: true,                   // Request formatted response
  context: {                                 // Additional parameters
    user_id: "user_12345",
    board_id: "board_67890",
    // Add custom context here
  }
};`;

  const requestCode = `const handleAIAction = async (userPrompt) => {
  const payload = {
    prompt: userPrompt,
    endpoint_id: "endpoint_1745333462205",
    folder_id: "folder_1741747825504",
    api_key: API_KEY,
    formatting_needed: true,   // Request formatted string response
    context: { 
      user_id: "current_user_id",
      board_id: "your_board_id"
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

  const responseHandlingCode = `// Successful response structure
{
  "response": "Raw AI response text",
  "formatted_response": "Formatted string response (Markdown or plain text)",
  "context": {
    "user_id": "current_user_id",
    "board_id": "your_board_id"
  },
  "endpoint_id": "endpoint_1745333462205"
}`;

  const reactImplementationCode = `import React, { useState } from 'react';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  
  const handleSubmit = async () => {
    const result = await handleAIAction(prompt);
    setResponse(result);
  };

  return (
    <div className="assistant-container">
      <input 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSubmit}>Submit</button>
      
      {response && (
        <div className="ai-response">
          {/* formatted_response is a string - render as text */}
          <pre className="whitespace-pre-wrap">
            {response.formatted_response || response.response}
          </pre>
        </div>
      )}
    </div>
  );
};`;

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
            Exporting Limeblock AI
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              This guide explains how to integrate Limeblock AI responses into
              custom interfaces. You'll learn to make direct API requests and
              display formatted responses anywhere in your application.
            </p>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
              <div className="text-gray-700">
                <strong>Summary:</strong> <br />
                Limeblock uses headless implementation for AI endpoints. This
                means you control the entire UI and UX of your AI interface,
                including how user prompts are collected. <br /> <br />
                All you do is send a request to our API endpoint -
                <pre>https://limeblockbackend.onrender.com/api/ai_action/</pre>
                <br /> with the necessary parameters, and we handle the AI
                processing. You can use any frontend framework or even plain
                JavaScript to implement this.
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Core Integration Workflow
            </h2>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Obtain your API keys and endpoint identifiers</li>
              <li>Construct the API request payload</li>
              <li>
                Send request to <code>ai_action</code> endpoint
              </li>
              <li>Handle and display the response</li>
            </ol>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 1: API Configuration
            </h2>
            <p className="mb-4">
              First, get your credentials from the Limeblock dashboard:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>API Key</strong>: Found in Settings → API Keys
              </li>
              <li>
                <strong>Endpoint ID</strong>: From your endpoint tree (click ID
                icon)
              </li>
              <li>
                <strong>Folder ID</strong>: Parent folder of your endpoint
              </li>
            </ul>

            <Code
              code={apiKeyCode}
              language="javascript"
              showLineNumbers={false}
              copyButton={true}
              className="mb-4"
            />

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Security Note:</strong> Always store API keys in
                environment variables. Never hardcode in client-side
                applications.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 2: Constructing the Payload
            </h2>
            <p className="mb-4">
              The payload defines what you send to the AI endpoint. Here's the
              complete structure:
            </p>

            <Code
              code={payloadStructureCode}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-3">
              Payload Properties Explained
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      prompt
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">Yes</td>
                    <td className="px-4 py-4 text-sm">
                      User's input text that triggers the AI action
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      endpoint_id
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">Yes</td>
                    <td className="px-4 py-4 text-sm">
                      Specific endpoint ID from your dashboard
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      folder_id
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">Yes</td>
                    <td className="px-4 py-4 text-sm">
                      Parent folder containing the endpoint
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      api_key
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">Yes</td>
                    <td className="px-4 py-4 text-sm">
                      Your authentication key
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      formatting_needed
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">No</td>
                    <td className="px-4 py-4 text-sm">
                      <strong>Set to true</strong> when displaying responses.
                      Returns formatted string in{" "}
                      <code>formatted_response</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono">
                      context
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">No</td>
                    <td className="px-4 py-4 text-sm">
                      Additional parameters your endpoints require. Must match
                      your backend's expected structure exactly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 3: Sending the Request
            </h2>
            <p className="mb-4">
              Use this function to communicate with the AI endpoint:
            </p>

            <Code
              code={requestCode}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Step 4: Handling the Response
            </h2>
            <p className="mb-4">
              The API returns JSON with these key properties:
            </p>

            <Code
              code={responseHandlingCode}
              language="javascript"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h3 className="text-xl font-aeonik font-medium mt-6 mb-3">
              Key Response Properties
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>response</strong>: Raw AI-generated text (always
                present)
              </li>
              <li>
                <strong>formatted_response</strong>:
                <span className="bg-cyan-50 text-cyan-700 px-1 mx-1 rounded">
                  Only when formatting_needed: true
                </span>
                Formatted string response
              </li>
              <li>
                <strong>context</strong>: Echoes back the context you sent
              </li>
              <li>
                <strong>endpoint_id</strong>: Confirms which endpoint processed
                the request
              </li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-700">
                <strong>Display Tip:</strong> The{" "}
                <code>formatted_response</code> is a string, not HTML. Use{" "}
                <code>&lt;pre&gt;</code> with <code>whitespace-pre-wrap</code>{" "}
                for proper formatting, or convert Markdown to HTML using
                libraries like <code>react-markdown</code>.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-700">
                <strong>Another Tip:</strong> The{" "}
                <code>formatted_response</code> is not needed at all if you
                don't do anything with AI response and use just to commit an AI
                action. Fomratted responses are useful for GET requests when AI
                used as a search or summarizer tool.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Note:</strong> The <code>formatted_response</code> costs
                tokens. Getting back a large response from AI will cost you.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Complete React Implementation
            </h2>
            <Code
              code={reactImplementationCode}
              language="jsx"
              showLineNumbers={true}
              copyButton={true}
              className="mb-4"
            />

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Context Parameters Deep Dive
            </h2>
            <p className="mb-4">
              The <code>context</code> object is critical for personalizing
              responses. Follow these rules:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Use <strong>exact same property names</strong> as defined in
                your endpoint schema
              </li>
              <li>Maintain consistent data types (string, number, boolean)</li>
              <li>Include all required parameters your backend expects</li>
              <li>
                Nested objects must match your endpoint's expected structure
              </li>
            </ul>

            <div className="border-l-4 border-purple-400 bg-purple-50 p-4 mb-6">
              <p className="text-purple-700">
                <strong>Example Context:</strong> If your endpoint requires{" "}
                <code>{`{ user: { id: string }, product: { sku: string } }`}</code>
                , ensure your payload matches this exact structure.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Security Best Practices
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Always serve requests from your backend in production</li>
              <li>Validate and sanitize all user inputs before sending</li>
              <li>Use short-lived tokens for sensitive operations</li>
              <li>Implement rate limiting on your endpoints</li>
            </ul>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Missing formatted_response
                </h3>
                <p>
                  Ensure you set <code>formatting_needed: true</code> in payload
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Unexpected string formatting
                </h3>
                <p>
                  Response strings may contain Markdown. Use a Markdown parser
                  if needed
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Endpoint errors
                </h3>
                <p>
                  Verify endpoint_id and folder_id match your dashboard exactly
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Context mismatches
                </h3>
                <p>
                  Check property names and structure match endpoint requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToExport;
