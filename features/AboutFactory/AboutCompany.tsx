import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface AboutCompanyProps {
  className?: string;
}

const AboutCompany: React.FC<AboutCompanyProps> = ({ className }) => {
  return (
    <div className={clsx("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      <Image
        className="h-fit w-full object-cover md:col-start-1 md:row-start-2 md:max-w-[25rem]"
        src={"/Factory/company-1.png"}
        alt={"company-1"}
      />

      <div className="md:col-start-1 md:row-start-1">
        <h1 className="font-inter mb-2 text-4xl font-bold md:text-6xl">
          About Our <br />
          Company
        </h1>
        <h1 className="font-inter mb-2 text-lg">
          Building the Backbone of Modern Infrastructure
        </h1>
        <div className="space-y-4">
          <p className="text-xs">
            With years of hands-on expertise in{" "}
            <strong>prefabricated piping systems</strong> and{" "}
            <strong>industrial fabrication</strong>, we are dedicated to
            delivering <strong>precision, safety, and durability</strong> in
            every project. Our factory integrates{" "}
            <strong>cutting-edge machinery, advanced quality controls</strong>,
            and a balance team of precision fit crafting long-lasting solutions
            for fire protection, plumbing, and mechanical installations.
          </p>
          <p className="text-xs">
            We believe in a future driven by{" "}
            <strong>engineering excellence and innovation</strong>. From concept
            to installation, every component is crafted with meticulous care to
            meet international standards — ensuring{" "}
            <strong>
              performance that endures and quality that inspires confidence
            </strong>
            .
          </p>
        </div>
      </div>

      <Image
        className="h-fit w-full object-cover md:col-start-2 md:row-span-2 md:h-full"
        src={"/Factory/company-2.png"}
        alt={"company-2"}
      />
    </div>
  );
};

export default AboutCompany;
