"use client";

import React, { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

const Pricing = () => {
  // createCheckout function remains the same
  const [isHovered, setIsHovered] = useState(false);
  const createCheckout = (prod_id) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        window.location.href = "/sign_up/";
        return;
      }

      const create = async () => {
        try {
          const response = await fetch(
            "https://limeblockbackend.onrender.com/api/create_checkout_session/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product_id: prod_id,
                user_id: userId,
              }),
            }
          );

          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
        }
      };

      create();
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen px-4 pb-20 w-11/12 mx-auto font-inter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-inter">
          <div className="rounded-xl bg-lime/60 px-10 h-[440px] pt-20 pb-8 flex flex-col relative w-full">
            <div className="absolute top-6 right-6 bg-black text-green-300 text-xs px-4 py-2 font-aeonik rounded-full">
              Most Popular
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-4">
                Startup
              </h2>
              <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
                <li>MAU Analytics</li>
                <li>5 Team Members</li>
                <li>15 Pages</li>
                <li>10 API Endpoints</li>
                <li className="font-semibold">100 MAUs</li>
              </ul>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-gray-800 text-sm">/month</span>
            </div>
            <button
              onClick={() => createCheckout("prod_RzHMsNHXCLy0o6")}
              className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-30 mx-auto hover:bg-white transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="rounded-xl bg-lime/90 px-10 h-[440px] pt-20 pb-8 flex flex-col relative w-full">
            <div className="flex-grow">
              <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-4">
                Business
              </h2>
              <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
                <li>Full Analytics</li>
                <li>20 Team Members</li>
                <li>30 Pages</li>
                <li>20 API Endpoints</li>
                <li className="font-semibold">1,000 MAUs</li>
              </ul>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">$149</span>
              <span className="text-gray-800 text-sm">/month</span>
            </div>
            <button
              onClick={() => createCheckout("prod_RzHNbu0fjuTZlu")}
              className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-30 mx-auto hover:bg-white transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="rounded-xl bg-white border-2 border-black px-10 h-[440px] pt-20 pb-8 flex flex-col relative w-full">
            <div className="flex-grow">
              <h2 className="text-3xl font-aeonik font-medium -mt-4 mb-2">
                Enterprise
              </h2>
              <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
                <li>Full Analytics</li>
                <li>Unlimited Team Members</li>
                <li>Chat History / Logs</li>
                <li>Unlimited Pages</li>
                <li>Unlimited Endpoints</li>
                <li className="font-semibold">5,000 MAUs</li>
              </ul>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">$499</span>
              <span className="text-gray-800 text-sm">/month</span>
            </div>
            <button
              onClick={() => createCheckout("prod_S3HJuA15K2CkU6")}
              className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-70 hover:bg-gray-200 mx-auto transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="px-4 md:px-0 flex flex-col md:flex-row w-full justify-between">
          <h1 className="font-inter pt-6 text-gray-700 text-sm">
            * MAU = Monthly Active User who sends at least one message to your
            Limeblock Chat Widget
          </h1>
          <button
            className="inline-flex items-center bg-gray-200 mt-4 z-20 w-fit text-black px-6 py-4 rounded-xl font-medium transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
            <span className="ml-3 text-[0.9rem]">Try Free Today</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
