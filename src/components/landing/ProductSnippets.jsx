"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconCheck,
  IconRocket,
  IconPalette,
  IconWand,
} from "@tabler/icons-react";

const ProductSnippets = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const isVisible = (startTime, endTime) => {
    return currentTime >= startTime && currentTime <= endTime;
  };

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    // Auto-play and set up time tracking
    const playVideo = async () => {
      try {
        video.loop = true;
        video.muted = true; // Required for autoplay in most browsers
        await video.play();
      } catch (err) {
        console.error("Error attempting to play video:", err);
      }
    };

    video?.addEventListener("timeupdate", updateTime);
    playVideo();

    return () => {
      video?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  return (
    <div className="h-[300px] md:h-screen flex flex-col bg-white font-inter p-4 relative overflow-hidden -mt-[20px] px-5 md:px-8 pb-6 md:pb-2">
      <div className="flex flex-row h-full relative">
        {/* Middle - Video */}
        <div className="w-full md:w-2/3 ml-6 flex justify-center items-top relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="w-full h-5/6 rounded-xl overflow-y-hidden object-contain pointer-events-none"
            controlsList="nodownload"
            src="/UpdateWidgetColor.mp4"
          ></video>
        </div>

        {/* Right side elements - Staggered column layout */}
        <div className="hidden md:flex w-1/3 relative justify-center mt-12">
          {/* User Input Prompt - First step */}
          <div
            className={`absolute bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(0, 10) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconMessageCircle className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              Prompt given by user - change widget color to cyan
            </div>
          </div>

          {/* AI Scanning - Second step */}
          <div
            className={`absolute top-12  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(10, 22) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconSearch className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              Limeblock AI scans through pages and endpoints
            </div>
          </div>

          {/* Finding Backend API - Third step */}
          <div
            className={`absolute top-20  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(22, 25) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconSettings className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              AI finds a backend API action to commit that will change the
              user's widget
            </div>
          </div>

          {/* User Confirmation - Fourth step */}
          <div
            className={`absolute top-52  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(24, 26) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconCheck className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">User confirms action</div>
          </div>

          {/* Action Committed - Fifth step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(26, 32) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconRocket className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              Action is committed and sent to backend
            </div>
          </div>

          {/* Widget is Blue - Final step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(33, 38) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconPalette className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              The user's widget is now cyan - Action successfully executed by
              Limeblock
            </div>
          </div>
          <div
            className={`absolute top-28  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(40, 47) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconWand className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              Only your imagination limits the power of Limeblock!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSnippets;
