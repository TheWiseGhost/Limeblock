"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SignatureSVG = ({ inView }) => {
  // We'll store the SVG paths from the signature
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    // Function to extract paths from SVG content
    const extractPaths = (svgString) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
      const pathElements = svgDoc.querySelectorAll("path");

      // Extract the paths and their attributes
      const extractedPaths = Array.from(pathElements).map((path) => ({
        d: path.getAttribute("d"),
        fill: path.getAttribute("fill") || "none",
        stroke: "#000",
        strokeWidth: "2.75",
      }));

      return extractedPaths;
    };

    // Fetch the SVG file
    fetch("/Signature.svg")
      .then((response) => response.text())
      .then((svgString) => {
        // Extract viewBox from the SVG
        const viewBoxMatch = svgString.match(/viewBox=["']([^"']+)["']/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 500 500";

        // Set the extracted paths
        setPaths(extractPaths(svgString));

        // You can also store the viewBox if needed
        // setViewBox(viewBox);
      })
      .catch((error) => console.error("Error loading SVG:", error));
  }, []);

  // Animation variants for paths
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "linear",
          duration: 3,
          bounce: 0,
          delay: i * 0.05, // Stagger the animations
        },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-40 h-fit"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 70 250 150">
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            fill={path.fill}
            stroke={path.stroke}
            strokeWidth={path.strokeWidth}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={index}
            variants={pathVariants}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default SignatureSVG;
