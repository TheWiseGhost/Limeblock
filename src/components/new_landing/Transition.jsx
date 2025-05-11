"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Info from "./Info";
import TwoSideExp from "./TwoSideExp";
import FounderNote from "./FounderNote";

const Transition = () => {
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
    <div>
      <main
        ref={container}
        className="relative h-[200vh] bg-white overflow-hidden"
      >
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
      className="sticky top-0 h-screen my_grid pb-[10vh]"
    >
      <Info />
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0], [0, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative h-screen bg-white"
    >
      <FounderNote />
    </motion.div>
  );
};

export default Transition;
