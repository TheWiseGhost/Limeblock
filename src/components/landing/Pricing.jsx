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
    <div className="min-h-screen pt-16 md:pt-40 pb-8 px-4 md:px-24 font-inter">
      <h1 className="text-6xl font-aeonik font-semibold mb-12">
        Pricing<span className="text-green-500">.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-inter">
        {/* Basic Plan */}
        <div className="rounded-3xl bg-lime/60 px-10 h-96 pt-20 pb-8 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Basic</h2>
            <p className="text-gray-800 text-base mb-6">
              Start today with zero risk and build your own Limeblock
            </p>
          </div>
          <div className="text-4xl font-bold mb-6">Free</div>
          <button
            onClick={() => window.open("/dashboard")}
            className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-20 mx-auto hover:bg-white transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-3xl bg-lime px-10 h-96 pt-20 pb-8 flex flex-col relative">
          <div className="absolute top-6 right-6 bg-black text-lime text-xs px-4 py-2 font-aeonik rounded-full">
            Most Popular
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Startup</h2>
            <p className="text-gray-900 text-base mb-6">
              Use Limeblock with no paywalls and all its features
            </p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold">$19</span>
            <span className="text-gray-800 text-sm">/month</span>
          </div>
          <button
            onClick={() => createCheckout("prod_RvtLgN1zOEG6iD")}
            className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-20 mx-auto hover:bg-white transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Custom Plan */}
        <div className="rounded-3xl bg-white border-2 border-black px-10 h-96 pt-20 pb-8 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
            <p className="text-gray-800 text-base mb-6">
              Need more? Get a custom coded board to host on your site
            </p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold">$99</span>
            <span className="text-gray-800 text-sm">/month</span>
          </div>
          <button
            onClick={() => createCheckout("prod_RvtL5HMB98eLLm")}
            className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-50 hover:bg-gray-200 mx-auto transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
