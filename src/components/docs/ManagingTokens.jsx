import React from "react";

const ManagingTokens = () => {
  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
          <div className="flex flex-row space-x-2 items-center mb-6">
            <img src="/LimeblockLogo.png" className="size-6" />
            <p className="font-aeonik text-sm text-gray-900 text-center">
              Limeblock Docs
            </p>
          </div>
          <h1 className="text-4xl font-aeonik font-medium mb-8">
            Managing Your Tokens
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              Limeblock uses a token-based pricing model to provide flexible and
              fair usage billing. Understanding how tokens work will help you
              optimize your costs and ensure uninterrupted service.
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Token Pricing
            </h2>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="text-center">
                <h3 className="font-aeonik font-medium text-black text-2xl mb-2">
                  $5 per 1M tokens
                </h3>
                <p className="text-gray-700">
                  Simple, transparent pricing with no hidden fees or monthly
                  limits
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Understanding Token Usage
            </h2>

            <p className="mb-4">
              Token consumption varies based on the type and complexity of
              interactions with Limeblock
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Simple Text Prompts
                </h3>
                <p className="text-gray-700">
                  Basic questions or short conversations typically use{" "}
                  <span className="font-semibold text-gray-900">
                    50-200 tokens
                  </span>{" "}
                  per exchange. This includes simple Q&A, basic information
                  requests, and brief interactions.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Complex Conversations
                </h3>
                <p className="text-gray-700">
                  Detailed discussions, multi-part questions, or longer context
                  conversations use{" "}
                  <span className="font-semibold text-gray-900">
                    200-800 tokens
                  </span>{" "}
                  per exchange. Context from previous messages adds to token
                  count.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Small AI Actions
                </h3>
                <p className="text-gray-700">
                  Basic tasks like formatting text, simple calculations, or
                  quick data processing typically consume{" "}
                  <span className="font-semibold text-gray-900">
                    100-500 tokens
                  </span>{" "}
                  per action.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Large AI Actions
                </h3>
                <p className="text-gray-700">
                  Complex tasks such as generating detailed content, analyzing
                  large datasets, or performing multi-step workflows can use{" "}
                  <span className="font-semibold text-gray-900">
                    1,000-5,000+ tokens
                  </span>{" "}
                  per action.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-700">
                <strong>Reference:</strong> As a rough estimate, 1 token ≈ 0.75
                words in English. A typical sentence uses about 15-25 tokens,
                while a paragraph might use 100-300 tokens.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Monitoring Token Usage
            </h2>
            <p className="mb-4">
              Keep track of your token consumption through your Limeblock
              analytics dashboard. When your token balance gets low, Limeblock
              will notify you, but it's best to top up proactively to avoid any
              service interruptions.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Tip:</strong> Set up balance alerts in your dashboard to
                receive notifications when your token count drops below a
                threshold you set. This helps you stay ahead of your usage
                needs.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
              Purchasing More Tokens
            </h2>
            <p className="mb-8">
              When your token balance is running low, you can easily purchase
              more tokens. Click the button below to add tokens to your account
              and keep your service running smoothly.
            </p>

            <a
              href="/checkout/"
              className="bg-gray-900 hover:bg-gray-800 text-white font-inter font-normal px-4 py-3 rounded-lg text-sm transition-colors"
            >
              Purchase Tokens
            </a>

            <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Limeblock stops responding
                </h3>
                <p>
                  If Limeblock stops accepting new prompts, check your token
                  balance in the analytics dashboard. You may need to purchase
                  additional tokens to continue service.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Unexpected high token usage
                </h3>
                <p>
                  Review your recent interactions in the dashboard. Complex AI
                  actions, long conversations, or processing large amounts of
                  text can significantly increase token consumption.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Unable to purchase tokens
                </h3>
                <p>
                  Ensure you're logged into your Limeblock account and your
                  payment method is valid. If issues persist, contact our
                  support team for assistance.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Getting Help & Discounts
            </h2>
            <p className="mb-4">
              Need assistance with token management or looking for volume
              discounts? We're here to help:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Contact our founder directly at{" "}
                <a
                  href="mailto:byjuaditya@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  byjuaditya@gmail.com
                </a>{" "}
                for personalized support and to discuss volume discounts
              </li>
              <li>
                Check our comprehensive{" "}
                <a href="/docs" className="text-blue-600 hover:underline">
                  documentation
                </a>{" "}
                for optimization tips
              </li>
              <li>
                Reach out if you're planning high-volume usage - we offer custom
                pricing for enterprise customers
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Volume Discounts Available:</strong> Planning to use
                more than 10M tokens per month? Contact us for special pricing
                and dedicated support to help optimize your token usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagingTokens;
