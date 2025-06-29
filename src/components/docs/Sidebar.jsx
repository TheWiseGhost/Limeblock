"use client";

import React, { useState } from "react";
import { IconBook, IconCube } from "@tabler/icons-react";

const Sidebar = ({ active, className = "" }) => {
  const [expandedSections, setExpandedSections] = useState({
    tutorials: true,
    features: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`min-w-[250px] text-sm bg-white font-inter text-black h-full border-r border-gray-200 p-4 ${className}`}
    >
      {/* Get Started */}
      <div className="ml-2 my-4">
        <div
          className="flex flex-row items-center mb-8 cursor-pointer"
          onClick={() => {
            window.location.href = "/dashboard/";
          }}
        >
          <img src="/LimeblockLogo.png" className="size-7" />
          <p className="font-aeonik font-medium text-base text-gray-900 text-center ml-2">
            Limeblock
          </p>
          <div className="bg-gray-50 border text-gray-700 border-gray-600 ml-3 font-inter px-3 text-xs py-0.5 rounded-full">
            Docs
          </div>
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("tutorials")}
          className="flex items-center justify-between w-full font-inter py-2 px-2 rounded hover:bg-gray-50"
        >
          <div className="flex items-center">
            <IconBook className="size-4 mr-2" />
            <span className="">Tutorials</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              expandedSections.tutorials ? "rotate-0" : "-rotate-90"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {expandedSections.tutorials && (
          <div className="ml-6 space-y-1 mt-1 text-[0.8rem]">
            <a
              href="/docs/"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "welcome"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center w-full">
                <span>Welcome</span>
                <span className="ml-2 text-green-500"></span>
              </div>
            </a>
            <a
              href="/docs/getting_started"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "getting_started"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Getting Started
            </a>
            <a
              href="/docs/managing_tokens"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "managing_tokens"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Managing Tokens
            </a>
            <a
              href="/docs/report"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "report"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Report Bug
            </a>
            <a
              href="/docs/export"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "export"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Export
            </a>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("features")}
          className="flex items-center justify-between w-full py-2 px-2 font-inter rounded hover:bg-gray-50"
        >
          <div className="flex items-center">
            <IconCube className="size-4 mr-2" />
            <span>Features</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              expandedSections.features ? "rotate-0" : "-rotate-90"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {expandedSections.features && (
          <div className="ml-6 space-y-1 mt-1 text-[0.8rem]">
            <a
              href="/docs/backend"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "backend"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Endpoint Tree
            </a>
            <a
              href="/docs/request"
              className={`flex items-center py-1.5 px-2 rounded ${
                active == "request"
                  ? "text-black bg-gray-100"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Request Feature
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
