"use client";

import { IconShield } from "@tabler/icons-react";
import React from "react";

const Pricing = () => {
  // createCheckout function remains the same
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
    <div className="min-h-screen pt-24 px-4 pb-20 md:px-16 font-inter">
      <h1 className="flex flex-col md:flex-row items-center font-aeonik text-4xl md:text-7xl font-medium mb-12">
        Pricing and Plans{" "}
        <div className="bg-gray-50 flex flex-row items-center border text-gray-800 border-gray-600 ml-0 md:ml-8 mt-4 font-inter px-2 md:px-4 text-xs md:text-sm py-1 rounded-full">
          <IconShield className="size-4 mr-1" /> 30 Day Money Back Guarantee
        </div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-inter">
        <div className="rounded-xl bg-lime/60 px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="absolute top-6 right-6 bg-black text-green-300 text-xs px-4 py-2 font-aeonik rounded-full">
            Most Popular
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-2">
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

        <div className="rounded-xl bg-lime/90 px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-2">
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

        <div className="rounded-xl bg-white border-2 border-black px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium -mt-2 mb-2">
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
          onClick={() =>
            window.alert("Contact our founder with byjuaditya@gmail.com")
          }
          className="hidden md:flex px-4 font-inter underline pt-6 text-gray-700 text-sm hover:text-gray-900"
        >
          Request Free Trial
        </button>
      </div>
    </div>
  );
};

export default Pricing;
