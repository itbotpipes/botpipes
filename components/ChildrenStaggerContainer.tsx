"use client";

import React, { ReactNode, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

interface StepsContainerProps {
  className?: string;
  children: ReactNode | ReactNode[];
  start?: string;
  vars?: gsap.TweenVars;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ChildrenStaggerContainer: React.FC<StepsContainerProps> = ({
  className,
  children,
  start = "start center",
  vars = { x: 10 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const steps = containerRef.current?.children;

      if (!steps) return;

      gsap.from(steps, {
        ...vars,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
        stagger: 0.15,
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

export default ChildrenStaggerContainer;
