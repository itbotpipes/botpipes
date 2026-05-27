"use client";

import React, { useEffect, useRef } from "react";
import { CircleCheckBig } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const traditional = [
  "Manual welding & cutting",
  "High variance & rework ",
  "Quality assumed",
  "Site-dependent scheduling",
  "Reactive problem resolution",
];

const prefabrication = [
  "Robotic welding & precision fabrication",
  "Consistent, repeatable quality",
  "Hydro-tested, documented verification",
  "Factory parallel production",
  "Proactive engineered solutions",
];

export default function ComparisonPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    gsap.set(".card", { opacity: 1 });
    gsap.set(".list-item", { opacity: 1 });

    gsap.fromTo(
      ".card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".list-item",
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[65rem] px-6 md:px-12 py-16 md:py-20"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-urbanist text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          How We Compare to{" "}
          <span className="text-[#24275E]">
            Traditional Fabrication
          </span>
        </h1>

        {/* subtle divider */}
        <div className="w-16 h-[2px] bg-[#24275E]/20 mx-auto mt-6"></div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Traditional */}
        <div className="card group border border-slate-200 rounded-2xl p-6 md:p-10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
          <h2 className="font-urbanist text-base md:text-2xl font-semibold text-slate-900 mb-6 md:mb-8">
            Traditional On-Site Work
          </h2>

          <ul className="space-y-5 md:space-y-6">
            {traditional.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4"
              >
                <div className="mt-2 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[#24275E] transition-colors"></div>
                <p className="text-sm md:text-sm text-slate-600 leading-relaxed font-arabic">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Prefabrication */}
        <div className="card group border border-slate-900 bg-[#24275E] text-white rounded-2xl p-6 md:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          
          {/* subtle glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

          <h2 className="font-urbanist text-base md:text-2xl font-semibold mb-6 md:mb-8 relative z-10">
            Botpipes Prefabrication
          </h2>

          <ul className="space-y-5 md:space-y-6 relative z-10">
            {prefabrication.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4"
              >
                <CircleCheckBig className="h-5 w-5 text-white shrink-0 mt-[2px]" />
                <p className="text-sm md:text-sm text-slate-200 leading-relaxed font-arabic">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional subtle scroll hint (mobile only) */}
      <p className="text-center text-xs text-gray-400 mt-8 md:hidden">
        Scroll to explore ↓
      </p>
    </section>
  );
}