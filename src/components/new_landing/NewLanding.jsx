"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Demo from "./Demo";
import Info from "./Info";
import FounderNote from "./FounderNote";
import Footer from "./Footer";
import TwoSideExp from "./TwoSideExp";
import Transition from "./Transition";
import Steps from "./Steps";
import FirstTransition from "./FirstTransition";
import ProblemSolution from "./ProblemSolution";
import Pricing from "./Pricing";
import Process from "./Process";
import InAppActions from "../landing/InAppActions";
import MCP from "./MCP";
import HowItWorks from "./HowItWorks";
import WhyAI from "./WhyAI";

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
    <div className="flex flex-col w-full items-center justify-center bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <FirstTransition />
      <HowItWorks />
      <MCP />
      <Process />
      <WhyAI />
      <Steps />
      <Info />
      <Transition />
      <Pricing />
      <div className="w-full bg-white pb-6">
        <Footer />
      </div>
    </div>
  );
};

export default NewLanding;
