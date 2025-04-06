"use client";

import { IconBinaryTree2, IconFileText } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import VideoLoading from "../global/VideoLoading";

const DIY = () => {
  const videos = [
    {
      id: 1,
      title: "Add Page Navigation",
      src: "/CroppedAddPageEndpoint.mp4",
      icon: <IconFileText className="size-6" />,
    },
    {
      id: 2,
      title: "Add API Endpoints",
      src: "/CroppedAddAPIEndpoint.mp4",
      icon: <IconBinaryTree2 className="size-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-fit bg-white w-full px-10 pt-28 md:pt-2 pb-32 font-inter">
      <h1 className="flex flex-col md:flex-row items-center font-aeonik text-5xl md:text-7xl font-medium mb-8">
        DIY Creation{" "}
        <div className="bg-gray-50 border text-gray-800 border-gray-600 ml-0 md:ml-8 mt-4 font-inter px-2 md:px-4 text-xs md:text-sm py-1 rounded-full">
          No integration, calls, onboarding, stress required
        </div>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8">
        {videos.map((video) => (
          <VideoWithLoading key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

const VideoWithLoading = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if video is already loaded when component mounts
    if (videoRef.current?.readyState >= 3) {
      // 3 = HAVE_FUTURE_DATA
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl flex flex-row items-center font-medium mb-6">
        {video.icon}
        <span className="ml-2">{video.title}</span>
      </h3>
      <div className="rounded-lg overflow-hidden relative w-full h-fit">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-none">
            <VideoLoading />
          </div>
        )}
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-fit object-contain md:object-cover rounded-xl border-t border-gray-400"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          onLoadedData={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onError={() => setIsLoading(false)} // Fallback in case of errors
        />
      </div>
    </div>
  );
};

export default DIY;
