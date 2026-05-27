import Hero from "@/components/Hero";
import StudyList from "@/features/CaseStudy/StudyList";
import React from "react";

function CaseStudy() {
  return (
    <div className="">
      <Hero src="/career/3.png" text="Case Studies" custom="md:text-7xl text-4xl" />
      <StudyList />
    </div>
  );
}

export default CaseStudy;
