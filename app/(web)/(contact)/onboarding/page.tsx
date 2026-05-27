import Hero from "@/components/Hero";
import Categories from "@/features/Onboarding/Categories";
import Intro from "@/features/Onboarding/Intro";
import Process from "@/features/Onboarding/Process";
import Requirements from "@/features/Onboarding/Requirements";
import Form from "@/features/Onboarding/VendorForm/Form";
import React from "react";

function Onboarding() {
  return (
    <div className="">
      <Hero src={"/career/1.png"} text={"Vendor Onboarding"} custom="md:text-7xl text-4xl" />

      <Intro />
      <hr className="mx-auto my-10 max-w-[85rem] border-t border-black" />

      <Categories className="mx-auto max-w-[85rem]" />
      <hr className="mx-auto my-10 max-w-[85rem] border-t border-black" />

      <Requirements className="mx-auto max-w-[85rem] px-4" />
      <hr className="mx-auto my-10 max-w-[85rem] border-t border-black" />

      <Process className="mx-auto max-w-[85rem] px-4" />
      <hr className="mx-auto my-10 max-w-[85rem] border-t border-black" />

      <div className="mx-auto my-15 max-w-[50rem] rounded-3xl shadow-lg">
        <Form />
      </div>
    </div>
  );
}

export default Onboarding;
