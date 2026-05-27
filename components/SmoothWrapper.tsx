"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { usePathname } from "next/navigation";
import React, { ReactNode, useContext, useState } from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

interface SmoothContextProps {
  smooth: globalThis.ScrollSmoother | null;
}

const SmoothContext = React.createContext<SmoothContextProps>({
  smooth: null,
});

export const useSmoothContext = () => useContext(SmoothContext);
interface SmoothWrapperProps {
  children: ReactNode | ReactNode[];
}
const SmoothWrapper: React.FC<SmoothWrapperProps> = ({ children }) => {
  const [smooth, setSmooth] = useState<globalThis.ScrollSmoother | null>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2, // controls how smooth the scroll feels (higher = smoother/slower)
          effects: true, // enable parallax effects
          normalizeScroll: true, // fixes browser scroll issues
        });

        setSmooth(smoother);

        return () => {
          smoother.kill();
          setSmooth(null);
        };
      });
    },
    { dependencies: [pathname] },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <SmoothContext.Provider value={{ smooth }}>
          {children}
        </SmoothContext.Provider>
      </div>
    </div>
  );
};

export default SmoothWrapper;
