"use client";

import React, { useState } from "react";

export default function Dashboard() {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = "sk-0192837465-abcdef"; // This will be fetched from backend later

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-aeonik">Limeblock - Dashboard</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-inter hover:bg-gray-900 transition-colors">
          Upgrade
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Widget Configuration Card - 2 columns */}
        <div className="col-span-2 border rounded-xl p-6">
          <h2 className="text-2xl font-aeonik mb-6">My Widget</h2>
          <div className="flex gap-4 w-full mb-6">
            <div className="w-1/2 h-44 flex">
              <div className="size-44 bg-lime rounded-xl flex justify-evenly pt-10 px-4">
                <div className="size-9 bg-white rounded-lg"></div>
                <div className="size-9 bg-white rounded-lg"></div>
              </div>
            </div>

            <div className="flex flex-col w-1/2 px-4 space-y-6">
              <div className="flex justify-between">
                <div className="size-12 border border-gray-300 bg-lime rounded-md"></div>
                <div className="size-12 border border-gray-300 rounded-md"></div>
                <div className="size-12 border border-gray-300 font-aeonik rounded-md flex items-center justify-center text-gray-800">
                  12
                </div>
              </div>
              <div className="space-y-5 flex flex-col">
                <button className="w-full border border-gray-400 rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors">
                  Style Widget
                </button>
                <button className="w-full border border-gray-400 rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors">
                  Export Widget
                </button>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <span className="text-base font-inter text-gray-700">
                API Key:
              </span>
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="flex-1 bg-gray-50 rounded px-2 py-1 text-sm font-mono"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showApiKey ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
              <button
                onClick={handleCopyApiKey}
                className="p-1 hover:bg-gray-100 rounded"
                title="Copy API Key"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Card - 3 columns */}
        <div className="col-span-3 border rounded-xl p-6">
          <h2 className="text-lg font-inter mb-6">Analytics</h2>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div>
              <div className="text-2xl font-aeonik">92%</div>
              <div className="text-sm text-gray-600">Message Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-aeonik">5,631</div>
              <div className="text-sm text-gray-600">Messages</div>
            </div>
            <div>
              <div className="text-2xl font-aeonik">1,436</div>
              <div className="text-sm text-gray-600">Unique Messengers</div>
            </div>
            <div>
              <div className="text-2xl font-aeonik">3,786</div>
              <div className="text-sm text-gray-600">Endpoint Hits</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1">
                Most Hit Backend Endpoint
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600 font-mono text-sm">
                  /api/update_display/
                </div>
                <div className="text-xl font-aeonik">1,462</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">
                Most Hit Frontend Endpoint
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600 font-mono text-sm">
                  /docs/how_to_dark_mode
                </div>
                <div className="text-xl font-aeonik">786</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Card - 3 columns */}
        <div className="col-span-3 border rounded-xl p-6">
          <h2 className="text-lg font-inter mb-4">Logs</h2>
          <div className="h-48"></div>
          <button className="w-full border rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors">
            View All Logs
          </button>
        </div>

        {/* Expected Cost Card - 2 columns */}
        <div className="col-span-2 border rounded-xl p-6">
          <h2 className="text-lg font-inter mb-4">Expected Cost</h2>
          <div className="h-48"></div>
        </div>
      </div>
    </div>
  );
}
