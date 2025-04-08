"use client";

import React from "react";
import { motion } from "framer-motion";

const SignUpDashboard = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black font-inter">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0">
        <img
          src="/DashboardExample.png"
          className="h-full w-full object-left object-cover"
          alt="Dashboard Background"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px] md:backdrop-blur-sm"></div>
      </div>

      {/* Sign-Up Box */}
      <motion.div
        initial={{ opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 bg-white w-[400px] md:w-[500px] p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
      >
        {/* Logo */}
        <img
          src="/LimeblockLogo.png"
          alt="Logo"
          className="size-12 md:size-20 mb-4"
        />

        {/* Title */}
        <h1 className="font-aeonik text-2xl font-bold pb-2">
          Create an Account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Sign up now to let your app use the best chatbot.
        </p>

        {/* Buttons */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/sign_up/")}
          className="w-4/5 bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-inter text-sm transition-all duration-200 flex items-center justify-center"
        >
          Create Account
        </motion.button>

        {/* OR Separator */}
        <div className="relative w-full flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/sign_in/")}
          className="w-4/5 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-inter text-sm transition-all duration-200 flex items-center justify-center"
        >
          Sign In
        </motion.button>

        {/* Additional Info */}
        <p className="text-gray-400 text-xs mt-6">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpDashboard;
