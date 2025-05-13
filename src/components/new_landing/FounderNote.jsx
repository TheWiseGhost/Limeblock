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
    <div className="flex flex-col rounded-2xl items-center justify-center min-h-screen bg-white px-16 pb-5 font-inter">
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
          10x faster.
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
      </div>
    </div>
  );
};

export default FounderNote;
