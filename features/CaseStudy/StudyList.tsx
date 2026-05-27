"use client";

import Image from "@/components/Image";
import { ArrowRight, InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/firebase/firestore/blogs"; // ✅ your fetch function

const StudyList = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  // ✅ fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data || []);
    };

    fetchBlogs();
  }, []);
// console.log(blogs);
  // ✅ filter case studies
const caseStudies = blogs.filter((blog) =>
  blog.category_ids?.includes("Case Study") ||
  blog.category_ids?.includes("CFVaDYbnG4C8xxcGfzfU")
);
//  console.log(caseStudies);
  return (
    <div>
      <div className="mx-auto max-w-[75rem] py-20">

        {/* ✅ HERO SAME */}
        <div className="space-y-4 text-center">
          <h1 className="font-inter text-4xl/[1.5em] font-semibold">
            We have experience working with over 250 clients worldwide.
          </h1>

          <p className="font-inter mx-auto max-w-[60rem] text-lg text-gray-600">
            From <strong>industrial automation</strong> to{" "}
            <strong>fire-safety infrastructure</strong>, Botpipes Tech has
            partnered with leading EPCs, MEP contractors, and developers to
            deliver{" "}
            <strong>factory-tested, leak-proof prefabricated systems</strong>{" "}
            that meet international standards.
          </p>

          <p className="font-inter mx-auto mb-15 max-w-[60rem] text-lg text-gray-600">
            Each collaboration represents our promise of{" "}
            <strong>precision, reliability, and efficiency</strong>.
          </p>
        </div>

        {/* ✅ EMPTY STATE */}
        {caseStudies.length === 0 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <InfoIcon size={15} />
            <p className="text-center text-sm">
              No case studies available
            </p>
          </div>
        )}

        {/* ✅ SAME BLOG UI */}
        <div className="flex flex-col gap-20 mt-10">
          {caseStudies.map((item, indx) => (
            <div
              className="bg-white flex flex-col-reverse overflow-hidden shadow-md md:flex-row md:rounded-xl"
              key={indx}
            >
              <div className="flex-1">
                <div className="font-inter flex-1 p-6 md:p-10">
                  <h4 className="mb-2 text-green-500">Case Study</h4>

                  <h1 className="mb-5 text-2xl font-semibold">
                    {item.title}
                  </h1>

                  <Link
                    href={`/case-study/${item.slug}`} // ✅ same detail page
                    className="cursor-pointer font-semibold"
                  >
                    Read Case Study{" "}
                    <ArrowRight
                      className="inline text-green-600"
                      size={20}
                    />
                  </Link>
                </div>
              </div>

              <div className="aspect-video max-h-[18rem] w-full flex-1 overflow-hidden px-6 md:max-h-[25rem] md:px-0">
                <Image
                  className="h-full w-full rounded-lg object-cover md:rounded-none"
                  src={item.cover_image_url?.secureUrl}
                  alt={item.title}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StudyList;