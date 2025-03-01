import React, { useState, useEffect } from "react";

const ContextParams = ({ user_id }) => {
  const [params, setParams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch frontend details using the same user_id
        const frontendResponse = await fetch(
          "http://127.0.0.1:8000/api/frontend_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id }),
          }
        );

        const frontendData = await frontendResponse.json();

        if (frontendData.success) {
          setParams(frontendData.frontend.context_params);
        } else {
          console.log("Failed to load frontend settings");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Network error, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border border-gray-300 flex flex-row space-x-4 items-center rounded-md w-7/12">
      <div className="flex text-lg font-aeonik items-center justify-center border-r border-gray-300 px-6 h-full leading-6">
        Context <br /> Params
      </div>
      <div className="font-inter text-sm">
        {loading ? (
          <>
            <svg
              className="animate-spin size-4 mx-2 text-black"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </>
        ) : (
          <div className="flex flex-row space-x-3">
            {params.map((param, i) => (
              <span key={i} className="font-inter text-sm ">
                {param}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextParams;
