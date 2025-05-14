"use client";

import { ChatWidget } from "@limeblock/react";
import Navbar from "@/components/new_landing/Navbar";
import Footer from "@/components/new_landing/Footer";
import DevDemo from "@/components/new_landing/DevDemo";

export default function Home() {
  const contextParams = {};
  return (
    <div className="bg-[#F3F3F5]">
      <Navbar />
      <div className="min-h-screen pt-20 pb-6">
        <DevDemo />
        <Footer />
        <ChatWidget
          apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
          contextParams={contextParams}
        />
      </div>
    </div>
  );
}
