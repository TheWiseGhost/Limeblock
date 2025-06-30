"use client";
import { IconArrowRight } from "@tabler/icons-react";
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
          : "max-w-[200px] border-l-2 border-lime bg-gray-50"
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
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-[260px] mr-auto -mt-6 h-fit"
    >
      <p className="text-sm font-inter font-medium text-center mb-3">
        Want to employ other cool AI actions in your app?
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
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
    setSwiggleColor("#90F08C"); // Change to black color
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
            content="Can you make the swiggle under the heading lime?"
            delay={0}
            showTyping={!userTypingComplete}
            onTypingComplete={handleUserTypingComplete}
          />
        )}

        {/* AI response on the right */}
        {step >= 2 && (
          <ChatMessage
            isUser={false}
            content="Confirm action schema {swiggle: '#90F08C'} to endpoint add_swiggle"
            delay={0.2}
            onActionConfirm={handleConfirm}
          />
        )}
      </div>

      {/* Sign up prompt - only after confirm button is pressed and delay */}
      {step >= 3 && (
        <div className="flex flex-row justify-between z-0 w-full mt-10 pl-5 pr-8">
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

export default function MobileHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [swiggleColor, setSwiggleColor] = useState("#000000");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center px-6 pt-32 font-inter h-fit pb-16 relative overflow-hidden bg-[#F3F3F5]">
      {/* Added ChatBot Feature Cards */}
      <div className="hidden md:block absolute right-8 top-[140px] z-10 w-full pl-20">
        <ChatSequence setSwiggleColor={setSwiggleColor} />
      </div>

      <div className="text-center z-20">
        <h1 className="text-6xl md:text-7xl flex flex-col space-y-2 font-aeonik h-fit text-black">
          Adding AI to your web app made easy
        </h1>
        <div className="mb-8 text-lg mt-8">
          <p>Let any API Endpoint become AI accessible in minutes</p>
        </div>
        <button
          className="inline-flex items-center bg-white z-20 w-fit text-black px-6 py-4 rounded-xl font-medium transition-colors"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            window.location.href = "/sign_up/";
          }}
        >
          <motion.div
            className="p-[0.4rem] text-white size-8 rounded-lg"
            animate={{
              backgroundColor: isHovered ? "#90F08C" : "#000000",
              rotate: isHovered ? -45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <IconArrowRight className="size-full" />
          </motion.div>
          <span className="ml-3 text-[0.9rem]">Get early access</span>
        </button>
        <p className="mt-3 text-xs text-gray-700">
          Get 250k free tokens when you sign up today
        </p>
      </div>
    </div>
  );
}
