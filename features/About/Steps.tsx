import React from "react";
import clsx from "clsx";
import ChildrenStaggerContainer from "../../components/ChildrenStaggerContainer";

interface StepsProps {
  className?: string;
}

const steps = [
  {
    title: "Proven Expertise",
    text: `With decades of expertise in both Indian and foreign markets, 
    we contribute superior prefabrication techniques and in-depth engineering 
    knowledge to every project.Our company has delivered intricate 
    fire-protection systems for residential infrastructure, business towers, 
    and industries, always guaranteeing exact engineering, safety, and compliance.
    `,
  },
  {
    title: "Robotic Precision",
    text: `With robotic welding and automated cutting, we lead the industry and 
    guarantee that every assembly is leak-free and precisely dimensioned. 
    This breakthrough shortens project schedules by up to 40%, lowers on-site labor, 
    and enhances quality consistency and flexibility.
    `,
  },
  {
    title: "Quality Without Compromise",
    text: `Every product that enters our process, from conception to completion, 
    goes through several stages of factory testing, quality control or inspection, 
    customisation, hydro-testing, and certification in our controlled setting. 
    We guarantee dependability in every connection since we are completely compatible 
    with UL/FM international standards and have ISO 9001:2015 certification.
    `,
  },
  {
    title: "Smarter, Sustainable Solutions",
    text: `Our technologies are specially created and designed to save labor costs, 
    material waste, and on-site time, resulting in more environmentally friendly and 
    sustainable building.We constantly refine our techniques to conform to international 
    fire safety standards and contemporary green construction principles.
    `,
  },
  {
    title: "Collaborative Engineering Support:",
    text: `We collaborate closely with customers, consultants, and contractors 
    to provide technical drawings, shop fabrication details, and as-built documentation 
    throughout the whole process, from conception to completion and commissioning. 
    Our cooperation guarantees quicker project approvals and smooth integration.
    `,
  },
  // {
  //   title: "Nationwide Reach, Global Standards",
  //   text: `Botpipes Tech is revolutionizing what is possible in fire-safety 
  //   engineering and extending the reach of robotics prefabrication through 
  //   partnerships with international brands and a growing footprint throughout India.
  //   `,
  // },
];

const Steps: React.FC<StepsProps> = ({ className }) => {
  return (
    <div id="steps" className={clsx("", className)}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-30">
        <h1 className="font-urbanist max-w-[25rem] text-5xl font-bold">
          Why Choose Botpipes Tech Pvt. Ltd.
        </h1>

        <ChildrenStaggerContainer className="pair-padding flex-1 space-y-6">
          {steps.map((item, indx) => (
            <StepItem indx={indx} item={item} key={indx} />
          ))}
        </ChildrenStaggerContainer>
      </div>
    </div>
  );
};

interface StepItemProps {
  indx: number;
  item: { title: string; text: string };
}
const StepItem: React.FC<StepItemProps> = ({ indx, item }) => {
  const twStlyes = [
    "lg:-translate-x-[0px]",
    "lg:-translate-x-[200px]",
    "lg:-translate-x-[400px]",
  ];
  return (
    <div
      className={clsx(
        "flex max-w-[40rem] gap-4",
        twStlyes[Math.floor(indx / 2)],
      )}
    >
      <h1 className="font-grotek text-5xl font-bold">0{indx + 1}</h1>
      <div>
        <h2 className="font-urbanist mb-2 font-bold">{item.title}</h2>
        <p className="font-arabic text-sm">{item.text}</p>
      </div>
    </div>
  );
};

export default Steps;
