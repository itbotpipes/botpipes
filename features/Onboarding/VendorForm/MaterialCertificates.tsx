import React from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";
import RadioItemWithField from "./Checklists/RadioItemWithField";
import RadioItem from "./Checklists/RadioItem";

interface MaterialCertificatesProps {
  className?: string;
}

const options = [
  { id: "yes", label: "Yes" },
  { id: "No", label: "No" },
];

const MaterialCertificates: React.FC<MaterialCertificatesProps> = ({
  className,
}) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className={clsx("", className)}>
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Do you provide Material Test Certificates?
      </h3>

      <ul className="space-y-2">
        {options.map((opt) => (
          <RadioItem name="provideCertificates" opt={opt} key={opt.id} />
        ))}

        <RadioItemWithField
          optionIds={options.map((opt) => opt.id)}
          name="provideCertificates"
        >
          For specific products only
        </RadioItemWithField>
      </ul>

      {errors.provideCertificates && (
        <p className="mt-2 text-sm text-red-600">
          {errors.provideCertificates.message}
        </p>
      )}
    </section>
  );
};

export default MaterialCertificates;
