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
      <div className="min-h-screen px-4 pb-20 w-full md:w-5/6 mx-auto font-inter">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-inter w-full">
            {/* Free Plan */}
            <div className="rounded-xl bg-gray-50 border-2 border-gray-200 px-10 h-[440px] pt-20 pb-8 flex flex-col relative w-full">
              <div className="flex-grow">
                <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-4">
                  Free
                </h2>
                <ul className="text-gray-700 text-base mt-6 mb-2 ml-4 list-disc">
                  <li>250,000 tokens to get started</li>
                  <li>Full API access</li>
                  <li>Basic analytics</li>
                  <li>Community support</li>
                  <li>Perfect for trying Limeblock</li>
                </ul>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-600 text-sm">/forever</span>
              </div>
              <button
                onClick={() => {
                  window.location.href = "/sign_up/";
                }}
                className="w-full text-gray-900 border-2 font-semibold border-gray-800 rounded-full py-2 px-4 hover:bg-gray-200 mx-auto transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Token Pack */}
            <div className="rounded-xl bg-lime/60 px-10 h-[440px] pt-20 pb-8 flex flex-col relative w-full">
              <div className="absolute top-6 right-6 bg-black text-green-300 text-xs px-4 py-2 font-aeonik rounded-full">
                Best Value
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-aeonik font-medium mb-2 -mt-4">
                  Token Pack
                </h2>
                <ul className="text-gray-900 text-base mt-6 mb-2 ml-4 list-disc">
                  <li>1,000,000 tokens instantly</li>
                  <li>No monthly commitment</li>
                  <li>Tokens never expire</li>
                  <li>Priority support</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$5</span>
                <span className="text-gray-800 text-sm">/one-time</span>
              </div>
              <button
                onClick={() => createCheckout("prod_SaalN81LV6nSbe")}
                className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-30 mx-auto hover:bg-white transition-colors"
              >
                Buy Tokens
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-4 md:px-0 flex flex-col md:flex-row w-full justify-between mt-2">
          <div className="flex flex-col space-y-2">
            <h1 className="font-inter pt-6 text-gray-700 text-sm">
              Tokens are consumed based on the length and complexity of your API
              requests
            </h1>
            <p className="font-inter text-gray-600 text-xs">
              Need more tokens? You can purchase additional token packs anytime
              - they stack on top of your existing balance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
