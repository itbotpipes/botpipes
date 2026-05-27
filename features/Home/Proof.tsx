"use client";

import Image from "@/components/Image";
import React from "react";
import { motion } from "motion/react";
import { stagger } from "motion";
import { StaggerChildVariants } from "@/lib/animation-utils";
import MainButton from "@/components/MainButton";
import Link from "next/link";

const Proof = () => {
  const Industries = [
    {
      id:"1",
      text:"Commercial Buildings & Corporates"
    },
    {
      id:"2",
      text:"Malls, Retail & Hospitality"
    },
    {
      id:"3",
      text:"Pharma & Clean Rooms"
    },
    {
      id:"4",
      text:"Data Centres & Tech Parks"
    },
    {
      id:"5",
      text:"Residential & High-Rise Projects"
    },
    {
      id:"6",
      text:"Infrastructure & Public Utilities"
    },
  ];


  return (
    <div className="mx-auto mb-30 w-screen max-w-[75rem]">
      <h1 className="font-urbanist mb-8 px-4 text-4xl leading-tight font-semibold md:text-5xl">
        <span className="md:block">Driven by Precision.</span>
        <span className="md:block md:pl-45">Built on Trust.</span>
        <span className="block text-[#24275E] md:pl-60">Designed to Last.</span>
      </h1>
      <div className="flex flex-col gap-10 md:px-20 lg:flex-row lg:gap-10 xl:gap-30">
        <div className="flex items-center">
          <Image
            src="/imgs/driven.png"
            alt="project-image"
            className="h-fit w-full object-contain md:min-w-[25rem]"
          />
        </div>
        <motion.div
          initial="initial"
          whileInView="view"
          transition={{ delayChildren: stagger(0.1) }}
          viewport={{ margin: "0px 0px -140px 0px", once: true }}
          className="font-arabic space-y-4 px-4 text-sm text-black"
        >
          <motion.div className="font-arabic" variants={StaggerChildVariants}>
            <h2 className="text-lg font-bold">Engineered to Fit.</h2>
            <p>
              {/* <strong>Precision and consistency</strong> is fundamental to fire protection. Our{" "}
              <strong> advanced robotic prefabrication process</strong> in a controlled{" "}
              <strong>sustainable manufacturing environment</strong> ensures every{" "}
              <strong>prefabricated pipe assembly</strong> fits perfectly on the first attempt—eliminating field modifications, rework, and{" "}
              <strong>reducing installation time.</strong> */}
              From high-rise towers to data centres and industrial plants, our prefabricated fire-safety systems power projects where precision, speed, and safety cannot be compromised.
            </p>
          </motion.div>
          <motion.div className="font-arabic" variants={StaggerChildVariants}>
            <h2 className="text-lg font-bold">Industries we work with:</h2>
            {/* <p>
              <strong>Built to last</strong> with{" "}
              <strong>the highest quality materials and components.</strong> From material selection to comprehensive hydro-testing, our{" "}
              <strong>improved quality control & quality assurance</strong> processes guarantee{" "}
              <strong>maximum reliability and durability for</strong> decades. When safety is critical,{" "}
              <strong>impeccable quality</strong> is mandatory.
            </p> */}
            {Industries.map(( index ) => (
              <ul key={index.id}>
                <li>- {index.text}</li>
              </ul>
            ))}
          </motion.div>
          {/* <motion.div className="font-arabic" variants={StaggerChildVariants}>
            <h2 className="text-lg font-bold">Partnership for Success.</h2>
            <p>
              We build long-term relationships, not transactions. Success means delivering{" "}
              <strong>cost-effective piping solutions</strong> that enhance your project outcomes and reputation. 
              Our commitment extends beyond delivery—with ongoing support from{" "}
              <strong>initial consultation</strong> through project completion and beyond.
            </p>
          </motion.div> */}
          <motion.div className="font-arabic" variants={StaggerChildVariants}>
            {/* <h2 className="text-lg font-bold">Innovation that Leads.</h2> */}
            <h2 className="text-lg font-bold">Ready to build safer? We're ready to deliver</h2>
            <p>
              {/* <strong>India's First Robotic Prefabrication</strong> facility leads through continuous advancement. Our{" "}
              <strong>state-of-the-art automation, sustainable practices</strong> and industry research keep us ahead of evolving{" "}
              <strong>international fire safety standard</strong>  and construction requirements—delivering{" "}
              <strong>high-quality piping solutions</strong> that set industry benchmarks. */}
            </p>
          </motion.div>
          <Link href="/solution">
            <MainButton 
              variant={"primary"}
              text="Know more"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Proof;
