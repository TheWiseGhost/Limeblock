"use client";

import { IconArticle, IconHeading } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

export default function EditChatUI({
  aiText,
  userText,
  pageBackground,
  aiMessageBackground,
  userMessageBackground,
  banner,
  pageTitle,
  startText,
  user_id,
}) {
  // State for chat UI properties
  const [aiTextColor, setAiTextColor] = useState(aiText || "#000000");
  const [userTextColor, setUserTextColor] = useState(userText || "#000000");
  const [pageBgColor, setPageBgColor] = useState(pageBackground || "#FFFFFF");
  const [aiMsgBgColor, setAiMsgBgColor] = useState(
    aiMessageBackground || "#F3F4F6"
  );
  const [userMsgBgColor, setUserMsgBgColor] = useState(
    userMessageBackground || "#E5E7EB"
  );
  const [bannerColor, setBannerColor] = useState(banner || "#90F08C");
  const [title, setTitle] = useState(pageTitle || "Chat Assistant");
  const [welcomeText, setWelcomeText] = useState(
    startText || "How can I help you today?"
  );
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  // Update state when props change
  useEffect(() => {
    if (aiText) setAiTextColor(aiText);
    if (userText) setUserTextColor(userText);
    if (pageBackground) setPageBgColor(pageBackground);
    if (aiMessageBackground) setAiMsgBgColor(aiMessageBackground);
    if (userMessageBackground) setUserMsgBgColor(userMessageBackground);
    if (banner) setBannerColor(banner);
    if (pageTitle) setTitle(pageTitle);
    if (startText) setWelcomeText(startText);
  }, [
    aiText,
    userText,
    pageBackground,
    aiMessageBackground,
    userMessageBackground,
    banner,
    pageTitle,
    startText,
  ]);

  // Handle color change for any field
  const handleColorChange = (setter) => (e) => {
    const value = e.target.value;
    if (value.startsWith("#") && value.length <= 7) {
      setter(value);
    }
  };

  // Handle text change
  const handleTextChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Function to handle saving to backend
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
        "https://limeblockbackend.onrender.com/api/update_frontend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            aiText: aiTextColor,
            userText: userTextColor,
            pageBackground: pageBgColor,
            aiMessageBackground: aiMsgBgColor,
            userMessageBackground: userMsgBgColor,
            banner: bannerColor,
            pageTitle: title,
            startText: welcomeText,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: `Chat UI Saved!`,
          description: "Your customizations have been saved successfully",
        });
      } else {
        toast({
          title: `Error`,
          description: data.message || data.warning || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Error saving chat UI settings:", error);
      toast({
        title: `Error`,
        description: "Network error, please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 font-inter">
      <div className="flex flex-row mb-4 justify-between items-center pb-2">
        <h2 className="text-2xl font-aeonik">Chat UI</h2>
        <button
          onClick={handleSave}
          className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
        >
          {loading ? (
            <svg
              className="animate-spin size-4 mx-1 text-black"
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
          ) : (
            "Save"
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {/* Color selectors */}
        <div className="space-y-3">
          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: aiTextColor }}
            ></div>
            <span className="text-xs pr-2">AI Text:</span>
            <input
              type="text"
              value={aiTextColor}
              onChange={handleColorChange(setAiTextColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: userTextColor }}
            ></div>
            <span className="text-xs pr-2">User Text:</span>
            <input
              type="text"
              value={userTextColor}
              onChange={handleColorChange(setUserTextColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: pageBgColor }}
            ></div>
            <span className="text-xs pr-2">Page BG:</span>
            <input
              type="text"
              value={pageBgColor}
              onChange={handleColorChange(setPageBgColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#FFFFFF"
              maxLength={7}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: aiMsgBgColor }}
            ></div>
            <span className="text-xs pr-2">AI Message:</span>
            <input
              type="text"
              value={aiMsgBgColor}
              onChange={handleColorChange(setAiMsgBgColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#F3F4F6"
              maxLength={7}
            />
          </div>

          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: userMsgBgColor }}
            ></div>
            <span className="text-xs pr-2">Message:</span>
            <input
              type="text"
              value={userMsgBgColor}
              onChange={handleColorChange(setUserMsgBgColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#E5E7EB"
              maxLength={7}
            />
          </div>

          <div className="flex items-center">
            <div
              className="size-6 border border-gray-300 rounded-md mr-2"
              style={{ backgroundColor: bannerColor }}
            ></div>
            <span className="text-xs pr-2">Banner:</span>
            <input
              type="text"
              value={bannerColor}
              onChange={handleColorChange(setBannerColor)}
              className="p-1 border border-gray-300 rounded-md w-24 text-xs"
              placeholder="#90F08C"
              maxLength={7}
            />
          </div>
        </div>
      </div>
      {/* Text inputs */}
      <div className="flex flex-col gap-4 mt-6 w-full">
        <div className="flex items-center w-full">
          <IconHeading className="size-5 mr-0.5 text-gray-500" />
          <p className="text-xs mr-2">Page Title:</p>
          <input
            type="text"
            value={title}
            onChange={handleTextChange(setTitle)}
            className="p-1 text-xs border border-gray-300 rounded-md flex-1"
            placeholder="Chat Assistant"
          />
        </div>

        <div className="flex items-center w-full">
          <IconArticle className="size-5 mr-1 text-gray-500" />
          <p className="text-xs mr-2">Start Text:</p>
          <input
            type="text"
            value={welcomeText}
            onChange={handleTextChange(setWelcomeText)}
            className="p-1 text-xs border border-gray-300 rounded-md flex-1"
            placeholder="How can I help you today?"
          />
        </div>
      </div>
    </div>
  );
}
