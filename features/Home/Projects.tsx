"use client";

import Image from "@/components/Image";
import MainButton from "@/components/MainButton";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { motion, stagger } from "motion/react";
import { StaggerChildVariants } from "@/lib/animation-utils";

interface ProjectSchema {
  id: string;
  title: string;
  description: string;
  items: string[];
  img: string;
}
// ...existing code...
const projectItems: ProjectSchema[] = [
  {
    title: "Commercial Towers & IT Parks",
    description:
      "Complex multi-floor installations demand precision and speed. Our prefabricated pipe assemblies",
    items: [
      "Reduce installation time by 60%",
      "Minimize onsite labour, and",
      "Eliminate hot-work permits",
    ],
    id: "1",
    img: "/project-item.png",
  },
  {
    title: "Industrial Manufacturing Units",
    description:
      "High-pressure, high-stakes environments require maximum reliability and durability. Our industrial piping solutions with expertly engineered fire pump skids deliver",
    items: [
      "Leak-proof performance",
      "Faster commissioning, and",
      "Full international fire safety standards",
    ],
    id: "2",
    img: "/robotic.png",
  },
  {
    title: "Warehousing & Logistics Hubs",
    description:
      "Vast coverage areas need efficient, cost-effective piping solutions. Our modular piping systems and pre-engineered piping",
    items: [
      "Accelerate installation across expansive facilities",
      "Optimize space utilization, and",
      "Provide energy-efficient piping systems ",
    ],
    id: "3",
    img: "/project.jpg",
  },
  {
    title: "Retail & Residential High-Rises",
    description:
      "Occupant safety and aesthetic integration are paramount. Our customized fire protection piping systems offer",
    items: [
      "Clean installations",
      "Reduced fabrication time, and",
      "Flexible HVAC piping systems integration",
    ],
    id: "4",
    img: "/services/tube.jpg",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectSchema>(
    projectItems[0],
  );

  return (
    <div className="mx-auto my-30 w-screen max-w-[65rem] px-4">
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <h1 className="font-urbanist text-4xl font-semibold">
            Explore our successful{" "}
            <span className="text-[#24275E]">fire-safety prefab projects</span>
          </h1>
          <div className="space-y-2">
            <p className="font-arabic text-sm text-gray-500">
              Discover how our robotic prefabrication process has transformed
              the way fire-safety systems are built — cutting timelines,
              reducing risks, and ensuring <strong>certified quality</strong>{" "}
              across industries.
            </p>
            <p className="font-arabic text-sm text-gray-500">
              At BOTPipes, we deliver ready-to-install sprinkler assemblies with
              robotic precision, zero leakage, and on-time delivery — setting
              new standards for automation and reliability in fire-safety
              fabrication.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <motion.div
          initial="-initial"
          whileInView="view"
          transition={{ delayChildren: stagger(0.1) }}
          viewport={{ amount: 0.4, once: true }}
          className="flex flex-col gap-4"
        >
          {projectItems.map((item, indx) => (
            <motion.button
              variants={StaggerChildVariants}
              key={indx}
              onClick={() => setSelectedProject(item)}
              className={clsx(
                "flex cursor-pointer items-center justify-between gap-2 rounded-full p-2 pl-4",
                selectedProject.id !== item.id
                  ? "border-1 border-gray-200 bg-white text-black"
                  : "bg-[#24275E] text-white",
              )}
            >
              {item.title}
              <div
                className={clsx(
                  "flex items-center justify-center rounded-full p-3",
                  selectedProject.id !== item.id
                    ? "bg-[#24275E] text-white"
                    : "bg-white text-[#24275E]",
                )}
              >
                <ArrowRight size={20} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div>
          {projectItems.map((item, indx) => (
            <Image
              key={indx}
              src={item.img}
              alt="project-item"
              className={clsx(
                "h-[15rem] w-full rounded-3xl object-cover lg:min-h-[20rem]",
                item.id === selectedProject.id ? "block" : "hidden",
              )}
            />
          ))}
        </div>

        <div className="lg:py-8">
          <motion.div
            initial="initial"
            whileInView="view"
            transition={{ delayChildren: stagger(0.1) }}
            viewport={{ amount: 0.6, once: true }}
            className="flex h-full flex-col justify-between"
          >
            <div>
              <motion.h2
                variants={StaggerChildVariants}
                className="font-anek mb-3 text-xl font-semibold"
              >
                {selectedProject.title}
              </motion.h2>
              <motion.p
                variants={StaggerChildVariants}
                className="font-arabic mb-4 text-sm text-gray-500"
              >
                {selectedProject.description}
              </motion.p>
              <div className="space-y-1.5">
                {selectedProject.items.map((item, indx) => (
                  <motion.div
                    variants={StaggerChildVariants}
                    className="font-arabic flex items-center gap-2 text-sm text-gray-500"
                    key={indx}
                  >
                    <Image
                      src="/checked-filled.png"
                      alt="checked-fileed"
                      className="h-4 w-4 object-contain"
                    />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            <MainButton
              variants={StaggerChildVariants}
              text="View Details"
              className="mt-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
