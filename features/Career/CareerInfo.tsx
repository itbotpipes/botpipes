import Image from "@/components/Image";
import MainButton from "@/components/MainButton";
import clsx from "clsx";
import React from "react";

const CareerInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-10 px-4 pb-15 md:grid-cols-2",
        className,
      )}
    >
      <Image
        className="h-fit w-full object-cover md:col-start-2 md:row-start-1"
        src={"/Factory/cta.png"}
        alt={"cta"}
      />
      <div className="font-inter mx-auto flex max-w-[55rem] flex-col justify-center md:col-start-1 md:row-start-1">
        <h1 className="mx-auto mb-3 max-w-[38rem] text-3xl font-semibold md:text-4xl">
          We’re always looking for talent
        </h1>
        <p className="mb-5">
          We are always looking for enthusiastic, proactive, and talented people
          who are aligned to our ethos and ways of working. If you are
          interested in working with us, please send a CV to
          careers@spence.co.uk or alternatively fill out our form.
        </p>
        <MainButton text="Get In Touch" />
      </div>
    </div>
  );
};

export default CareerInfo;
