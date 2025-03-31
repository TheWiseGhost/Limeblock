import React from "react";

const FrontendDocs = () => {
  return (
    <div className="flex flex-col px-4 py-8 max-w-4xl mx-auto font-inter text-sm">
      <div className="flex flex-row space-x-2 items-center mb-6">
        <img src="/LimeblockLogo.png" className="size-6" />
        <p className="font-aeonik text-sm text-gray-900 text-center">
          Limeblock Docs
        </p>
      </div>
      <h1 className="text-4xl font-aeonik font-medium mb-8">Frontend Docs</h1>

      <div className="space-y-8">
        <p className="mb-4">
          These Frontend Docs will tell you everything you need to know about
          using Limeblock's frontend functionality We will cover styling your
          Widget, ChatWidget, and Page Navigation.
        </p>
        <section>
          <h2 className="text-2xl font-medium mb-4 font-aeonik">
            Widget Appearance
          </h2>
          <p className="mb-4">
            Customize how your Limeblock widget looks and behaves on your
            website with our intuitive styling tools.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Body Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-400 rounded-md"></div>
                  <span className="font-mono">#90F08C</span>
                </div>
                <p className="text-xs text-gray-500">
                  Main color of your widget bubble
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Eyes Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-md"></div>
                  <span className="font-mono">#FFFFFF</span>
                </div>
                <p className="text-xs text-gray-500">
                  Accent color for widget details
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Size</label>
                <div className="flex items-center space-x-2">
                  <input type="range" className="w-full" disabled />
                  <span>12</span>
                </div>
                <p className="text-xs text-gray-500">
                  Scale of the widget (1-20)
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Position
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled
                >
                  <option>Bottom Right</option>
                </select>
                <p className="text-xs text-gray-500">
                  Widget placement on your page
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4 font-aeonik">
            Chat UI Styling
          </h2>
          <p className="mb-4">
            Customize the appearance of the chat interface to match your brand
            identity.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  AI Text
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-md"></div>
                  <span className="font-mono">#000000</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  User Text
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-md"></div>
                  <span className="font-mono">#000000</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Page Background
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-md"></div>
                  <span className="font-mono">#FFFFFF</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  AI Message Background
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-md"></div>
                  <span className="font-mono">#F3F4F6</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  User Message Background
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                  <span className="font-mono">#E5E7EB</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Banner Color
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-400 rounded-md"></div>
                  <span className="font-mono">#90F08C</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Page Title
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="Chat Assistant"
                  disabled
                />
                <p className="text-xs text-gray-500">
                  Title displayed in chat window header
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                  Start Text
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="How can I help you today?"
                  rows={2}
                  disabled
                />
                <p className="text-xs text-gray-500">
                  Initial message shown to users
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-700">
              <strong>Tip:</strong> All styling changes are applied in real-time
              - your users will see it too. Watch the block on your site or app
              to see exactly how your widget will appear.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4 font-aeonik">
            Page Navigation Configuration
          </h2>
          <p className="mb-4">
            Define how your widget interacts with your application's pages for a
            seamless user experience.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium mb-4">Page Endpoint Tree</h3>

            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Documentation</h4>
                <button className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Add Page
                </button>
              </div>

              <div className="pl-4 space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        https://limeblock.io/docs/getting_started/
                      </div>
                      <div className="text-xs text-gray-500">
                        Getting Started Guide
                      </div>
                    </div>
                    <button className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs mt-2">
                    Complete walkthrough for new users setting up their first
                    Limeblock widget. Covers account creation, basic
                    configuration, and implementation steps.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        https://limeblock.io/docs/frontend/
                      </div>
                      <div className="text-xs text-gray-500">
                        Frontend Customization
                      </div>
                    </div>
                    <button className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs mt-2">
                    Comprehensive guide to customizing widget appearance
                    including colors, fonts, sizes, and positioning. Includes
                    best practices for brand alignment.
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full border border-dashed border-gray-300 text-gray-500 py-2 rounded-lg">
              + Add Folder
            </button>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">
              <strong>Important Note:</strong> Provide detailed and accurate
              descriptions for each page. These descriptions help the AI
              understand your site structure and generate appropriate navigation
              links when users ask questions.
            </p>
          </div>

          <h3 className="font-medium mb-3">
            Best Practices for Page Descriptions
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Be specific about the page's purpose</li>
            <li>Include keywords that users might search for</li>
            <li>Describe the main actions or information available</li>
            <li>
              Keep descriptions between 2-4 sentences for optimal indexing
            </li>
            <li>Mention the primary user needs this page addresses</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Example Description</h4>
            <div className="flex space-x-3">
              <div className="font-medium text-gray-400">/pricing</div>
              <div>
                <p className="font-medium">Pricing Plans</p>
                <p className="text-sm">
                  Comparison of all available subscription tiers. Features
                  detailed breakdowns of Free, Pro, and Enterprise plans with
                  pricing and feature differences. Users can upgrade their
                  account directly from this page.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col">
          <h2 className="text-2xl font-aeonik font-medium mt-8 mb-4">
            Getting Help
          </h2>
          <p className="mb-4">
            If you need assistance with your Limeblock implementation:
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
  );
};

export default FrontendDocs;
