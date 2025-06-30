"use client";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Navbar from "../Navbar";
import Hero from "../Hero";
import Demo from "../Demo";
import Info from "../Info";
import FounderNote from "../FounderNote";
import Footer from "../../landing/Footer";
import TwoSideExp from "../TwoSideExp";
import Steps from "../Steps";

import Pricing from "../Pricing";
import Process from "../Process";
import MCP from "../MCP";
import HowItWorks from "../HowItWorks";
import MobileHero from "./MobileHero";
import MobileSteps from "./MobileSteps";
import MobileMCP from "./MobileMCP";
import MobileHowItWorks from "./MobileHowItWorks";
import MobileInfo from "./MobileInfo";
import MobileWhyAI from "./MobileWhyAI";

const MobileNewLanding = () => {
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
    <div className="flex flex-col w-full items-center justify-center bg-white overflow-hidden">
      <Navbar />
      <MobileHero />
      <TwoSideExp />
      <MobileHowItWorks />
      <MobileMCP />
      <MobileSteps />
      <MobileWhyAI />
      <MobileInfo />
      <FounderNote />
      <Pricing />
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MobileNewLanding;
