import React, { useState, useEffect } from "react";
import EditUrl from "./EditUrl";
import EditWidget from "./EditWidget";
import EditContextParams from "./EditContextParams";
import PageEndpointTree from "./PageEndpointTree";

const Frontend = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          window.location.href = "/sign_in/";
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

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

      <div className="flex flex-row gap-8">
        <div className="space-y-6 w-5/12">
          <EditUrl />
          <EditWidget />
          <EditContextParams />
        </div>
        <div className="w-7/12">
          <PageEndpointTree />
        </div>
      </div>
    </div>
  );
};

export default Frontend;
