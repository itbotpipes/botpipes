"use client";

import Image from "@/components/Image";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Minus, PlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const expertise: {
  id: string;
  title: string;
  desc: React.ReactNode;
  img: string;
}[] = [
  {
    id: "1",
    title: "Robotic Precision Over Manual Variability ",
    desc: (
      <>
        Manual welding and onsite fabrication introduce variance, rework, 
        and inconsistent quality. With robotic manufacture, every weld, cut, and 
        joint is executed to exact tolerances — removing guesswork from your 
        fire-safety assemblies. 
      </>
    ),
    img: "/imgs/better.png",
  },
  {
    id: "2",
    title: "Built Once, Installed Right the First Time",
    desc: (
      <>
        Everything is fabricated, aligned, and tested offsite. That means no unexpected 
        site issues, fewer RFIs, and no expensive corrective work while installation teams 
        are already on schedule.
      </>
    ),
    img: "/imgs/2nd-point.jpeg",
  },
  {
    id: "3",
    title: "Verified Quality, Traceable to Approval",
    desc: (
      <>
        Every assembly undergoes hydro-testing, inspection, and documented verification before 
        dispatch. This dramatically simplifies engineer sign-offs and compliance checks with 
        consultants, auditors, and insurers
      </>
    ),
    img: "/imgs/quality-verified.jpg",
  },
  {
    id: "4",
    title: "Faster Delivery Without Compromising Safety",
    desc: (
      <>
        Offsite production runs parallel to site work, compressing schedules without risking 
        unsafe hot work or congestion on live sites.
      </>
    ),
    img: "/cards/Quality & Testing.png",
  },
  {
    id: "5",
    title: "Designed for Lifecycle Performance",
    desc: (
      <>
        Our solutions aren’t just installed — they’re engineered for durability, serviceability, 
        and future expansion based on your system’s design and operational needs.
      </>
    ),
    img: "/imgs/img-pipes-3.jpeg",
  },
];

const Expertise = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="md:pt-25">
      <div className="mx-auto max-w-[65rem] rounded-2xl p-6 md:p-12">
        <h1 className="font-urbanist mb-6 text-center text-3xl leading-tight font-semibold md:text-5xl">
          Why Our Solutions <span className="text-[#24275E]">Matter</span>
        </h1>

        <p className="font-inter mx-auto mb-10 max-w-[48rem] text-center text-sm text-gray-700">
          Our robotic fabrication approach is designed to solve the critical execution risks of traditional piping work
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col">
            {expertise.map((item, indx) => (
              <ExpertiseItem
                key={item.id}
                title={item.title}
                desc={item.desc}
                onOpen={() => setOpen(open === indx ? null : indx)}
                open={indx === open}
                indx={indx}
              />
            ))}
          </div>
          <div className="relative">
            {expertise.map((item, indx) => (
              <ExpertiseImage src={item.img} key={indx} show={open === indx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExpertiseItemProps {
  title: string;
  desc: React.ReactNode;
  open: boolean;
  indx: number;
  onOpen: () => void;
}
const ExpertiseItem: React.FC<ExpertiseItemProps> = ({
  title,
  desc,
  open,
  indx,
  onOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (open) {
        gsap.to(answerRef.current, {
          maxHeight: "20rem",
          opacity: 1,
          duration: 0.3,
        });
      } else {
        gsap.to(answerRef.current, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    },
    { scope: containerRef, dependencies: [open] },
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        "py-5",
        indx !== 0 && "cursor-pointer border-t border-gray-200",
      )}
    >
      <div className="flex items-center justify-between" onClick={onOpen}>
        <h2 className="font-inter text-xl font-semibold">{title}</h2>
        <div className="text-[#24275E]">{open ? <Minus /> : <PlusIcon />}</div>
      </div>
      <div
        ref={answerRef}
        className={clsx("overflow-hidden transition-all duration-500")}
      >
        <p className="mt-4 rounded-lg bg-white p-4">{desc}</p>
      </div>
    </div>
  );
};

interface ExpertiseImageProps {
  src: string;
  show: boolean;
}
const ExpertiseImage: React.FC<ExpertiseImageProps> = ({ src, show }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (show)
        gsap.to(imageRef.current, {
          opacity: 1,
          x: 0,
        });
      else
        gsap.to(imageRef.current, {
          opacity: 0,
          x: 100,
        });
    },
    { scope: imageRef, dependencies: [show] },
  );
  return (
    <Image
      ref={imageRef}
      src={src}
      alt={src}
      className="absolute top-0 left-0 h-full w-full rounded-xl object-cover"
    />
  );
};

export default Expertise;
