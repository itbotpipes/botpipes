import Image from "@/components/Image";
import React from "react";
import * as motion from "motion/react-client";
import { Variants } from "motion";
import ProcessContainer from "./ProcessContainer";

const processes = [
  {
    id: "1",
    step: "Step 01",
    title: "Piping Design Engineering",
    description: (
      <p>
        <strong>Piping system design</strong> with detailed CAD and isometric drawings for exact{" "}
        <strong>prefabrication for fire hydrant & sprinkler pipes</strong> accuracy.
      </p>
    ),
  },
  {
    id: "2",
    step: "Step 02",
    title: "Precision Manufacturing",
    description: (
      <p>
        <strong>Automated production process</strong> with plasma cutting and grooving delivers consistent dimensions within ±1 mm tolerance.
      </p>
    ),
  },
  {
    id: "3",
    step: "Step 03",
    title: "Robotic Welding",
    description: (
      <p>
        ABB-powered robotic weld cells guarantee uniform, certified welds with{" "}
        <strong>reduction in human error</strong> and zero leakage.
      </p>
    ),
  },
  {
    id: "4",
    step: "Step 04",
    title: "Testing & Certification",
    description: (
      <p>
        Comprehensive hydro-testing,{" "}
        <strong>quality control & quality assurance</strong> inspection, and full documentation for{" "}
        <strong>safety & compliance.</strong>
      </p>
    ),
  },
];

const itemVariants: Variants = {
  initial: {
    y: 100,
    opacity: 0,
    transition: { delay: 2, duration: 2 },
  },
  inView: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Process = () => {
  return (
    <div className="mx-auto my-30 w-screen max-w-[65rem] px-4">
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h1 className="font-urbanist text-4xl font-semibold">
            Inside the Botpipes Prefabrication Process —{" "}
            <span className="text-[#24275E]">
              Where Precision Meets Performance
            </span>
          </h1>
          <div className="font-arabic text-sm text-gray-500">
            <p>
              Our <strong>robotic manufacturing & prefabrication</strong> delivers faster timelines, leak-free joints, and 
              certified consistency—transforming{" "}
              <strong>customized fire protection piping systems</strong> into{" "}
              <strong>ready-to-install</strong> assemblies.
            </p>
            <p>
              Every step ensures accuracy, reliability, and compliance for seamless{" "}
              <strong>piping installation services.</strong>
            </p>
          </div>
        </div>
      </div>
      <ProcessContainer>
        {processes.map((process, indx) => (
          <motion.div
            variants={itemVariants}
            className="flex flex-1 flex-col gap-4"
            key={process.id}
          >
            {indx % 2 !== 0 && (
              <Image
                src="/process-arrow.png"
                alt="arrow"
                className="hidden h-fit w-fit pt-4 lg:block"
              />
            )}
            <div className="rounded-2xl bg-[#EAEAEF] p-4">
              <h3 className="font-anek mb-6">Step 0{process.id}</h3>
              <h2 className="font-anek mb-2 text-lg font-semibold">
                {process.title}
              </h2>
              <div className="font-arabic text-sm">{process.description}</div>
            </div>
            {indx % 2 == 0 && indx !== 0 && (
              <Image
                src="/process-arrow.png"
                alt="arrow"
                className="hidden h-fit w-fit -scale-y-100 pt-4 lg:block"
              />
            )}
          </motion.div>
        ))}
      </ProcessContainer>
    </div>
  );
};

export default Process;
