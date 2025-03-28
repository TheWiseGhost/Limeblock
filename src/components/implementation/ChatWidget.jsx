"use client";

import { IconSend, IconX } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable BlockFace component
const BlockFace = ({ body, eyes, size, isThinking = false }) => {
  const getBodySize = () => size;
  const getEyeSize = () => Math.round(size / 4.5);

  return (
    <motion.div
      className="relative rounded-lg flex justify-center items-center"
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
const ChatWidget = ({ apiKey, contextParams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWinking, setIsWinking] = useState(false);
  const textAreaRef = useRef(null);

  const [valid, setValid] = useState(true);

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

        if (!apiKey) {
          setError("API key not found");
          return;
        }

        // Fetch frontend details
        const frontendResponse = await fetch(
          "http://127.0.0.1:8000/api/public_frontend_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api_key: apiKey }),
          }
        );

        const checkValid = await fetch(
          "http://127.0.0.1:8000/api/are_maus_remaining/",
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
          "http://127.0.0.1:8000/api/process_prompt/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: inputMessage,
              api_key: apiKey,
              context: contextParams,
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
                business_id:
                  contextParams.business_id || contextParams.board_id, // Use the business identifier
              },
            }),
          }
        );

        const data = await response.json();

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
          } else {
            if (data.confirm_needed) {
              setMessages((prev) => [
                ...prev,
                { text: responseText, sender: "bot", confirm_action: data },
              ]);
            } else {
              setMessages((prev) => [
                ...prev,
                { text: responseText, sender: "bot" },
              ]);
            }
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
        "http://127.0.0.1:8000/api/commit_backend_action/",
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
            url: action_data.url,
          }),
        }
      );

      const data = await response.json();
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
        } else {
          if (data.confirm_needed) {
            setMessages((prev) => [
              ...prev,
              { text: responseText, sender: "bot", confirm_action: data },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              { text: responseText, sender: "bot" },
            ]);
          }
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
    bottom: "24px",
    right: "24px",
    zIndex: 9999,
    pointerEvents: "none", // Makes the container not interfere with other elements
  };

  // Styles for elements that need pointer events
  const interactiveStyle = {
    pointerEvents: "auto", // Re-enables pointer events for chat elements
  };

  return (
    // Portal container - fixed position, doesn't affect page layout
    <div style={portalStyle}>
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
            className="rounded-lg overflow-hidden shadow-md"
            style={interactiveStyle}
          >
            <motion.div
              style={{
                backgroundColor: frontend?.body || "#90F08C",
                width: `${getBodySize()}px`,
                height: `${getBodySize()}px`,
              }}
              className="rounded-lg flex justify-evenly items-center"
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
                className="rounded-sm mb-2"
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
                className="rounded-sm mb-2"
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
            className="rounded-xl shadow-2xl flex flex-col overflow-hidden font-inter"
            style={{
              ...interactiveStyle,
              width: "390px",
              height: "500px",
              position: "absolute",
              bottom: "0",
              right: "0",
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
                          className={`mb-4 flex gap-3 ${
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

                            {msg.confirm_action ? (
                              <button
                                className="bg-gray-900 px-3 py-2 mt-2 text-white font-inter text-xs rounded-md"
                                onClick={() => {
                                  handleConfirmBackendAction(
                                    msg.confirm_action
                                  );
                                }}
                              >
                                Confirm Action
                              </button>
                            ) : (
                              <></>
                            )}

                            {/* Action buttons - always taking space but only visible on hover */}
                            {/* <div
                              className={`absolute bg-none bottom-1 flex items-center gap-1 w-full ${
                                msg.sender === "user"
                                  ? "justify-end right-2"
                                  : "justify-start left-2"
                              }`}
                            >
                              {msg.sender === "user" ? (
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
                            </div> */}
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
            </motion.form>
            <div className="flex flex-row items-center justify-center text-center pb-2 pt-1">
              <a
                href="#"
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
