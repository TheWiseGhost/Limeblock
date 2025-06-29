import React, { useState, useEffect } from "react";
import EditUrl from "./EditUrl";
import ContextParams from "./ContextParams";
import ApiEndpointTree from "./ApiEndpointTree";
import Access from "./Access";
import { ChatWidget } from "@limeblock/react";
import {
  IconBug,
  IconBulb,
  IconCrown,
  IconFileText,
} from "@tabler/icons-react";

const Backend = () => {
  const [user, setUser] = useState(null);
  const [backend, setBackend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const contextParams = {
    user_id: user?.id,
    backend_folders: backend?.folders,
    url: backend?.url,
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          window.location.href = "/sign_in/";
        }

        const response = await fetch(
          "https://limeblockbackend.onrender.com/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const userData = await response.json();
        if (userData.success) {
          setUser(userData.user);

          // Fetch backend details using the same user_id
          const backendResponse = await fetch(
            "https://limeblockbackend.onrender.com/api/backend_details/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          const backendData = await backendResponse.json();

          if (backendData.success) {
            setBackend(backendData.backend);
          } else {
            setError("Failed to load backend settings");
          }
        } else {
          setError("Failed to load user information");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="bg-white w-full flex items-center justify-center h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 mx-auto text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-3 font-inter">Loading your stuff...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white w-full flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-y-auto pb-12 pt-8 pr-12 pl-10 border-l border-gray-300 rounded-tl-[12px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-aeonik font-medium">
          {user?.business_name} - Endpoints
        </h1>
        <div className="flex flex-row w-fit items-center space-x-5">
          <button
            onClick={() => {
              window.location.href = "/docs/request/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconBulb className="size-5 mr-1.5 text-green-400 -mt-0.5" />
            Request Feature
          </button>
          <button
            onClick={() => {
              window.location.href = "/docs/report/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconBug className="size-5 mr-1.5 text-red-400 -mt-0.5" />
            Report Bug
          </button>
          <button
            onClick={() => {
              window.location.href = "/docs/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconFileText className="size-5 mr-1.5 text-gray-400 -mt-0.5" />
            Docs
          </button>
          <button
            onClick={() => {
              window.location.href = "/checkout/";
            }}
            className="bg-white flex flex-row items-center hover:bg-gray-50 border border-gray-400 font-inter px-3 py-2 rounded-lg text-xs transition-colors"
          >
            <IconCrown className="size-5 mr-1.5 text-yellow-500 -mt-0.5" />
            Upgrade
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex flex-row space-x-6">
          <EditUrl url={backend?.url} user_id={user?.id} />
          <Access />
        </div>
        <ApiEndpointTree
          folders={backend?.folders}
          url={backend?.url}
          user_id={user?.id}
          api_key={user?.api_key}
        />
      </div>
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={contextParams}
      />
    </div>
  );
};

export default Backend;
