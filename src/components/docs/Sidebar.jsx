"use client";

import React, { useState } from "react";
import Link from "next/link";

const Sidebar = ({ className = "" }) => {
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
      className={`w-72 pr-6 bg-white font-inter text-black h-full border-r border-gray-200 p-4 ${className}`}
    >
      {/* Get Started */}
      <div className="ml-2 my-4">
        <div className="flex flex-row space-x-2 items-center mb-6">
          <img src="/LimeblockLogo.png" className="size-6" />
          <p className="font-aeonik text-base text-gray-900 text-center">
            Limeblock
          </p>
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("tutorials")}
          className="flex items-center justify-between w-full font-dm py-2 px-2 rounded hover:bg-gray-50"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>Tutorials</span>
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
          <div className="ml-6 space-y-1 mt-1 text-sm">
            <Link
              href="/tutorials/ship-in-5-minutes"
              className="flex items-center py-1.5 px-2 rounded hover:bg-gray-50"
            >
              <div className="flex items-center w-full">
                <span>Ship in 5 minutes</span>
                <span className="ml-2 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              href="/tutorials/static-page"
              className="block py-1.5 px-2 rounded hover:bg-gray-50"
            >
              Static page
            </Link>
            <Link
              href="/tutorials/user-authentication"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              User authentication
            </Link>
            <Link
              href="/tutorials/api-call"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              API call
            </Link>
            <Link
              href="/tutorials/private-page"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              Private page
            </Link>
            <Link
              href="/tutorials/stripe-subscriptions"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              Stripe Subscriptions
            </Link>
            <Link
              href="/tutorials/privacy-policy-gpt"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              Privacy policy with GPT
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("features")}
          className="flex items-center justify-between w-full py-2 px-2 font-dm rounded hover:bg-gray-50"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
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
          <div className="ml-6 space-y-1 mt-1 text-sm">
            <Link
              href="/features/seo"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              SEO
            </Link>
            <Link
              href="/features/database"
              className="block py-1.5 px-2 rounded hover:bg-gray-50 text-gray-500"
            >
              Database
            </Link>
            <Link
              href="/features/export"
              className="block py-1.5 px-2 rounded hover:bg-gray-50"
            >
              Export
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
