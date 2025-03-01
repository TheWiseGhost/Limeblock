"use client";

import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [user, setUser] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "sk-0192837465-abcdef"; // This will be fetched from backend later

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          window.location.href = "/sign_in/";
          return;
        }

        // Fetch user details
        const userResponse = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const userData = await userResponse.json();

        if (userData.success) {
          setUser(userData.user);

          // Fetch frontend details using the same user_id
          const frontendResponse = await fetch(
            "http://127.0.0.1:8000/api/frontend_details/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          const frontendData = await frontendResponse.json();

          if (frontendData.success) {
            setFrontend(frontendData.frontend);
          } else {
            setError("Failed to load frontend settings");
          }
        } else {
          setError("Failed to load user information");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  if (loading) {
    return (
      <div className="bg-white w-full flex items-center justify-center h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 mx-auto text-gray-600"
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
          <p className="mt-3 font-inter">Loading your stuff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-y-auto pb-12 pt-8 pr-12 pl-10 border-l border-gray-300 rounded-tl-[12px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-aeonik font-medium">
          {user?.business_name} - Dashboard
        </h1>
        <button className="bg-white hover:bg-gray-50 border border-gray-600 font-aeonik px-6 py-2 rounded-lg text-base transition-colors">
          Upgrade
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Widget Configuration Card - 2 columns */}
        <div className="col-span-2 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-8">My Widget</h2>
          <div className="flex gap-4 w-full mb-6">
            <div className="w-1/2 h-44 flex">
              <div
                style={{ backgroundColor: frontend?.body }}
                className="size-44 rounded-xl flex justify-evenly pt-10 px-4"
              >
                <div
                  style={{ backgroundColor: frontend?.eyes }}
                  className="size-9 rounded-lg"
                ></div>
                <div
                  style={{ backgroundColor: frontend?.eyes }}
                  className="size-9 rounded-lg"
                ></div>
              </div>
            </div>

            <div className="flex flex-col w-1/2 px-4 space-y-6">
              <div className="flex justify-between">
                <div
                  style={{ backgroundColor: frontend?.body }}
                  className="size-12 border border-gray-300 rounded-md"
                ></div>
                <div
                  style={{ backgroundColor: frontend?.eyes }}
                  className="size-12 border border-gray-300 rounded-md"
                ></div>
                <div className="size-12 border border-gray-300 font-aeonik rounded-md flex items-center justify-center text-gray-800">
                  {frontend?.size}
                </div>
              </div>
              <div className="space-y-5 flex flex-col">
                <button
                  onClick={() => {
                    window.location.href = "/frontend/";
                  }}
                  className="w-full border border-gray-400 rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors"
                >
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
              <span className="text-base font-inter text-gray-800">
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
        <div className="col-span-3 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-6">Analytics</h2>
        </div>

        {/* Logs Card - 3 columns */}
        <div className="col-span-3 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-4">Logs</h2>
          <div className="h-48"></div>
          <button className="px-6 border border-gray-400 rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors">
            View All Logs
          </button>
        </div>

        {/* Expected Cost Card - 2 columns */}
        <div className="col-span-2 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-4">Expected Cost</h2>
          <div className="h-48"></div>
        </div>
      </div>
    </div>
  );
}
