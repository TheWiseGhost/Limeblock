"use client";

import React, { useState, useRef } from "react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconRefresh,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import ProductSnippets from "./ProductSnippets";
import Navbar from "./Navbar";

const Demo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const rewind = () => {
    videoRef.current.currentTime = Math.max(0, currentTime - 5);
  };

  const fastForward = () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.duration,
      currentTime + 5
    );
  };

  return (
    <div className="h-fit md:min-h-screen w-full bg-white font-inter relative overflow-hidden px-4 md:px-12 pb-20 md:pb-24">
      <Navbar />
      <div className="h-28" />
      <h1 className="flex flex-col items-center font-aeonik text-5xl md:text-7xl font-medium mb-8">
        Basic Demo
        <div className="bg-gray-50 border text-gray-800 border-gray-600 mt-4 font-inter px-2 md:px-4 text-xs md:text-sm py-1 rounded-full">
          What your user's will see
        </div>
      </h1>
      <ProductSnippets />

      <div className="absolute bottom-16 md:bottom-20 right-2 md:right-20 z-20">
        <div className="bg-white border border-gray-900 text-gray-800 px-4 py-3 rounded-md text-xs md:text-sm font-medium">
          Try yourself in bottom right!
        </div>
      </div>

      {/* Video Container */}
      <div className="relative h-full w-full md:w-4/5 mx-auto -mt-8">
        <h1 className="flex flex-col items-center font-aeonik text-5xl md:text-7xl font-medium mb-8">
          Developer Demo
          <div className="bg-gray-50 border text-gray-800 border-gray-600 mt-4 font-inter px-2 md:px-4 text-xs md:text-sm py-1 rounded-full">
            What you will see
          </div>
        </h1>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-contain"
          src="/LimeblockDemo.mp4"
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        ></video>

        {/* Video Controls */}
        <div className="absolute top-44 left-8 flex items-center gap-4 bg-black/50 backdrop-blur-sm p-3 rounded-xl">
          <button
            onClick={rewind}
            className="text-white hover:text-lime transition-colors"
          >
            <IconArrowLeft className="size-5" />
          </button>
          <button
            onClick={togglePlay}
            className="text-white hover:text-lime transition-colors"
          >
            {isPlaying ? (
              <IconPlayerPause className="size-5" />
            ) : (
              <IconPlayerPlay className="size-5" />
            )}
          </button>
          <button
            onClick={fastForward}
            className="text-white hover:text-lime transition-colors"
          >
            <IconArrowRight className="size-5" />
          </button>
          <button
            onClick={restart}
            className="text-white hover:text-lime transition-colors"
          >
            <IconRefresh className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
