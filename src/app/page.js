"use client";

import { ChatWidget } from "@limeblock/react";
// import ChatWidget from "@/components/implementation/ChatWidget";
import CodeImplementation from "@/components/landing/CodeImplementation";
import Demo from "@/components/landing/Demo";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import InAppActions from "@/components/landing/InAppActions";
import Pricing from "@/components/landing/Pricing";
import SignUPrompt from "@/components/landing/SignUpPrompt";
import Solutions from "@/components/landing/Solutions";

export default function Home() {
  const contextParams = {};
  return (
    <div>
      <Hero />
      <Demo />
      <Solutions />
      <InAppActions />
      <Features />
      <CodeImplementation />
      <SignUPrompt />
      <Pricing />
      <Footer />
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={contextParams}
      />
    </div>
  );
}
