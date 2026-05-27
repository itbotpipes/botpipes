"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import Image from "@/components/Image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";

gsap.registerPlugin(useGSAP, Flip);

interface InfiniteGalleryProps {
  className?: string;
}

const gallery = Array.from(Array(7)).map((item, indx) => ({
  img: `/about/grid/${indx + 5}.jpg`,
}));

const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const interval = setInterval(() => {
        if (!imgContainerRef.current) return;
        const parent = imgContainerRef.current;

        const firstChild = parent.firstElementChild;
        parent.appendChild(firstChild!);

        const state = Flip.getState(parent);
        gsap.set(parent, {
          y: containerRef.current!.getBoundingClientRect().height / 3,
        });
        Flip.to(state, { duration: 1 });
      }, 5000);

      return () => clearInterval(interval);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={clsx("flex items-end", className)}>
      <div
        ref={imgContainerRef}
        className="flex min-h-max w-full flex-col flex-nowrap"
      >
        {gallery.map((item, indx) => (
          <div key={indx} className="h-[15rem] w-full pb-8">
            <Image
              className="h-full w-full object-cover"
              src={item.img}
              alt={item.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteGallery;
