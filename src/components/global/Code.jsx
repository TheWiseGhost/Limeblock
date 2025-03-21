"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export const Code = ({
  code,
  language = "jsx",
  showLineNumbers = false,
  copyButton = true,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  // Calculate line numbers if needed
  const lineNumbers = showLineNumbers
    ? code
        .split("\n")
        .map((_, i) => i + 1)
        .join("\n")
    : null;

  return (
    <div
      className={`relative min-h-20 bg-gray-50 font-mono rounded-lg overflow-hidden border border-gray-200 ${className}`}
    >
      {/* Language badge */}
      {language && (
        <div className="absolute bottom-0 right-0 bg-gray-600 text-xs text-gray-200 px-2 py-1 rounded-br-md">
          {language}
        </div>
      )}

      {/* Code container */}
      <div className="flex">
        {/* Line numbers */}
        {showLineNumbers && (
          <div className="bg-gray-100 text-gray-500 text-xs p-4 text-right pr-3 select-none border-r border-gray-200">
            <pre>{lineNumbers}</pre>
          </div>
        )}

        {/* Code content */}
        <div className="bg-gray-50 w-full p-4 overflow-x-auto">
          <pre className="text-sm text-gray-800">{code}</pre>
        </div>
      </div>

      {/* Copy button */}
      {copyButton && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-lime rounded hover:bg-green-400 text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
};
