import React, { useState } from "react";

const EditUrl = () => {
  const [url, setUrl] = useState("https://competiboard.com");
  // Function to handle saving (placeholder for now)
  const handleSave = () => {
    alert("Save functionality will be implemented in the future");
  };

  return (
    <div className="border border-gray-300 flex flex-row space-x-4 items-center rounded-md p-4 w-5/12">
      <label className="block text-xl font-aeonik">URL:</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border rounded focus:ring-2 focus:ring-lime-500 focus:border-transparent font-inter text-sm"
      />
      <button
        onClick={handleSave}
        className="border border-gray-400 rounded-lg py-2 px-4 font-inter text-sm hover:bg-gray-50 transition-colors"
      >
        Save
      </button>
    </div>
  );
};

export default EditUrl;
