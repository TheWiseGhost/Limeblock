import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ChatWidget from "../implementation/ChatWidget";
import Demo from "./Demo";
import Info from "./Info";

const NewLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20 bg-[#F5F3ED]">
      <Navbar />
      <Hero />
      <Demo />
      <Info />
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={{}}
      />
    </div>
  );
};

export default NewLanding;
