import clsx from "clsx";
import Image from "./Image";
import React from "react";

interface NumberCardProps {
  number: string;
  description: string;
  imageSrc: string;
  className?: string;
  details: string;
  color: string;
  color2: string;
}

const NumberCard: React.FC<NumberCardProps> = ({
  number,
  description,
  imageSrc,
  className,
  details,
  color,
  color2,
}) => {
  return (
    <div
      className={clsx(
        "aspect-[1/1.2] h-auto w-[85%] sm:w-[80%] overflow-hidden rounded-2xl bg-white shadow-lg",
        className,
      )}
    >
      {/* Main container */}
      <div
        className="relative h-full w-full p-3 sm:p-[15px] lg:p-[30px]"
        style={{
          background: `linear-gradient(61deg,${color} 0%, ${color2} 49%, ${color} 100%)`,
        }}
      >
        {/* Background Image */}
        <div className="h-full overflow-hidden rounded-2xl bg-white p-4 sm:p-5">
          <div className="relative h-[42%] sm:h-[47%] w-full">
            <Image
              src={imageSrc}
              alt={description}
              className="clip-card-img h-full w-full rounded-2xl object-cover"
              fill
            />
            <h2 className="absolute bottom-0 left-0 font-bold text-lg sm:text-2xl lg:text-5xl">
              {number.padStart(2, "0")}
            </h2>
          </div>

          {/* Content Overlay */}
          <div className="mt-2 flex flex-col items-center gap-3 sm:gap-4 lg:mt-10 lg:gap-6">
            <p className="
                text-xs sm:text-sm lg:text-base
                text-center
                leading-relaxed
                break-words
                line-clamp-5
              ">
                {details}
              </p>

            <Image
              className="h-auto w-full max-w-[160px] sm:max-w-none"
              src={"/barcode.png"}
              alt={"barcode"}
            />

            {/* <button className="w-fit rounded-full bg-[#24275E] px-8 py-1.5 text-center text-white">
              more detail
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
