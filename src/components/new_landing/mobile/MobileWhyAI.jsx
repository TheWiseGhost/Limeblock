"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, AppWindowMac, UserCheck } from "lucide-react";

const MobileWhyAI = () => {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Animation sequence
  useEffect(() => {
    let progressInterval;

    const startTimeout = setTimeout(() => {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setIsEnhanced(true);

          setTimeout(() => {
            setIsEnhanced(false);
            setProgress(0);
          }, 3000);
        }
      }, 100);
    }, 800);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(progressInterval);
    };
  }, [isEnhanced]);

  return (
    <div className="w-full bg-white px-4 py-12 font-inter">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-aeonik font-medium mb-3">
            Why add AI to your app?
          </h2>
          <p className="text-gray-600 text-sm">
            AI is essential for apps to thrive against faster competitors
          </p>
        </motion.div>

        {/* Animation Section */}

        {/* Benefits Section */}
        <div className="space-y-6">
          {[
            {
              icon: UserCheck,
              title: "User activation",
              desc: "Use AI to assist new users through tedious setup or tasks",
            },
            {
              icon: AppWindowMac,
              title: "Improved UX",
              desc: "AI helps make your app intuitive and frictionless",
            },
            {
              icon: ScanEye,
              title: "Retention Rate",
              desc: "Keep users on your app and decrease churn",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start bg-gray-50 rounded-xl p-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 + 0.2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-shrink-0 mt-1 mr-4 bg-green-100 p-2 rounded-lg">
                <item.icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileWhyAI;
