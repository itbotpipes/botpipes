import Image from "@/components/Image";
import clsx from "clsx";
import React from "react";

const reasons = [
  {
    title: "Prefabricated Pipes",
    description: (
      <p>
        {/* <strong>Custom pipe fabrication</strong> with powder-coated finishes and precision-cut
        ends for{" "}
        <strong>easy installation</strong> and{" "}
        <strong>reduced installation time.</strong> */}
        Custom-built, precision-cut pipes with smooth finishes that drop into place without chaos or cutting sparks flying onsite.
      </p>
    ),
    img: "/imgs/prefab-pipes.jpeg",
  },
  {
    title: "Fire-Safety Assemblies",
    description: (
      <p>
        {/* <strong>Bespoke design and fabrication</strong> of headers, branches, and fittings.{" "}
        <strong>Factory-tested</strong>, leak-proof, and certified to{" "}
        <strong>international fire safety standards</strong> (NFPA, IS, UL, FM Global). */}
        Headers, branches, and fittings that are factory-tested, leak-proof, and certified to global fire-safety standards—NFPA, IS, UL & FM.
      </p>
    ),
    img: "/imgs/fire-safety.jpeg",
  },
  {
    title: "Certified Accessories & Components",
    description: (
      <p>
        {/* UL/FM-approved valves, couplings, hangers, and fittings—all certified, traceable, and{" "}
        <strong>pre-assembled</strong> for seamless integration. */}
        UL/FM-approved valves, hangers, couplings & fittings that come pre-assembled, traceable, and installation-friendly for clean, reliable integration.
      </p>
    ),
    img: "/imgs/SMART CHOICE 3.jpeg",
  },
];

const Reasons = () => {
  return (
    <div className="relative mx-auto mb-15 w-screen max-w-[75rem] px-4">
      <h1 className="font-urbanist mb-12 text-4xl font-semibold md:text-6xl">
        Why Prefabrication is the
        <br /> <span className="text-[#24275E]">SMART CHOICE!</span>
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex h-fit w-fit flex-col rounded-2xl py-15 md:flex-row lg:px-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={clsx(
                "flex flex-col items-center border-0 px-10 py-5 text-center",
                index !== reasons.length - 1 && "border-gray-200 md:border-r-1",
              )}
            >
              <Image
                src={reason.img}
                alt={reason.title}
                className="h-[10rem] w-auto object-contain"
              />
              <h3 className="font-urbanist mt-5 mb-2 text-xl font-semibold">
                {reason.title}
              </h3>
              <div className="font-arabic text-sm text-black">
                {reason.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reasons;
