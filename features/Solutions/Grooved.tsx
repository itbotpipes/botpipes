"use client";

import Image from "@/components/Image";
import React from "react";
import { motion } from "motion/react";
import { stagger } from "motion";
import { StaggerChildVariants } from "@/lib/animation-utils";
import MainButton from "@/components/MainButton";
import Link from "next/link";

const Grooved = () => {
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
    "Fire-rated grooved couplings ",
    "Rigid and flexible couplings engineered for fire systems",
    "Compatible fittings designed for dimensional accuracy and pressure performance",
  ]

  return (
    <div className="mx-auto w-screen max-w-[75rem] my-20">
      {/* <h1 className="font-urbanist mb-8 px-4 text-4xl leading-tight font-semibold md:text-5xl">
        <span className="md:block">Why We're Better —</span>
        <span className="md:block md:pl-45">Robotic-Welded</span>
        <span className="block text-[#24275E] md:pl-60">Pipe Assemblies.</span>
      </h1> */}
      <div className="flex flex-col gap-10 md:px-20 lg:flex-row-reverse lg:gap-10 xl:gap-30 mb-10">
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
            <h2 className="font-urbanist text-3xl md:text-4xl font-bold">Integrated Grooved<span className="text-[#24275E]"> Coupling Solutions</span></h2>
            {/* <h3 className="font-semibold">Precision-Engineered Prefabricated Fire Piping Systems </h3> */}
            <p className="text-black/65 font-arabic">
              To ensure correct installation and long-term system reliability, we also supply:
            </p>
            {Assemblies.map((data) => (
              <ul className="list-disc pl-5">
                <li>
                  <p className="flex text-black/65 font-arabic">{data}</p>
                </li>
              </ul>
            ))}
            <p className="mt-8 font-arabic">
                By providing <strong>both the prefabricated piping and the grooved couplings</strong>, 
                we eliminate mismatch, tolerance issues, and site-level improvisation 
                that often compromise fire-system integrity. 
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

export default Grooved;
