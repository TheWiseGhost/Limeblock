import ChatWidget from "@/components/implementation/ChatWidget";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <ChatWidget apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"} />
    </div>
  );
}
