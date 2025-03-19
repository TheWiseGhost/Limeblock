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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function MAU({ mauStats }) {
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
    Math.round(chartValues.reduce((a, b) => a + b, 0) / chartValues.length) ||
    0;

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

  return (
    <div className="border border-gray-300 rounded-lg p-6 font-inter">
      <h2 className="text-2xl font-aeonik mb-6">MAU Stats</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Chart */}
        <div className="h-[280px] pt-4 pr-4">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700">Current Month MAU</h4>
              <p className="text-2xl font-aeonik mt-1">{currentMonthValue}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700">Total Users</h4>
              <p className="text-2xl font-aeonik mt-1">{totalUsers}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg col-span-2">
              <h4 className="text-sm text-gray-700">Monthly Growth</h4>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-aeonik">
                  {mauIncrease > 0 ? "+" : ""}
                  {mauIncrease}
                </p>
                <span
                  className={`ml-2 text-sm ${
                    mauIncrease >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({mauIncrease >= 0 ? "+" : ""}
                  {mauIncreasePercentage}%)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700">Average MAU</h4>
              <p className="text-2xl font-aeonik mt-1">{averageMau}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700">Peak Month</h4>
              <p className="text-2xl font-aeonik mt-1">
                {formatMonthKey(
                  Object.entries(sortedStats).reduce((a, b) =>
                    a[1] > b[1] ? a : b
                  )[0]
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
