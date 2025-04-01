"use client";

import React, { useState } from "react";
import {
  IconBrandReact,
  IconBrandHtml5,
  IconBrandVue,
  IconBrandAngular,
  IconBrandSvelte,
  IconBrandWordpress,
  IconCheck,
} from "@tabler/icons-react";

const existingFrameworks = [
  {
    name: "React",
    icon: <IconBrandReact className="text-cyan-600" size={40} />,
    bg: "bg-neutral-100",
  },
];

const newFrameworks = [
  {
    name: "HTML",
    icon: <IconBrandHtml5 className="text-orange-500" size={40} />,
    bg: "bg-orange-100",
  },
  {
    name: "Vue",
    icon: <IconBrandVue className="text-green-500" size={40} />,
    bg: "bg-green-100",
  },
  {
    name: "Angular",
    icon: <IconBrandAngular className="text-red-500" size={40} />,
    bg: "bg-red-100",
  },
  {
    name: "Svelte",
    icon: <IconBrandSvelte className="text-orange-600" size={40} />,
    bg: "bg-orange-200",
  },
  {
    name: "WordPress",
    icon: <IconBrandWordpress className="text-cyan-600" size={40} />,
    bg: "bg-cyan-100",
  },
];

const VoteForNewFramework = () => {
  const [selectedFramework, setSelectedFramework] = useState(null);

  const handleFrameworkSelect = (framework) => {
    setSelectedFramework(framework);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
        <div className="flex flex-row space-x-2 items-center mb-6">
          <img
            src="/LimeblockLogo.png"
            alt="Limeblock Logo"
            className="size-6"
          />
          <p className="font-aeonik text-sm text-gray-900 text-center">
            Limeblock Docs
          </p>
        </div>
        <h1 className="text-4xl font-aeonik font-medium mb-8">
          Vote for a New Framework
        </h1>
        <div className="text-sm max-w-none">
          <p className="mb-4">
            We would love to expand Limeblock to fit everyone that wants to use
            it, regardless of their existing code or framework. If you want to
            use Limeblock in a different framework or have a unique suggestion,
            contact our founder at byjuaditya@gmail.com
            <br />
          </p>
        </div>

        <h2 className="text-2xl font-aeonik font-medium mt-6 mb-4">Existing</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          {existingFrameworks.map((fw) => (
            <div
              key={fw.name}
              className={`flex items-center p-4 rounded-lg shadow-md ${fw.bg} w-40 justify-center bg-white border-gray-700 border`}
            >
              <div className="flex flex-col items-center">
                {fw.icon}
                <span className="mt-2 font-medium">{fw.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-2xl font-aeonik font-medium mt-7 mb-4 flex flex-row items-center">
          Potential New
          <div className="bg-gray-50 border text-gray-700 border-gray-600 ml-4 font-inter px-3 text-xs py-0.5 mt-0.5 rounded-full">
            Click to vote
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {newFrameworks.map((fw) => (
            <div
              key={fw.name}
              className={`flex items-center p-4 rounded-lg shadow-md
                ${
                  selectedFramework?.name === fw.name
                    ? `${fw.bg} shadow-none`
                    : `bg-white border border-gray-400 hover:shadow-none`
                } 
                w-40 justify-center cursor-pointer`}
              onClick={() => handleFrameworkSelect(fw)}
            >
              <div className="flex flex-col items-center">
                {fw.icon}
                <span className="mt-2 font-medium">{fw.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Form integration */}
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLScJT8oMNRdaO6OjJ4jli4eFZA1Z7963ZOVIONgOhQeFz029qg/formResponse"
          method="POST"
          className="border border-gray-200 rounded-lg p-6 bg-white"
        >
          <h2 className="text-xl font-aeonik font-medium mb-6">
            Cast Your Vote
          </h2>

          {/* Hidden framework input */}
          <input
            type="hidden"
            name="entry.2011844363"
            value={selectedFramework?.name || ""}
          />

          {/* Email input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              type="text"
              id="email"
              name="entry.2037631788"
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Comment input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="comment"
            >
              Additional Comments (Optional)
            </label>
            <textarea
              id="comment"
              type="text"
              name="entry.1546923294"
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows={3}
              placeholder="Tell us why you want this framework supported..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </div>
        </form>

        <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
          Have a new framework idea?
        </h2>
        <ul className="list-disc pl-6 mb-6 text-sm">
          <li>
            Contact our founder directly at{" "}
            <a
              href="mailto:byjuaditya@gmail.com"
              className="text-blue-600 hover:underline"
            >
              byjuaditya@gmail.com
            </a>{" "}
            for extra recommendations
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VoteForNewFramework;
