import Image from "@/components/Image";
import React from "react";
import { productBenefits } from "./Data";
import { ArrowRight } from "lucide-react";
import ChildrenStaggerContainer from "@/components/ChildrenStaggerContainer";
import Link from "next/link";

const ProductBenefits = () => {
  return (
    <div className="mx-auto max-w-[60rem] px-4 py-20 [@media(max-width:800px)]:block hidden">
      <h1 className="font-inter mb-6 text-center text-3xl leading-tight font-semibold md:text-5xl">
        {/* Service <span className="text-[#27408A]">Benefits</span> */}
        What Sets Our Solutions <span className="text-[#24275E]">Apart</span>
      </h1>

      <p className="font-inter mx-auto mb-10 max-w-[48rem] text-center text-sm text-gray-700">
        Every BotPipes Tech solution is robotically engineered to deliver precision execution, 
        faster installation, and long-term reliability for fire-safety infrastructure.
      </p>

      <ChildrenStaggerContainer
        start="start 80%"
        vars={{ y: 10 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {productBenefits.map((feature, indx) => (
          <div
            key={indx}
            className="relative overflow-hidden rounded-xl bg-white border-1 border-[#24275E]/75"
          >
            <Image
              className="h-[10rem] w-full object-cover"
              src={feature.img}
              alt={feature.title}
            />
            <div className="px-6 py-5">
              <h2 className="font-inter mb-4 text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="font-inter text-xs">{feature.desc}</p>
            </div>
          </div>
        ))}
      </ChildrenStaggerContainer>
      <div className="mt-12 flex justify-center">
        <Link href="/contact" className="font-inter flex w-fit cursor-pointer items-center gap-4 rounded-full border-2 border-[#24275E] px-8 py-2 font-semibold">
          Contact Our Team <ArrowRight className="text-[#24275E]" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ProductBenefits;