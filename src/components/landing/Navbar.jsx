"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NavButton = ({ text, href, isScrolled }) => (
  <a
    href={href}
    className={`hidden md:flex cursor-pointer font-inter relative group px-4 py-2 transition-all duration-300 ${
      isScrolled ? "text-[0.825rem]" : "text-[0.925rem]"
    }`}
  >
    <span className="relative">
      {text}
      <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-lime group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </span>
  </a>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 flex items-center justify-between py-2 z-50 transition-all duration-300 ease-in-out bg-white ${
        isScrolled
          ? "px-6 md:px-8 py-1 w-[870px] mx-auto mt-2 rounded-full border border-gray-200 bg-white bg-opacity-90 backdrop-blur-md"
          : "px-6 md:px-10 pb-2 pt-7 w-full"
      }`}
    >
      <div className="flex items-center gap-2">
        <img
          src="/LimeblockLogo.png"
          alt="Limeblock Logo"
          className={`transition-all duration-300 ${
            isScrolled ? "h-6 w-6" : "h-8 w-8"
          }`}
        />
        <span
          className={`font-medium font-aeonik transition-all duration-300 ${
            isScrolled ? "text-base" : "text-lg"
          }`}
        >
          Limeblock
        </span>
      </div>

      <div className="hidden md:flex gap-8">
        <NavButton text="Docs" href="/docs/" isScrolled={isScrolled} />
        <NavButton
          text="Features"
          href="/docs/frontend/"
          isScrolled={isScrolled}
        />
        <NavButton text="Solutions" href="#solutions" isScrolled={isScrolled} />
        <NavButton text="Demo" href="/demo" isScrolled={isScrolled} />
        <NavButton text="Pricing" href="/checkout" isScrolled={isScrolled} />
      </div>

      <a
        href="/auth_prompt/"
        className={`relative inline-flex overflow-hidden rounded-2xl p-[3px] font-aeonik transition-all duration-300 ${
          isScrolled ? "h-10" : "h-12"
        }`}
      >
        <span className="absolute inset-[-100%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#90F08C_0%,#edeceb_50%,#90F08C_100%)]" />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white text-gray-800 hover:text-black transition duration-200 backdrop-blur-3xl ${
            isScrolled ? "px-4 py-1 text-xs" : "px-5 py-2 text-sm"
          }`}
        >
          Dashboard
        </span>
      </a>
    </motion.nav>
  );
}
