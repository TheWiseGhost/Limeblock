"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconSend } from "@tabler/icons-react";

const FeatureCard = ({ icon, title, description, delay, main = false }) => {
  // Create a unique animation for each card to make them float differently
  const floatAnimation = {
    y: [0, -12, 0],
    x: [0, 8, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 2 + Math.random() * 2, // Random duration between 4-6s
        ease: "easeInOut",
      },
      x: {
        repeat: Infinity,
        duration: 2 + Math.random() * 2, // Random duration between 5-7s
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        ...floatAnimation,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 0.5, delay },
      }}
      className="bg-white rounded-xl shadow-lg"
    >
      <div
        className={`p-3 ${
          main
            ? "border-2 border-green-400"
            : "border border-gray-300 border-dashed"
        }`}
      >
        <div className="flex flex-row space-x-2 justify-start items-center mb-2">
          <div className="text-lime text-xl">{icon}</div>
          <h3 className="font-aeonik text-lg">{title}</h3>
        </div>

        <p className="text-gray-600 font-inter text-sm text-left">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// BlockFace component from the ChatWidget
const BlockFace = ({ body, eyes, size, isThinking = false }) => {
  const getEyeSize = () => Math.round(size / 4.5);

  return (
    <motion.div
      className="relative rounded-lg flex justify-center items-center"
      style={{
        backgroundColor: body || "#90F08C",
        width: size,
        height: size,
      }}
      animate={isThinking ? { scale: [1, 0.9, 1] } : {}}
      transition={isThinking ? { repeat: Infinity, duration: 1 } : {}}
    >
      {/* Eyes */}
      <div className="absolute top-1/4 flex justify-between w-3/5">
        <div
          className="rounded-sm"
          style={{
            width: getEyeSize(),
            height: getEyeSize(),
            backgroundColor: eyes || "#FFFFFF",
          }}
        ></div>
        <div
          className="rounded-sm"
          style={{
            width: getEyeSize(),
            height: getEyeSize(),
            backgroundColor: eyes || "#FFFFFF",
          }}
        ></div>
      </div>
    </motion.div>
  );
};

// ChatDemo component for the right side
const ChatDemo = () => {
  // State for editable prompt
  const [inputMessage, setInputMessage] = useState(
    "Create my Limeblock account for my business {name} and add my email {myemail@gmail.com} and password of {123456}"
  );

  // Sample messages
  const messages = [
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ];

  return (
    <div className="flex flex-col min-h-[550px] pt-10">
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden font-inter flex-grow">
        {/* Chat Header */}
        <div
          className="p-4 flex justify-between items-center"
          style={{ backgroundColor: "#90F08C" }}
        >
          <span className="ml-2 text-lg text-white font-normal">
            Chat Assistant
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.sender === "bot" && (
                <BlockFace body="#90F08C" eyes="#FFFFFF" size={36} />
              )}
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-xs ${
                  msg.sender === "user"
                    ? "bg-white text-black"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
                style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex w-full px-4 pt-2 pb-4">
          <div className="flex border border-gray-300 px-2 w-full">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="resize-none flex-grow text-sm pr-5 pt-3 pb-4 outline-none ring-0 focus:ring-0 focus:outline-none active:ring-0 active:outline-none"
              style={{
                minHeight: "80px",
                maxHeight: "350px",
                overflow: "auto",
              }}
            />
            <button
              type="submit"
              className="size-10 mt-auto place-items-bottom mb-2 rounded-lg text-white flex justify-center items-center"
              style={{ backgroundColor: "#90F08C" }}
            >
              <IconSend className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Test Limeblock call to action under the chat demo */}
      <div className="mt-9 text-center flex flex-row justify-end pr-10">
        <motion.p className="justify-center place-items-center text-gray-700 hover:text-gray-900 text-sm font-medium font-inter flex items-center gap-1">
          Limeblock inside Limeblock?
          <motion.svg
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0.1,
              duration: 0.6,
            }}
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </motion.p>
      </div>
    </div>
  );
};

const InAppActions = () => {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col px-8 pb-10">
      <h1 className="font-aeonik font-medium text-7xl pb-2">
        The{" "}
        <span className="relative inline-block">
          Superpower
          <svg
            className="absolute -bottom-10 left-0 w-full"
            viewBox="0 0 120 15"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M3,9 Q10,5 20,8.5 Q30,12 40,9 Q50,6 60,8.5 Q70,11 80,7 Q90,3 100,6 Q110,9 117,7"
              fill="none"
              stroke="#90F08C"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </span>{" "}
        of this block
      </h1>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-1/2 pt-16 pl-4">
          <div className="flex flex-row space-x-4">
            <div className="pl-4 h-fit w-3/5">
              <FeatureCard
                icon="⚡️"
                title="Commit In-App Actions"
                description="Making your product that much easier to use for any user, especially new ones"
                main={true}
                delay={0.8}
              />
            </div>
            <div className="flex flex-row flex-grow items-center justify-center place-items-center">
              <motion.p className="justify-center place-items-center py-3 text-gray-700 hover:text-gray-900 text-lg font-medium font-inter flex items-center gap-2">
                Try it out!
                <motion.svg
                  animate={{ x: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 0.1,
                    duration: 0.6,
                  }}
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </motion.p>
            </div>
          </div>

          <div className="flex flex-row space-x-10">
            <div className="pt-12 h-fit w-6/12">
              <FeatureCard
                icon="⚙️" // Gear to represent setup
                title="Takes 5 minutes to set up"
                description="Just plug in your backend endpoints and their defined schemas"
                delay={0.8}
              />
            </div>
            <div className="pl-4 pt-12 h-fit w-5/12">
              <FeatureCard
                icon="😌" // Relieved face to represent ease and no stress
                title="Zero stress or headaches"
                description="We'll handle all the logistics behind sending data, fetching endpoints, indexing through your site, and more"
                delay={0.8}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-10">
            <div className="-mt-2 h-fit w-5/12">
              <FeatureCard
                icon="🛡️" // Shield to represent protection and safety
                title="Error handling + Guardrails"
                description="Confirm buttons for user actions + barriers to avoid taking risky or undoable actions"
                delay={0.8}
              />
            </div>
            <div className="pl-4 pt-12 h-fit w-1/2">
              <FeatureCard
                icon="⏱️" // Stopwatch to represent time savings
                title="Crazy time saves"
                description="Make your app frictionless - Improving UX, conversions, brand rep, and more"
                delay={0.8}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full px-6 pt-4">
          <ChatDemo />
        </div>
      </div>
    </div>
  );
};

export default InAppActions;
