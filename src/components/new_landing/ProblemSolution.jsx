import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProblemSolution() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-28">
      <div className="w-5/6 mx-auto font-inter">
        {/* Minimal Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex border-b border-gray-200 w-fit font-inter">
            <button
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
                />
              )}
            </button>
            <button
              className={`py-2 px-4 text-base font-medium transition-all relative ${
                showSolution ? "text-black" : "text-gray-400"
              }`}
              onClick={() => setShowSolution(true)}
            >
              The Solution
              {showSolution && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  layoutId="underline"
                />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative h-96 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.div
                key="problem"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex"
              >
                {/* Left Column */}
                <div className="w-3/5 p-8 flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                    The Problem
                  </div>
                  <h2 className="text-4xl font-aeonik font-medium mb-4 leading-tight">
                    User activation is a nightmare for every software
                  </h2>
                  <p className="text-gray-600 text-sm pb-6">
                    With attention spans getting smaller, converting curious
                    sign ups into meaningful potential paying users is harder
                    than ever
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-white border border-gray-400 rounded-lg px-4 py-2 text-sm">
                      Need this?
                    </div>
                    <div className="border-b border-dashed border-gray-400 w-6"></div>
                    <img
                      src="LimeblockLogo.png"
                      alt="Limeblock AI"
                      className="size-8"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-2/5 p-8 pr-20 flex items-center justify-center font-aeonik">
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-400 rounded-lg w-96 p-3 text-center text-lg">
                      10,000 Visitors
                    </div>
                    <div className="h-6 border-l border-dashed border-gray-400"></div>
                    <div className="bg-white border border-gray-400 rounded-lg w-64 p-3 text-center text-lg">
                      1,000 Sign Ups
                    </div>
                    <div className="flex items-center">
                      <div className="ml-3 font-dm text-sm my-3 font-semibold text-red-500">
                        Massive Drop
                      </div>
                    </div>
                    <div className="bg-white border border-gray-400 rounded-lg w-40 p-3 text-center text-lg">
                      50 MAUs
                    </div>
                    <div className="h-6 border-l border-dashed border-gray-400"></div>
                    <div className="text-sm font-dm text-gray-500 mt-1">
                      Only 10 Paying Customers
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex"
              >
                {/* Left Column */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                    The Solution
                  </div>
                  <h2 className="text-4xl font-aeonik font-medium mb-4 leading-tight">
                    Make AI improve UX through Limeblock
                  </h2>
                  <p className="text-gray-600 text-sm mb-6">
                    AI is capable of doing anything if harnessed properly
                  </p>
                  <div className="flex items-center space-x-2">
                    <img
                      src="LimeblockLogo.png"
                      alt="Limeblock AI"
                      className="size-8"
                    />
                    <div className="border-b border-dashed border-gray-400 w-6"></div>
                    <div className="bg-white border border-gray-400 rounded-lg px-4 py-2 text-sm">
                      Just chat with me!
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2 p-8 flex flex-col justify-center space-y-4">
                  <div className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4">
                    <p className="font-semibold">Commit App Actions</p>
                    <p className="text-sm text-gray-500 mt-1">
                      that usually cause friction during initialization and
                      usage
                    </p>
                  </div>

                  <div className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4">
                    <p className="font-semibold">Fetch API Data</p>
                    <p className="text-sm text-gray-500 mt-1">
                      so users don't crawl around tons of pages and give up
                    </p>
                  </div>

                  <div className="bg-white border-l-[6px] border-l-lime border-2 border-gray-200 rounded-lg p-4">
                    <p className="font-semibold">We used it too!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Our own widget lets users create and build faster than
                      ever
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
