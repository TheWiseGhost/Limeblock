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

export default function TokenStats({ tokenStats, remainingTokens }) {
  const formatMonthKey = (monthKey) => {
    const [year, month] = monthKey.split("-");
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
      "default",
      { month: "short" }
    );
  };

  const formatTokens = (tokens) => {
    const absTokens = Math.abs(tokens); // Handle negative values
    if (absTokens >= 1000000) {
      return `${(absTokens / 1000000).toFixed(1)}M${tokens < 0 ? "" : ""}`;
    } else if (absTokens >= 1000) {
      return `${(absTokens / 1000).toFixed(1)}K${tokens < 0 ? "" : ""}`;
    }
    return tokens.toString(); // Returns negative string if needed
  };

  // Sort and get last 6 months
  const sortedMonths = Object.keys(tokenStats).sort();
  const lastSixMonths = sortedMonths.slice(-6);
  const sortedStats = lastSixMonths.reduce((acc, month) => {
    acc[month] = tokenStats[month];
    return acc;
  }, {});

  // Chart data calculations
  const chartValues = Object.values(sortedStats);
  const currentMonthValue = chartValues[chartValues.length - 1] || 0;
  const previousMonthValue = chartValues[chartValues.length - 2] || 0;
  const tokenIncrease = currentMonthValue - previousMonthValue;
  const tokenIncreasePercentage =
    previousMonthValue > 0
      ? Math.round((tokenIncrease / previousMonthValue) * 100)
      : 100;
  const totalTokens = chartValues.reduce((sum, count) => sum + count, 0);
  const averageTokens =
    Object.values(tokenStats).length > 0
      ? Math.round(
          Object.values(tokenStats)
            .filter((num) => num !== 0)
            .reduce((a, b) => a + b, 0) /
            Object.values(tokenStats).filter((num) => num !== 0).length
        )
      : 0;

  // Chart configuration
  const chartData = {
    labels: Object.keys(sortedStats).map(formatMonthKey),
    datasets: [
      {
        label: "Monthly Token Usage",
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
        formatter: (value) => formatTokens(value), // Format tokens for display
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
        Token Usage Stats
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
              <p className="text-sm text-gray-700 mb-1">Monthly Tokens</p>
              <p className="text-2xl font-aeonik">
                {formatTokens(currentMonthValue)}
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Total Tokens</p>
              <p className="text-2xl font-aeonik">
                {formatTokens(totalTokens)}
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Monthly Growth</p>
              <div className="flex items-center">
                <p className="text-2xl font-aeonik mr-2">
                  {tokenIncrease > 0 ? "+" : "-"}
                  {formatTokens(tokenIncrease)}
                </p>
                <span
                  className={`text-sm ${
                    tokenIncrease >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({tokenIncrease >= 0 ? "+" : ""}
                  {tokenIncreasePercentage}%)
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Average Tokens</p>
              <p className="text-2xl font-aeonik">
                {formatTokens(averageTokens)}
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-700 mb-1">Tokens Left</p>
              <p className="text-2xl font-aeonik">
                {formatTokens(remainingTokens)}
              </p>
            </motion.div>

            {/* Upgrade Prompt Box */}
            <motion.div
              className="bg-white pl-3 pt-3 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-sm font-inter text-black mb-2">
                Need more tokens?
              </h3>

              <button
                onClick={() => {
                  window.location.href = "/checkout/";
                }}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded font-inter text-xs transition-colors"
              >
                Get Tokens
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
