"use client";

import MainButton from "@/components/MainButton";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Minus, PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, stagger } from "motion/react";
import { StaggerChildVariants } from "@/lib/animation-utils";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import { JSONContent } from "@tiptap/react";
import RichTextRenderer from "@/components/RichTextRenderer";
import Link from "next/link";

interface FaqProps {
  faqs: FaqRecord[];
}
const Faq: React.FC<FaqProps> = ({ faqs }) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  useEffect(() => {}, [selectedFaq]);

  return (
    <div className="mx-auto mt-30 mb-15 w-screen max-w-[65rem] px-4">
      <div className="mb-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h1 className="font-urbanist text-4xl font-semibold">
            Frequently Asked Questions
          </h1>
          <div className="flex lg:justify-end">
            <Link href="/faq">
              <MainButton text="View all FAQs" />
            </Link>
          </div>
        </div>
      </div>
      <motion.div
        initial="initial"
        whileInView="view"
        transition={{ delayChildren: stagger(0.1) }}
        viewport={{ amount: 0.4, once: true }}
        className="md:px-20"
      >
        {faqs.map((faq, indx) => (
          <QuestionItem
            key={faq.id}
            onOpen={() =>
              setSelectedFaq((prev) => (prev === indx ? null : indx))
            }
            indx={indx}
            open={indx === selectedFaq}
            title={faq.question}
            desc={JSON.parse(faq.description)}
          />
        ))}
      </motion.div>
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
          opacity: 1,
          duration: 0.1,
          ease: "none",
        });
      } else {
        gsap.to(answerRef.current, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.1,
          ease: "none",
        });
      }
    },
    { scope: containerRef, dependencies: [open] },
  );

  return (
    <motion.div
      variants={StaggerChildVariants}
      ref={containerRef}
      className={clsx(
        "py-5",
        indx !== 0 && "cursor-pointer border-t border-gray-200",
      )}
    >
      <div className="flex items-center justify-between gap-4" onClick={onOpen}>
        <h2 className="font-inter text-xl font-semibold select-none">
          {title}
        </h2>
        <div className="text-[#24275E]">{!open ? <PlusIcon /> : <Minus />}</div>
      </div>
      <div
        ref={answerRef}
        className={clsx("overflow-hidden transition-all duration-500")}
      >
        <RichTextRenderer
          className="rich-editor mt-4 rounded-lg bg-gray-200 p-4"
          content={desc}
        />
      </div>
    </motion.div>
  );
};

export default Faq;
