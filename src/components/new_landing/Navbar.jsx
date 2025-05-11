"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NavButton = ({ text, href, isScrolled }) => (
  <a
    href={href}
    className={`hidden md:flex text-black font-medium cursor-pointer font-inter relative group px-4 py-2 transition-all duration-300 mt-0.5 ${
      isScrolled ? "text-[0.825rem]" : "text-[0.825rem]"
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
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3 }}
      className={`fixed top-0 left-0 right-0 flex items-center py-2 z-50 ease-in-out bg-none ${
        isScrolled
          ? "px-6 md:px-8 py-1 w-[360px] md:w-[870px] mx-auto mt-2 rounded-full border border-gray-200 bg-none bg-opacity-90 backdrop-blur-md transition-all duration-500"
          : "px-5 md:px-10 pb-2 pt-7 w-full transition-all duration-500"
      }`}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img
          src="/LimeblockLogo.png"
          alt="Limeblock Logo"
          className={`transition-all duration-500 ${
            isScrolled ? "h-6 w-6" : "h-8 w-8"
          }`}
        />
        <span
          className={`font-medium font-aeonik transition-all duration-500 ${
            isScrolled ? "text-base" : "text-lg"
          }`}
        >
          Limeblock
        </span>
      </div>

      <div
        className={`hidden w-fit md:flex gap-8 px-8 ${
          isScrolled ? "mx-auto" : "ml-auto"
        }`}
      >
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
        className={`relative inline-flex overflow-hidden rounded-2xl p-[3px] font-inter font-medium transition-all duration-300 bg-none ${
          isScrolled ? "h-10" : "h-11"
        }`}
      >
        <span className="absolute inset-[-100%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#90F08C_0%,#edeceb_50%,#90F08C_100%)]" />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white bg-opacity-80 text-gray-800 hover:text-black transition duration-200 backdrop-blur-3xl ${
            isScrolled
              ? "px-4 py-0.5 text-[0.8rem]"
              : "px-5 py-0.5 text-[0.825rem]"
          }`}
        >
          Dashboard
        </span>
      </a>
    </motion.nav>
  );
}
