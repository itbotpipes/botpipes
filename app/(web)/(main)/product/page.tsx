import Hero from "@/components/Hero";
import ProductList from "@/features/Product/ProductList";
import React from "react";

function Product() {
  return (
    <div>
      <Hero src="/imgs/sprinkler.png" text="Products" custom="md:text-7xl text-4xl" />
      <ProductList />
    </div>
  );
}

export default Product;
