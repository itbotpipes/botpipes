import React from "react";
import clsx from "clsx";
import RadioItemWithField from "../Checklists/RadioItemWithField";
import RadioItem from "../Checklists/RadioItem";
import { FormValues } from "../Schema";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface PaymentTermsProps {
  className?: string;
}

const options = [
  { id: "advance", label: "Advance payment" },
  { id: "30_days", label: "30 days credit" },
  { id: "45_days", label: "45 days credit" },
  { id: "60_days", label: "60 days credit" },
  { id: "against_delivery", label: "Against delivery" },
];

const PaymentTerms: React.FC<PaymentTermsProps> = ({ className }) => {
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
            opt={opt}
            key={opt.id}
            name="commercialInfo.paymentSchema"
          />
        ))}

        <RadioItemWithField
          optionIds={options.map((opt) => opt.id)}
          name="commercialInfo.paymentSchema"
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

export default PaymentTerms;
