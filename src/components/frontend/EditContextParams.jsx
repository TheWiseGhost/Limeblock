import { IconPlus, IconX } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useToast } from "../global/Use-Toast";

const EditContextParams = ({ params, user_id }) => {
  const [newParams, setNewParams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newParamInput, setNewParamInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params) setNewParams(params);
  }, [params]);

  // Function to add a new parameter
  const handleAddParam = () => {
    if (newParamInput.trim()) {
      setNewParams([...newParams, newParamInput.trim()]);
      setNewParamInput("");
      setShowInput(false);
    }
  };

  // Function to delete a single parameter
  const handleDeleteParam = (index) => {
    if (deleteMode) {
      const updatedParams = [...newParams];
      updatedParams.splice(index, 1);
      setNewParams(updatedParams);
    }
  };

  // Function to toggle delete mode
  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  // Function to handle saving
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
        "https://limeblockbackend.onrender.com/api/update_frontend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            context_params: newParams,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast({
          title: `Params Saved!`,
          description: "Your changes have been saved successfully",
        });
      } else {
        toast({
          title: `Error`,
          description: data.message || data.warning || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Error saving params:", error);
      toast({
        title: `Error`,
        description: "Network error, please try again",
      });
    } finally {
      setLoading(false);
      // Exit delete mode after saving
      if (deleteMode) setDeleteMode(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-6 h-fit font-inter">
      <div className="flex items-center justify-between">
        <div className="flex flex-row space-x-6">
          <h2 className="font-aeonik text-2xl">Context Params</h2>
          <div className="space-x-4 flex flex-row font-inter items-center">
            <div
              className="size-7 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer"
              onClick={() => setShowInput(true)}
            >
              <IconPlus />
            </div>
            <div
              className={`size-7 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer ${
                deleteMode ? "bg-red-100 border-red-400" : ""
              }`}
              onClick={toggleDeleteMode}
            >
              <IconX />
            </div>
          </div>
        </div>
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

      {deleteMode && (
        <div className="mb-4 p-2 border border-red-200 bg-red-50 rounded-md text-sm text-red-600 font-inter mt-4">
          Param deletion mode active.
        </div>
      )}

      {/* Add new parameter input field */}
      {showInput && !deleteMode && (
        <div className="mb-4 flex text-sm mt-6">
          <input
            type="text"
            value={newParamInput}
            onChange={(e) => setNewParamInput(e.target.value)}
            placeholder="Enter new parameter"
            className="border border-gray-300 rounded-md py-2 px-3 w-full mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddParam();
            }}
          />
          <button
            onClick={handleAddParam}
            className="bg-white hover:bg-gray-50 border border-gray-400 rounded-md py-1 px-4"
          >
            Add
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="ml-2 bg-white border border-gray-300 py-1 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Display parameters */}
      <div className="space-y-4 mt-6">
        {newParams.map((param, i) => (
          <div
            key={i}
            className={`flex items-center justify-between ${
              deleteMode ? "hover:bg-red-50 cursor-pointer" : ""
            }`}
            onClick={() => handleDeleteParam(i)}
          >
            <div className="flex items-center">
              <div className="bg-gray-400 size-2 rounded-full"></div>
              <span className="ml-2 font-inter text-sm">{param}</span>
            </div>
            {deleteMode && (
              <div className="text-red-500">
                <IconX size={16} />
              </div>
            )}
          </div>
        ))}
        {newParams.length === 0 && (
          <div className="text-gray-500 text-sm font-inter text-center pt-4">
            No parameters added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContextParams;
