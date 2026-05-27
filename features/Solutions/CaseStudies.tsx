"use client";

import Image from "@/components/Image";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Observer);

const caseStudies = [
  {
    type: "lorem",
    title:
      "IMSA iungit duo SentronicsUltrasonica Fluxus Mensura Instrumenta ad maiorem Aequilibrium Performance Moderationem",
    desc: `IMSA iungit duo Sentronics ultrasonica fluxus mensura instrumenta ad maiorem Aequilibrium Performance moderationem.`,
    img: "/imgs/open-pipe.png",
  },
  {
    type: "lorem",
    title:
      "IMSA iungit duo SentronicsUltrasonica Fluxus Mensura Instrumenta ad maiorem Aequilibrium Performance Moderationem",
    desc: `IMSA iungit duo Sentronics ultrasonica fluxus mensura instrumenta ad maiorem Aequilibrium Performance moderationem.`,
    img: "/imgs/open-pipe.png",
  },
  {
    type: "lorem",
    title:
      "IMSA iungit duo SentronicsUltrasonica Fluxus Mensura Instrumenta ad maiorem Aequilibrium Performance Moderationem",
    desc: `IMSA iungit duo Sentronics ultrasonica fluxus mensura instrumenta ad maiorem Aequilibrium Performance moderationem.`,
    img: "/imgs/open-pipe.png",
  },
];

const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const studiesContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handlePrev = () => setActive((state) => state - 1);

  const handleNext = () => setActive((state) => state + 1);

  useEffect(() => {
    const container = studiesContainerRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = children.indexOf(entry.target);
            setActive(index);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        gsap.to(studiesContainerRef.current, {
          xPercent: -(active * 100),
        });
      });
    },
    { scope: containerRef, dependencies: [active] },
  );

  return (
    <div ref={containerRef} className="py-25">
      <div className="mx-auto max-w-[65rem] rounded-2xl md:p-12">
        <h1 className="font-inter mb-8 text-center text-5xl font-semibold">
          Case <span className="text-[#24275E]">Studies</span>
        </h1>
        <div className="relative">
          {active !== 0 && (
            <button
              disabled={active === 0}
              onClick={handlePrev}
              className="absolute top-[50%] left-0 z-10 hidden min-h-10 min-w-10 -translate-x-full -translate-y-[50%] cursor-pointer items-center justify-center rounded-full bg-[#F7C948] text-white disabled:cursor-not-allowed md:flex"
            >
              <ArrowLeft />
            </button>
          )}

          <div className="flex-1 snap-x snap-mandatory overflow-x-auto md:overflow-x-hidden">
            <div
              ref={studiesContainerRef}
              className="flex w-full flex-row gap-4"
            >
              {caseStudies.map((item, indx) => (
                <div className="w-full shrink-0 snap-center px-7" key={indx}>
                  <div className="flex flex-col-reverse overflow-hidden rounded-xl max-w-xl bg-white border-2 border-black">
                    <div className="font-inter flex-1 p-6 md:p-10">
                      <h4 className="mb-2 text-green-500">{item.type}</h4>
                      <h1 className="mb-5 text-2xl font-semibold">
                        {item.title}
                      </h1>
                      <p className="mb-4 text-sm">{item.desc}</p>
                      <p className="cursor-pointer font-semibold">
                        Read Case Study{" "}
                        <ArrowRight
                          className="inline text-green-600"
                          strokeWidth={1}
                          size={20}
                        />
                      </p>
                    </div>
                    <div className="relative min-h-[13rem] flex-1 md:h-auto">
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="absolute top-0 left-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {active !== caseStudies.length - 1 && (
            <button
              disabled={active === caseStudies.length - 1}
              onClick={handleNext}
              className="absolute top-[50%] right-0 z-10 hidden min-h-10 min-w-10 translate-x-full -translate-y-[50%] cursor-pointer items-center justify-center rounded-full bg-[#F7C948] text-white disabled:cursor-not-allowed md:flex"
            >
              <ArrowRight />
            </button>
          )}

          <div className="absolute -bottom-10 left-0 flex w-full justify-center gap-4">
            {caseStudies.map((_, indx) => (
              <div
                className={clsx(
                  "h-2.5 w-2.5 rounded-full border-1 border-black transition-colors duration-300",
                  indx === active && "bg-black",
                )}
                key={indx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
