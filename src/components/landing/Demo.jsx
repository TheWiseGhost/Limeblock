"use client";

import React, { useState, useEffect, useRef } from "react";

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
    <div className="h-screen flex flex-col bg-white font-inter p-4 relative overflow-hidden -mt-[60px]">
      <div className="flex flex-row h-full relative">
        {/* Left side elements */}
        <div className="w-1/4 relative">
          {/* 68 Feedback Responses */}
          <div
            className={`absolute top-12 left-12 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(0, 5) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-pink-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">68 Feedback Responses</span>
          </div>

          {/* 83 CSAT Survey Responses */}
          <div
            className={`absolute top-28 left-16 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(2, 7) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-yellow-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">83 CSAT Survey Responses</span>
          </div>

          {/* 120 Dropoff Heatmap Captures */}
          <div
            className={`absolute top-52 left-8 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(4, 9) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-blue-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <span className="font-medium">120 Dropoff Heatmap Captures</span>
          </div>

          {/* 57 Signup Replay Clips */}
          <div
            className={`absolute top-64 left-16 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(6, 11) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-red-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">57 Signup Replay Clips</span>
          </div>

          {/* Connector lines */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <path
              d={`M120 50 Q160 80 200 100`}
              stroke="#EC4899"
              strokeWidth="2"
              fill="none"
              className={`transition-opacity duration-500 ${
                isVisible(0, 5) ? "opacity-100" : "opacity-0"
              }`}
            />
            <path
              d={`M140 110 Q180 130 220 140`}
              stroke="#EAB308"
              strokeWidth="2"
              fill="none"
              className={`transition-opacity duration-500 ${
                isVisible(2, 7) ? "opacity-100" : "opacity-0"
              }`}
            />
            <path
              d={`M100 210 Q150 190 200 160`}
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              className={`transition-opacity duration-500 ${
                isVisible(4, 9) ? "opacity-100" : "opacity-0"
              }`}
            />
            <path
              d={`M130 260 Q170 230 210 200`}
              stroke="#EF4444"
              strokeWidth="2"
              fill="none"
              className={`transition-opacity duration-500 ${
                isVisible(6, 11) ? "opacity-100" : "opacity-0"
              }`}
            />
          </svg>
        </div>

        {/* Middle - Video */}
        <div className="w-1/2 flex justify-center items-top relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="w-[550px] h-[500px] rounded-xl overflow-hidden shadow-lg object-cover pointer-events-none"
            controlsList="nodownload"
            src="/demo-video.mp4"
          ></video>
        </div>

        {/* Right side elements */}
        <div className="w-1/4 relative">
          {/* One-click verification */}
          <div
            className={`absolute top-12 right-12 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(1, 6) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-blue-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">One-click verification</span>
          </div>

          {/* Dynamic field validation */}
          <div
            className={`absolute top-28 right-8 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(3, 8) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-blue-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">Dynamic field validation</span>
          </div>

          <div
            className={`absolute top-28 right-8 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(5, 7) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-blue-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">Dynamic field validation</span>
          </div>

          <div
            className={`absolute top-28 right-8 bg-white rounded-lg p-3 shadow-md flex items-center transition-opacity duration-500 ${
              isVisible(8, 10) ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-blue-500 rounded-md p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">Dynamic field validation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
