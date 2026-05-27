"use client";

import Image from "@/components/Image";
import React, { useRef, useEffect, useState } from "react";
import { productBenefits } from "./Data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProductBenefitsTwo = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topicsRef = useRef<HTMLDivElement[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  if (!containerRef.current) return;

  gsap.registerPlugin(ScrollTrigger);

  const topics = topicsRef.current;
  const total = productBenefits.length;

  // Initial state
  gsap.set(topics, {
    x: 100,
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: `+=${total * 400}`,
      scrub: true,
      pin: true,

      // 👇 THIS IS THE FIX
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          total - 1,
          Math.floor(progress * total)
        );
        setActiveIndex(index);
      },
    },
  });

  topics.forEach((el, index) => {
    tl.to(
      el,
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      index
    );
  });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden [@media(max-width:800px)]:hidden"
    >
      <div className="relative h-full flex bg-[#24275E]">
        {/* LEFT SIDE IMAGE */}
        <div className="relative w-1/2 flex items-center h-full overflow-hidden">
          {/* HEADER (UNCHANGED) */}
          <div className="mb-12 z-10 p-5">
            <h1 className="font-urbanist text-4xl md:text-5xl font-semibold text-white mb-3">
              What Sets Our Solutions Apart
            </h1>

            <p className="font-arabic text-gray-300 max-w-[32rem] text-xs">
              Every BotPipes Tech solution is robotically engineered to deliver precision execution,
              faster installation, and long-term reliability for fire-safety infrastructure.
            </p>
          </div>
          {productBenefits.map((item, i) => (
            <Image
              key={i}
              src={item.img}
              alt="background"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-1/2 h-full flex flex-col justify-center px-12 relative z-10">
          {/* TOPICS STACK */}
          <div className="space-y-8">
            {productBenefits.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) topicsRef.current[index] = el;
                }}
                className="opacity-0"
              >
                <h2 className="font-semibold font-urbanist text-2xl text-white mb-2 border-b border-white/20 pb-2">
                  {feature.title}
                </h2>

                <p className="font-arabic text-sm text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="absolute bottom-10 w-xl flex justify-center z-20">
            <Link
              href="/contact"
              className="flex items-center gap-4 rounded-full border-2 border-white px-8 py-2 font-semibold text-white hover:bg-white hover:text-[#24275E] transition"
            >
              Contact Our Team <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsTwo;