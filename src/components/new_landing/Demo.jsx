import React from "react";

const Demo = () => {
  return (
    <div className="flex flex-col min-h-fit w-full px-12">
      <div className="p-10 pb-0 bg-lime rounded-[3rem] ">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-fit w-full object-contain rounded-t-2xl"
          src="/UpdateWidgetColor.mp4"
        ></video>
      </div>
    </div>
  );
};

export default Demo;
