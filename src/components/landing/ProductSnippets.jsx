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
import VideoLoading from "../global/VideoLoading";

const ProductSnippets = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const isVisible = (startTime, endTime) => {
    return currentTime >= startTime && currentTime <= endTime;
  };

  useEffect(() => {
    // Check if video is already loaded when component mounts
    if (videoRef.current?.readyState >= 3) {
      // 3 = HAVE_FUTURE_DATA
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    const playVideo = async () => {
      try {
        video.loop = true;
        video.muted = true;
        video.playbackRate = 2;
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
    <div className="h-[300px] md:h-screen flex flex-col bg-white font-inter text-sm p-4 relative overflow-hidden -mt-[20px] px-5 md:px-8 pb-6 md:pb-2">
      <div className="flex flex-row h-full relative">
        {/* Middle - Video */}
        <div className="w-full md:w-2/3 ml-6 flex justify-center items-top relative">
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex justify-center items-center">
              <VideoLoading />
            </div>
          )}
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
            onCanPlay={() => setIsVideoLoaded(true)}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(true)} // Fallback for errors
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
            <div className="">
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
            <div className="">
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
            <div className="">
              AI finds a backend API action to commit that will change the
              user's widget
            </div>
          </div>

          {/* User Confirmation - Fourth step */}
          <div
            className={`absolute top-52  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(24, 27) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconCheck className="size-5 text-gray-600" />
            </div>
            <div className="">User confirms action</div>
          </div>

          {/* Action Committed - Fifth step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(27, 35) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconRocket className="size-5 text-gray-600" />
            </div>
            <div className="">Action is committed and sent to backend</div>
          </div>

          {/* Widget is Blue - Final step */}
          <div
            className={`absolute top-56  bg-white rounded-lg p-4 border-l-4 border-l-lime border border-neutral-200 flex items-center transition-opacity duration-500 w-5/6 ${
              isVisible(36, 40) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mr-3 bg-gray-100 p-2 rounded-full">
              <IconPalette className="size-5 text-gray-600" />
            </div>
            <div className="">
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
            <div className="">
              Only your imagination limits the power of Limeblock!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSnippets;
