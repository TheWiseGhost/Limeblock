"use client";

import { ChatWidget } from "@limeblock/react";
import FounderDemo from "@/components/new_landing/FounderDemo";
import Navbar from "@/components/new_landing/Navbar";
import Footer from "@/components/new_landing/Footer";

export default function Home() {
  const contextParams = {};
  return (
    <div className="bg-[#F3F3F5]">
      <Navbar />
      <div className="min-h-screen pt-20 pb-6">
        <FounderDemo />
        <Footer />
        <ChatWidget
          apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
          contextParams={contextParams}
        />
      </div>
    </div>
  );
}
