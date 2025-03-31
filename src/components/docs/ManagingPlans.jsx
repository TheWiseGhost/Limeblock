import React from "react";

const ManagingPlans = () => {
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
            Managing Your Plan
          </h1>

          <div className="text-sm max-w-none">
            <p className="mb-4">
              Limeblock offers different plans with varying Monthly Active User
              (MAU) limits to suit your needs. Here's a breakdown of the MAU
              limits for each plan:
            </p>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Plan Overview
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Basic Plan
                </h3>
                <p className="text-gray-700">
                  The <strong>Basic Plan</strong> allows for up to{" "}
                  <span className="font-semibold text-gray-900">20 MAUs</span>.
                  This plan is ideal for small projects or testing purposes.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Startup Plan
                </h3>
                <p className="text-gray-700">
                  The <strong>Startup Plan</strong> increases your limit to{" "}
                  <span className="font-semibold text-gray-900">100 MAUs</span>.
                  This plan is perfect for growing businesses with moderate
                  traffic.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-aeonik font-medium text-black text-lg">
                  Enterprise Plan
                </h3>
                <p className="text-gray-700">
                  The <strong>Enterprise Plan</strong> provides a generous limit
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    1,000 MAUs
                  </span>
                  . This plan is designed for large-scale applications with high
                  user engagement.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Monitoring MAU Usage
            </h2>
            <p className="mb-4">
              If you exceed your MAU limit, your Limeblock widget will
              temporarily stop accepting new prompts or messages until the next
              billing cycle or until you upgrade your plan. Regularly monitor
              your analytics to ensure your plan meets your needs.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Tip:</strong> If you're consistently nearing your MAU
                limit, consider upgrading to a higher plan to avoid
                interruptions in service.
              </p>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
              Upgrading Your Plan
            </h2>
            <p className="mb-8">
              To upgrade your plan, click the button below. You'll be redirected
              to the checkout page where you can select a new plan that better
              suits your needs.
            </p>

            <a
              href="/checkout"
              className="bg-gray-900 hover:bg-gray-800 text-white font-inter font-normal px-4 py-3 rounded-lg text-sm transition-colors"
            >
              Upgrade Plan
            </a>

            <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter font-medium text-base">
                  Widget not accepting new prompts
                </h3>
                <p>
                  If your widget stops accepting new prompts, check your MAU
                  usage in the analytics dashboard. You may have reached your
                  plan's limit.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-inter text-base font-medium">
                  Unable to upgrade
                </h3>
                <p>
                  If you're having trouble upgrading your plan, ensure you're
                  logged into your Limeblock account and try again. If the issue
                  persists, contact support.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
              Getting Help
            </h2>
            <p className="mb-4">
              If you need assistance with managing your plan or understanding
              MAU limits:
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
                for personalized support
              </li>
              <li>
                Check our comprehensive{" "}
                <a href="/docs" className="text-blue-600 hover:underline">
                  documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagingPlans;
