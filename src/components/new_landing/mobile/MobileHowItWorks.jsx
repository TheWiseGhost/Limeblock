import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileHowItWorks() {
  const [showSolution, setShowSolution] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.02,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center py-12 px-4 min-h-fit overflow-x-hidden">
      <div className="w-full font-inter min-h-fit">
        {/* Enhanced Toggle with Animation */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex border-b border-gray-200 w-fit font-inter">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`py-3 px-4 text-sm font-medium transition-all relative ${
                !showSolution ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setShowSolution(false)}
            >
              The Problem
              {!showSolution && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  layoutId="underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`py-3 px-4 text-sm font-medium transition-all relative ${
                showSolution ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setShowSolution(true)}
            >
              Limeblock AI
              {showSolution && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  layoutId="underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Content Area with Enhanced Animations */}
        <div className="relative min-h-96 w-full">
          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.div
                key="problem"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex flex-col"
              >
                {/* Header Section */}
                <motion.div className="text-center mb-6">
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-aeonik font-medium mb-3 leading-tight px-2"
                  >
                    Integrating AI is a nightmare for every software
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-sm px-4 leading-relaxed"
                  >
                    But Limeblock makes it easy by letting you build an
                    infrastructure (without writing any code) in minutes that
                    allows you to use AI actions in your app
                  </motion.p>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-2 mt-6 px-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-gray-400 rounded-lg px-4 py-2 text-sm"
                  >
                    Need this?
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "1.5rem" }}
                    transition={{ delay: 1, duration: 0.4 }}
                    className="border-b border-dashed border-gray-400"
                  ></motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.2,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src="/LimeblockLogo.png"
                      alt="Limeblock Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex flex-col"
              >
                {/* Header Section */}
                <motion.div className="text-center mb-6">
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-aeonik font-medium mb-3 leading-tight px-2"
                  >
                    Use Limeblock to add AI
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-sm px-4 leading-relaxed"
                  >
                    Adding an AI layer to your app now takes minutes with
                    Limeblock.
                  </motion.p>
                </motion.div>

                {/* Top CTA */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-2 mb-6 px-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src="/LimeblockLogo.png"
                      alt="Limeblock Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "1.5rem" }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="border-b border-dashed border-gray-400"
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-gray-400 rounded-lg px-4 py-2 text-sm"
                  >
                    Just try me!
                  </motion.div>
                </motion.div>

                {/* Benefits Cards */}
                <div className="flex-1 flex flex-col space-y-3 px-4 min-h-fit overflow-y-auto">
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="bg-white border-l-4 border-l-lime-500 border border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold text-sm">Commit App Actions</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      that usually cause friction during initialization and
                      usage
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white border-l-4 border-l-lime-500 border border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold text-sm">Fetch API Data</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      so users don't crawl around tons of pages and give up
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white border-l-4 border-l-lime-500 border border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold text-sm">We used it too!</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Our own AI actions let users create and build faster than
                      ever
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
