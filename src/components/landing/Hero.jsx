"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Typing animation component
const TypingAnimation = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 50); // Speed of typing

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <>{displayText}</>;
};

// Chat message component for the feature cards
const ChatMessage = ({
  isUser,
  content,
  delay,
  onActionConfirm,
  showTyping = false,
  onTypingComplete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`${
        isUser
          ? "bg-gray-50 border max-w-[220px] border-gray-200"
          : "max-w-[200px] border-l-2 border-lime bg-white"
      } rounded-lg p-3 shadow-sm  h-fit`}
    >
      <div className="flex gap-2 items-center mb-2 h-fit">
        {isUser ? (
          <div className="w-3 h-6 rounded-full flex items-center justify-center text-xs">
            👤
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-white p-1">
            <img
              src="LimeblockLogo.png"
              alt="Limeblock AI"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="text-sm font-medium">
          {isUser ? "User" : "Limeblock AI"}
        </div>
      </div>
      <div className="text-sm font-inter">
        {showTyping ? (
          <TypingAnimation text={content} onComplete={onTypingComplete} />
        ) : (
          content
        )}{" "}
        <br />
        {onActionConfirm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 bg-lime text-black text-xs font-medium py-1 px-3 rounded-md hover:bg-lime-600 transition-colors"
            onClick={onActionConfirm}
          >
            Confirm
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// Sign up prompt component
const SignUpPrompt = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-4 max-w-[260px] mr-auto mt-4"
    >
      <p className="text-sm font-inter font-medium text-center mb-3">
        Want to employ other cool AI actions in your app?
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.location.href = "/sign_up/";
        }}
        className="w-full bg-lime font-aeonik text-black text-sm py-2 px-4 rounded-md hover:bg-lime-600 transition-colors"
      >
        Sign Up
      </motion.button>
    </motion.div>
  );
};

// Chat sequence demonstration
const ChatSequence = ({ setSwiggleColor }) => {
  const [step, setStep] = useState(0);
  const [userTypingComplete, setUserTypingComplete] = useState(false);

  useEffect(() => {
    // Initial delay before showing user message
    const initialDelay = setTimeout(() => {
      setStep(1);
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, []);

  const handleUserTypingComplete = () => {
    setUserTypingComplete(true);
    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  const handleConfirm = () => {
    setSwiggleColor("#000000"); // Change to black color
    setTimeout(() => {
      setStep(3);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row justify-between w-full">
        {/* User message on the left */}
        {step >= 1 && (
          <ChatMessage
            isUser={true}
            content="Can you make the swiggle under the heading black?"
            delay={0}
            showTyping={!userTypingComplete}
            onTypingComplete={handleUserTypingComplete}
          />
        )}

        {/* AI response on the right */}
        {step >= 2 && (
          <ChatMessage
            isUser={false}
            content="Confirm action schema {swiggle: '#000000'} to endpoint add_swiggle"
            delay={0.2}
            onActionConfirm={handleConfirm}
          />
        )}
      </div>

      {/* Sign up prompt - only after confirm button is pressed and delay */}
      {step >= 3 && (
        <div className="flex flex-row justify-between z-0 w-full mt-20 pl-5 pr-8">
          <SignUpPrompt delay={0.5} />
          <ChatMessage
            isUser={false}
            content="Want to know how I did that?"
            delay={0.2}
            onActionConfirm={() => {
              window.location.href = "/demo/";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);
  const [swiggleColor, setSwiggleColor] = useState("#90F08C"); // Start black

  useEffect(() => {
    setIsLoaded(true);
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-white pt-20 font-inter relative overflow-hidden h-fit md:h-screen">
      {/* Chatbot Feature Cards */}
      <div className="hidden md:block absolute right-8 top-[140px] z-10 w-full pl-20">
        <ChatSequence setSwiggleColor={setSwiggleColor} />
      </div>

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="flex flex-col justify-center px-4 text-center font-inter pt-10 relative"
      >
        <motion.p
          variants={item}
          className="text-sm md:text-base font-semibold text-gray-500 mb-1 font-dm uppercase"
        >
          More than just a Chatbot
        </motion.p>
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-aeonik tracking-tight mb-8"
        >
          Let users interact with <br className="hidden md:flex" />
          your app{" "}
          <span className="relative inline-block">
            10x faster
            <AnimatePresence>
              <motion.svg
                className="absolute -bottom-5 md:-bottom-7 left-0 w-full"
                viewBox="0 0 120 15"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M3,9 Q10,5 20,8.5 Q30,12 40,9 Q50,6 60,8.5 Q70,11 80,7 Q90,3 100,6 Q110,9 117,7"
                  fill="none"
                  stroke={swiggleColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                />
              </motion.svg>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm md:text-lg text-gray-600 w-full px-4 md:px-0 max-w-[860px] mx-auto mb-12 mt-1"
        >
          Integrate Limeblock into your app and let your users commit in-app
          actions, API requests, page navigation, and more with just with a few
          text prompts
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-2 justify-center font-inter z-20 w-fit mx-auto pl-4 md:pl-10"
        >
          <motion.a
            href="/auth_prompt/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-6 py-3 font-aeonik text-black bg-lime rounded-lg hover:bg-primary-600 transition-colors text-sm md:text-base"
          >
            Try Today
          </motion.a>
          <motion.a
            href="/docs/have_bot/"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-1 md:px-3 py-3 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2 text-sm md:text-[0.95rem] ml-2 md:ml-4"
          >
            Have an existing chatbot?
            <motion.svg
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
              className="w-4 h-4 hidden md:block"
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
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
