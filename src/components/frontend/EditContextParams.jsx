import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import React from "react";

const EditContextParams = () => {
  const params = [
    { id: 1, name: "User_id" },
    { id: 2, name: "Board_id" },
    { id: 3, name: "User_plan" },
  ];

  // Function to handle saving (placeholder for now)
  const handleSave = () => {
    alert("Save functionality will be implemented in the future");
  };

  return (
    <div className="border rounded-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-row space-x-6">
          <h2 className="font-aeonik text-2xl">Context Params</h2>
          <div className="space-x-4 flex flex-row font-inter items-center">
            <div className="size-8 px-[8px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer">
              <IconPlus />
            </div>
            <div className="size-8 px-[8px] flex items-center justify-center border border-gray-400 rounded hover:bg-gray-50 hover:cursor-pointer">
              <IconX />
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

      <div className="space-y-4 font-inter">
        {params.map((param) => (
          <div key={param.id} className="flex items-center">
            <div className="bg-gray-400 size-2 rounded-full"></div>
            <span className="ml-2">{param.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditContextParams;
