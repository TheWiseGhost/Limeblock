import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

const NewLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20 bg-[#F5F3ED]">
      <Navbar />
      <Hero />
      <Hero />
    </div>
  );
};

export default NewLanding;
