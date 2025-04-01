"use client";

import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    quote: "Limeblock is surprisingly useful, I'm glad I signed up before!",
    author: "You?",
    role: "Super Cool Dude",
    initials: "XX",
  },
  {
    quote: "Limeblock is designed to be the best chatbot widget for any site.",
    author: "Aditya Byju",
    role: "Founder",
    initials: "AB",
  },
];

export default function SignIn() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    password: "",
    email: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/sign_in/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.success) {
        localStorage.setItem("user_id", data.user);

        window.location.href = "/dashboard/";
      } else if (data.warning) {
        toast({
          title: `Invalid Credentials`,
          description: "Please check your details and try again",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to connect to the server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Sign In Form */}
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/LimeblockLogo.png"
              alt="Limeblock"
              width={32}
              height={32}
            />
            <span className="text-xl font-aeonik font-medium">Limeblock</span>
          </div>

          <h1 className="text-3xl font-aeonik font-medium mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 font-inter mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-inter mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.business_name}
                onChange={(e) =>
                  setFormData({ ...formData, business_name: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg font-inter text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-inter mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg font-inter text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-inter mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 border border-gray-200 rounded-lg font-inter text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-inter text-sm transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-sm text-gray-600 text-left font-inter">
                Don't have an account?{" "}
                <Link
                  href="/sign_up/"
                  className="text-gray-800 underline hover:text-black transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Same animated background as SignUp */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        {/* Gradient Swirl Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime/90 via-lime/60 to-lime/40">
          <svg
            className="absolute w-full h-full opacity-60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
              </filter>
            </defs>
            <g filter="url(#goo)">
              {[...Array(8)].map((_, i) => (
                <motion.rect
                  key={i}
                  initial={{ x: "100%", y: "100%" }}
                  animate={{
                    x: ["100%", "0%", "-100%", "0%", "100%"],
                    y: ["100%", "0%", "100%", "-100%", "100%"],
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear",
                  }}
                  width={90 + i * 8}
                  height={90 + i * 8}
                  rx="10"
                  ry="10"
                  className="fill-white"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Reviews Carousel */}
        <div className="relative h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-xl"
            >
              <div className="text-xl font-aeonik mb-4 text-gray-800">
                "{reviews[currentReview].quote}"
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                  <span className="font-inter font-medium">
                    {reviews[currentReview].initials}
                  </span>
                </div>
                <div>
                  <div className="font-inter font-medium">
                    {reviews[currentReview].author}
                  </div>
                  <div className="text-sm text-gray-600 font-inter">
                    {reviews[currentReview].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
