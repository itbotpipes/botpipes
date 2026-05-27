"use client";

import Image from "@/components/Image";
import MainButton from "@/components/MainButton";
import React from "react";
import { motion, stagger } from "motion/react";
import { StaggerChildVariants } from "@/lib/animation-utils";
import clsx from "clsx";

const blogs = [
  {
    id: "1",
    title: "Precision in Every Weld",
    desc: "How robotic welding and automation are redefining India's fire-safety infrastructure.",
    tags: ["Engineering", "2025"],
    img: "/blogs/1.png",
  },
  {
    id: "2",
    title: "Inside the Factory of the Future",
    desc: "A behind-the-scenes look at our automated prefabrication plant — from plasma cutting to powder coating, see how precision is built into every product.",
    tags: ["Innovation", "2025"],
    img: "/blogs/2.png",
  },
];

interface ExploreProps {
  className?: string;
}

const Explore: React.FC<ExploreProps> = ({ className }) => {
  return (
    <div className={clsx("mx-auto w-screen max-w-[65rem] px-4", className)}>
      <div className="mb-15">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <h1 className="font-urbanist text-4xl font-semibold">
            Explore the future of fire
            <br />
            <span className="text-[#24275E]">safety today!</span>
          </h1>
          <div className="flex items-center md:justify-end">
            <MainButton text="view all blog" />
          </div>
        </div>
      </div>
      <motion.div
        initial="initial-y"
        whileInView="view"
        transition={{ delayChildren: stagger(0.1) }}
        viewport={{ margin: "0px 0px -200px 0px", once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        {blogs.map((blog) => (
          <motion.div variants={StaggerChildVariants} key={blog.id}>
            <Image
              src={blog.img}
              alt={blog.img}
              className="mb-8 h-[20rem] w-full object-cover"
            />
            <div>
              <h2 className="font-inter mb-2 font-semibold uppercase">
                {blog.title}
              </h2>
              <p className="font-arabic mb-2 text-sm">{blog.desc}</p>
              <div className="font-inter flex gap-4 text-xs">
                {blog.tags.map((item, indx) => (
                  <div key={indx} className="flex gap-4">
                    <div key={indx} className="uppercase">
                      {item}
                    </div>
                    {indx !== blog.tags.length - 1 && "|"}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Explore;
