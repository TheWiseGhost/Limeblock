"use client";

import {
  IconBug,
  IconBulb,
  IconCrown,
  IconFileText,
  IconChevronRight,
  IconChevronDown,
  IconId,
  IconEye,
  IconEyeOff,
  IconCopy,
} from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [user, setUser] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [backend, setBackend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokenStats, setTokenStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          window.location.href = "/sign_in/";
          return;
        }

        const userResponse = await fetch(
          "https://limeblockbackend.onrender.com/api/user_details/",
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

          const frontendResponse = await fetch(
            "https://limeblockbackend.onrender.com/api/frontend_details/",
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

          const backendResponse = await fetch(
            "https://limeblockbackend.onrender.com/api/backend_details/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          const backendData = await backendResponse.json();
          if (backendData.success) {
            setBackend(backendData.backend);
          } else {
            console.error("Failed to load backend settings");
          }

          const tokenResponse = await fetch(
            "https://limeblockbackend.onrender.com/api/get_token_stats/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId, months: 6 }),
            }
          );

          const tokenData = await tokenResponse.json();
          if (!tokenData.error) {
            setTokenStats(tokenData.usage_stats || {});
          } else {
            console.error("Token stats error:", tokenData.error);
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
    navigator.clipboard.writeText(user?.api_key);
    alert("API Key copied to clipboard!");
  };

  const formatMonthKey = (monthKey) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString("default", { month: "short" });
  };

  const formatTokens = (tokens) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const maxTokenValue =
    Object.values(tokenStats).length > 0
      ? Math.max(...Object.values(tokenStats))
      : 0;

  const totalTokens = Object.values(tokenStats).reduce(
    (sum, count) => sum + count,
    0
  );

  const calculateTokenIncrease = () => {
    if (Object.keys(tokenStats).length < 2) return 0;

    const sortedMonths = Object.keys(tokenStats).sort();
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];

    const currentTokens = tokenStats[currentMonth] || 0;
    const previousTokens = tokenStats[previousMonth] || 0;

    return currentTokens - previousTokens;
  };

  const tokenIncrease = calculateTokenIncrease();
  const tokenIncreasePercentage = (() => {
    if (Object.keys(tokenStats).length < 2) return 100;

    const sortedMonths = Object.keys(tokenStats).sort();
    const previousMonth = sortedMonths[sortedMonths.length - 2];
    const previousTokens = tokenStats[previousMonth];

    if (!previousTokens) return 100;
    return Math.round((tokenIncrease / previousTokens) * 100);
  })();

  if (loading) {
    return (
      <div className="bg-white w-full flex items-center justify-center h-screen font-inter">
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-aeonik font-medium">
          {user?.business_name} - Dashboard
        </h1>
        <div className="flex flex-row w-fit items-center space-x-5">
          <button
            onClick={() => {
              window.location.href = "/docs/request/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconBulb className="size-5 mr-1.5 text-green-400 -mt-0.5" />
            Request Feature
          </button>
          <button
            onClick={() => {
              window.location.href = "/docs/report/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconBug className="size-5 mr-1.5 text-red-400 -mt-0.5" />
            Report Bug
          </button>
          <button
            onClick={() => {
              window.location.href = "/docs/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconFileText className="size-5 mr-1.5 text-gray-400 -mt-0.5" />
            Docs
          </button>
          <button
            onClick={() => {
              window.location.href = "/checkout/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconCrown className="size-5 mr-1.5 text-yellow-500 -mt-0.5" />
            Upgrade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 border border-gray-300 rounded-md p-6">
          <div className="flex justify-start items-center mb-4">
            <h2 className="text-2xl font-aeonik">API Endpoints</h2>
          </div>

          <div className="max-h-[300px] overflow-y-auto font-inter">
            {backend && backend.folders && backend.folders.length > 0 ? (
              backend.folders.slice(0, 3).map((folder) => (
                <div key={folder.id} className="mb-3">
                  <div className="flex items-center p-2 bg-gray-50 rounded-md">
                    <span className="text-gray-900 text-sm">{folder.name}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      {" "}
                      ({folder.endpoints.length} endpoints){" "}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8 text-sm">
                {backend
                  ? "No API endpoints configured yet"
                  : "Loading API endpoints..."}
              </div>
            )}
          </div>
          <div className="mt-12">
            <div className="flex items-center gap-2">
              <span className="text-sm font-inter text-gray-800">API Key:</span>
              <input
                type={showApiKey ? "text" : "password"}
                value={user?.api_key}
                readOnly
                className="flex-1 bg-gray-50 rounded px-2 py-1 text-xs font-mono"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {showApiKey ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
              <button
                onClick={handleCopyApiKey}
                className="p-1 hover:bg-gray-100 rounded"
                title="Copy API Key"
              >
                <IconCopy size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-3 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-6">Token Analytics</h2>
          <div className="grid grid-cols-3 gap-4 mt-6 font-inter">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700 font-inter">
                Current Month Usage
              </h4>
              <p className="text-2xl font-aeonik mt-1">
                {Object.entries(tokenStats).length > 0
                  ? formatTokens(
                      tokenStats[Object.keys(tokenStats).sort().reverse()[0]] ||
                        0
                    )
                  : "0"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700 font-inter">Total Usage</h4>
              <p className="text-2xl font-aeonik mt-1">
                {formatTokens(totalTokens)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700 font-inter">
                Monthly Growth
              </h4>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-aeonik">
                  {tokenIncrease > 0 ? "+" : ""}
                  {formatTokens(tokenIncrease)}
                </p>
                <span
                  className={`ml-2 text-sm font-inter ${
                    tokenIncrease >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({tokenIncrease >= 0 ? "+" : ""}
                  {tokenIncreasePercentage}%)
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm font-inter text-gray-700">
              <div>
                <p>
                  Average Usage:{" "}
                  <span className="font-medium text-black">
                    {Object.values(tokenStats).length > 0
                      ? formatTokens(
                          Math.round(
                            Object.values(tokenStats)
                              .filter((num) => num !== 0)
                              .reduce((a, b) => a + b, 0) /
                              Object.values(tokenStats).filter(
                                (num) => num !== 0
                              ).length
                          )
                        )
                      : "0"}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Peak Month:{" "}
                  <span className="font-medium text-black">
                    {Object.entries(tokenStats).length > 0
                      ? formatMonthKey(
                          Object.entries(tokenStats).reduce(
                            (max, [month, count]) =>
                              count > tokenStats[max] ? month : max,
                            Object.keys(tokenStats)[0]
                          )
                        )
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.href = "/analytics/";
            }}
            className="px-6 mt-12 border border-gray-400 rounded-lg py-2 text-sm font-inter hover:bg-gray-50 transition-colors"
          >
            View All Analytics
          </button>
        </div>

        <div className="col-span-3 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-4">Logs</h2>
          <div className="flex flex-col items-center pt-8 space-y-4 h-full justify-top">
            <img src="/LimeblockLogo.png" className="size-12 grayscale" />
            <p className="font-inter text-sm text-gray-900 text-center">
              Logs are available on the Enterprise Plan
            </p>
          </div>
        </div>

        <div className="col-span-2 border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-aeonik mb-4">Current Tokens</h2>
          <div className="h-48 font-inter">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {user?.tokens?.toLocaleString()} Tokens
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {user?.tokens >= 1000000
                      ? "Safe Amount of Tokens"
                      : user?.tokens >= 100000
                      ? "Warning : Low Tokens"
                      : user?.tokens >= 10000
                      ? "Critical : Very Low Tokens"
                      : "Danger : Extremely Low Tokens"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm mt-6">
                    Billed{" "}
                    {user?.last_paid
                      ? new Date(user.last_paid).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-4 rounded-md flex flex-row items-center justify-between">
              <h4 className="font-medium text-black">Need more tokens?</h4>
              <button
                onClick={() => {
                  window.location.href = "/checkout/";
                }}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm transition duration-200"
              >
                Get Tokens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
