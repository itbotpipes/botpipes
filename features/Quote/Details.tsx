import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface DetailsProps {
  className?: string;
}

interface DetailItem {
  title: string;
  desc: React.ReactNode;
}

const details: DetailItem[] = [
  {
    title: "Upload Your Design / BOQ",
    desc: (
      <>
        Start by sharing your{" "}
        <strong>
          AutoCAD drawings, PDFs, or detailed Bill of Quantities (BOQ)
        </strong>
        . Our <strong>technical experts</strong> thoroughly review your
        requirements, validating <strong>compatibility and accuracy</strong>.
      </>
    ),
  },
  {
    title: "Receive Your Custom Quotation",
    desc: (
      <>
        Once your designs are reviewed, our team analyzes the layout,{" "}
        <strong>optimizes fabrication quantities</strong>, and prepares a{" "}
        <strong>comprehensive quotation</strong>. You&apos;ll receive a{" "}
        <strong>transparent cost estimate, delivery schedule</strong>, and{" "}
        <strong>detailed technical notes</strong> — helping you{" "}
        <strong>plan efficiently</strong> and{" "}
        <strong>reduce on-site wastage</strong>.
      </>
    ),
  },
  {
    title: "Approve & Execute",
    desc: (
      <>
        After your approval, we move straight to{" "}
        <strong>robotic prefabrication</strong>. Every component is{" "}
        <strong>factory-tested, powder-coated, and precision-engineered</strong>{" "}
        under <strong>controlled conditions</strong> for long-term reliability.
        The final output is <strong>ready-to-install</strong>, ensuring faster
        site completion and <strong>zero rework</strong>.
      </>
    ),
  },
];

const Details: React.FC<DetailsProps> = ({ className }) => {
  return (
    <div className={clsx("relative px-4 py-20", className)}>
      <Image
        className="absolute top-[50%] left-[50%] h-fit w-full min-w-[900px] -translate-x-[50%] -translate-y-[50%] object-cover"
        src="/contact/quote.png"
        alt="quote"
      />

      <div className="mx-auto mb-30 max-w-[60rem]">
        <div className="font-raleway text-center">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            Fast. Accurate. Reliable.
          </h1>
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            That’s the BOTPipes
          </h1>
          <h1 className="mb-8 text-4xl font-bold md:text-5xl">
            <span className="text-[#24275E]">Advantage.</span>
          </h1>
          <p className="mx-auto max-w-[40rem]">
            We make the entire process seamless — from design validation to
            final delivery — ensuring every pipe, fitting, and component meets
            international standards of quality and precision.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[30rem] space-y-22">
        {details.map((item, indx) => (
          <div key={indx} className="space-y-8">
            <h1 className="font-raleway text-center text-7xl font-bold text-[#24275E]">
              0{indx + 1}
            </h1>
            <div>
              <h2 className="font-raleway mb-2 text-2xl font-bold">
                {item.title}
              </h2>
              <p className="font-lato text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
