"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useRef } from "react";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "words" });

    // Initial state: invisible + gray
    gsap.set(split.words, {
      opacity: 0.7,
      color: "#9CA3AF", // gray-400-ish
    });

    gsap.to(split.words, {
      opacity: 1,
      color: "#24275E",
      duration: 0.6, // fade duration
      ease: "power2.out",
      stagger: {
        each: 0.08,
        from: "random",
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom+=1500 bottom",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  },
  { scope: containerRef }
);



  return (
    // <div ref={containerRef} className="bg-[#24275E] px-4 py-30 text-white">
    <div ref={containerRef} className="relative px-4 py-30 text-[#24275E]">
      <ParticleBackground 
              position = "absolute"
              primaryColor="#24275E"
            />
        <p className="mt-20 mb-10 font-urbanist mx-auto max-w-[68rem] bg-gradient-to-r text-left text-2xl/[1.5em] font-bold md:text-3xl/[1.5em]">
          Grooved Fire-Piping Systems & Couplings — Engineered as One Solution 
        </p>
      <div ref={textRef}>
        <p className="font-arabic mx-auto max-w-[68rem] bg-gradient-to-r text-left text-md/[1.5em] md:text-[20px]/[1.5em]">
          Botpipes Tech provides precisely constructed fire-safety and piping solutions 
          for a variety of applications, from transportation and distribution systems to 
          testing and industrial installations, thanks to our proprietary prefabrication 
          processes and in-depth engineering knowledge.
        </p>

        <p className="font-arabic mx-auto mt-8 max-w-[68rem] text-left text-md/[1.5em] md:text-[20px]/[1.5em]">
          Our robotic manufacturing solutions are built to overcome{" "}
          the most difficult problems in modular assembly, fluid flow, 
          and pressure management, guaranteeing dependability in every situation.
          
        </p>
      </div>
    </div>
  );
};

export default Intro;
