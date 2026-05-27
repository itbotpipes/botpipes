import MainButton from "@/components/MainButton";
import React from "react";

const CTA = () => {
  return (
    <div className="mx-auto max-w-[50rem] px-4 py-10">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 md:p-20">
        <h1 className="font-urbanist mb-5 text-center text-5xl">
          Let’s work together
        </h1>
        <p className="my-6 max-w-2xl text-md text-slate-600 leading-relaxed">
          We believe the best results come from collaborating with passionate
          people. Whether you have a vision or need guidance, we’re here to help
          transform challenges into opportunities. Let’s start the conversation
          and bring your aspirations to life!
        </p>
        <MainButton text="Let's Talk" />
      </div>
    </div>
  );
};

export default CTA;
