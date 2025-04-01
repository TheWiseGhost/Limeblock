"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  Icon3dCubeSphere,
  IconRadar,
  IconRefresh,
  IconArrowLeft,
  IconRewindForward5,
  IconArrowRight,
} from "@tabler/icons-react";

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
      {/* Text Overlays */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white border-gray-900 border-2 text-gray-800 px-8 py-3 rounded-md text-sm md:text-lg font-aeonik">
          Demo
        </div>
      </div> */}

      <div className="absolute bottom-16 md:bottom-20 right-2 md:right-20 z-20">
        <div className="bg-white border border-gray-900 text-gray-800 px-4 py-3 rounded-md text-xs md:text-sm font-medium">
          Try yourself in bottom right!
        </div>
      </div>

      {/* Video Container */}
      <div className="relative h-full w-full md:w-4/5 mx-auto pt-4">
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
        <div className="absolute top-12 left-8 flex items-center gap-4 bg-black/50 backdrop-blur-sm p-3 rounded-xl">
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
