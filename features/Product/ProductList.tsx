"use client";

import React from "react";
import { products } from "./Data";
import Image from "@/components/Image";
import { ArrowRight, InfoIcon } from "lucide-react";

const ProductList = () => {
  return (
    <div className="bg-[#F4F4F9]">
      <div className="mx-auto max-w-[60rem] px-4 py-20">
        <h1 className="font-inter mx-auto mb-20 max-w-[50rem] text-center text-2xl/[1.5em] font-semibold md:text-4xl/[1.5em]">
          We provide a range of high accuracy products for a wide variety of
          industries.
        </h1>

        <div className="flex items-center justify-center gap-3">
          <InfoIcon size={15} />
          <p className="text-center text-sm">
            We are coming up with this soon!!!
          </p>
        </div>

        <div className="">
          <div className="flex flex-nowrap overflow-x-auto"></div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {([] as typeof products).map((prod) => (
              <div
                className="flex flex-col rounded-lg bg-white p-4 shadow-md"
                key={prod.id}
              >
                <h1 className="font-inter my-5 text-center text-3xl font-semibold">
                  {prod.name}
                </h1>
                <Image
                  className="mb-4 h-[10rem] w-full object-contain"
                  src={prod.img}
                  alt={prod.name}
                />
                <div className="flex flex-1 flex-col items-center justify-between gap-3 px-4 py-2">
                  <p className="font-inter text-center text-lg font-semibold">
                    {prod.desc}
                  </p>
                  <button className="font-inter flex w-fit items-center gap-4 rounded-full border-2 border-[#39B54A] px-8 py-2 font-semibold">
                    Find out more{" "}
                    <ArrowRight className="text-[#39B54A]" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
