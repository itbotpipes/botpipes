import Hero from "@/components/Hero";
import Faq from "@/features/Contact/Faq";
import { getFaqs } from "@/lib/firebase/firestore/faq";
import React from "react";

export const revalidate = 60;

async function FAQ() {
  const faqs = await getFaqs();

  return (
    <div>
      <Hero src="/imgs/pipe.png" text="FAQ" custom="md:text-7xl text-4xl" />
      <Faq faqs={faqs} />
    </div>
  );
}

export default FAQ;
