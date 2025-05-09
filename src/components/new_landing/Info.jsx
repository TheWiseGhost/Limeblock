"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Info = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  // Mock video data
  const videos = [
    {
      id: 1,
      title: "Nature Exploration",
      src: "/api/placeholder/640/360",
      description: "Experience the beauty of untouched wilderness",
    },
    {
      id: 2,
      title: "Urban Architecture",
      src: "/api/placeholder/640/360",
      description: "Discover stunning city structures and designs",
    },
    {
      id: 3,
      title: "Ocean Life",
      src: "/api/placeholder/640/360",
      description: "Dive into the mysterious world beneath the waves",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const videoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow font-inter"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left section with title and buttons */}
      <div className="md:w-1/3">
        <motion.h2
          className="text-3xl font-bold mb-6 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Featured Videos
        </motion.h2>

        <div className="flex flex-col gap-4">
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              className={`px-4 py-3 rounded-lg text-left ${
                activeVideo === index
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
              onClick={() => setActiveVideo(index)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3 className="font-semibold">{video.title}</h3>
              <p
                className={`text-sm ${
                  activeVideo === index ? "text-indigo-100" : "text-gray-500"
                }`}
              >
                {video.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right section with video player */}
      <motion.div
        className="md:w-2/3 bg-black rounded-lg overflow-hidden"
        key={activeVideo}
        variants={videoVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src={videos[activeVideo].src}
            alt={videos[activeVideo].title}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 text-white">
          <h3 className="text-xl font-semibold">{videos[activeVideo].title}</h3>
          <p className="text-gray-300 mt-1">
            {videos[activeVideo].description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Info;
