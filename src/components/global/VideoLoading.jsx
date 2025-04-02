"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const VideoLoading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/animations/VideoLoading.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    fetchAnimation();
  }, []);

  if (!animationData) {
    return <div></div>; // Fallback loading state
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-0">
      <div style={{ width: 150, height: 150 }}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "150px", width: "150px" }}
        />
      </div>
      <p className="font-inter text-gray-700 text-center w-full text-sm -mt-10">
        Video Loading...
      </p>
    </div>
  );
};

export default VideoLoading;
