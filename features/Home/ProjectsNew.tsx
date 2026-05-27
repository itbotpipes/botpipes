"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainButton from "@/components/MainButton";
import Image from "next/image";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        containerRef.current!.querySelectorAll(".section-card")
      );

      const cards = sections.map(
        (section) => section.querySelector(".project-card") as HTMLElement
      );

      // Z-index stacking
      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: sections.length - i });
      });

      // Initial visual state
      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: i === 0 ? 1 : 0.8,
          opacity: i <= 1 ? 1 : 0,
          visibility: i <= 1 ? "visible" : "hidden",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      sections.forEach((section, i) => {
        if (i === sections.length - 1) return;

        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const afterNext = cards[i + 2];

        // Front card slides up
        tl.to(
          section,
          {
            yPercent: -120,
            ease: "none",
          },
          i
        );

        // Next card zooms in
        tl.to(
          nextCard,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
            ease: "none",
          },
          i
        );

        // Lock visibility so deeper cards NEVER bleed through
        if (afterNext) {
          tl.set(
            afterNext,
            {
              opacity: 0,
              visibility: "hidden",
            },
            i
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Projects = [
    {
      id: 1,
      title: "Commercial Towers & IT Parks",
      description:
        "Complex multi-floor installations demand precision and speed. Our prefabricated pipe assemblies",
      detail: [
        "Reduce installation time by 60%",
        "Minimize onsite labour, and",
        "Eliminate hot-work permits",
      ],
      layout: "flex-row-reverse",
      image: "/CommercialTowers&ITParks.jpg",
    },
    {
      id: 2,
      title: "Industrial Manufacturing Units",
      description:
        "High-pressure, high-stakes environments require maximum reliability and durability. Our industrial piping solutions with expertly engineered fire pump skids deliver",
      detail: [
        "Leak-proof performance",
        "Faster commissioning, and",
        "Full international fire safety standards",
      ],
      layout: "flex-row",
      image: "/industrialmanufacturingunit.png",
    },
    {
      id: 3,
      title: "Warehousing & Logistics Hubs",
      description:
        "Vast coverage areas need efficient, cost-effective piping solutions. Our modular piping systems and pre-engineered piping",
      detail: [
        "Accelerate installation across expansive facilities",
        "Optimize space utilization, and",
        "Provide energy-efficient piping systems",
      ],
      layout: "flex-row-reverse",
      image: "/Warehousing & Logistics Hubs.png",
    },
    {
      id: 4,
      title: "Retail & Residential High-Rises",
      description:
        "Occupant safety and aesthetic integration are paramount. Our customized fire protection piping systems offer",
      detail: [
        "Clean installations",
        "Reduced fabrication time, and",
        "Flexible HVAC piping systems integration",
      ],
      layout: "flex-row",
      image: "/Retail & Residential High-Rises.png",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden flex items-start justify-center"
    >
      <ParticleBackground 
              position = "absolute"
              primaryColor="#24275E"
            />
      <h1 className="mt-30 text-black max-md:text-lg text-center font-urbanist font-semibold text-4xl px-5">
        Explore our successful fire-safety prefab projects
      </h1>

      {Projects.map((project) => (
        <section
          key={project.id}
          className="section-card absolute top-20 flex items-center justify-center"
          style={{ width: "100%", height: "100%" }}
        >
          {/* CARD */}
          <div
            className={`
              project-card
              relative
              w-[90%] md:w-[70%]
              max-w-6xl
              h-auto md:h-[60vh]
              bg-white
              rounded-3xl
              shadow-2xl
              overflow-hidden
              flex
              ${project.layout}
              max-md:flex-col
            `}
          >
            {/* TEXT CONTENT */}
            <div className="p-6 md:p-10 flex flex-col justify-center w-full md:w-1/2">
              <h1 className="font-urbanist text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
                {project.title}
              </h1>

              <p className="font-arabic text-sm md:text-base mb-4 text-gray-700">
                {project.description}
              </p>

              <ul className="leading-relaxed mb-6 md:mb-8 space-y-2">
                {project.detail.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs md:text-sm text-gray-600"
                  >
                    <Image
                      src="/checked-filled.png"
                      alt="checked"
                      width={14}
                      height={14}
                      className="mt-1 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/solution" className="w-35">
                <MainButton 
                  className="cursor-pointer w-fit hover:scale-105 transition self-start"
                  variant="primary" text="View Details" 
                />
              </Link>
            </div>

            {/* IMAGE */}
            <div className="relative w-full md:w-1/2 h-38 md:h-full">
              <Image
                src={project.image}
                alt="Project"
                fill
                className="max-md:object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </section>
      ))}
    </div>
  );
}
