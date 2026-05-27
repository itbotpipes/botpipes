"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "@/components/Image";
import clsx from "clsx";

const imageList = [
  {
    // Left 1
    image: "/imgs/left 1.jpeg",
  },
  {
    // Left 2
    image: "/imgs/Bot Pipes Images-02.png",
  },
  {
    // Center
    image: "/imgs/center.jpeg",
  },
  {
    // Right 1
    image: "/imgs/right1 (1).jpeg",
  },
  {
    // Right 2
    image: "/imgs/right2.jpg",
  },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ImageAnimation = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const imageEls = imageContainerRef.current?.querySelectorAll(".img-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top top",
          scrub: true,
          pin: true,
        },
      });

      imageEls?.forEach((imgEl, indx) => {
        if (indx === 2)
          tl.to(
            imgEl,
            {
              height: "100%",
              minWidth: "100vw",
            },
            0,
          );

        if ([0, 1, 3, 4].includes(indx))
          tl.to(
            imgEl,
            {
              scale: 0.5,
            },
            0,
          );
      });
    },
    { scope: imageContainerRef },
  );
  return (
    <div
      ref={imageContainerRef}
      className="relative flex h-screen items-center justify-center gap-7"
    >
      {imageList.map((item, index) => (
        <Image
          ref={index === 2 ? imageRef : null}
          key={index}
          src={item.image}
          alt={item.image}
          className={clsx(
            "img-item block object-cover",
            [0, 4].includes(index) && "h-[40%] w-[10rem]",
            [1, 3].includes(index) && "h-[65%] w-[15rem]",
            index === 2 && "h-[85%] min-w-[20rem]",
          )}
        />
      ))}
    </div>
  );
};

export default ImageAnimation;
