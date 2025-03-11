import ChatWidget from "@/components/implementation/ChatWidget";
import Hero from "@/components/landing/Hero";

export default function Home() {
  const contextParams = { board_id: "1", user_id: "1" };
  return (
    <div>
      <Hero />
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={contextParams}
      />
    </div>
  );
}
