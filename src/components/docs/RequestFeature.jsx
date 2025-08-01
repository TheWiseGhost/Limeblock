import React from "react";

const RequestFeature = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col mx-auto px-4 py-8 max-w-4xl font-inter">
        <div className="flex flex-row space-x-2 items-center mb-6">
          <img src="/LimeblockLogo.png" className="size-6" />
          <p className="font-aeonik text-sm text-gray-900 text-center">
            Limeblock Docs
          </p>
        </div>
        <h1 className="text-4xl font-aeonik font-medium mb-8">
          Request a Feature
        </h1>

        <div className="text-sm max-w-none">
          <p className="mb-4">
            If you think you have an idea for something new within Limeblock,
            please contact us through our founder's email at{" "}
            <span className="text-blue-600">byjuaditya@gmail.com</span>
            <br />
            <br />
            We are open to doing zoom calls to fully understand your idea and
            bring it to life.
            <br />
            <br />
            Thank you for being an active user of Limeblock!
          </p>
        </div>

        <a
          href="/dashboard"
          className="text-sm mt-4 w-fit rounded-lg px-4 py-3 font-inter text-white bg-gray-900 hover:bg-gray-800 transition duration-200"
        >
          Dashboard
        </a>
        <h2 className="text-2xl font-aeonik font-medium mt-12 mb-4">
          Getting Help
        </h2>
        <p className="mb-4 text-sm">
          If you need assistance with your Limeblock implementation:
        </p>
        <ul className="list-disc pl-6 mb-6 text-sm">
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
  );
};

export default RequestFeature;
