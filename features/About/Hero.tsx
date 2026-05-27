import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={clsx("relative pb-10", className)}>
      <div>
        <Image
          priority
          className="ml-auto block h-fit max-h-[40rem] w-full object-cover md:w-[80%]"
          src="/about/hero.png"
          alt="about-hero"
        />
      </div>

      <div className="absolute top-0 left-0 z-5 h-full w-full bg-black opacity-25 md:hidden" />

      <div className="absolute top-0 left-0 z-19 flex h-full w-full flex-col justify-center max-sm:justify-end pb-5">
        <h1 className="font-urbanist max-sm:mb-0 max-sm:text-3xl mb-10 max-md:ml-8 md:ml-16 text-4xl text-white md:text-6xl md:text-black font-bold">
          Built for Precision.
          <br />
          Engineered for Robotic Fire Protection.
        </h1>
        <p className="font-urbanist max-sm:text-xs max-md:ml-8 md:ml-16 max-w-[40rem] text-white md:text-black lg:text-xl">
          BotPipes Tech is a robotic fire-safety prefabrication company specializing in automated, 
          precision-engineered fire protection piping systems.
        </p>
      </div>
    </div>
  );
};

export default Hero;
