"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MousePointer, Package } from "lucide-react";

const MobileMCP = () => {
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
      scale: 1.02,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
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
              setDays(1);
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
    <div className="w-full bg-white flex flex-col items-center justify-center px-4 pt-32 pb-16">
      <div className="w-full max-w-md mx-auto font-inter">
        {/* Mobile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-aeonik font-medium mb-3 leading-tight">
            Don't build an MCP Server
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed px-2">
            Limeblock gives you the power of a MCP (Model Context Protocol)
            server without coding, integrating, and maintaining it yourself.
          </p>
        </motion.div>

        {/* Animation Visualization - Mobile */}
        <div className="w-full mb-8">
          <div className="relative h-80 w-full rounded-xl bg-gray-50 border border-gray-200 p-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {isAnimating ? (
                <motion.div
                  key="traditional"
                  className="absolute inset-0 flex flex-col items-center justify-center p-3"
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
                    className="text-gray-500 text-xs mb-4"
                    variants={itemVariants}
                  >
                    Traditional MCP Setup
                  </motion.div>

                  <div className="flex flex-wrap justify-center max-w-xs">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={`complex-${i}`}
                        variants={blockVariants}
                        whileHover="hover"
                        className={`m-1.5 rounded-lg cursor-pointer ${
                          i % 4 === 0
                            ? "bg-gray-200 w-12 h-12"
                            : i % 3 === 0
                            ? "bg-gray-300 w-10 h-10"
                            : "bg-gray-400 w-8 h-8"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Progress bar */}
                  <motion.div
                    className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden"
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
                    className="mt-2 text-xs text-gray-500"
                    variants={itemVariants}
                  >
                    {progress}% complete
                  </motion.div>

                  <motion.div
                    className="mt-1 text-xs text-orange-600 font-medium"
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
                  className="absolute inset-0 flex flex-col items-center justify-center p-3"
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
                    <div className="bg-lime rounded-2xl p-4 relative z-10 shadow-lg">
                      <div className="bg-white rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-900">
                        Limeblock
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "3rem", opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="border-l-2 border-dashed border-green-500 my-3"
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
                    className="bg-white border-2 border-green-500 rounded-xl p-4 w-48 text-center shadow-lg"
                  >
                    <div className="text-base font-semibold text-gray-800">
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
                            className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
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
                              className="w-3 h-3 text-green-500"
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

        {/* Features List - Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4 mb-8"
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
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex items-start p-3 rounded-lg"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(0,0,0,0.02)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-900 text-white rounded-lg px-6 py-4 text-sm font-medium hover:bg-gray-800 transition-colors mb-4 shadow-lg"
            onClick={() => (window.location.href = "/sign_in/")}
          >
            Try Limeblock Now
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center"
          >
            <span className="block text-xs text-gray-600 mb-1">
              No credit card required
            </span>
            <motion.span
              className="text-green-500 font-medium text-sm"
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
  );
};

export default MobileMCP;
