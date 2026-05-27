"use client";

import React, { forwardRef } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface ImageProps extends NextImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className }, ref) => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    return (
      <NextImage
        ref={ref}
        className={className}
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        onLoad={handleLoad}
      />
    );
  },
);

Image.displayName = "Image";

export default Image;
