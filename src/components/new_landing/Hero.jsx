"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center pt-40 font-inter">
      <div className="">
        <h1 className="text-6xl md:text-7xl flex flex-col space-y-3 font-medium font-aeonik h-fit text-black">
          <span className="flex flex-row space-x-6">
            <span>Adding</span>
            <span className="relative inline-block">
              AI to your app
              <AnimatePresence>
                <motion.svg
                  className="absolute -bottom-5 md:-bottom-10 left-0 w-full"
                  viewBox="0 0 120 15"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M3,9 Q10,5 20,8.5 Q30,12 40,9 Q50,6 60,8.5 Q70,11 80,7 Q90,3 100,6 Q110,9 117,7"
                    fill="none"
                    stroke={"#90F08C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                  />
                </motion.svg>
              </AnimatePresence>
            </span>
            <span>was</span>
          </span>{" "}
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
