"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center pt-32 font-inter">
      <div className="">
        <h1 className="text-6xl md:text-7xl flex flex-col space-y-2 font-medium font-aeonik h-fit text-black">
          <span>Adding AI to your app was</span>{" "}
          <span>never meant to be hard.</span>
        </h1>
        <div className="mb-10 text-lg mt-8">
          <p>Page Navigation, API fetchs, In-App Actions done by AI widget</p>
          <p>30 minutes and no coding required</p>
        </div>
        <button
          className="inline-flex items-center bg-white text-black px-6 py-4 rounded-xl font-medium transition-colors"
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
