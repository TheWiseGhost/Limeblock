"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, AppWindowMac, UserCheck } from "lucide-react";

const WhyAI = () => {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [progress, setProgress] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const aiTransition = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Animation sequence
  useEffect(() => {
    let progressInterval;

    // Start transformation after initial delay
    const startTimeout = setTimeout(() => {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 3;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setIsEnhanced(true);

          // Reset after completion
          setTimeout(() => {
            setIsEnhanced(false);
            setProgress(0);
          }, 3000);
        }
      }, 100);
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(progressInterval);
    };
  }, [isEnhanced]);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-28 pb-8">
      <div className="w-5/6 mx-auto font-inter">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: AI Transformation Demo */}
          <div className="w-full lg:w-1/2 lg:pr-8 lg:mb-0">
            <div className="relative h-[25rem] w-full rounded-xl p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isEnhanced ? (
                  <motion.div
                    key="basic-app"
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="text-gray-500 text-sm mb-6"
                      variants={itemVariants}
                    >
                      Standard Web Application
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-3 gap-4 w-64"
                      variants={containerVariants}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`tile-${i}`}
                          variants={itemVariants}
                          className={`h-20 rounded-lg ${
                            i === 0
                              ? "bg-blue-200 col-span-2"
                              : i === 3
                              ? "bg-cyan-200 col-span-3"
                              : "bg-green-200"
                          }`}
                        />
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-8 w-64 h-2 bg-green-200 rounded-full overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <motion.div
                      className="mt-3 text-xs text-gray-500"
                      variants={itemVariants}
                    ></motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-enhanced"
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="text-green-600 text-sm mb-6 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    ></motion.div>

                    <motion.div
                      className="grid grid-cols-3 gap-4 w-64"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`ai-tile-${i}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          className={`h-20 rounded-lg relative overflow-hidden ${
                            i === 0
                              ? "bg-blue-100 col-span-2 border-2 border-blue-300"
                              : i === 3
                              ? "bg-cyan-100 col-span-3 border-2 border-cyan-300"
                              : "bg-green-100 border-2 border-green-300"
                          }`}
                        >
                          {/* AI enhancements */}
                          {i === 1 && (
                            <motion.div
                              className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 }}
                            ></motion.div>
                          )}

                          {i === 4 && (
                            <motion.div
                              className="absolute bottom-1 right-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ delay: 0.6 }}
                            ></motion.div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Benefits */}
          <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-aeonik font-medium mb-4 mt-6"
            >
              Why even add AI?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-600 mb-8 max-w-lg"
            >
              Today, AI is not just a luxury; it's a necessity for any app to
              thrive and succeed against faster and faster competitors.
            </motion.p>

            <motion.div
              className="space-y-6 mb-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  icon: UserCheck,
                  title: "User activation",
                  desc: "Use AI to assist new users through tedious setup or tasks",
                },
                {
                  icon: AppWindowMac,
                  title: "Improved UX",
                  desc: "AI helps make your app intuitive and frictionless",
                },
                {
                  icon: ScanEye,
                  title: "Retention Rate",
                  desc: "Keep users on your app and decrease churn",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1 mr-4 bg-green-100 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyAI;
