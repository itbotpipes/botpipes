"use client";

import RichTextRenderer from "@/components/RichTextRenderer";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import { useGSAP } from "@gsap/react";
import { JSONContent } from "@tiptap/react";
import clsx from "clsx";
import gsap from "gsap";
import { PlusIcon, Minus } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

interface FaqProps {
  className?: string;
  faqs: FaqRecord[];
}
const Faq: React.FC<FaqProps> = ({ className, faqs = [] }) => {
  // const [open, setOpen] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {}, [setOpen]);

  return (
    <div className={clsx("", className)}>
      <div className="mx-auto max-w-[65rem] rounded-2xl p-6 md:p-12">
        <h1 className="font-inter mb-8 text-center text-5xl font-semibold">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col">
          {faqs.map((item, indx) => (
            <QuestionItem
              key={item.id}
              title={item.question}
              desc={JSON.parse(item.description)}
              // onOpen={() => setOpen(indx)}
              onOpen={() =>
                setOpen((prev) => (prev === indx ? null : indx))
              }
              open={indx === open}
              indx={indx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface QuestionItemProps {
  title: string;
  desc: JSONContent;
  open: boolean;
  indx: number;
  onOpen: () => void;
}
const QuestionItem: React.FC<QuestionItemProps> = ({
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
          ease: "none",
          opacity: 1,
          duration: 0.2,
        });
      } else {
        gsap.to(answerRef.current, {
          maxHeight: 0,
          ease: "none",
          opacity: 0,
          duration: 0.2,
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
      <div className="flex items-center justify-between gap-4" onClick={onOpen}>
        <h2 className="font-inter text-xl font-semibold">{title}</h2>
        <div className="text-[#24275E]">{!open ? <PlusIcon /> : <Minus />}</div>
      </div>
      <div
        ref={answerRef}
        className={clsx(
          "overflow-hidden transition-all duration-150 ease-linear",
        )}
      >
        <p className="mt-4 rounded-lg bg-gray-200 p-4">
          <RichTextRenderer content={desc} />
        </p>
      </div>
    </div>
  );
};

export default Faq;
