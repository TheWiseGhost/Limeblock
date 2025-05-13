import Footer from "@/components/new_landing/Footer";
import Pricing from "@/components/new_landing/Pricing";
import React from "react";

const page = () => {
  return (
    <div className="py-12 bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
