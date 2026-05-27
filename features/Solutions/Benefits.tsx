"use client";

import Image from "@/components/Image";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Minus, PlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const benefits = [
  {
    id: "1",
    title: "Periti in ultrasonico fluxus metiendo",
    desc: `Cum turma peritorum fluxus metri ultrasonici, nos
      evolvimus usum novativum processus digitalis
      technicorum et scientiae fabricationis ad metiendum
      fluxum fluidi cum eximia accuratitudine. Nostra technologia est
      capax tractandi omnia genera fluidorum per amplam
      varietatem extremarum condicionum operandorum.`,
    img: "/benefits/1.png",
  },
  {
    id: "2",
    title: "Probatus successus",
    desc: `Cum turma peritorum fluxus metri ultrasonici, nos
      evolvimus usum novativum processus digitalis
      technicorum et scientiae fabricationis ad metiendum
      fluxum fluidi cum eximia accuratitudine. Nostra technologia est
      capax tractandi omnia genera fluidorum per amplam
      varietatem extremarum condicionum operandorum.`,
    img: "/benefits/1.png",
  },
  {
    id: "3",
    title: "Probatus successus",
    desc: `Cum turma peritorum fluxus metri ultrasonici, nos
      evolvimus usum novativum processus digitalis
      technicorum et scientiae fabricationis ad metiendum
      fluxum fluidi cum eximia accuratitudine. Nostra technologia est
      capax tractandi omnia genera fluidorum per amplam
      varietatem extremarum condicionum operandorum.`,
    img: "/benefits/1.png",
  },
  {
    id: "4",
    title: "Probatus successus",
    desc: `Cum turma peritorum fluxus metri ultrasonici, nos
      evolvimus usum novativum processus digitalis
      technicorum et scientiae fabricationis ad metiendum
      fluxum fluidi cum eximia accuratitudine. Nostra technologia est
      capax tractandi omnia genera fluidorum per amplam
      varietatem extremarum condicionum operandorum.`,
    img: "/benefits/1.png",
  },
];

const Benefits = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="md:py-25">
      <div className="mx-auto max-w-[65rem] rounded-2xl bg-white p-6 md:p-12">
        <h1 className="font-inter mb-8 text-center text-5xl font-semibold">
          <span className="text-[#E94E1B]">Benefits</span> of working with us
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col">
            {benefits.map((item, indx) => (
              <BenefitItem
                key={item.id}
                title={item.title}
                desc={item.desc}
                onOpen={() => setOpen(indx)}
                open={indx === open}
                indx={indx}
              />
            ))}
          </div>
          <div className="relative">
            {benefits.map((item, indx) => (
              <BenefitImage src={item.img} key={indx} show={open === indx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BenefitItemProps {
  title: string;
  desc: string;
  open: boolean;
  indx: number;
  onOpen: () => void;
}
const BenefitItem: React.FC<BenefitItemProps> = ({
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
        <div className="text-green-500">{open ? <PlusIcon /> : <Minus />}</div>
      </div>
      <div
        ref={answerRef}
        className={clsx("overflow-hidden transition-all duration-500")}
      >
        <p className="mt-4 rounded-lg bg-gray-200 p-4">{desc}</p>
      </div>
    </div>
  );
};

interface BenefitImageProps {
  src: string;
  show: boolean;
}
const BenefitImage: React.FC<BenefitImageProps> = ({ src, show }) => {
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
      className="absolute top-0 left-0 h-full w-full object-contain"
    />
  );
};

export default Benefits;
