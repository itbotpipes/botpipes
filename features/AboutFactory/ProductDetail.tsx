import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface ProductDetailProps {
  className?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "mx-auto grid max-w-[60rem] grid-cols-1 md:grid-cols-2",
        className,
      )}
    >
      <Image
        className="h-full max-h-[20rem] w-full auto-rows-auto object-cover md:row-span-2 md:max-h-max md:p-4"
        src="/Factory/hero.png"
        alt="hero-factory"
      />

      <div className="p-4 md:col-span-2 md:row-start-1">
        <h1 className="font-inter mb-2 text-4xl font-bold md:text-6xl">
          Precision Built For <br />
          <span className="text-[#24275E]">Performance</span>
        </h1>
        <p>Setting new standards in fabrication and quality engineering.</p>
      </div>

      <div className="space-y-4 p-4">
        <Image
          className="h-fit w-full object-cover md:max-w-[20rem]"
          src={"/Factory/detail.png"}
          alt={"product-detail"}
        />

        <div className="text-xs">
          <p className="mb-4">
            Explore our <strong>state-of-the-art prefabrication systems</strong>
            , designed to deliver unmatched{" "}
            <strong>efficiency, durability, and safety</strong> across every
            application. Each product is engineered with{" "}
            <strong>advanced precision manufacturing</strong>, ensuring seamless
            integration and long-term reliability for your infrastructure.
          </p>
          <p>
            From <strong>fire-protection pipelines</strong> to{" "}
            <strong>customized connection assemblies</strong>, our technology
            reflects the perfect balance of
            <strong>innovation and industrial strength</strong>. Every component
            passes through rigorous testing to guarantee{" "}
            <strong>leak-proof performance and easy installation</strong>,
            making it ideal for modern construction needs.
          </p>
        </div>
        <button className="w-full rounded-full border-1 border-black py-3 text-xl">
          See Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
