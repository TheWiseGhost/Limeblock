"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SignatureSVG from "./SignatureSVG";

const FounderNote = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col rounded-2xl items-center justify-center min-h-screen bg-white px-16 pb-24 pt-10 md:pt-0 md:pb-5 font-inter">
      <div className="max-w-2xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-medium mb-6 text-gray-900 font-aeonik"
        >
          A future where everyone wins.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-800 mb-6"
        >
          We're building a future where devs connect with users more
          effectively, startups don't lose their sign ups, and people interact
          with great products 10x faster.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-gray-800 mb-8"
        >
          This is UX reimagined — where AI elevates an apps's potential and
          handles the work so people can focus on the remarkable.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-gray-800 mb-6"
        >
          Join us in building this future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mb-2"
        >
          <p className="text-gray-800">Sincerely,</p>
        </motion.div>

        <div ref={ref} className="">
          <SignatureSVG inView={inView} />
        </div>

        {/* New Book Meeting Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.1,
            ease: "easeOut",
          }}
          className="mt-8"
        >
          <a
            href="https://cal.com/adityabyju" // Replace with your actual Cal link
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center text-lg text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            <span className="hidden md:block mr-2 text-gray-600 group-hover:text-gray-800 transition-colors">
              Interested but confused?
            </span>
            <span className="font-medium border-b border-indigo-300 group-hover:border-indigo-500 transition-colors">
              Book Meeting
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FounderNote;
