"use client";

import { TestimonialRecord } from "@/lib/firebase/firestore/testimonials";
// import Image from "@/components/Image";
import clsx from "clsx";
import React from "react";
import useTestimonials from "./useTestimonials";
import TestimonialItem from "./TestimonialItem";

interface TestimonialsProps {
  className?: string;
  testimonials: TestimonialRecord[];
}
const Testimonials: React.FC<TestimonialsProps> = ({
  className,
  testimonials,
}) => {
  const { currTestimonial, containerRef, testimonialContainerRef } =
    useTestimonials(testimonials);

  return (
    <div id="testimonials" className={clsx("relative", className)}>
      <div className="mb-20">
        <h3 className="font-anek mb-2 text-sm font-semibold uppercase">
          TESTIMONIALS
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <h1 className="font-urbanist text-3xl font-semibold sm:text-4xl">
            Happy clients, trusted
            <br />
            <span className="text-[#24275E]">results!</span>
          </h1>
          <div className="space-y-5">
            <p className="font-arabic text-sm text-gray-500">
              Our customers trust Botpipes Tech for one simple reason —{" "}
              <strong>
                we deliver what we promise: leak-proof quality, faster
                installation, and total project confidence.
              </strong>{" "}
            </p>
            <p className="font-arabic text-sm text-gray-500">
              Every client relationship is built on reliability, transparency,
              and long-term support — because in fire protection,{" "}
              <strong>trust is engineered, not claimed.</strong>
            </p>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory items-end justify-end overflow-x-auto md:snap-none md:overflow-hidden"
      >
        <div
          ref={testimonialContainerRef}
          className={clsx(
            "flex w-full gap-4 transition-colors duration-400 md:gap-0",
          )}
        >
          {testimonials.map((review, indx) => (
            <TestimonialItem
              id={review.id}
              key={indx}
              stars={review.ratings}
              review={JSON.parse(review.description)}
              img={""}
              user={review.username}
              title={review.role}
            />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-10 left-0 flex w-full justify-center gap-4 md:hidden">
        {testimonials.map((_, indx) => (
          <div
            className={clsx(
              "h-2.5 w-2.5 rounded-full border-1 border-black transition-colors duration-300",
              testimonials[indx].id === currTestimonial && "bg-black",
            )}
            key={indx}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
