"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "@/components/ParticleBackground";

interface StoryProps {
  className?: string;
}

const Story: React.FC<StoryProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".story-item");

      gsap.from(elements, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className={clsx(
        "relative py-20 px-6 md:px-12 overflow-hidden",
        className
      )}
    >
      
      <ParticleBackground 
                    position = "absolute"
                    primaryColor="#24275E"
                  />
      <div className="relative mx-auto max-w-[65rem]">
        {/* Header */}
        <h1 className="story-item font-urbanist mb-16 text-4xl md:text-5xl font-bold">
          Our Story
        </h1>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 top-0 h-full w-[2px] bg-slate-200" />

          <div className="flex flex-col gap-12">
            {/* Block 1 */}
            <div className="story-item relative md:grid md:grid-cols-2 md:gap-12">
              <div className="md:pr-10">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Founded with a clear purpose — to redefine India’s fire-safety
                  installation landscape —{" "}
                  <strong>Botpipes Tech Pvt. Ltd.</strong> began its journey with
                  a vision to combine{" "}
                  <strong>
                    engineering precision, automation, and reliability.
                  </strong>{" "}
                  What started as a small initiative to reduce on-site
                  complexities has evolved into a <strong>fully robotic.</strong>
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="story-item relative md:grid md:grid-cols-2 md:gap-12">
              <div className="md:col-start-2 md:pl-10">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  <strong>
                    Prefabrication facility delivering faster timelines,
                    leak-free joints, and certified quality.
                  </strong>{" "}
                  Over the years, we’ve grown into a team of passionate engineers,
                  designers, and specialists committed to creating safer,
                  smarter, and more efficient systems that protect lives and
                  property.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className="story-item relative md:grid md:grid-cols-2 md:gap-12">
              <div className="md:pr-10">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  Every pipe, joint, and weld that leaves our factory is a
                  reflection of our{" "}
                  <strong>
                    uncompromising commitment to quality, consistency, and
                    innovation.
                  </strong>
                </p>
              </div>
            </div>

            {/* Block 4 */}
            <div className="story-item relative md:grid md:grid-cols-2 md:gap-12">
              <div className="md:col-start-2 md:pl-10">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  As India’s{" "}
                  <strong>
                    leading robotic fire-safety prefabrication company
                  </strong>
                  , we transform complex designs into ready-to-install solutions.
                  Our operations integrate{" "}
                  <strong>
                    precision cutting, robotic welding, and powder-coated finishes
                  </strong>{" "}
                  under strict quality assurance.
                </p>
              </div>
            </div>

            {/* Block 5 */}
            <div className="story-item relative md:grid md:grid-cols-2 md:gap-12">
              <div className="md:pr-10">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  From commercial towers and IT parks to industrial plants and
                  logistics hubs, our work stands as a testament to reliability
                  and trust — building a <strong>safer tomorrow</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;