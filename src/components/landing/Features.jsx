"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const GridSection = ({ title, content, image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer font-inter"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-aeonik">{title}</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600">{content}</p>
            <div className="mt-4 w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Features = () => {
  const sections = [
    {
      title: "Section 1",
      content:
        "This is the content for section 1. It can be any length of text you want to display.",
      image: "https://placeholder.com/400x300",
    },
    {
      title: "Section 2",
      content: "Here's section 2 content with its own unique information.",
      image: "https://placeholder.com/400x300",
    },
    {
      title: "Section 3",
      content: "Section 3 brings more interesting content to explore.",
      image: "https://placeholder.com/400x300",
    },
    {
      title: "Section 4",
      content: "The fourth section contains its own special content.",
      image: "https://placeholder.com/400x300",
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-16">
      <h1 className="font-aeonik font-medium text-5xl md:text-7xl pb-8">
        Plus every other feature you need
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, index) => (
          <GridSection
            key={index}
            title={section.title}
            content={section.content}
            image={section.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
