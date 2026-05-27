import Image from "@/components/Image";
import React from "react";
// import HoverGrid from "./HoverGrid";
import AnimatedCards from "./AnimatedCards";
import ParticleBackground from "@/components/ParticleBackground";

const Services = () => {
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="mx-auto mb-30 max-w-[75rem] px-4">
        <h1 className="font-urbanist mb-8 text-4xl font-semibold md:text-[65px]/tight">
          Prefab Fire-Safety Services
          <br /> for <span className="text-[#24275E]">Reliable Projects</span>
        </h1>
        <div className="flex max-w-[55rem] flex-col-reverse gap-8 md:flex-row md:gap-25">
          <div className="font-montserrat w-[15rem] space-y-8 text-xs font-bold">
            <Image
              src="/experience-circle.png"
              alt="exp"
              className="h-fit w-fit"
            />
          </div>
          <div className="font-arabic space-y-3 text-sm">
            <p>
              {/* Our{" "}<strong>advanced robotic prefabrication process delivers turnkey piping solutions</strong> 
              engineered for {" "}
              <strong>speed & efficiency</strong> 
              and reliability. Through{" "}
              <strong>state-of-the-art automation</strong> 
              and precision manufacturing, we produce{" "}
              <strong>prefabricated pipe assemblies</strong> 
              in a controlled environment—ensuring{" "}
              <strong>precision and consistency</strong> 
              across every component. From{" "}
              <strong>custom pipe fabrication</strong> 
              and robotic welding to{" "}
              <strong>automated quality control</strong> 
              and hydro-testing, our streamlined workflow eliminates onsite delays and rework. */}
              Say goodbye to guesswork and site-level chaos. Our robotic prefabrication setup builds fire-safety systems with {" "}
              <strong>pin-drop precision, super clean welds, </strong> and <strong>zero last-minute surprises.</strong> {" "}
              Every spool is crafted, tested, and packed likes it's heading to a moon mission—because reliability shouldn’t be optional.
            </p>

            <p>
              {/* We manage the complete{" "}
              <strong>
                piping project management
              </strong>{" "}
              cycle under one roof: design validation, automated cutting, welding, coating and final testing. This{" "}
              <strong>
                offsite pipe fabrication
              </strong>{" "}
              approach delivers fully traceable documentation, zero hot-work permits, and{" "}
              <strong>
                mechanical piping solutions that meet international fire safety standard
              </strong>—NFPA, IS, UL, and FM Global. */}
              From intelligent 3D design to flawless robotic welding and hydro-testing, 
              every step is handled with consistency and care. No rework. No delays. 
              No “we’ll fix it onsite” drama. Just <strong>factory-tested components</strong> that fit perfectly and perform 
              like a beast the moment they reach the site.
            </p>

            <p>
              {/* <strong>
                The result: Reduce installation time
              </strong>{" "}
              by 50-80%,{" "}
              <strong>minimize onsite labour,</strong> and deliver {" "}
              <strong>cost-effective piping solutions with maximum reliability and durability.</strong> */}
              Less time installing. More time celebrating a job well done. Quality that doesn’t just meet standards — it sets them.
            </p>
          </div>
        </div>

        {/* <HoverGrid className="py-10" /> */}

        <AnimatedCards />
      </div>
    </div>
  );
};

export default Services;
