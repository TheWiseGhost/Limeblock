"use client";
import { IconAspectRatio } from "@tabler/icons-react";
import { useState } from "react";

export default function InteractiveWidget() {
  // State for widget properties
  const [bodyColor, setBodyColor] = useState("#98FB98"); // Light green default
  const [eyeColor, setEyeColor] = useState("#FFFFFF"); // White default
  const [blockSize, setBlockSize] = useState(12);

  // Validate hex color function
  const isValidHex = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

  // Handle body color change
  const handleBodyColorChange = (e) => {
    const value = e.target.value;
    setBodyColor(value);
    if (isValidHex(value)) {
      setBodyColor(value);
    }
  };

  // Handle eye color change
  const handleEyeColorChange = (e) => {
    const value = e.target.value;
    setEyeColor(value);
    if (isValidHex(value)) {
      setEyeColor(value);
    }
  };

  // Handle block size change
  const handleBlockSizeChange = (e) => {
    const value = e.target.value;
    setBlockSize(value);
    const sizeValue = parseInt(value, 10);
    if (!isNaN(sizeValue) && sizeValue > 0 && sizeValue <= 30) {
      setBlockSize(sizeValue);
    }
  };

  // Function to handle exporting (placeholder for now)
  const handleExport = () => {
    alert("Export functionality will be implemented in the future");
  };

  // Function to handle saving (placeholder for now)
  const handleSave = () => {
    alert("Save functionality will be implemented in the future");
  };

  return (
    <div className="border border-gray-300 rounded-md p-6">
      <div className="flex flex-row mb-8 justify-between">
        <h2 className="text-2xl font-aeonik ">My Widget</h2>
        <div className="flex flex-row h-fit space-x-5">
          <button
            onClick={handleExport}
            className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
          >
            Export
          </button>
          <button
            onClick={handleSave}
            className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-10 w-full">
        {/* Widget display area */}
        <div className="w-1/2 h-44 flex">
          <div
            style={{ backgroundColor: bodyColor }}
            className="size-44 rounded-xl flex justify-evenly pt-10 px-4"
          >
            <div
              style={{ backgroundColor: eyeColor }}
              className="size-9 bg-white rounded-lg"
            ></div>
            <div
              style={{ backgroundColor: eyeColor }}
              className="size-9 bg-white rounded-lg"
            ></div>
          </div>
        </div>

        {/* Controls area */}
        <div className="flex flex-col w-1/2 space-y-4 font-inter">
          {/* Body Color Selector */}
          <div className="flex items-center mb-2">
            <div
              className="size-10 border border-gray-300 rounded-md mr-3"
              style={{ backgroundColor: bodyColor }}
            ></div>
            <input
              type="text"
              value={bodyColor}
              onChange={handleBodyColorChange}
              className="p-2 pl-3 border border-gray-300 rounded-md w-28"
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          {/* Eye Color Selector */}
          <div className="flex items-center mb-2">
            <div
              className="size-10 border border-gray-300 rounded-md mr-3"
              style={{ backgroundColor: eyeColor }}
            ></div>
            <input
              type="text"
              value={eyeColor}
              onChange={handleEyeColorChange}
              className="p-2 pl-3 border border-gray-300 rounded-md w-28"
              placeholder="#FFFFFF"
              maxLength={7}
            />
          </div>

          {/* Block Size Selector */}
          <div className="flex items-center mb-2">
            <div className="size-10 border border-gray-300 rounded-md mr-3 flex items-center justify-center">
              <IconAspectRatio />
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={blockSize}
                onChange={handleBlockSizeChange}
                className="p-2 border border-gray-300 rounded-md"
                min="1"
                max="30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
