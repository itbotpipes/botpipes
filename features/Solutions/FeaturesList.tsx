import Image from "@/components/Image";
import React from "react";
import { features } from "./Data";
import ChildrenStaggerContainer from "@/components/ChildrenStaggerContainer";

const FeaturesList = () => {
  return (
    <div className="mx-auto max-w-[60rem] px-4 py-20">
      <h1 className="font-inter mb-6 text-center text-3xl leading-tight font-semibold md:text-5xl">
        Technology Features — Built for Precision.{" "}
        <span className="text-[#27408A]">Proven for Performance.</span>
      </h1>

      <p className="font-inter mx-auto mb-10 max-w-[48rem] text-center text-sm text-gray-700">
        At <strong>Botpipes Tech</strong>, every component of our prefabrication
        system is built on{" "}
        <strong>engineering accuracy and robotic consistency</strong>. From
        patented welding automation to data-driven testing, our technology
        ensures <strong>speed, safety, and scalability</strong> at every project
        stage.
      </p>
      <ChildrenStaggerContainer
        start="start 80%"
        vars={{ y: 10 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, indx) => (
          <div
            key={indx}
            className="relative overflow-hidden rounded-xl bg-white"
          >
            <Image
              className="h-[10rem] w-full object-cover"
              src={feature.img}
              alt={feature.title}
            />
            <div className="px-6 py-5">
              <h2 className="font-inter mb-4 text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="font-inter text-xs">{feature.desc}</p>
            </div>
          </div>
        ))}
      </ChildrenStaggerContainer>
    </div>
  );
};

export default FeaturesList;
