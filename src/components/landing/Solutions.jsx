import {
  IconAdjustmentsBolt,
  IconCloud,
  IconMessageCircle,
  IconShoppingCart,
  IconFileText,
  IconBriefcase,
  IconWorld,
  IconRobot,
  IconDeviceLaptop,
} from "@tabler/icons-react";

export default function Solutions() {
  const solutions = [
    {
      title: "Blogs and SEO content",
      description:
        "Help direct people to relevant CTA easily and make the transition from blog post to your customer easier",
      icon: <IconFileText />,
    },
    {
      title: "Game AI Assistant",
      description:
        "Enhance player engagement with AI-driven game guides and tips.",
      icon: <IconRobot />,
    },
    {
      title: "E-commerce Chatbot",
      description:
        "Recommend products, assist with purchases, and handle customer queries.",
      icon: <IconShoppingCart />,
    },
    {
      title: "SaaS Assistant",
      description:
        "Help users with any in app action and allow them to quickly get info from docs",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "B2B Onboarding AI",
      description:
        "Guide users through your product with an interactive AI assistant.",
      icon: <IconBriefcase />,
    },
    {
      title: "Multilingual Support AI",
      description:
        "Assist users in multiple languages with real-time translations.",
      icon: <IconWorld />,
    },
    {
      title: "Customer Support",
      description:
        "Resolve issues instantly with AI-powered responses and chat automation.",
      icon: <IconMessageCircle />,
    },
    {
      title: "AI Business Insights",
      description:
        "Analyze customer interactions and optimize business strategies.",
      icon: <IconAdjustmentsBolt />,
    },
  ];
  return (
    <div className="flex flex-col px-10" id="solutions">
      <h1 className="font-aeonik font-medium text-5xl md:text-7xl pb-8">
        Usable for any case
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 pb-20 md:pb-24 w-full">
        {solutions.map((feature, index) => (
          <Solution key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Solution = ({ title, description, icon, index }) => {
  return (
    <div
      className={`flex flex-col lg:border-r py-10 relative group border-neutral-200 font-inter ${
        index === 0 || index === 4 ? "lg:border-l border-neutral-200" : ""
      } ${index < 4 ? "lg:border-b border-neutral-200" : ""}`}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-green-50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-green-50 to-transparent pointer-events-none" />
      )}

      <div className="text-lg font-bold mb-2 relative z-10 px-8">
        <div className="absolute left-0 inset-y-0 h-7 group-hover:h-10 w-1 rounded-tr-full rounded-br-full bg-neutral-300  group-hover:bg-lime transition-all duration-200 origin-center" />
        <span className="group-hover:translate-x-2 flex flex-row font-medium transition duration-200 w-full text-neutral-800 font-aeonik">
          <div className="mb-4 relative z-10 pr-3 text-neutral-600">{icon}</div>
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-8">
        {description}
      </p>
    </div>
  );
};
