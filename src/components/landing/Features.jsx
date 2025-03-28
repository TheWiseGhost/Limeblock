"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const GridSection = ({ title, content, image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 h-fit cursor-pointer font-inter"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium font-inter">{title}</h2>
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
            <div className="mt-4 w-full h-screen bg-white rounded-lg overflow-hidden">
              <div
                className="w-full h-full bg-center bg-contain bg-no-repeat"
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
      title: "Full Frontend Nav Handling",
      content:
        "Handle every single page of your website by simply adding urls and description. Get a customized block too so it look great on your site!",
      image: "/FrontendImg.png",
    },
    {
      title: "API Actions",
      content:
        "Allow our AI to send logical AI crafted API requests to your backend so make your app frictionless and so much faster for any user.",
      image: "/ApiEndpointImg.png",
    },
    {
      title: "Easy Integration",
      content:
        "Just drop your new block into your site in 3 lines of code and you're set. Mobile adapative and cleared for any use. See how we use Limeblock in Limeblock.",
      image: "/UsageExample.png",
    },
    {
      title: "Analytics",
      content:
        "Analyze what actions your users are committing and understand potential app improvements. Plus it looks pretty cool.",
      image: "/AnalysisImg.png",
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
