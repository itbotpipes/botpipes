import Hero from "@/components/Hero";
import Intro from "@/features/Solutions/Intro";
import React from "react";
// import Benefits from "@/features/Solutions/Benefits";
import FeaturesList from "@/features/Solutions/FeaturesList";
import ProductBenefits from "@/features/Solutions/ProductBenefits";
import Expertise from "@/features/Solutions/Expertise";
// import CaseStudies from "@/features/Solutions/CaseStudies";
import Deliver from "@/features/Solutions/Deliver";
// import PrecisionSection from "@/features/Solutions/Deliver";
// import WeAreBetter from "@/features/Solutions/WeAreBetter";
import WeDeliver from "@/features/Solutions/WhatWeDeliver";
import Latest from "@/features/LatestBlogs/page";
import Grooved from "@/features/Solutions/Grooved";
import AddValue from "@/features/Solutions/AddValue";
import ComparisonPage from "@/features/Solutions/Compare";
import CTA from "@/features/Contact/CTA";
import ProductBenefitsTwo from "@/features/Solutions/ProductBenefitsTwo";

function Solution() {
  return (
    <div>
      <Hero text="Solutions" src="/solutionbanner2.png" custom="md:text-7xl text-4xl" />
      <Deliver />
      {/* <PrecisionSection /> */}
      {/* <WeAreBetter /> */}
      <WeDeliver />
      <Grooved />
      {/* <Benefits /> */}
      <ProductBenefits />
      <ProductBenefitsTwo />
      <Intro />
      <Expertise />
      {/* <FeaturesList /> */}
      {/* <CaseStudies />  */}
      <AddValue />
      <ComparisonPage />
      <Latest />
    </div>
  );
}

export default Solution;
