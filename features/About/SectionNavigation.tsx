"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useSmoothContext } from "@/components/SmoothWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);
interface SectionNavigationProps {
  className?: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ className }) => {
  return (
    <div className={clsx("lg:text-right", className)}>
      <div className="sticky-element font-arabic relative z-50 flex h-fit min-w-[200px] flex-wrap gap-4 bg-white/70 px-6 py-6 shadow-md backdrop-blur-lg lg:flex-col lg:shadow-none">
        <SmoothButton id="steps">Why Us?</SmoothButton>
        <SmoothButton id="mission">Our Mission</SmoothButton>
        <SmoothButton id="story">Our Story</SmoothButton>
        {/* <SmoothButton id="founder">Founder</SmoothButton> */}
        {/* <SmoothButton id="teams">Teams</SmoothButton> */}
        {/* <SmoothButton id="testimonials">Tesimonials</SmoothButton> */}
      </div>
    </div>
  );
};

interface SmoothButtonProps {
  id: string;
  children: string;
}
const SmoothButton: React.FC<SmoothButtonProps> = ({ id, children }) => {
  const { smooth } = useSmoothContext();
  const [active, setActive] = useState(false);

  useGSAP(() => {
    const container = document.getElementById(id);

    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top 40%",
      end: "bottom 40%",
      onEnter: () => setActive(true),
      onEnterBack: () => setActive(true),
      onLeave: () => setActive(false),
      onLeaveBack: () => setActive(false),
    });
  });

  const handleNavigation = () => {
    if (smooth) {
      smooth.scrollTo(`#${id}`, true);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      className={clsx(
        "block cursor-pointer text-right transition-colors duration-350 hover:text-black",
        !active ? "text-gray-400" : "font-bold text-[#24275e]",
      )}
      onClick={handleNavigation}
    >
      {children}
    </button>
  );
};

export default SectionNavigation;
