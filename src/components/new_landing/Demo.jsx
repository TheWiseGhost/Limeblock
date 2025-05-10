import React from "react";

const Demo = () => {
  return (
    <div className="flex flex-col min-h-fit w-full px-12 pb-20">
      <div
        className="p-10 pb-0 rounded-[2rem]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/enchanting-forest-landscape-fern-leaf-mystery-generative-ai_188544-8749.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          className="h-fit w-full object-contain rounded-t-2xl"
          src="/FrontendImg.png"
        ></img>
      </div>
    </div>
  );
};

export default Demo;
