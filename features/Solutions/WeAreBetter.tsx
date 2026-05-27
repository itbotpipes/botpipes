"use client";

import Image from "@/components/Image";
import React from "react";
import { motion } from "motion/react";
import { stagger } from "motion";
import { StaggerChildVariants } from "@/lib/animation-utils";
import MainButton from "@/components/MainButton";
import Link from "next/link";

const WeAreBetter = () => {
  // const Industries = [
  //   {
  //     id:"1",
  //     text:"Commercial Buildings & Corporates"
  //   },
  //   {
  //     id:"2",
  //     text:"Malls, Retail & Hospitality"
  //   },
  //   {
  //     id:"3",
  //     text:"Pharma & Clean Rooms"
  //   },
  //   {
  //     id:"4",
  //     text:"Data Centres & Tech Parks"
  //   },
  //   {
  //     id:"5",
  //     text:"Residential & High-Rise Projects"
  //   },
  //   {
  //     id:"6",
  //     text:"Infrastructure & Public Utilities"
  //   },
  // ];

  const Assemblies = [
    "Custom pipe spools",
    "Headers & riser assemblies",
    "Branch networks for sprinklers & hydrants",
    "Factory-assembled manifolds and fittings",
  ]

  return (
    <div className="mx-auto w-screen max-w-[75rem]">
      {/* <h1 className="font-urbanist mb-8 px-4 text-4xl leading-tight font-semibold md:text-5xl">
        <span className="md:block">Why We're Better —</span>
        <span className="md:block md:pl-45">Robotic-Welded</span>
        <span className="block text-[#24275E] md:pl-60">Pipe Assemblies.</span>
      </h1> */}
      <div className="flex flex-col gap-10 md:px-20 lg:flex-row lg:gap-10 xl:gap-30 mb-10">
        <div className="flex items-center">
          <Image
            src="/HomeMob.PNG"
            alt="project-image"
            className="h-fit w-full object-contain md:min-w-[25rem]"
          />
        </div>
        <motion.div
          initial="initial"
          whileInView="view"
          transition={{ delayChildren: stagger(0.1) }}
          viewport={{ margin: "0px 0px -140px 0px", once: true }}
          className="space-y-4 px-4 text-sm text-black flex flex-col"
        >
          <motion.div className="space-y-4" variants={StaggerChildVariants}>
            <h2 className="font-urbanist text-3xl md:text-4xl font-semibold">What We<span className="text-[#24275E]"> Deliver</span></h2>
            <h3 className="font-arabic font-semibold text-sm">Precision-Engineered Prefabricated Fire Piping Systems </h3>
            <p className="text-black/65 font-arabic text-sm">
              We provide complete prefabricated assemblies — including:
            </p>
            {Assemblies.map((data) => (
              <ul className="list-disc pl-5">
                <li>
                  <p className="flex text-black/65 font-arabic text-sm">{data}</p>
                </li>
              </ul>
            ))}
            <p className="font-arabic">Every component is built in a controlled environment, hydro-tested, 
              dimensionally verified, and delivered <i>ready for plug-and-play installation.</i>
            </p>
          </motion.div>
          <Link href="/contact" className="w-[125px] mb-5">
            <MainButton 
              variant={"primary"}
              text="Contact us"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WeAreBetter;
