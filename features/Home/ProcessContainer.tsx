"use client";

import { stagger, Variants } from "motion";
import { motion } from "motion/react";
import React from "react";

const containerVariant: Variants = {
  initial: { opacity: 0, transition: { delay: 2 } },
  inView: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.2),
    },
  },
};

const ProcessContainer = ({ children }: React.ComponentProps<"div">) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="initial"
      whileInView="inView"
      viewport={{ amount: 0.8, once: true }}
      className="flex flex-col gap-10 lg:flex-row"
    >
      {children}
    </motion.div>
  );
};

export default ProcessContainer;
