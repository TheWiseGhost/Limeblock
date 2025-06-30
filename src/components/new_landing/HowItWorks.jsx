import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorks() {
  const [showSolution, setShowSolution] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-28 pb-16">
      <div className="w-5/6 mx-auto font-inter">
        {/* Enhanced Toggle with Animation */}
        <motion.div
          className="flex justify-center mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex border-b border-gray-200 w-fit font-inter">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`py-2 px-4 text-base font-medium transition-all relative ${
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
              className={`py-2 px-4 text-base font-medium transition-all relative ${
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
        <div className="relative h-96 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.div
                key="problem"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex"
              >
                {/* Left Column */}
                <motion.div className="w-3/5 p-8 flex flex-col justify-center">
                  <motion.div
                    variants={itemVariants}
                    className="text-xs uppercase tracking-wide text-gray-500 mb-2"
                  >
                    The Problem
                  </motion.div>
                  <motion.h2
                    variants={itemVariants}
                    className="text-4xl font-aeonik font-medium mb-4 leading-tight"
                  >
                    Integrating AI is a nightmare for <br /> every software
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-sm pb-6"
                  >
                    But Limeblock make it easy by letting you build an
                    infrastructure (wihout writing any code) in minutes that
                    allows you to use AI actions in your app
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
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
                    <motion.img
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 1.2,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      src="LimeblockLogo.png"
                      alt="Limeblock AI"
                      className="size-8"
                    />
                  </motion.div>
                </motion.div>

                {/* Right Column */}
                <div className="w-2/5 p-8 pr-20 flex items-center justify-center font-aeonik">
                  <div className="flex flex-col items-center">
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-white border border-gray-400 rounded-lg w-96 p-3 text-center text-lg"
                    >
                      Your Backend's API Endpoints
                    </motion.div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "1.5rem" }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="border-l border-dashed border-gray-400"
                    ></motion.div>
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-white border border-gray-400 rounded-lg w-64 p-3 text-center text-lg"
                    >
                      Schemas for them
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      variants={itemVariants}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="ml-3 font-dm text-sm my-3 font-semibold text-green-500"
                      >
                        Limeblock AI
                      </motion.div>
                    </motion.div>
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-white border border-gray-400 rounded-lg w-40 p-3 text-center text-lg"
                    >
                      Client Side
                    </motion.div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "1.5rem" }}
                      transition={{ delay: 1.1, duration: 0.3 }}
                      className="border-l border-dashed border-gray-400"
                    ></motion.div>
                    <motion.div
                      variants={itemVariants}
                      className="text-sm font-dm text-gray-500 mt-1"
                    >
                      Users using AI to interact with your app
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex"
              >
                {/* Left Column */}
                <motion.div className="w-1/2 p-8 flex flex-col justify-center">
                  <motion.div
                    variants={itemVariants}
                    className="text-xs uppercase tracking-wide text-gray-500 mb-2"
                  >
                    The Solution
                  </motion.div>
                  <motion.h2
                    variants={itemVariants}
                    className="text-4xl font-aeonik font-medium mb-4 leading-tight"
                  >
                    Use Limeblock to add AI
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-sm mb-6"
                  >
                    Adding an AI layer to your app is now takes minutes with
                    Limeblock.
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-2"
                  >
                    <motion.img
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      src="LimeblockLogo.png"
                      alt="Limeblock AI"
                      className="size-8"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "1.5rem" }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="border-b border-dashed border-gray-400"
                    ></motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-gray-400 rounded-lg px-4 py-2 text-sm"
                    >
                      Just try me!
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right Column */}
                <div className="w-1/2 p-8 flex flex-col justify-center space-y-4">
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold">Commit App Actions</p>
                    <p className="text-sm text-gray-500 mt-1">
                      that usually cause friction during initialization and
                      usage
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold">Fetch API Data</p>
                    <p className="text-sm text-gray-500 mt-1">
                      so users don't crawl around tons of pages and give up
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold">We used it too!</p>
                    <p className="text-sm text-gray-500 mt-1">
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
