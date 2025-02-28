import { IconFolderPlus, IconFolderX } from "@tabler/icons-react";
import React from "react";

const PageEndpointTree = () => {
  // Function to handle saving (placeholder for now)
  const handleSave = () => {
    alert("Save functionality will be implemented in the future");
  };

  return (
    <div className="border rounded-lg p-6 h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-row space-x-6">
          <h2 className="font-aeonik text-2xl">Page Endpoint Tree</h2>
          <div className="space-x-4 flex flex-row font-inter items-center">
            <div className="size-8 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer">
              <IconFolderPlus />
            </div>
            <div className="size-8 px-[6px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer">
              <IconFolderX />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
        >
          Save
        </button>
      </div>

      <div className="min-h-[400px]">
        {/* Tree content will go here */}
        {/* This would typically be implemented with a tree view component */}
      </div>
    </div>
  );
};

export default PageEndpointTree;
