import React from "react";

const Footer = () => {
  return (
    <div className="h-[120px] md:h-[240px] bg-[#7BCF78] flex flex-col">
      <h1 className="text-center font-aeonik font-semibold text-white text-[100px] md:text-[240px] leading-none -mt-[26px] md:-mt-[62px]">
        Limeblock
      </h1>
      <div className="border-t-2 h-full rounded-3xl flex font-inter text-white justify-between text-sm md:text-base px-4 md:px-32 flex-row items-center">
        <div className="">
          <p className="">Contact: byjuaditya@gmail.com</p>
        </div>
        <div className="">
          <p className="">2025</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
