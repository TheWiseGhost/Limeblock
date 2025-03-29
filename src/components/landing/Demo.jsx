"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconCheck,
  IconRocket,
  IconPalette,
} from "@tabler/icons-react";

const Demo = () => {
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
    <div className="h-[300px] md:h-screen flex flex-col bg-white font-inter p-4 relative overflow-hidden -mt-[30px] px-5 md:px-12 pb-6 md:pb-4">
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
            src="/FinalLimeblockDemo.mp4"
          ></video>
        </div>

        {/* Right side elements - Staggered column layout */}
        <div className="hidden md:flex w-1/3 relative justify-center mt-12">
          {/* User Input Prompt - First step */}
          <div
            className={`absolute bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(0, 3) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-blue-100 p-2 rounded-full">
              <IconMessageCircle className="size-5 text-blue-600" />
            </div>
            <div className="font-medium">
              Example prompt given by user - change board color
            </div>
          </div>

          {/* AI Scanning - Second step */}
          <div
            className={`absolute top-12  bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(4, 9) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-purple-100 p-2 rounded-full">
              <IconSearch className="size-5 text-purple-600" />
            </div>
            <div className="font-medium">
              Limeblock AI scans through pages and endpoints
            </div>
          </div>

          {/* Finding Backend API - Third step */}
          <div
            className={`absolute top-24  bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(9, 12) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconSettings className="size-5 text-gray-600" />
            </div>
            <div className="font-medium">
              AI finds a backend API action to commit that will change the
              user's board
            </div>
          </div>

          {/* User Confirmation - Fourth step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(10, 13) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-green-100 p-2 rounded-full">
              <IconCheck className="size-5 text-green-600" />
            </div>
            <div className="font-medium">User confirms action</div>
          </div>

          {/* Action Committed - Fifth step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(13, 17) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-orange-100 p-2 rounded-full">
              <IconRocket className="size-5 text-orange-600" />
            </div>
            <div className="font-medium">
              Action is committed and sent to backend
            </div>
          </div>

          {/* Board is Blue - Final step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 shadow-md flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(18, 20) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-blue-100 p-2 rounded-full">
              <IconPalette className="size-5 text-blue-600" />
            </div>
            <div className="font-medium">
              The user's board is now blue - Action successfully executed by
              Limeblock
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
