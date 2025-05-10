import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ChatWidget from "../implementation/ChatWidget";
import Demo from "./Demo";
import Info from "./Info";
import FounderNote from "./FounderNote";
import Footer from "./Footer";
import TwoSideExp from "./TwoSideExp";

const NewLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F3ED]">
      <Navbar />
      <Hero />
      <Demo />
      <TwoSideExp />
      <Info />
      <FounderNote />
      <Footer />
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={{}}
      />
    </div>
  );
};

export default NewLanding;
