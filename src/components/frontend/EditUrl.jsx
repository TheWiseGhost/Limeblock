import React, { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

const EditUrl = ({ url, user_id }) => {
  const [newUrl, setNewUrl] = useState(url || "");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (url) setNewUrl(url);
  }, [url]);

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!user_id) {
        toast({
          title: `Error`,
          description: "User ID is missing",
          variant: "destructive",
        });
        return;
      }

      // Small delay for better user experience
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        "http://127.0.0.1:8000/api/update_frontend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            url: newUrl,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: `Url Saved!`,
          description: "Your changes have been saved successfully",
        });
      } else {
        toast({
          title: `Error`,
          description: data.message || data.warning || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Error saving url:", error);
      toast({
        title: `Error`,
        description: "Network error, please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 flex flex-row space-x-4 items-center rounded-md p-6">
      <label className="block text-xl font-aeonik">URL:</label>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        className="w-full p-3 border rounded focus:ring-2 focus:ring-lime-500 focus:border-transparent font-inter text-sm"
      />
      <button
        onClick={handleSave}
        className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
      >
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
          "Save"
        )}
      </button>
    </div>
  );
};

export default EditUrl;
