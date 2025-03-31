"use client";

import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

const Access = () => {
  const [copiedIp, setCopiedIp] = useState(null);
  const ipAddresses = [
    "https://limeblock.io",
    "https://limeblockbackend.onrender.com",
  ];

  const handleCopy = (ip) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 1000);
  };

  return (
    <div className="border border-gray-300 flex flex-row space-x-4 items-center rounded-md w-7/12 p-4">
      <div className="flex text-lg font-aeonik items-center justify-center border-r border-gray-300 pr-4 h-full leading-6">
        Access
      </div>
      <div className="font-inter text-sm flex-1 pl-1">
        <p>Allow the following Addresses access to your backend:</p>
        <ul className="mt-2 flex flex-row space-x-6">
          {ipAddresses.map((ip) => (
            <li key={ip} className="flex flex-row items-center space-x-1 mt-1">
              <span className="font-semibold text-xs">{ip}</span>
              <button
                onClick={() => handleCopy(ip)}
                className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                {copiedIp === ip ? (
                  <Check className="text-gray-800" size={12} />
                ) : (
                  <Clipboard size={12} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Access;
