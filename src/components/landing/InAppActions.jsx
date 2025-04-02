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

  function generateFingerprint() {
    // Combine various browser properties to create a unique identifier
    const components = [
      navigator.userAgent,
      navigator.language,
      `${window.screen.width}x${window.screen.height}`,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      !!window.indexedDB,
      navigator.hardwareConcurrency || "",
      navigator.deviceMemory || "",
    ];

    // Simple hash function
    return components
      .join("|")
      .split("")
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
      .toString(36);
  }

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
          "https://limeblockbackend.onrender.com/api/process_prompt/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: inputMessage,
              api_key: "lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL",
              context: {},
              client_info: {
                // Add unique identifier for the client
                fingerprint: generateFingerprint(),
                referrer: document.referrer || null,
                hostname: window.location.hostname,
                pathname: window.location.pathname,
                user_agent: navigator.userAgent,
                language: navigator.language,
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            }),
          }
        );

        const data = await response.json();
        console.log("Response data:", JSON.stringify(data, null, 2));

        // Add bot response to chat
        if (response.ok) {
          // If the request was successful
          let responseText;

          responseText = data.formatted_response;
          if (data.endpoint_type == "frontend") {
            setMessages((prev) => [
              ...prev,
              { text: responseText, sender: "bot", link: data.url },
            ]);
          } else if (data.endpoint_type == "backend") {
            setMessages((prev) => [
              ...prev,
              {
                text: responseText,
                sender: "bot",
                confirm_data: {
                  endpoint: data.endpoint,
                  schema: data.schema,
                  prompt: data.prompt,
                },
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              { text: responseText, sender: "bot" },
            ]);
          }
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

  const handleConfirmBackendAction = async (action_data) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    // Show loading indicator
    setLoading(true);
    setLoadingStep(0);

    try {
      // Send message to Django backend
      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/commit_backend_action/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: action_data.prompt,
            api_key: "lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL",
            endpoint: action_data.endpoint,
            schema: action_data.schema,
          }),
        }
      );

      const data = await response.json();
      // Add bot response to chat
      if (response.ok) {
        // If the request was successful
        let responseText;

        responseText = data.formatted_response;

        setMessages((prev) => [...prev, { text: responseText, sender: "bot" }]);
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
  };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (inputMessage.trim()) {
  //     // Add user message to chat
  //     setMessages([...messages, { text: inputMessage, sender: "user" }]);

  //     // Reset textarea height
  //     if (textAreaRef.current) {
  //       textAreaRef.current.style.height = "auto";
  //     }

  //     // Show loading indicator
  //     setLoading(true);
  //     setLoadingStep(0);

  //     try {
  //       // Send message to Django backend
  //       const response = await fetch(
  //         "https://limeblockbackend.onrender.com/api/process_prompt/",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             prompt: inputMessage,
  //             api_key: "lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL",
  //             context: {},
  //           }),
  //         }
  //       );

  //       const data = await response.json();

  //       // Add bot response to chat
  //       if (response.ok) {
  //         // If the request was successful
  //         let responseText;

  //         if (data.response && data.endpoint_used) {
  //           // Format successful response from endpoint
  //           responseText = `Request processed using endpoint: ${data.endpoint_used}\n\n`;

  //           if (typeof data.response === "object") {
  //             responseText += JSON.stringify(data.response, null, 2);
  //           } else {
  //             responseText += data.response;
  //           }
  //         } else {
  //           // Generic success message if response structure is different
  //           responseText =
  //             typeof data === "object" ? JSON.stringify(data, null, 2) : data;
  //         }

  //         setMessages((prev) => [
  //           ...prev,
  //           { text: responseText, sender: "bot" },
  //         ]);
  //       } else {
  //         // Handle error response
  //         const errorMessage =
  //           data.error || data.message || "Something went wrong";
  //         setMessages((prev) => [
  //           ...prev,
  //           {
  //             text: `Error: ${errorMessage}`,
  //             sender: "bot",
  //           },
  //         ]);
  //       }
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           text: "Sorry, there was a network error. Please try again later.",
  //           sender: "bot",
  //         },
  //       ]);
  //     } finally {
  //       setLoading(false);
  //       setInputMessage("");
  //     }
  //   }
  // };

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
                  <></>
                ) : (
                  <div className="flex mt-auto">
                    <BlockFace
                      body={"#90F08C"}
                      eyes={"#FFFFFF"}
                      size={36}
                      isThinking={false}
                    />
                  </div>
                )}
                <motion.div
                  className={`inline-block rounded-lg text-center px-4 py-4 relative group ${
                    msg.sender === "user"
                      ? "ml-auto text-[0.9rem] w-fit"
                      : "text-[0.9rem] max-w-11/12"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor:
                      msg.sender == "user" ? "#E5E7EB" : "#F3F4F6",
                    whiteSpace: "pre-wrap",
                    textAlign: "left",
                    color: msg.sender == "user" ? "#000000" : "#111111",
                  }}
                >
                  {msg.text}
                  <br />
                  {msg.link ? (
                    <button
                      className="bg-gray-900 px-3 py-2 mt-2 text-white font-inter text-xs rounded-md"
                      onClick={() => {
                        window.open(msg.link);
                      }}
                    >
                      Visit Page
                    </button>
                  ) : (
                    <></>
                  )}

                  {msg.confirm_data ? (
                    <button
                      className="bg-gray-900 px-3 py-2 mt-2 text-white font-inter text-xs rounded-md"
                      onClick={() => {
                        handleConfirmBackendAction(msg.confirm_data);
                      }}
                    >
                      Confirm Action
                    </button>
                  ) : (
                    <></>
                  )}
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
