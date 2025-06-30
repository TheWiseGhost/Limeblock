"use client";

import FounderDemo from "@/components/new_landing/FounderDemo";
import Navbar from "@/components/new_landing/Navbar";
import Footer from "@/components/new_landing/Footer";
import DevDemo from "@/components/new_landing/DevDemo";

export default function Home() {
  return (
    <div className="bg-[#F3F3F5]">
      <Navbar />
      <div className="min-h-screen pt-20 pb-6">
        <DevDemo />
        <Footer />
      </div>
    </div>
  );
}
