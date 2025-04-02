"use client";

import { ChatWidget } from "@limeblock/react";
import Demo from "@/components/landing/Demo";

export default function Home() {
  const contextParams = {};
  return (
    <div>
      <Demo />
      <ChatWidget
        apiKey={"lime_2JDnwGpM7OOfEcfj3kJ9bwVrGULxh1sL"}
        contextParams={contextParams}
      />
    </div>
  );
}
