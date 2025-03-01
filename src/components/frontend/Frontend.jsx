import React, { useState, useEffect } from "react";
import EditUrl from "./EditUrl";
import EditWidget from "./EditWidget";
import EditContextParams from "./EditContextParams";
import PageEndpointTree from "./PageEndpointTree";

const Frontend = () => {
  const [user, setUser] = useState(null);
  const [frontend, setFrontend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          window.location.href = "/sign_in/";
          return;
        }

        // Fetch user details
        const userResponse = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const userData = await userResponse.json();

        if (userData.success) {
          setUser(userData.user);

          // Fetch frontend details using the same user_id
          const frontendResponse = await fetch(
            "http://127.0.0.1:8000/api/frontend_details/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          const frontendData = await frontendResponse.json();

          if (frontendData.success) {
            setFrontend(frontendData.frontend);
          } else {
            setError("Failed to load frontend settings");
          }
        } else {
          setError("Failed to load user information");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          {user?.business_name} - Frontend
        </h1>
        <button className="bg-white hover:bg-gray-50 border border-gray-600 font-aeonik px-6 py-2 rounded-lg text-base transition-colors">
          Upgrade
        </button>
      </div>

      {user && frontend ? (
        <div className="flex flex-row gap-8">
          <div className="space-y-6 w-5/12">
            <EditUrl url={frontend?.url} user_id={user?.id} />
            <EditWidget
              body={frontend?.body || "#90F08C"}
              eyes={frontend?.eyes || "#FFFFFF"}
              size={frontend?.size || 12}
              user_id={user?.id}
            />
            <EditContextParams
              context_params={frontend?.context_params || []}
              user_id={user?.id}
            />
          </div>
          <div className="w-7/12">
            <PageEndpointTree
              folders={frontend?.folders || []}
              url={frontend?.url}
              user_id={user?.id}
            />
          </div>
        </div>
      ) : (
        <div className="text-center p-6">
          <p>No data available. Please refresh the page or contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Frontend;
