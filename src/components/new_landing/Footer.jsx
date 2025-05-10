"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

// Link Item Component with Hover Animation
const LinkItem = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className="mb-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.a
        href="#"
        className="inline-block text-gray-300 hover:text-white"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {text}
        {isHovered && (
          <motion.span
            className="inline-block ml-1"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        )}
      </motion.a>
    </motion.li>
  );
};

// Link Section Component
const LinkSection = ({ title, links }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-sm font-semibold mb-4">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <LinkItem key={index} text={link} />
      ))}
    </ul>
  </div>
);

// Main Footer Component
const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer className="w-full px-10 h-80 font-inter">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between h-80 md:px-16 pt-12 rounded-3xl bg-neutral-950 text-white text-sm">
        {/* Left Side - Logo and Tagline */}
        <div className="mb-10 md:mb-0 md:w-1/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-row items-center space-x-3">
              <img src="LimeblockLogo.png" className="size-9" />
              <h1 className="font-aeonik font-bold text-2xl">Limeblock</h1>
            </div>

            <motion.div
              className="mt-6 text-base font-inter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Your app's AI superpower.
              <br />
              Completely simplified.
            </motion.div>

            <button
              className="inline-flex items-center bg-white text-black px-6 py-4 rounded-xl font-medium transition-colors mt-12"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="p-[0.4rem] text-white size-8 rounded-lg"
                animate={{
                  backgroundColor: isHovered ? "#90F08C" : "#000000",
                  rotate: isHovered ? -45 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <IconArrowRight className="size-full" />
              </motion.div>
              <span className="ml-3 text-[0.9rem]">Get early access</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side - Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 md:w-2/3 md:justify-end">
          <LinkSection
            title="Product"
            links={["Overview", "Sourcing", "Evaluation", "Communication"]}
          />

          <LinkSection
            title="Demo"
            links={[
              "Dev Side",
              "Client Side",
              "API Endpoints",
              "Founder Demo",
              "Schedule",
            ]}
          />

          <LinkSection
            title="Docs"
            links={[
              "Overview",
              "Frontend",
              "Backend",
              "Export",
              "Request",
              "Report",
            ]}
          />

          <LinkSection
            title="Company"
            links={["About", "Blog", "Careers", "Contact"]}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
