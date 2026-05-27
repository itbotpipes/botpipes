"use client";

import clsx from "clsx";
import { animate } from "motion";
import { useInView, useIsomorphicLayoutEffect } from "motion/react";
import React, { useRef } from "react";

interface AniamtedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}
const AnimatedCounter: React.FC<AniamtedCounterProps> = ({
  from = 0,
  to,
  duration = 1,
  className,
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { amount: "all", once: true });

  useIsomorphicLayoutEffect(() => {
    const element = counterRef.current;
    if (!element) return;
    if (!inView) return;

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration,
      ease: undefined,
      onUpdate: (value) => {
        element.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [inView]);
  return <div className={clsx("inline", className)} ref={counterRef}></div>;
};

export default AnimatedCounter;
