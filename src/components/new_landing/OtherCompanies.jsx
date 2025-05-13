"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconBrandNotion,
  IconCurrencyDollar,
  IconCode,
  IconPalette,
  IconArrowRight,
} from "@tabler/icons-react";

const OtherCompanies = () => {
  const companies = [
    {
      name: "Notion",
      description:
        "AI writing assistant that helps you draft, edit, summarize, and more",
      icon: <IconBrandNotion size={32} />,
      rotation: 3,
      link: "https://notion.ai",
    },
    {
      name: "Mercury",
      description:
        "AI financial analysis and insights for startups and businesses",
      icon: <IconCurrencyDollar size={32} />,
      rotation: -2,
      link: "https://mercury.com",
    },
    {
      name: "GitHub Copilot",
      description:
        "AI pair programmer that helps developers write better code faster",
      icon: <IconCode size={32} />,
      rotation: 2,
      link: "https://github.com/features/copilot",
    },
    {
      name: "Canva",
      description:
        "Design platform with AI tools for creating professional graphics and content",
      icon: <IconPalette size={32} />,
      rotation: -3,
      link: "https://canva.com",
    },
  ];

  return (
    <div className="w-full bg-white py-20 font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl">
            <img className="size-5 mr-2" src="/LimeblockLogo.png" />
            <span className="text-sm font-medium">You're not alone</span>
          </div>
          <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
            Join the internal AI trend
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Other companies have already started using AI to enhance their
            products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.3 },
              }}
              className="relative bg-gray-200 text-gray-900 p-6 pb-12 rounded-xl shadow-lg overflow-hidden"
              style={{ rotate: `${company.rotation}deg` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gray-600 opacity-10 -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="mb-4">{company.icon}</div>
                <h3 className="text-xl font-aeonik mb-2">{company.name}</h3>
                <p className="mb-6 mt-6 text-sm opacity-90">
                  {company.description}
                </p>
                <motion.a
                  href={company.link}
                  className="inline-flex items-center font-medium"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherCompanies;
