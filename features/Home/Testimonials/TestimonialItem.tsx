"use client";

import { JSONContent } from "@tiptap/react";
import clsx from "clsx";
import { BsStarFill } from "react-icons/bs";
import RichTextRenderer from "@/components/RichTextRenderer";

interface TestimonialItemProps {
  stars: number;
  review: JSONContent;
  img: string;
  user: string;
  title: string;
  active?: boolean;
  id: string;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  id,
  review,
  user,
  title,
  active,
  stars,
}) => {
  return (
    <div
      id={id}
      className={clsx(
        "testimonial-item w-full shrink-0 snap-start px-1.5 transition-colors duration-400 md:w-1/3",
        active ? "pb-8" : "pb-0",
      )}
    >
      <div
        className={clsx(
          "flex min-h-full flex-col justify-between rounded-2xl px-4 py-6",
          active ? "bg-[#24275E] text-white" : "bg-[#E9E9EE] text-black",
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="mb-4 flex gap-2">
            {Array.from(Array(stars)).map((_, indx) => (
              <BsStarFill size={15} key={indx} />
            ))}
          </div>
          <p className="mb-4">
            <RichTextRenderer content={review} />
          </p>
        </div>

        <div className="flex gap-2">
          <div>
            <h3 className="font-anek font-semibold">{user}</h3>
            <p className="font-anek text-sm">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
