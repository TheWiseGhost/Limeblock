import ChatWidget from "@/components/implementation/ChatWidget";
import Demo from "@/components/landing/Demo";
import Hero from "@/components/landing/Hero";
import InAppActions from "@/components/landing/InAppActions";

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
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={contextParams}
      />
    </div>
  );
}
