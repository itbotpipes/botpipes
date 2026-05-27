import { Variants } from "motion";

export const StaggerChildVariants: Variants = {
  initial: { opacity: 0, x: 10 },
  "initial-y": { opacity: 0, y: 100 },
  "-initial": { opacity: 0, x: -10 },
  view: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
};
