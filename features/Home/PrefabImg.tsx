"use client";

import Image from "@/components/Image";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PrefabImgProps {
  direction: "left" | "right";
  src: string;
  items: { title: string; desc: ReactNode }[];
  className?: string;
}
const PrefabImg: React.FC<PrefabImgProps> = ({
  direction,
  src,
  items,
  className,
}) => {
  const containerRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefabEl = document.querySelector(".prefab-content");

    const dir = direction === "left" ? -1 : 1;

    mm.add("(max-width: 768px)", () => {
      gsap.to(containerRef.current, {
        x: dir * ((prefabEl?.getBoundingClientRect().width || 0) + 10),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    mm.add("(min-width: 770px)", () => {
      gsap.to(containerRef.current, {
        x: dir * ((prefabEl?.getBoundingClientRect().width || 0) + 10),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  });

  return (
    <div
      className={clsx(
        "relative flex",
        direction === "left" && "justify-end",
        className,
      )}
    >
      <Image
        ref={containerRef}
        src={src}
        alt="pipe"
        className="absolute top-0 left-0 z-5 h-full w-full max-w-[40rem] rounded-md object-cover"
      />

      <div
        className={clsx(
          "prefab-content max-w-[18rem]",
          direction === "right" && "text-right",
        )}
      >
        {items.map((item, indx) => (
          <div key={indx} className="font-anek mb-6">
            <div
              className={clsx(
                "mb-2 flex items-center gap-2",
                direction === "right" && "justify-end",
              )}
            >
              <Image
                src="/checked-filled.png"
                alt="checked-fileed"
                className="h-4 w-4 object-contain"
              />
              <h2 className="text-sm font-semibold">{item.title}</h2>
            </div>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefabImg;
