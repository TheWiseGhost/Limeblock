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
      title: "Easy Documentation",
      description:
        "Setting up Limeblock's 3 line of code widget will be the easiest task",
      icon: <IconFileText />,
    },
    {
      title: "Customer Support",
      description:
        "Stop dealing with simple requests for help that could be solved by just pointing people to a page",
      icon: <IconRobot />,
    },
    {
      title: "Conversion Increase",
      description:
        "Easy UX thanks to Limeblock means its easier for new free users to convert into paid ones",
      icon: <IconShoppingCart />,
    },
    {
      title: "SaaS Assistant",
      description:
        "Help users with any in app action or API request and allow them to quickly get info from docs",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "Professional Pricing",
      description:
        "Only pay more if more people use your widget, not for more features. Plus a 30 day money back guarantee",
      icon: <IconBriefcase />,
    },
    {
      title: "Worldwide support",
      description:
        "Assist users no matter where they are located, don't worry about accessibilty issues",
      icon: <IconWorld />,
    },
    {
      title: "Rapid Messaging",
      description: "Quick responses times that are always less than 30 seconds",
      icon: <IconMessageCircle />,
    },
    {
      title: "AI Insights",
      description:
        "Analyze activity on your widget, providing real insight on how your customers use your product.",
      icon: <IconAdjustmentsBolt />,
    },
  ];
  return (
    <div className="flex flex-col px-10" id="solutions">
      <h1 className="font-aeonik font-medium text-5xl md:text-7xl pb-8">
        Made for Tech Companies
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
