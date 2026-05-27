"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { motion, Variants } from "motion/react";

const buttonVariants = cva(
  "group flex w-fit cursor-pointer items-center gap-2 rounded-full transition-colors duration-250 p-1 text-sm ",
  {
    variants: {
      variant: {
        primary: "bg-[#24275E] text-white hover:bg-[#2a2d75]",
        secondary: "bg-white text-black hover:bg-gray-200",
      },
      size: {
        md: "pl-4",
        lg: "pl-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const arrowVariants = cva(
  "relative flex items-center justify-center rounded-full  overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-white text-black",
        secondary: "text-white bg-[#24275E]",
      },
      size: {
        md: " p-1.5",
        lg: "p-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface MainButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  text: string;
  className?: string;
  variants?: Variants;
}
const MainButton: React.FC<MainButtonProps> = ({
  text,
  variant,
  size,
  className,
  variants,
  onClick
}) => {
  return (
    <motion.button
      variants={variants}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
    >
      {text}
      <div className={cn(arrowVariants({ variant, size }))}>
        <ArrowRight
          size={15}
          className="transition-transform duration-250 group-hover:translate-x-[150%]"
        />
        <ArrowRight
          size={15}
          className="absolute -translate-x-[150%] transition-transform duration-250 group-hover:translate-x-0"
        />
      </div>
    </motion.button>
  );
};

export default MainButton;
