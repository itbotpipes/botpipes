"use client";

import React, { ReactNode, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

interface StickyContainerProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

const StickyContainer: React.FC<StickyContainerProps> = ({
  className,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 770px)", () => {
        const stickyEl = containerRef.current?.querySelector(
          ".sticky-element",
        ) as HTMLDivElement;

        if (!stickyEl) return;

        gsap.to(stickyEl, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top+=100px",
            end: "bottom center+=100",
            pin: stickyEl,
            pinSpacing: false,
          },
        });
      });

      mm.add("(max-width: 768px)", () => {
        const stickyEl = containerRef.current?.querySelector(
          ".sticky-element",
        ) as HTMLDivElement;

        if (!stickyEl) return;

        gsap.to(stickyEl, {
          scrollTrigger: {
            trigger: stickyEl,
            start: "bottom bottom",
            endTrigger: containerRef.current,
            end: "bottom bottom",
            pin: stickyEl,
            pinSpacing: false,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={clsx("", className)}>
      {children}
    </div>
  );
};

export default StickyContainer;
