import React from "react";
import clsx from "clsx";
import RadioItemWithField from "../Checklists/RadioItemWithField";
import RadioItem from "../Checklists/RadioItem";
import { FormValues } from "../Schema";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface PaymentTerms2Props {
  className?: string;
}

const options = [
  { id: "ex_works", label: "Ex-Works" },
  { id: "for_destination", label: "FOR Destination" },
  { id: "including_freight", label: "Including freight" },
];

const PaymentTerms2: React.FC<PaymentTerms2Props> = ({ className }) => {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className={clsx("", className)}>
      <Label className="mb-3 block text-sm font-medium">
        Payment Terms You Offer
      </Label>

      <ul className="ml-5 space-y-2">
        {options.map((opt) => (
          <RadioItem
            name="commercialInfo.paymentSchema2"
            opt={opt}
            key={opt.id}
          />
        ))}

        <RadioItemWithField
          optionIds={options.map((opt) => opt.id)}
          name="commercialInfo.paymentSchema2"
        >
          Other (specify)
        </RadioItemWithField>
      </ul>

      {errors.provideCertificates && (
        <p className="mt-2 text-sm text-red-600">
          {errors.provideCertificates.message}
        </p>
      )}
    </div>
  );
};

export default PaymentTerms2;
