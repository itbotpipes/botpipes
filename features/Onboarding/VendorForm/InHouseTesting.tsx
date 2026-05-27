import React from "react";
import clsx from "clsx";
import RadioItem from "./Checklists/RadioItem";
import RadioItemWithField from "./Checklists/RadioItemWithField";
import { FormValues } from "./Schema";
import { useFormContext } from "react-hook-form";

interface InHouseTestingProps {
  className?: string;
}

const options = [
  { id: "No", label: "No" },
  { id: "3rd-party", label: "Use third-party testing labs" },
];

const InHouseTesting: React.FC<InHouseTestingProps> = ({ className }) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className={clsx("", className)}>
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Do you have in-house testing facilities?
      </h3>

      <ul className="space-y-2">
        <RadioItemWithField
          optionIds={options.map((opt) => opt.id)}
          name="inHouseTesting"
          customStartingValue="Yes"
        >
          Yes (please describe)
        </RadioItemWithField>

        {options.map((opt) => (
          <RadioItem name="inHouseTesting" opt={opt} key={opt.id} />
        ))}
      </ul>

      {errors.provideCertificates && (
        <p className="mt-2 text-sm text-red-600">
          {errors.provideCertificates.message}
        </p>
      )}
    </section>
  );
};

export default InHouseTesting;
