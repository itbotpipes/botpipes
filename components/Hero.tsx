import Image from "@/components/Image";
import React from "react";

interface HeroProps {
  src: string;
  text: string;
  custom?: string;
}
const Hero: React.FC<HeroProps> = ({ src, text, custom }) => {
  return (
    <div className="relative flex h-[60vh] w-screen items-end px-10 py-10">
      <Image
        className="absolute top-0 left-0 h-full w-full object-cover brightness-70"
        src={src}
        alt={src}
      />
      <div className="absolute top-0 left-0 z-2 h-full w-full bg-black/25" />
      <h1 className={`${custom} font-inter relative z-5 font-semibold text-white`}>
        {text}
      </h1>
    </div>
  );
};

export default Hero;
