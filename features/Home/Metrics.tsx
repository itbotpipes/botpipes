import AnimatedCounter from "@/components/AnimatedCounter";
import Image from "@/components/Image";
import React from "react";

const metrics = [
  {
    value: 23,
    identifier: "+",
    description: "Fire-Safety & Engineering Expertise",
    icon: "/metric-icon/1.png",
  },
  {
    value: 9,
    identifier: "k",
    description: "Prefabricated And Delivered Nationwide",
    icon: "/metric-icon/2.png",
  },
  {
    value: 90,
    identifier: "+",
    description: "Executed Across Industrial & Commercial Sectors",
    icon: "/metric-icon/3.png",
  },
  {
    value: 73,
    identifier: "+",
    description: "Trusted Partners Across India",
    icon: "/metric-icon/4.png",
  },
];

const Metrics = () => {
  return (
    <div className="mx-auto my-30 grid w-screen max-w-[70rem] grid-cols-1 gap-4 px-10 lg:grid-cols-4">
      {metrics.map((metric, indx) => (
        <div
          className="flex gap-4 rounded-3xl border-1 border-gray-200 p-4"
          key={indx}
        >
          <div className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-[#24275E]">
            <Image
              src={metric.icon}
              alt={metric.icon}
              className="h-[1.3rem] w-[1.3rem]"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-anek mb-2 text-4xl font-semibold">
              <AnimatedCounter to={metric.value} duration={1} />
              {metric.identifier}
            </h1>
            <p className="font-anek text-sm text-gray-500">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
