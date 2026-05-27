"use client";

import Image from "@/components/Image";
import clsx from "clsx";
import MainButton from "@/components/MainButton";
import React, { useEffect, useRef, useState } from "react";
import { motion, stagger } from "motion/react";
import { StaggerChildVariants } from "@/lib/animation-utils";
import Link from "next/link";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import { ArrowRight } from "lucide-react";
// const blogs = [
//   {
//     id: "1",
//     title: "Precision in Every Weld",
//     desc: "How robotic welding and automation are redefining India's fire-safety infrastructure.",
//     tags: ["Engineering", "2025"],
//     img: "/blogs/1.png",
//   },
//   {
//     id: "2",
//     title: "Inside the Factory of the Future",
//     desc: "A behind-the-scenes look at our automated prefabrication plant — from plasma cutting to powder coating, see how precision is built into every product.",
//     tags: ["Innovation", "2025"],
//     img: "/blogs/2.png",
//   },
// ];

interface BlogInterface extends Omit<BlogRecord, "category_ids"> {
    category_ids: string [];
}

interface BlogListProps {
    blogs: BlogInterface[];
}

const Blogs: React.FC<BlogListProps> = ({ blogs }) => {
  const onlyBlogs = blogs.filter((blog) =>
  blog.category_ids?.includes("Blogs")
);
  return (
    <div className={clsx("mx-auto w-screen max-w-[65rem] px-4 pb-10")}>
      <div className="mb-15">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <h1 className="font-urbanist text-4xl font-semibold">
            Explore our latest
            <br />
            <span className="text-[#24275E]">Blog posts!</span>
          </h1>
         <div className="flex items-center md:justify-end">
  <Link href="/blog">
    <MainButton text="View All" />
  </Link>
</div>
        </div>
      </div>

      <motion.div
        initial="initial-y"
        whileInView="view"
        transition={{ delayChildren: stagger(0.1) }}
        viewport={{ margin: "0px 0px -200px 0px", once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        
        
       {onlyBlogs.map((item, indx) => (
          <motion.div variants={StaggerChildVariants} key={indx}>
            <Image
              src={item.cover_image_url.secureUrl}
              alt={item.title}
              className="mb-8 h-[20rem] w-full object-cover"
            />
            <div>
              <h2 className="font-inter mb-2 font-semibold uppercase">
                {item.title}
              </h2>
              <p className="font-arabic mb-2 text-sm truncate w-auto">{item.excerpt}</p>
              {/* <div className="font-inter flex gap-4 text-xs">
                {onlyBlogs.map((item, indx) => (
                  <div key={indx} className="flex gap-4">
                    <div key={indx} className="uppercase">
                      {item.author}{" |"}
                    </div>
                    {indx !== blogs.length - 1 && "|"}
                    <Link 
                        className="cursor-pointer font-semibold"
                        href={`/blog/${item.slug}`}
                        target="_blank"
                      >
                        Read More{" "}
                        <ArrowRight
                            className="inline text-[#24275E]"
                            strokeWidth={1}
                            size={20}
                        />
                      </Link>
                  </div>
                ))}
              </div> */}
                 <Link 
                        className="cursor-pointer font-semibold"
                        href={`/blog/${item.slug}`}
                        target="_blank"
                      >
                        Read More{" "}
                        <ArrowRight
                            className="inline text-[#24275E]"
                            strokeWidth={1}
                            size={20}
                        />
                      </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blogs;
