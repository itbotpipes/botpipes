import Hero from "@/components/Hero";
import CareerInfo from "@/features/Career/CareerInfo";
import Search from "@/features/Career/Search";
import CTA from "@/features/Contact/CTA";
import Faq from "@/features/Contact/Faq";
import { getFaqs } from "@/lib/firebase/firestore/faq";
import React from "react";

export const revalidate = 60;

async function Career() {
  const faqs = await getFaqs().then((items) => items.filter((i) => i.career));

  return (
    <div className="">
      <Hero src="/imgs/pipe.png" text="Careers" custom="md:text-7xl text-4xl" />
      <Search className="mx-auto max-w-[60rem] px-4 py-10" />
      <CareerInfo className="mx-auto max-w-[60rem]" />
      {/* <Faq faqs={faqs} /> */}
      {/* <CTA /> */} 
    </div>
  );
}

export default Career;
