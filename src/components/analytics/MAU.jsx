"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function MAU({ mauStats, userPlan }) {
  const formatMonthKey = (monthKey) => {
    const [year, month] = monthKey.split("-");
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
      "default",
      { month: "short" }
    );
  };

  // Sort and get last 6 months
  const sortedMonths = Object.keys(mauStats).sort();
  const lastSixMonths = sortedMonths.slice(-6);
  const sortedStats = lastSixMonths.reduce((acc, month) => {
    acc[month] = mauStats[month];
    return acc;
  }, {});

  // Chart data calculations
  const chartValues = Object.values(sortedStats);
  const currentMonthValue = chartValues[chartValues.length - 1] || 0;
  const previousMonthValue = chartValues[chartValues.length - 2] || 0;
  const mauIncrease = currentMonthValue - previousMonthValue;
  const mauIncreasePercentage =
    previousMonthValue > 0
      ? Math.round((mauIncrease / previousMonthValue) * 100)
      : 100;
  const totalUsers = chartValues.reduce((sum, count) => sum + count, 0);
  const averageMau =
    Object.values(mauStats).length > 0
      ? Math.round(
          Object.values(mauStats)
            .filter((num) => num !== 0)
            .reduce((a, b) => a + b, 0) /
            Object.values(mauStats).filter((num) => num !== 0).length
        )
      : 0;

  // Determine max MAUs based on user plan
  const getMaxMaus = (plan) => {
    switch (plan) {
      case "startup":
        return 100;
      case "business":
        return 1000;
      case "enterprise":
        return 5000;
      default:
        return 20; // Default fallback
    }
  };

  const maxMaus = getMaxMaus(userPlan);

  // Chart configuration
  const chartData = {
    labels: Object.keys(sortedStats).map(formatMonthKey),
    datasets: [
      {
        label: "Monthly Active Users",
        data: chartValues,
        backgroundColor: "rgb(144, 240, 140)",
        borderColor: "rgb(112, 192, 109)",
        borderWidth: 1,
        datalabels: {
          anchor: "end",
          align: "top",
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40, // Add extra space at the top
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        color: "#222",
        font: {
          family: "Aeonik", // Ensure numbers on top use Aeonik
          weight: "medium",
          size: 12,
        },
        anchor: (context) => {
          // Move label inside the bar if it's too high
          const value = context.dataset.data[context.dataIndex];
          const maxValue = Math.max(...context.dataset.data);
          return value === maxValue ? "end" : "end";
        },
        align: (context) => {
          const value = context.dataset.data[context.dataIndex];
          const maxValue = Math.max(...context.dataset.data);
          return value === maxValue ? "bottom" : "top";
        },
        formatter: (value) => value, // Ensure values are always displayed
        clip: false, // Prevent labels from getting cut off
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#666", font: { family: "Inter" } }, // Ensure x-axis labels use Inter
      },
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-300 p-6 font-inter"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl font-aeonik mb-6 text-black"
        variants={itemVariants}
      >
        MAU Stats
      </motion.h2>

      <div className="grid grid-cols-5 gap-12">
        {/* Left Column - Chart */}
        <motion.div className="col-span-3 h-fit pt-3" variants={itemVariants}>
          <Bar data={chartData} options={chartOptions} height={250} />
        </motion.div>

        {/* Right Column - Stats and Upgrade */}
        <div className="lg:col-span-2">
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            variants={containerVariants}
          >
            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Current Month MAUs</p>
              <p className="text-2xl font-aeonik">{currentMonthValue}</p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Total Users</p>
              <p className="text-2xl font-aeonik">{totalUsers}</p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Monthly Growth</p>
              <div className="flex items-center">
                <p className="text-2xl font-aeonik mr-2">
                  {mauIncrease > 0 ? "+" : ""}
                  {mauIncrease}
                </p>
                <span
                  className={`text-sm ${
                    mauIncrease >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({mauIncrease >= 0 ? "+" : ""}
                  {mauIncreasePercentage}%)
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Average MAUs</p>
              <p className="text-2xl font-aeonik">{averageMau}</p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Max MAUs</p>
              <p className="text-2xl font-aeonik">{maxMaus.toLocaleString()}</p>
            </motion.div>

            {/* Upgrade Prompt Box */}
            <motion.div
              className="bg-white pl-3 pt-3 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-sm font-inter text-black mb-2">
                Want more MAUs?
              </h3>

              <button
                onClick={() => {
                  window.location.href = "/checkout/";
                }}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded font-inter text-xs transition-colors"
              >
                View Plans
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
