"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Target,
  DollarSign,
  Lightbulb,
  MapPin,
  Users,
  TrendingUp,
  Settings,
  CheckCircle,
  Mail,
  FileText,
} from "lucide-react";

export default function Hero() {
  const [formData, setFormData] = useState({
    message: "",
    email: "",
    budget: "",
    companyUrl: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const statusSteps = [
    { message: "Analyzing your requirements...", icon: Search },
    { message: "Searching marketing databases...", icon: Target },
    { message: "Identifying target demographics...", icon: Users },
    { message: "Calculating budget optimization...", icon: DollarSign },
    { message: "Generating creative concepts...", icon: Lightbulb },
    { message: "Evaluating location data...", icon: MapPin },
    { message: "Sourcing vendor partnerships...", icon: Settings },
    { message: "Optimizing campaign reach...", icon: TrendingUp },
    { message: "Finalizing strategic recommendations...", icon: CheckCircle },
    {
      message: "Building a full plan and contract",
      icon: FileText,
    },
    {
      message:
        "Due to excessive demand, this is taking a while. We'll get your custom plan in your inbox within 24 hours.",
      icon: Mail,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async () => {
    setIsProcessing(true);
    setIsCompleted(false);
    setProgress(0);
    setCurrentStepIndex(0);
    setCurrentStatus(statusSteps[0].message);

    await fetch("https://limeblockbackend.onrender.com/api/new_idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    try {
      let progressInterval;
      let stepIndex = 0;

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / 300;

          const newStepIndex = Math.floor(newProgress / 10);
          if (newStepIndex > stepIndex && stepIndex < statusSteps.length - 1) {
            stepIndex = newStepIndex;
            setCurrentStepIndex(stepIndex);
            setCurrentStatus(statusSteps[stepIndex].message);
          }

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsCompleted(true);
            return 100;
          }

          return Math.min(newProgress, 100);
        });
      }, 100);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsProcessing(false);
      setProgress(0);
      setCurrentStatus("Error occurred. Please try again.");
      setCurrentStepIndex(0);

      setTimeout(() => {
        setCurrentStatus("");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const CurrentIcon = statusSteps[currentStepIndex]?.icon || Search;

  return (
    <div className="min-h-screen bg-white text-black font-inter overflow-hidden pb-10">
      <section className="px-8 pt-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-8 transition-all duration-1000 transform`}
            >
              <h2 className="text-4xl md:text-5xl font-aeonik mb-2 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text pb-3 text-transparent font-medium">
                Prompt to Physical Marketing
              </h2>
              <div className="text-sm md:text-base font-inter flex flex-col justify-center items-center text-gray-600 animate-fadeIn">
                <div className="flex flex-row items-center">
                  Use our
                  <img
                    src="LimeblockLogo.png"
                    className="hidden md:flex size-4 ml-2 mr-0.5"
                  />{" "}
                  AI <span className="hidden md:block w-2" /> to do any physical
                  marketing from custom donut boxes to sponsoring a bus.
                </div>
                <div>
                  Get back a plan and contract in your email and pay if you want
                  it done.
                </div>
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-1000 transform max-w-2xl mx-auto ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              {!isCompleted && (
                <>
                  <div className="group">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What do you want us to do and where?"
                      className="w-full px-4 py-4 border-2 border-gray-800 rounded-none focus:border-black focus:outline-none text-sm resize-none transition-all duration-300 group-hover:border-gray-600 focus:scale-[1.01] focus:shadow-lg transform"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-4 border-2 border-gray-800 rounded-none focus:border-black focus:outline-none text-sm transition-all duration-300 group-hover:border-gray-600 focus:scale-[1.01] focus:shadow-lg transform"
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="group">
                      <input
                        type="url"
                        id="companyUrl"
                        name="companyUrl"
                        value={formData.companyUrl}
                        onChange={handleChange}
                        placeholder="yourcompany.com"
                        className="w-full px-4 py-4 border-2 border-gray-800 rounded-none focus:border-black focus:outline-none text-sm transition-all duration-300 group-hover:border-gray-600 focus:scale-[1.01] focus:shadow-lg transform"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="group">
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Constraints? Budget?"
                        className="w-full px-4 py-4 border-2 border-gray-800 rounded-none focus:border-black focus:outline-none text-sm transition-all duration-300 group-hover:border-gray-600 focus:scale-[1.01] focus:shadow-lg transform"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </>
              )}

              {(isProcessing || isCompleted) && (
                <div className="py-8 space-y-6 animate-fadeIn">
                  <div className="relative">
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-lime via-green-300 to-lime h-3 transition-all duration-300 ease-out rounded-full relative"
                        style={{ width: `${isCompleted ? 100 : progress}%` }}
                      >
                        {!isCompleted && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div
                        className={`p-3 ${
                          isCompleted ? "bg-green-500" : "bg-lime"
                        } text-white rounded-full ${
                          isCompleted ? "" : "animate-spin"
                        }`}
                      >
                        <CurrentIcon size={20} />
                      </div>
                      <div>
                        <p
                          className={`text-base ${
                            isCompleted ? "text-green-600" : "text-gray-800"
                          } font-medium ${isCompleted ? "" : "animate-pulse"}`}
                        >
                          {currentStatus}
                        </p>
                        {!isCompleted && (
                          <p className="text-xs text-gray-400 mt-1">
                            {Math.round(progress)}% Complete
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isCompleted && (
                    <div className="flex justify-center space-x-2 mt-6">
                      {statusSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                              index <= currentStepIndex
                                ? "bg-black border-black text-white scale-110"
                                : index === currentStepIndex + 1
                                ? "bg-gray-200 border-gray-400 text-gray-600 animate-pulse"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            <StepIcon size={12} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {!isProcessing && !isCompleted && (
                <div className="pt-0">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white py-4 px-8 text-sm font-medium hover:bg-lime transition-all duration-300 border-2 border-black hover:text-black transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
                  >
                    <span className="inline-flex items-center justify-center space-x-2">
                      <span>Generate Plan</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
