import Hero from "@/components/Hero";
import Address from "@/features/Contact/Address";
import React from "react";
import CTA from "@/features/Contact/CTA";
import ContactMaps from "@/features/Contact/ContactMaps";

function Contact() {
  return (
    <div>
      <Hero text="Contact" src="/contact/contactbanner.jpeg" custom="md:text-7xl text-4xl" />
      <Address className="py-10" />
      <div className="mx-auto max-w-[60rem] px-4 py-10">
        <ContactMaps />
      </div>
      {/* <CTA /> */}
    </div>
  );
}

export default Contact;
