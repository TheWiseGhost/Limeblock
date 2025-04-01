"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NavButton = ({ text, href }) => (
  <a
    href={href}
    className="hidden md:flex cursor-pointer font-inter text-[0.925rem] relative group px-4 py-2"
  >
    <span className="relative">
      {text}
      <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-lime group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </span>
  </a>
);

const FeatureCard = ({ icon, title, description, delay }) => {
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
      className="hidden md:flex bg-white rounded-xl shadow-lg"
    >
      <div className="p-3 border border-gray-300 border-dashed">
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

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

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
    <div className="bg-white pt-6 font-inter relative overflow-hidden h-screen">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 md:px-10 py-2 z-10 relative"
      >
        <div className="flex items-center gap-2">
          <img
            src="/LimeblockLogo.png"
            alt="Limeblock Logo"
            className="h-8 w-8"
          />
          <span className="font-medium font-aeonik text-lg">Limeblock</span>
        </div>

        <div className="hidden md:flex gap-8">
          <NavButton text="Docs" href="/docs/" />
          <NavButton text="Features" href="/docs/frontend/" />
          <NavButton text="Solutions" href="#solutions" />
          <NavButton text="Pricing" href="/checkout" />
          <NavButton text="Privacy" href="/privacy" />
          <NavButton text="Terms" href="/terms" />
        </div>

        <a
          href="/auth_prompt/"
          className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[3px] font-aeonik"
        >
          <span className="absolute inset-[-100%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#90F08C_0%,#edeceb_50%,#90F08C_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white px-5 py-2 text-sm text-gray-800 hover:text-black transition duration-200 backdrop-blur-3xl">
            Dashboard
          </span>
        </a>
      </motion.nav>

      {/* Side Feature Elements */}
      <div className="absolute left-8 top-[160px] w-52">
        <FeatureCard
          icon="⚡️"
          title="Lightning Fast"
          description="Less than 30 second response times"
          delay={0.8}
        />
      </div>

      <div className="absolute right-6 top-[180px] w-52">
        <FeatureCard
          icon="🔍"
          title="Intuitive Search"
          description="Natural language processing"
          delay={1.0}
        />
      </div>

      <div className="absolute left-20 bottom-[100px] mt-8 w-52">
        <FeatureCard
          icon="🛠️"
          title="Easy Integration"
          description="Implement our API in minutes, not days."
          delay={1.2}
        />
      </div>

      <div className="absolute right-28 bottom-[80px] w-52">
        <FeatureCard
          icon="🕒"
          title="Better UX"
          description="Save about 10 minutes per MAU that use Limeblock in your app"
          delay={1.4}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="flex flex-col justify-center px-4 text-center font-inter pt-10 z-0 relative"
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
          How users interact with <br className="hidden md:flex" />
          your app{" "}
          <span className="relative inline-block">
            10x faster
            <svg
              className="absolute -bottom-5 md:-bottom-7 left-0 w-full"
              viewBox="0 0 120 15"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M3,9 Q10,5 20,8.5 Q30,12 40,9 Q50,6 60,8.5 Q70,11 80,7 Q90,3 100,6 Q110,9 117,7"
                fill="none"
                stroke="#90F08C"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm md:text-lg text-gray-600 w-full px-4 md:px-0 max-w-[860px] mx-auto mb-12"
        >
          Integrate Limeblock into your React App and let your users commit
          in-app actions, API requests, page navigation, and more with just with
          a few text prompts
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-2 justify-center font-inter"
        >
          <motion.a
            href="/auth_prompt/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 font-aeonik text-black bg-lime rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try for Free
          </motion.a>
          <motion.a
            href="/docs/vote/"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-8 py-3 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            Not a React user
            <motion.svg
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
              className="w-4 h-4"
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
