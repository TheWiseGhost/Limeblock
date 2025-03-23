"use client";

import React from "react";

const Pricing = () => {
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
            "http://127.0.0.1:8000/api/create_checkout_session/",
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
            window.location.href = data.url; // Redirect to Stripe checkout
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
      <h1 className="flex flex-row items-center font-aeonik text-7xl font-medium mb-12">
        Launch Week Deals{" "}
        <div className="bg-gray-50 border text-gray-800 border-gray-600 ml-8 mt-4 font-inter px-4 text-sm py-1 rounded-full">
          Expires Soon
        </div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-inter px-4">
        {/* Basic Plan */}
        <div className="rounded-xl bg-lime/60 px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-2">
              Basic
            </h2>
            <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
              <li>
                <span className="line-through">6 Frontend Endpoints</span>
              </li>
              <li>
                <span className="line-through">4 Backend Endpoints</span>
              </li>
              <li>
                <span className="line-through">10 MAUs</span>
              </li>
            </ul>
            <span className="font-aeonik text-lg font-medium mt-4">
              Launch Week Only:
            </span>{" "}
            <ul className="text-gray-900 text-base mb-2 ml-4 list-disc">
              <li>Unlimited Endpoints</li>
              <li>20 MAUs</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold">$0</span>
            <span className="text-gray-800 text-sm">/forever</span>
          </div>
          <button
            onClick={() => {
              window.location.href = "/auth_prompt/";
            }}
            className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-30 mx-auto hover:bg-white transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-xl bg-lime/90 px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="absolute top-6 right-6 bg-black text-lime text-xs px-4 py-2 font-aeonik rounded-full">
            Most Popular
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-2">
              Startup
            </h2>
            <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
              <li>
                <span className="line-through">30 Frontend Endpoints</span>
              </li>
              <li>
                <span className="line-through">20 Backend Endpoints</span>
              </li>
              <li>
                <span className="line-through">100 MAUs</span>
              </li>
            </ul>
            <span className="font-aeonik text-lg font-medium mt-4">
              Launch Week Only:
            </span>{" "}
            <ul className="text-gray-900 text-base mb-2 ml-4 list-disc">
              <li>Unlimited Endpoints</li>
              <li>200 MAUs</li>
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

        {/* Custom Plan */}
        <div className="rounded-xl bg-white border-2 border-black px-10 h-[460px] pt-20 pb-8 flex flex-col relative w-full">
          <div className="flex-grow">
            <h2 className="text-3xl font-aeonik font-medium -mt-2 mb-2">
              Enterprise
            </h2>
            <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
              <li>
                <span className="line-through">100 Frontend Endpoints</span>
              </li>
              <li>
                <span className="line-through">100 Backend Endpoints</span>
              </li>
              <li>
                <span className="line-through">2,000 MAUs</span>
              </li>
            </ul>
            <span className="font-aeonik text-lg font-medium mt-4">
              Launch Week Only:
            </span>{" "}
            <ul className="text-gray-900 text-base mb-2 ml-4 list-disc">
              <li>Unlimited Endpoints</li>
              <li>5,000 MAUs</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold">$99</span>
            <span className="text-gray-800 text-sm">/month</span>
          </div>
          <button
            onClick={() => createCheckout("prod_RzHNbu0fjuTZlu")}
            className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-70 hover:bg-gray-200 mx-auto transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
