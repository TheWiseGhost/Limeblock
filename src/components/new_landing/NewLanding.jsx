"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Navbar from "./Navbar";
import Hero from "./Hero";
import ChatWidget from "../implementation/ChatWidget";
import Demo from "./Demo";
import Info from "./Info";
import FounderNote from "./FounderNote";
import Footer from "./Footer";
import TwoSideExp from "./TwoSideExp";
import Transition from "./Transition";
import Steps from "./Steps";
import FirstTransition from "./FirstTransition";
import ProblemSolution from "./ProblemSolution";

const NewLanding = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center bg-[#F3F3F5]">
      <Navbar />
      <Hero />
      <FirstTransition />
      <ProblemSolution />
      <Steps />
      <Transition />
      <div className="w-full bg-white pb-6">
        <Footer />
      </div>

      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={{}}
      />
    </div>
  );
};

export default NewLanding;
