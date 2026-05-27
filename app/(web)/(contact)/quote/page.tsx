import Hero from "@/components/Hero";
import Explore from "@/features/Home/Explore";
import Testimonials from "@/features/Home/Testimonials";
// import CTA from "@/features/Quote/CTA";
import Details from "@/features/Quote/Details";
import QuoteForm from "@/features/Quote/QuoteForm";
import GlobalCTA from "@/features/Contact/CTA";
import React from "react";
import HelpSection from "@/features/Quote/HelpSection";
import Header from "@/features/Quote/Header";
import { getTestimonials } from "@/lib/firebase/firestore/testimonials";
import { Button } from "@/components/ui/button";

export const revalidate = 60;


async function Quote() {
  const testimonials = await getTestimonials().then((items) => {
    if (items.length <= 3) return [...items, ...items];
    return items;
  });

  return (
    <div className="">
      <Hero src={"/imgs/pipe.png"} text={"Get A Quote"} custom="md:text-7xl text-4xl" />
      <Header />
      <Details />
      {/* <CTA /> */}
      <QuoteForm />
      <HelpSection className="mx-auto max-w-[65rem] py-10" />
      {/* <Testimonials
        testimonials={testimonials}
        className="mx-auto max-w-[65rem] px-4 py-10"
      /> */}
      {/* <Explore className="py-30" /> */}
      {/* <GlobalCTA /> */}
    </div>
  );
}

export default Quote;
