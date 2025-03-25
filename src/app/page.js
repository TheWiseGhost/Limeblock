import ChatWidget from "@/components/implementation/ChatWidget";
import CodeImplementation from "@/components/landing/CodeImplementation";
import Demo from "@/components/landing/Demo";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import InAppActions from "@/components/landing/InAppActions";
import Pricing from "@/components/landing/Pricing";
import SignUPrompt from "@/components/landing/SignUpPrompt";

export default function Home() {
  const contextParams = {
    board_id: "679fdb26a14496f9423891fe",
    user_id: "user_2tFLPXZyEnTmNQsenlQXNU3Q5Z4",
  };
  return (
    <div>
      <Hero />
      <Demo />
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
