// import { ChatWidget } from "@limeblock/react";
import ChatWidget from "@/components/implementation/ChatWidget";
import CodeImplementation from "@/components/landing/CodeImplementation";
import Demo from "@/components/landing/Demo";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import InAppActions from "@/components/landing/InAppActions";
import Pricing from "@/components/landing/Pricing";
import Solutions from "@/components/landing/Solutions";
import Navbar from "@/components/landing/Navbar";
import ProductSnippets from "@/components/landing/ProductSnippets";
import DIY from "@/components/landing/DIY";
import ConversionFunnel from "@/components/landing/ConversionFunnel";
import NewLanding from "@/components/new_landing/NewLanding";

export default function Home() {
  const contextParams = {};
  return (
    <>
      <div className="overflow-x-hidden block md:hidden">
        <Navbar />
        <Hero />
        <ProductSnippets />
        <DIY />
        <Solutions />
        <ConversionFunnel />
        <InAppActions />
        <Features />
        <CodeImplementation />
        <Pricing />
        <div className="h-10" />
        <Footer />
        <ChatWidget
          apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
          contextParams={contextParams}
        />
      </div>
      <div className="hidden md:flex">
        <NewLanding />
      </div>
    </>
  );
}
