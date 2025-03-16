import React from "react";

const Footer = () => {
  return (
    <div className="h-[240px] bg-[#7BCF78] flex flex-col">
      <h1 className="text-center font-aeonik font-semibold text-white text-[240px] leading-none -mt-[62px]">
        Limeblock
      </h1>
      <div className="border-t-2 h-full rounded-3xl flex font-inter text-white justify-between px-32 flex-row items-center">
        <div className="">
          <p className="">All systems operational</p>
        </div>
        <div className="">
          <p className="">2025</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
