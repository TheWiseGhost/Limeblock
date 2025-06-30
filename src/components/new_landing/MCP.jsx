"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MousePointer, Package } from "lucide-react";

const MCP = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLimeblock, setShowLimeblock] = useState(false);
  const [days, setDays] = useState(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const blockVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  // Fixed animation sequence
  useEffect(() => {
    let progressInterval;
    let progressTimeout;
    let restartTimeout;
    let daysInterval;
    if (isAnimating) {
      let currentDay = 1;
      daysInterval = setInterval(() => {
        currentDay += 1;
        setDays(currentDay);
        if (currentDay >= 28) {
          clearInterval(daysInterval);
        }
      }, 200);
    }

    // Start progress bar after initial animation
    progressTimeout = setTimeout(() => {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 3;
        setProgress(currentProgress);

        if (currentProgress >= 98) {
          clearInterval(progressInterval);
          // Show Limeblock solution after progress completes
          setTimeout(() => {
            setIsAnimating(false);
            setShowLimeblock(true);

            // Restart the animation after showing Limeblock for 4 seconds
            restartTimeout = setTimeout(() => {
              setIsAnimating(true);
              setShowLimeblock(false);
              setProgress(0);
              setDays(1); // Add this line
            }, 3000);
          }, 500);
        }
      }, 100);
    }, 1000);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(restartTimeout);
      clearInterval(progressInterval);
      clearInterval(daysInterval);
    };
  }, [isAnimating]);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-12 pb-28">
      <div className="w-5/6 mx-auto font-inter">
        <div className="flex">
          {/* Left Column: Animation Visualization */}
          <div className="w-1/2 pr-8">
            <div className="relative h-96 w-full rounded-xl bg-gray-50 border border-gray-200 p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <motion.div
                    key="traditional"
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.5 },
                    }}
                  >
                    {/* Traditional MCP setup process */}
                    <motion.div
                      className="text-gray-500 text-sm mb-6"
                      variants={itemVariants}
                    >
                      Traditional MCP Setup
                    </motion.div>

                    <div className="flex flex-wrap justify-center max-w-md">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`complex-${i}`}
                          variants={blockVariants}
                          whileHover="hover"
                          className={`m-2 rounded-lg cursor-pointer ${
                            i % 4 === 0
                              ? "bg-gray-200 w-16 h-16"
                              : i % 3 === 0
                              ? "bg-gray-300 w-12 h-12"
                              : "bg-gray-400 w-10 h-10"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Progress bar */}
                    <motion.div
                      className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="h-full bg-lime rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </motion.div>

                    <motion.div
                      className="mt-3 text-xs text-gray-500"
                      variants={itemVariants}
                    >
                      {progress}% complete
                    </motion.div>

                    <motion.div
                      className="mt-2 text-xs text-orange-600 font-medium"
                      variants={itemVariants}
                      animate={{
                        opacity: [1, 0.6, 1],
                        transition: {
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        },
                      }}
                    >
                      Day {days} of setup...
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="limeblock"
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Limeblock solution */}
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.2,
                        },
                      }}
                      className="relative"
                    >
                      <div className="absolute -inset-2 bg-lime rounded-full blur opacity-30 animate-pulse"></div>
                      <div className="bg-lime rounded-2xl p-5 relative z-10 shadow-lg">
                        <div className="bg-white rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-900">
                          Limeblock
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "4rem", opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="border-l-2 border-dashed border-green-500 my-4"
                    />

                    <motion.div
                      initial={{ scale: 0, y: 20 }}
                      animate={{
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.9,
                        },
                      }}
                      className="bg-white border-2 border-green-500 rounded-xl p-5 w-64 text-center shadow-lg"
                    >
                      <div className="text-lg font-semibold text-gray-800">
                        AI Actions
                      </div>
                      <motion.div
                        className="text-xs text-gray-500 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 1.4 } }}
                      >
                        Ready in seconds!
                      </motion.div>

                      <motion.div
                        className="mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 1.6 } }}
                      >
                        <div className="flex justify-center space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={`check-${i}`}
                              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{
                                scale: [0, 1.2, 1],
                                transition: {
                                  delay: 1.7 + i * 0.2,
                                  duration: 0.5,
                                  ease: "easeOut",
                                },
                              }}
                            >
                              <motion.svg
                                className="w-4 h-4 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ pathLength: 0 }}
                                animate={{
                                  pathLength: 1,
                                  transition: {
                                    delay: 1.9 + i * 0.2,
                                    duration: 0.3,
                                  },
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </motion.svg>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-1/2 pl-8 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl font-aeonik font-medium mb-4 leading-tight"
            >
              <span className="inline-block">Don't build an MCP Server</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-600 text-sm mb-8 leading-relaxed"
            >
              Limeblock gives you the power of a MCP (Model Context Protocol)
              server without coding, integrating, and maintaining it yourself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  icon: Clock,
                  title: "Build in seconds, not weeks",
                  desc: "Use our endpoint tree to get started in seconds",
                },
                {
                  icon: MousePointer,
                  title: "Easy setup",
                  desc: "Just paste your schemas and endpoints, that's it",
                },
                {
                  icon: Package,
                  title: "Everything included",
                  desc: "No AI tooling or external services needed",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="flex items-start"
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-10 flex items-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900 text-white rounded-lg px-7 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors"
                onClick={() => (window.location.href = "/sign_in/")}
              >
                Try Limeblock Now
              </motion.button>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "2.5rem" }}
                transition={{ delay: 2.0, duration: 0.4 }}
                className="border-b border-dashed border-gray-500 mx-4"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="text-xs text-gray-600"
              >
                <span className="block">No credit card required</span>
                <motion.span
                  className="text-green-500 font-medium"
                  animate={{
                    opacity: [1, 0.7, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                  }}
                >
                  Get started free
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCP;
