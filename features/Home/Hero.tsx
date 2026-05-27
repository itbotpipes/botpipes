import Image from "@/components/Image";
import MainButton from "@/components/MainButton";
import React from "react";
import Link from "next/link";

const reqs = [
  "Engineered to fit, Designed to last",
];

const Hero = () => {
  return (
    <div className="relative flex h-screen w-screen justify-center md:items-center">
      <Image
        src="/heroimage.jpeg"
        alt="hero-image"
        className="absolute top-0 left-0 h-full w-full object-left md:object-center mt-10"
      />

      <div className="font-anek relative z-5 mx-auto flex max-w-[70rem] flex-col justify-between px-4 pt-22 pb-15 md:pt-0 md:pb-0">
        <h1 className="mb-8 text-5xl font-bold text-white uppercase md:text-center md:text-6xl text-shadow-black text-shadow-md">
          Robotic Prefabrication for Next-Generation Fire Protection Systems
        </h1>
        <div>
          {/* <div className="mb-5 flex flex-col items-end justify-center gap-2 text-sm text-white md:mb-12 md:flex-row md:items-center md:gap-8">
            {reqs.map((req, index) => (
              <div key={index} className="flex gap-2 text-xl">
                <p>{req}</p>
              </div>
            ))}
          </div> */}
          <div className="flex flex-col items-end justify-center gap-4 md:flex-row md:items-center md:gap-8">
            {/*<MainButton text="Explore Products" />*/}
            <Link href="/contact">
              <MainButton text="Connect With Our Experts" variant={"secondary"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
