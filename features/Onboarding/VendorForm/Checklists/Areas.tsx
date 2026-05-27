"use client";

import React from "react";
import clsx from "clsx";
import RadioItem from "./RadioItem";

interface AreasProps {
  className?: string;
}

const options = [
  { id: "local", label: "Local (within 200 km)" },
  { id: "regional", label: "Regional (within state)" },
  { id: "multi", label: "Multi-state" },
  { id: "pan", label: "Pan India" },
  { id: "international", label: "International" },
];

const Areas: React.FC<AreasProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      <h4 className="mb-2 text-sm font-semibold uppercase">
        Geographical areas you serve
      </h4>

      <ul className="space-y-2">
        {options.map((opt) => (
          <RadioItem opt={opt} key={opt.id} name="businessInfo.areasServed" />
        ))}
      </ul>
    </div>
  );
};

export default Areas;
