"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const AddValue = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const solutions = [
    {
      text:"High-rise buildings & commercial campuses",
      image:"/CommercialTowers&ITParks.jpg",
    },
    {
      text:"Industrial facilities with vibration or temperature extremes",
      image:"/Retail & Residential High-Rises.png",
    },
    {
      text:"Retrofit and live-building projects",
      image:"/industrialmanufacturingunit.png",
    },
    {
      text:"Transportation hubs, warehouses, and distribution centers",
      image:"/Warehousing & Logistics Hubs.png",
    },
    {
      text:"Any project where quality, schedule, and safety cannot be compromised",
      image:"/project.jpg",
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
        const el = scrollRef.current!;
        return el.scrollWidth - el.clientWidth;
      };

      const tween = gsap.to(scrollRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`, // ✅ exact match
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex justify-center items-center md:h-screen py-16 md:py-0 overflow-hidden">
      
      <div className="mx-auto max-w-[65rem] rounded-2xl p-6 md:p-12">
        <div className="p-4 w-full flex items-center justify-between md:flex-row flex-col">
          <h1 className="font-urbanist mb-6 md:text-left text-center text-3xl leading-tight font-semibold md:text-4xl">
            Where Our Solutions <br/>
            <span className="text-[#24275E]">Add Value</span>
          </h1>

          <p className="font-arabic text-sm text-gray-700 md:text-white md:bg-[#24275E] md:px-4 md:py-3 md:rounded-3xl">
            BotPipes prefabricated systems are ideally suited for the following:
          </p>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="overflow-hidden md:overflow-visible">
          <div
            ref={scrollRef}
            className="
              flex flex-col gap-4
              md:flex-row md:gap-6
            "
          >
            {solutions.map((item, index) => (
              <div
                key={index}
                className="
                group/item
                w-full
                md:min-w-[45%] lg:min-w-[50%]
                h-[220px] md:min-h-[20rem]
                border border-slate-200 rounded-2xl
                transition-all duration-300
                md:hover:border-[#24275E] 
                md:hover:drop-shadow-sm
                hover:-translate-y-2
                md:hover:bg-[#24275E]
                bg-white
                relative
                overflow-hidden
                "
              >
                <div
                  className="
                    flex items-end h-full relative z-10
                    bg-black/50
                    group-hover/item:bg-black/5
                    transition-all duration-300
                  "
                >
                  <p
                    className="
                      font-urbanist p-5 md:p-8 font-semibold text-white text-base md:text-xl leading-relaxed
                      transition-all duration-300
                    "
                  >
                    {item.text}
                  </p>
                </div>
                <Image 
                   src={item.image}
                   alt={item.text}
                   fill
                   className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile hint
        <p className="text-center text-xs text-gray-400 mt-4 md:hidden">
          Scroll down to explore ↓
        </p> */}
      </div>
    </section>
  );
};

export default AddValue;