"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ConversionFunnel() {
  const [activeTab, setActiveTab] = useState("with"); // 'with' or 'without'

  const toggleSwitch = () => {
    setActiveTab(activeTab === "with" ? "without" : "with");
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white p-6 rounded-lg font-inter pb-20 md:pb-24">
      {/* Toggle Switch */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-3">
          <span
            className={`font-inter text-[0.95rem] ${
              activeTab === "without"
                ? "font-medium text-gray-800"
                : "text-gray-500"
            }`}
          >
            Without Limeblock
          </span>

          {/* The actual switch in the middle */}
          <button
            onClick={toggleSwitch}
            className="relative inline-flex h-6 w-12 items-center rounded-lg transition-colors focus:outline-none"
            style={{
              backgroundColor: activeTab === "with" ? "#90F08C" : "#6b7280",
            }}
          >
            <span
              className={`inline-block size-4 transform rounded-[0.325rem] bg-white transition-transform ${
                activeTab === "with" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`font-inter text-[0.95rem] ${
              activeTab === "with"
                ? "font-medium text-gray-800"
                : "text-gray-500"
            }`}
          >
            With Limeblock
          </span>
        </div>
      </div>

      {/* Horizontal Funnel Visual */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {/* Visitors */}
          <div className="flex flex-col items-center text-center w-1/4">
            <div className="bg-white w-full px-2 py-4 rounded-lg border border-gray-400 mb-2">
              <div className="text-2xl font-medium text-gray-800 font-aeonik">
                10,000
              </div>
              <div className="text-sm text-gray-500 mt-1">Visitors</div>
            </div>
            <div className="text-xs text-gray-400">Standard Sample</div>
          </div>

          <ArrowRight className="text-gray-500 mx-2 mb-2" size={20} />

          {/* Sign Ups */}
          <div className="flex flex-col items-center text-center w-1/4">
            <div className="bg-white w-full px-2 py-4 rounded-lg border border-gray-400 mb-2">
              <div className="text-2xl font-medium text-gray-800 font-aeonik">
                1,000
              </div>
              <div className="text-sm text-gray-500 mt-1">Sign Ups</div>
            </div>
            <div className="text-xs text-gray-400">10% conversion</div>
          </div>

          <ArrowRight className="text-gray-500 mx-2 mb-2" size={20} />

          {/* Active Users */}
          <div className="flex flex-col items-center text-center w-1/4">
            <div
              className={`bg-white w-full px-2 py-4 rounded-lg mb-2 ${
                activeTab === "with"
                  ? "border-2 border-lime"
                  : "border border-gray-400"
              }`}
            >
              <div className="text-2xl font-medium text-gray-800 font-aeonik">
                {activeTab === "with" ? "500" : "50"}
              </div>
              <div className="text-sm text-gray-500 mt-1">Active Users</div>
            </div>
            <div className="text-xs text-gray-400">
              {activeTab === "with" ? "50% activation" : "5% activation"}
            </div>
          </div>

          <ArrowRight className="text-gray-500 mx-2 mb-2" size={20} />

          {/* Paying Users */}
          <div className="flex flex-col items-center text-center w-1/4">
            <div
              className={`bg-white w-full px-2 py-4 rounded-lg mb-2 ${
                activeTab === "with"
                  ? "border-2 border-lime"
                  : "border border-gray-400"
              }`}
            >
              <div className="text-2xl font-medium text-gray-800 font-aeonik">
                {activeTab === "with" ? "20" : "1"}
              </div>
              <div className="text-sm text-gray-500 mt-1">Paying Customers</div>
            </div>
            <div className="text-xs text-gray-400">
              {activeTab === "with" ? "0.4% conversion" : "0.2% conversion"}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div
        className={`mt-10 px-6 py-4 rounded-lg bg-white border border-gray-400`}
      >
        <h3 className="text-xl font-medium text-gray-800 mb-1 font-aeonik">
          {activeTab === "with"
            ? "20x Better Results with Limeblock"
            : "Standard Conversion Results"}
        </h3>
        <p className="text-sm text-gray-600">
          {activeTab === "with"
            ? "Limeblock significantly improves user activation by making your app's UX way better, resulting in 20x more paying customers from the same number of visitors."
            : "Without user onboarding optimization, many users drop off between sign-up and activation, resulting in very few paying customers."}
        </p>
      </div>
    </div>
  );
}
