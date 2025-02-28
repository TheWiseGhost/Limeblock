import React from "react";

const ContextParams = () => {
  return (
    <div className="border border-gray-300 flex flex-row space-x-4 items-center rounded-md w-7/12">
      <div className="flex text-lg font-aeonik items-center justify-center border-r border-gray-300 px-6 h-full">
        Context <br /> Params
      </div>
      <div className="font-inter text-sm">
        <p>User_id, Board_id, User_plan</p>
      </div>
    </div>
  );
};

export default ContextParams;
