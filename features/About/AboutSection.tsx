import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-12 px-8 py-10 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      <div className="font-urbanist md:row-span-2 lg:row-span-1">
        <h2 className="mb-6 text-4xl font-bold">
          About Botpipes Tech Pvt. Ltd.
        </h2>
        <p>
          BotPipes Tech Pvt. Ltd. is India’s leading robotic prefabrication company for fire-safety piping systems.
          We design and manufacture robotically engineered, factory-prefabricated fire protection solutions that deliver 
          precision, reliability, and faster project execution.
        </p>
        <br/>
        <p>
          Using advanced CAD design, robotic welding, and automated plasma cutting, we produce UL/FM-compliant sprinkler 
          and hydrant piping systems with uniform quality and leak-free performance. Our factory-tested assemblies reduce on-site labour, 
          minimize rework, and enable quicker commissioning — setting new standards in modern fire-safety infrastructure.
        </p>
      </div>

      <Image
        className="h-full w-full object-cover"
        src="/about/about-1.jpg"
        alt="about-1"
      />

      <div className="relative">
        <Image
          className="w-full object-cover lg:absolute lg:bottom-0 lg:left-0 lg:h-full"
          src="/about/about-2.jpg"
          alt="about-2"
        />
      </div>
    </div>
  );
};

export default AboutSection;
