import Image from "@/components/Image";
import clsx from "clsx";
import React from "react";

const products = [
  {
    title: "Prefab Sprinkler Assemblies",
    img: "/products/1.jpg",
  },
  {
    title: "Grooved Piping System",
    img: "/products/2.jpg",
  },
];

const Products = () => {
  return (
    <div className="mx-auto mb-20 grid max-w-[70rem] grid-cols-1 gap-12 px-4 py-10 lg:grid-cols-2">
      {products.map((product, indx) => (
        <div key={indx} className="relative cursor-pointer">
          <div className="absolute top-0 left-0 z-1 h-full w-full bg-black" />
          <h1 className="font-montserrat absolute top-[50%] left-0 z-5 w-full -translate-y-[50%] text-center text-5xl font-semibold text-white">
            {product.title}
          </h1>
          <Image
            src={product.img}
            alt={product.img}
            className={clsx(
              "relative z-2 h-[25rem] w-full object-cover transition-opacity duration-300 hover:opacity-80 lg:h-[90vh]",
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
