import React from "react";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";

interface AdditionalInfoProps {
  className?: string;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className={clsx("space-y-6", className)}>
      <h2 className="text-center text-3xl font-bold uppercase">
        ADDITIONAL INFORMATION
      </h2>

      <div>
        <Label className="mb-2 block text-xs font-medium">
          WHY DO YOU WANT TO PARTNER WITH BOTPIPES TECH?
        </Label>
        <Textarea
          {...register(`additonalInfo.whyPartner`)}
          placeholder=""
          className=""
        />
        {errors.additonalInfo?.whyPartner && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additonalInfo?.whyPartner.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-xs font-medium">
          WHAT MAKES YOUR COMPANY A SUITABLE VENDOR FOR US?
        </Label>
        <Textarea {...register("additonalInfo.whySuitable")} placeholder="" />
        {errors.additonalInfo?.whySuitable && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additonalInfo?.whySuitable.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-xs font-medium">
          ANY SPECIAL CAPABILITIES, CERTIFICATIONS, OR ADVANTAGES YOU OFFER
        </Label>
        <Textarea {...register("additonalInfo.capabilities")} placeholder="" />
        {errors.additonalInfo?.capabilities && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additonalInfo?.capabilities.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default AdditionalInfo;
