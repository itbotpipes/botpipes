"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "@/components/Image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PhotoGridProps {
  className?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gridImgs = containerRef.current?.children;
      if (!gridImgs) return;
      gsap.from(gridImgs, {
        translateY: 200,
        translateZ: -500,
        rotateX: "-70deg",
        opacity: 0,
        stagger: () => (Math.random() < 0.05 ? 0 : gsap.utils.random(0.2, 1)),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000px",
          pin: true,
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        "grid h-screen min-h-screen grid-cols-5 grid-rows-4 gap-4 overflow-hidden perspective-distant",
        className,
      )}
    >
      {Array.from(Array(20)).map((item, indx) => (
        <Image
          key={indx}
          style={{ transformOrigin: "50% 0%" }}
          className="grid-img h-full w-full object-cover transform-3d"
          src={`/about/grid/${indx + 1}.jpg`}
          alt={""}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
