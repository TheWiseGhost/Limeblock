"use client";
import { IconAspectRatio } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

export default function EditWidget({ body, eyes, size, user_id }) {
  // State for widget properties
  const [bodyColor, setBodyColor] = useState(body || "#90F08C");
  const [eyeColor, setEyeColor] = useState(eyes || "#FFFFFF");
  const [blockSize, setBlockSize] = useState(size || 12);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  // Update state when props change
  useEffect(() => {
    if (body) setBodyColor(body);
    if (eyes) setEyeColor(eyes);
    if (size) setBlockSize(size);
  }, [body, eyes, size]);

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
    const sizeValue = parseInt(value, 10);
    if (!isNaN(sizeValue) && sizeValue > 0 && sizeValue <= 30) {
      setBlockSize(sizeValue);
    }
  };

  // Function to handle exporting (placeholder for now)
  const handleExport = () => {
    alert("Export functionality will be implemented in the future");
  };

  // Function to handle saving to backend - fixed parameter handling
  const handleSave = async () => {
    try {
      setLoading(true);

      if (!user_id) {
        toast({
          title: `Error`,
          description: "User ID is missing",
          variant: "destructive",
        });
        return;
      }

      // Small delay for better user experience
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        "http://127.0.0.1:8000/api/update_frontend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            body: bodyColor,
            eyes: eyeColor,
            size: blockSize,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: `Widget Saved!`,
          description: "Your changes have been saved successfully",
        });
      } else {
        toast({
          title: `Error`,
          description: data.message || data.warning || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Error saving widget settings:", error);
      toast({
        title: `Error`,
        description: "Network error, please try again",
      });
    } finally {
      setLoading(false);
    }
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
            {loading ? (
              <>
                <svg
                  className="animate-spin size-4 mx-2 text-black"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </>
            ) : (
              "Save"
            )}
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
              className="size-9 rounded-lg"
            ></div>
            <div
              style={{ backgroundColor: eyeColor }}
              className="size-9 rounded-lg"
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
