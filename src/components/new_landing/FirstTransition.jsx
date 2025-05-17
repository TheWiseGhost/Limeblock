"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import TwoSideExp from "./TwoSideExp";
import Demo from "./Demo";

const FirstTransition = () => {
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
    <div className="w-screen overflow-y-hidden">
      <main ref={container} className="relative h-[210vh] w-full bg-[#F3F3F5]">
        <div className="z-0 sticky top-0" />
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
      </main>
    </div>
  );
};

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0], [0, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen w-full bg-[#F3F3F5]"
    >
      <Demo />
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0], [0, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative min-h-screen bg-white rounded-t-[3rem] w-full"
    >
      <TwoSideExp />
    </motion.div>
  );
};

export default FirstTransition;
