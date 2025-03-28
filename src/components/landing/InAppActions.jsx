"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSend, IconUser } from "@tabler/icons-react";

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
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const textAreaRef = useRef(null);

  // State for editable prompt
  const [inputMessage, setInputMessage] = useState(
    "Create my Limeblock account for my business {name} and add my email {myemail@gmail.com} and password of {123456}"
  );

  // Sample messages
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ]);

  // Loading states for animation
  const loadingStates = [
    "Analyzing prompt...",
    "Finding best endpoint to hit...",
    "Preparing to send data...",
    "Sending data...",
    "Successfully sent...",
  ];

  // Set up the loading animation cycle
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingStates.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Auto-resize text area based on content
  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set new height based on scrollHeight, but cap at 50% of chat container
      const maxHeight = 300 * 0.5; // 50% of the 500px chat container height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message to chat
      setMessages([...messages, { text: inputMessage, sender: "user" }]);

      // Reset textarea height
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }

      // Show loading indicator
      setLoading(true);
      setLoadingStep(0);

      try {
        // Send message to Django backend
        const response = await fetch(
          "http://127.0.0.1:8000/api/process_prompt/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: inputMessage,
              api_key: "lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL",
              context: {},
            }),
          }
        );

        const data = await response.json();

        // Add bot response to chat
        if (response.ok) {
          // If the request was successful
          let responseText;

          if (data.response && data.endpoint_used) {
            // Format successful response from endpoint
            responseText = `Request processed using endpoint: ${data.endpoint_used}\n\n`;

            if (typeof data.response === "object") {
              responseText += JSON.stringify(data.response, null, 2);
            } else {
              responseText += data.response;
            }
          } else {
            // Generic success message if response structure is different
            responseText =
              typeof data === "object" ? JSON.stringify(data, null, 2) : data;
          }

          setMessages((prev) => [
            ...prev,
            { text: responseText, sender: "bot" },
          ]);
        } else {
          // Handle error response
          const errorMessage =
            data.error || data.message || "Something went wrong";
          setMessages((prev) => [
            ...prev,
            {
              text: `Error: ${errorMessage}`,
              sender: "bot",
            },
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, there was a network error. Please try again later.",
            sender: "bot",
          },
        ]);
      } finally {
        setLoading(false);
        setInputMessage("");
      }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 25 },
    },
  };

  return (
    <div className="flex flex-col h-[400px] md:h-[510px] pt-10">
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
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`mb-4 flex gap-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.05 }}
              >
                {msg.sender === "user" ? (
                  <div className="size-7 rounded-full bg-gray-100 flex items-center justify-center mt-2">
                    <IconUser className="size-5 text-gray-600" />
                  </div>
                ) : (
                  <></>
                )}
                <motion.div
                  className={`inline-block rounded-lg px-4 py-2 pb-8 max-w-xs relative group ${
                    msg.sender === "user"
                      ? "bg-white text-black pr-1"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    whiteSpace: "pre-wrap",
                    textAlign: "left",
                  }}
                >
                  {msg.text}

                  {/* Action buttons - always taking space but only visible on hover */}
                  <div
                    className={`absolute bg-none bottom-1 flex items-center gap-1 w-full ${
                      msg.sender === "user"
                        ? "justify-end right-2"
                        : "justify-start left-2"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      /* Edit button for user messages */
                      <motion.button
                        onClick={() => {
                          setInputMessage(msg.text);
                          if (textAreaRef.current) {
                            textAreaRef.current.focus();
                          }
                        }}
                        className="bg-transparent hover:bg-gray-200 rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit message"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </motion.button>
                    ) : (
                      /* Copy, Like, Dislike buttons for bot messages */
                      <>
                        <motion.button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                          }}
                          className="bg-transparent hover:bg-gray-200 rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Copy to clipboard"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </motion.button>

                        <motion.button
                          className="bg-transparent hover:bg-gray-200 rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Like"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                          </svg>
                        </motion.button>

                        <motion.button
                          className="bg-transparent hover:bg-gray-200 rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Dislike"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                          </svg>
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* AI Thinking/Loading Indicator */}
          {loading && messages.length > 0 && (
            <motion.div
              className="flex items-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BlockFace
                body={"#90F08C"}
                eyes={"#FFFFFF"}
                size={36}
                isThinking={true}
              />
              <motion.div
                className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2 text-sm ml-2"
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {loadingStates[loadingStep]}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <motion.form
          onSubmit={handleSendMessage}
          className="px-4 pt-2 pb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex border border-gray-300 px-2">
            <motion.textarea
              ref={textAreaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="resize-none flex-grow text-sm pr-5 pt-3 pb-4 outline-none ring-0 focus:ring-0 focus:outline-none active:ring-0 active:outline-none"
              style={{
                minHeight: "40px",
                maxHeight: "250px", // 50% of the 500px container
                overflow: "auto",
              }}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <motion.button
              type="submit"
              className="size-10 mt-auto place-items-bottom mb-2 rounded-lg text-white flex justify-center items-center"
              style={{ backgroundColor: "#90F08C" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    },
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                ></motion.div>
              ) : (
                <IconSend className="size-6" />
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

const InAppActions = () => {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col px-4 md:px-8 pb-10">
      <h1 className="font-aeonik font-medium text-5xl md:text-7xl pb-2">
        The{" "}
        <span className="relative inline-block">
          Superpower
          <svg
            className="hidden md:flex absolute -bottom-10 left-0 w-full"
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
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col w-full md:w-1/2 pt-16 pl-4">
          <div className="flex flex-row space-x-4">
            <div className="pl-0 md:pl-4 h-fit w-3/5">
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

          <div className="hidden md:flex flex-row space-x-10">
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
          <div className="hidden md:flex flex-row space-x-10">
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

        <div className="w-full md:w-1/2 h-full px-6 pt-4">
          <ChatDemo />
        </div>
      </div>
    </div>
  );
};

export default InAppActions;
