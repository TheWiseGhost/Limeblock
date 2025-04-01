"use client";

import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const reviews = [
  {
    quote:
      "Limeblock is surprisingly useful, I'm super glad I signed up today!",
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

export default function SignUp() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    password: "",
    emails: [""],
  });

  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = value;
    setFormData({ ...formData, emails: newEmails });
  };

  const addEmailField = () => {
    setFormData({ ...formData, emails: [...formData.emails, ""] });
  };

  const removeEmailField = (index) => {
    if (formData.emails.length > 1) {
      const newEmails = formData.emails.filter((_, i) => i !== index);
      setFormData({ ...formData, emails: newEmails });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://limeblockbackend.onrender.com/api/create_user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            business_name: formData.business_name,
            password: formData.password,
            emails: formData.emails.filter((email) => email.trim() !== ""),
          }),
        }
      );

      const data = await response.json();

      // Wait for 1.5 seconds before showing success and redirecting
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.success) {
        localStorage.setItem("user_id", data.user);
        window.location.href = "/checkout/";
      } else if (data.warning) {
        toast({
          title: `Business Name already taken`,
          description:
            "Please choose a different name (Don't worry if it's not exact, it won't be what your users see)",
        });
      } else {
        console.log(data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-fit flex flex-row w-full overflow-y-auto">
      {/* Left Side - Sign Up Form */}
      <div className="w-full md:w-1/2 min-h-screen h-fit flex flex-col justify-center p-12">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-3 pb-8 pt-12">
            <Image
              src="/LimeblockLogo.png"
              alt="Limeblock"
              width={32}
              height={32}
            />
            <span className="text-xl font-aeonik font-medium">Limeblock</span>
          </div>

          <h1 className="text-3xl font-aeonik font-medium mb-2">
            Keep your business advanced
          </h1>
          <p className="text-gray-600 font-inter mb-8">
            Sign up to start your journey with Limeblock
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-3">
              <label className="block text-sm font-inter mb-2">
                Team Member Email Addresses
              </label>
              {formData.emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-lg font-inter text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                    required
                  />
                  {formData.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmailField(index)}
                      className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEmailField}
                className="text-sm text-lime-600 hover:text-lime-700 font-inter flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add another email
              </button>
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

            <div className="space-y-3">
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-sm text-gray-600 text-left font-inter">
                Already have an account?{" "}
                <a
                  href="/sign_in/"
                  className="text-gray-800 underline hover:text-black transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Animated Background with Reviews */}
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
