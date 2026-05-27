import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface HelpSectionProps {
  className?: string;
}

const addressDetails = [
  {
    title: "Email",
    value: "info@botpipestech.com",
    img: "/contact/mail-logo.png",
  },
  {
    title: "Helpline",
    value: "+91 96872 66688",
    img: "/contact/phone-logo.png",
  },
];

const HelpSection: React.FC<HelpSectionProps> = ({ className }) => {
  return (
    <div className={clsx("px-4", className)}>
      <div className="">
        <h1 className="font-raleway mb-7 text-5xl font-bold">
          Need Help Before{" "}
          <span className="block text-[#24275E]">Uploading?</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side */}
          <div className="font-lato space-y-3">
            <p>Our technical experts can assist you with:</p>
            <ul className="[&>li]:ml-4 [&>li]:list-disc">
              <li>Drawing optimization for prefabrication</li>
              <li>Fitting standardization and compatibility</li>
              <li>Fire code compliance (NFPA / IS standards)</li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            {addressDetails.map((item, indx) => (
              <div className="flex items-center gap-4" key={indx}>
                <Image
                  className="aspect-square h-[3.5rem] w-auto"
                  src={item.img}
                  alt={item.title}
                />

                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-xs">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
