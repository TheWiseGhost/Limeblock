"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DevDemo() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full bg-[#F3F3F5] min-h-screen flex flex-col items-center justify-center p-4 font-inter rounded-t-[3rem] pt-2 pb-20">
      {/* Logo and heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
          Dev Demo
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Walkthrough of what you will see when first getting started with
          Limeblock
        </p>
      </div>
      {/* Demo video */}
      <div className="w-fit px-2 mx-auto h-fit border border-gray-400 rounded-xl">
        <video
          controls
          autoPlay
          loop
          className="h-[440px] w-[1000px] mx-auto object-cover"
          src="/LimeblockDemo.mp4"
        ></video>
      </div>

      {/* Call to action button */}
      <div className="mt-12">
        <button
          className="inline-flex items-center bg-white z-20 w-fit text-black px-6 py-4 rounded-xl font-medium transition-colors"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="p-[0.4rem] text-white size-8 rounded-lg"
            animate={{
              backgroundColor: isHovered ? "#90F08C" : "#000000",
              rotate: isHovered ? -45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <IconArrowRight className="size-full" />
          </motion.div>
          <span className="ml-3 text-[0.9rem]">Get early access</span>
        </button>
      </div>
    </div>
  );
}
