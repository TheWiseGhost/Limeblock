"use client";

import { IconSend } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ChatWidget component that can be imported by other components
const ChatWidget = ({ apiKey, contextParams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWinking, setIsWinking] = useState(false);

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

        const frontendData = await frontendResponse.json();

        if (frontendData.success) {
          setFrontend(frontendData.frontend);
        } else {
          setError("Failed to load frontend settings");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message to chat
      setMessages([...messages, { text: inputMessage, sender: "user" }]);

      // Show loading indicator
      setLoading(true);

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
                backgroundColor: frontend?.body || "#4F46E5",
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
            className="bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden font-inter"
            style={{
              ...interactiveStyle,
              width: "350px",
              height: "500px",
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          >
            {/* Chat Header */}
            <motion.div
              className="p-4 flex justify-between items-center"
              style={{ backgroundColor: frontend?.body || "#4F46E5" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.span
                className="ml-2 text-lg text-white font-normal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                Chat Assistant
              </motion.span>

              <motion.button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>

            {/* Chat Messages */}
            <motion.div
              className="flex-grow p-4 overflow-y-auto bg-gray-50"
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
                      Start a conversation!
                    </motion.div>
                  ) : (
                    <AnimatePresence>
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          className={`mb-4 ${
                            msg.sender === "user" ? "text-right" : "text-left"
                          }`}
                          variants={messageVariants}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: index * 0.05 }}
                        >
                          <motion.div
                            className={`inline-block rounded-lg px-4 py-2 max-w-xs ${
                              msg.sender === "user"
                                ? "bg-neutral-200 text-black"
                                : "bg-gray-100 text-gray-800"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            style={{
                              whiteSpace: "pre-wrap",
                              textAlign: "left",
                            }}
                          >
                            {msg.text}
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </>
              )}
            </motion.div>

            {/* Chat Input */}
            <motion.form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex">
                <motion.textarea
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow text-sm p-3 border border-gray-300 focus:outline-none"
                  whileFocus={{
                    boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.5)",
                  }}
                  disabled={loading}
                />
                <motion.button
                  type="submit"
                  className="w-10 place-items-center py-1 my-3 ml-2 rounded-lg text-white flex justify-center items-center"
                  style={{ backgroundColor: frontend?.body || "#4F46E5" }}
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
            <div className="flex flex-row items-center justify-center text-center pb-2">
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
