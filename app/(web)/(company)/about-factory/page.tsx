import AboutCompany from "@/features/AboutFactory/AboutCompany";
import List from "@/features/AboutFactory/List";
import ProductDetail from "@/features/AboutFactory/ProductDetail";
import CTA from "@/features/Contact/CTA";
import React from "react";

function AboutFactory() {
  return (
    <div className="bg-[#F4F4F9] pt-10 md:space-y-20 md:pt-25">
      <ProductDetail />
      <AboutCompany className="mx-auto max-w-[60rem] px-4 py-10" />
      <List className="mx-auto max-w-[60rem] px-4" />
      <CTA />
    </div>
  );
}

export default AboutFactory;
