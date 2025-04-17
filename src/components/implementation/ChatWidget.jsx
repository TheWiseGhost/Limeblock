"use client";

import { IconBolt, IconFile, IconSend, IconX } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable BlockFace component
const BlockFace = ({ body, eyes, size, isThinking = false }) => {
  const getBodySize = () => size;
  const getEyeSize = () => Math.round(size / 4.5);

  return (
    <motion.div
      className="relative rounded-[0.3rem] flex justify-center items-center"
      style={{
        backgroundColor: body,
        width: getBodySize(),
        height: getBodySize(),
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
            backgroundColor: eyes,
          }}
        ></div>
        <div
          className="rounded-sm"
          style={{
            width: getEyeSize(),
            height: getEyeSize(),
            backgroundColor: eyes,
          }}
        ></div>
      </div>
    </motion.div>
  );
};

// ChatWidget component that can be imported by other components
const ChatWidget = ({
  apiKey,
  contextParams = {},
  widgetPosition = "bottom-[8px] md:bottom-[24px] right-[8px] md:right-[24px]",
  chatPosition = "bottom-[0px] right-[0px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [widgetLoading, setWidgetLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWinking, setIsWinking] = useState(false);
  const textAreaRef = useRef(null);

  const [valid, setValid] = useState(true);

  const [activeOption, setActiveOption] = useState("Find Page");

  // Loading states for animation
  const loadingStates = [
    "Analyzing prompt...",
    "Finding best endpoint to hit...",
    "Preparing to send data...",
    "Sending data...",
    "Successfully sent...",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setWidgetLoading(true);

        if (!apiKey) {
          setError("API key not found");
          return;
        }

        // Fetch frontend details
        const frontendResponse = await fetch(
          "https://limeblockbackend.onrender.com/api/public_frontend_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api_key: apiKey }),
          }
        );

        const checkValid = await fetch(
          "https://limeblockbackend.onrender.com/api/are_maus_remaining/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api_key: apiKey }),
          }
        );

        const frontendData = await frontendResponse.json();
        const validData = await checkValid.json();

        if (frontendData.success) {
          setFrontend(frontendData.frontend);
        } else {
          setError("Failed to load frontend settings");
        }

        setValid(validData.valid);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error, please try again");
      } finally {
        setLoading(false);
        setWidgetLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

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
      const maxHeight = 500 * 0.5; // 50% of the 500px chat container height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [inputMessage]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to generate a unique fingerprint
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

      if (!valid) {
        setMessages((prev) => [
          ...prev,
          { text: "This company has run out of MAUs", sender: "bot" },
        ]);
        return;
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
              api_key: apiKey,
              context: contextParams,
              option: activeOption,
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
            api_key: apiKey,
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

  // Handle winking during shake
  const handleShake = () => {
    setIsWinking(true);
    // Reset winking after shake animation completes
    setTimeout(() => setIsWinking(false), 500);
  };

  // Calculate sizes based on frontend.size
  const getBodySize = () => {
    if (!frontend?.size) return 44; // Default size if not provided
    return frontend.size * 5;
  };

  const getEyeSize = () => {
    if (!frontend?.size) return 9; // Default size if not provided
    return Math.round((frontend.size * 5) / 5);
  };

  // Animation variants
  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const chatPanelVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transformOrigin: "bottom right",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const eyeVariants = {
    initial: { opacity: 0, y: 5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.3 },
    },
  };

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 25 },
    },
  };

  // Styles for portal container
  const portalStyle = {
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none", // Makes the container not interfere with other elements
  };

  // Styles for elements that need pointer events
  const interactiveStyle = {
    pointerEvents: "auto", // Re-enables pointer events for chat elements
  };

  if (widgetLoading) {
    return <></>;
  }

  return (
    // Portal container - fixed position, doesn't affect page layout
    <div style={portalStyle} className={`w-fit h-fit ${widgetPosition}`}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            onClick={toggleChat}
            key="chat-button"
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            className="rounded-md overflow-hidden shadow-md"
            style={interactiveStyle}
          >
            <motion.div
              style={{
                backgroundColor: frontend?.body || "#90F08C",
                width: `${getBodySize()}px`,
                height: `${getBodySize()}px`,
              }}
              className="rounded-md flex justify-evenly items-center"
              whileHover={{
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              onHoverStart={handleShake}
            >
              {/* Left Eye */}
              <motion.div
                style={{
                  backgroundColor: frontend?.eyes || "#FFFFFF",
                  width: `${getEyeSize()}px`,
                  height: `${getEyeSize()}px`,
                }}
                className="rounded-sm mb-[0.625rem]"
                variants={eyeVariants}
                animate={isWinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                initial={{ scaleY: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.div>

              {/* Right Eye */}
              <motion.div
                style={{
                  backgroundColor: frontend?.eyes || "#FFFFFF",
                  width: `${getEyeSize()}px`,
                  height: `${getEyeSize()}px`,
                }}
                className="rounded-sm mb-[0.625rem]"
                variants={eyeVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="chat-panel"
            variants={chatPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`rounded-xl w-[330px] md:w-[390px] h-[460px] md:h-[500px] shadow-2xl flex flex-col overflow-hidden font-inter ${chatPosition}`}
            style={{
              ...interactiveStyle,
              position: "absolute",
              backgroundColor: frontend?.pageBackground || "#FFFFFF",
            }}
          >
            {/* Chat Header */}
            <motion.div
              className="px-4 py-4 flex justify-between items-center"
              style={{ backgroundColor: frontend?.banner || "#90F08C" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-row space-x-3 items-center">
                <div
                  style={{ borderColor: frontend?.eyes || "" }}
                  className="border rounded-lg"
                >
                  <BlockFace
                    body={frontend?.body}
                    eyes={frontend?.eyes}
                    size={36}
                    isThinking={false}
                  />
                </div>

                <motion.span
                  className="ml-2 text-base text-black font-inter font-normal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {frontend?.pageTitle || "Chat Assistant"}
                </motion.span>
              </div>

              <motion.button
                onClick={toggleChat}
                className="text-gray-800 hover:text-black mr-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="size-5" />
              </motion.button>
            </motion.div>
            <div
              className="w-5/6 mx-auto h-[1px]"
              style={{
                backgroundColor: frontend?.banner == "#FFFFFF" ? "#E5E7EB" : "",
              }}
            ></div>

            {/* Chat Messages */}
            <motion.div
              className="flex-grow overflow-y-auto overflow-x-hidden scroll-pe-0 bg-white pb-4 px-4 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {loading && messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      },
                    }}
                    className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full"
                  ></motion.div>
                </div>
              ) : error ? (
                <motion.div
                  className="text-red-500 text-center p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              ) : (
                <>
                  {messages.length === 0 ? (
                    <motion.div
                      className="text-gray-500 text-center mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {valid
                        ? frontend?.startText || "How can I help you today?"
                        : "This company has run out of MAUs"}
                    </motion.div>
                  ) : (
                    <AnimatePresence>
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          className={`mb-4 flex gap-3 h-fit ${
                            msg.sender === "user"
                              ? "flex-row w-11/12 ml-auto"
                              : "flex-row"
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
                                body={frontend?.body}
                                eyes={frontend?.eyes}
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
                                msg.sender == "user"
                                  ? frontend?.userMessageBackground || "#E5E7EB"
                                  : frontend?.aiMessageBackground || "#F3F4F6",
                              whiteSpace: "pre-wrap",
                              textAlign: "left",
                              color:
                                msg.sender == "user"
                                  ? frontend?.userText || "#000000"
                                  : frontend?.aiText || "#111111",
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
                  )}
                </>
              )}

              {/* AI Thinking/Loading Indicator */}
              {loading && messages.length > 0 && (
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <BlockFace
                    body={frontend?.body}
                    eyes={frontend?.eyes}
                    size={36}
                    isThinking={true}
                  />
                  <motion.div
                    className="rounded-lg px-4 py-2 text-sm ml-2"
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      backgroundColor:
                        frontend?.aiMessageBackground || "#F3F4F6",
                      color: frontend?.aiText || "#111111",
                    }}
                  >
                    {loadingStates[loadingStep]}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Chat Input */}
            <motion.form
              onSubmit={handleSendMessage}
              className="px-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex border border-gray-300 px-2 rounded-md flex-col">
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
                    backgroundColor: frontend?.pageBackground || "#FFFFFF",
                  }}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <div className="flex flex-row justify-between items-end h-fit w-full -mt-1 md:-mt-4">
                  <div className="flex flex-row gap-2 h-full pb-3">
                    <motion.button
                      type="button"
                      className={`px-3 py-1 flex flex-row items-center text-xs font-inter rounded-full text-gray-700 ${
                        activeOption === "Find Page"
                          ? "border border-gray-400"
                          : "bg-gray-200"
                      }`}
                      style={{
                        backgroundColor: frontend?.pageBackground || "#FFFFFF",
                      }}
                      onClick={() => setActiveOption("Find Page")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <IconFile className="size-4 mr-1" />
                      Find Page
                    </motion.button>
                    <motion.button
                      type="button"
                      className={`px-3 py-1 flex flex-row items-center text-xs font-inter rounded-full text-gray-700 ${
                        activeOption === "Do Action"
                          ? "border border-gray-400"
                          : "bg-gray-200"
                      }`}
                      style={{
                        backgroundColor: frontend?.pageBackground || "#FFFFFF",
                      }}
                      onClick={() => setActiveOption("Do Action")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <IconBolt className="size-4 mr-1" />
                      Do Action
                    </motion.button>
                  </div>
                  <motion.button
                    type="submit"
                    className="size-10 mt-auto place-items-bottom mb-2 rounded-lg text-white flex justify-center items-center"
                    style={{ backgroundColor: frontend?.body || "#90F08C" }}
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
              </div>
            </motion.form>
            <div className="flex flex-row items-center justify-center text-center pb-2 pt-1">
              <a
                href="https://limeblock.io/"
                className="font-inter text-gray-500 hover:underline transition duration-200"
                style={{ fontSize: "10px" }}
              >
                Powered by Limeblock
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
