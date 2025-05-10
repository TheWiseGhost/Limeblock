import { Database } from "lucide-react";

export default function TwoSideExp() {
  return (
    <div className="w-full bg-none min-h-screen flex flex-col items-center justify-center p-4 font-inter">
      {/* Logo and heading */}
      <div className="text-center mb-16">
        <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-white py-2 px-4 rounded-xl">
          <img className="size-5 rounded-ful mr-2" src="/LimeblockLogo.png" />
          <span className="text-sm font-medium">Meet Limeblock</span>
        </div>
        <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
          Just add pages, endpoints, schemas.
        </h1>
      </div>

      {/* Two feature sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Connect your databases and third-party APIs
          </h2>
          <p className="text-gray-600 mb-6">
            We'll understand how your app works using your connected data
            sources.
          </p>

          <div className="border border-gray-200 rounded-lg p-4 flex items-center">
            <Database className="text-gray-500 mr-2" size={20} />
            <span className="text-gray-700">lime-background-db</span>
            <div className="ml-auto">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 mt-4 flex items-center">
            <Database className="text-gray-500 mr-2" size={20} />
            <span className="text-gray-500">No Database</span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Tell Limeblock about what tool you want to build
          </h2>
          <p className="text-gray-600 mb-6">
            Limeblock can create a production-grade internal tools in just a few
            messages!
          </p>

          <div className="border border-gray-200 rounded-lg p-4 flex items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              What to build?
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
