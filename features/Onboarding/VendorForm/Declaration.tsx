import React from "react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";

interface DeclarationProps {
  className?: string;
}

const Declaration: React.FC<DeclarationProps> = ({ className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <section className={clsx("space-y-6", className)}>
      <h3 className="mb-2 text-center text-3xl font-bold uppercase">
        DECLARATION
      </h3>

      <p className="mb-8 text-center text-sm">
        I HEREBY DECLARE THAT ALL INFORMATION PROVIDED ABOVE IS TRUE AND
        ACCURATE TO THE BEST OF MY KNOWLEDGE. I UNDERSTAND THAT ANY FALSE
        INFORMATION MAY LEAD TO DISQUALIFICATION OR TERMINATION OF VENDOR
        RELATIONSHIP. I AGREE TO BOTPIPES TECH&apos;S VENDOR TERMS AND
        CONDITIONS.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block text-xs font-medium">NAME</Label>
          <Input placeholder="Name" {...register("declaration.name")} />
          {errors.declaration?.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.declaration?.name?.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">DESIGNATION</Label>
          <Input
            placeholder="Designation"
            {...register("declaration.designation")}
          />
          {errors.declaration?.designation && (
            <p className="mt-1 text-xs text-red-600">
              {errors.declaration?.designation?.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">DATE</Label>
          <Input placeholder="Date" {...register("declaration.data")} />
          {errors.declaration?.data && (
            <p className="mt-1 text-xs text-red-600">
              {errors.declaration?.data?.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">SIGNATURE</Label>
          <Input
            placeholder="Signature"
            {...register("declaration.signature")}
          />
          {errors.declaration?.signature && (
            <p className="mt-1 text-xs text-red-600">
              {errors.declaration?.signature?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="mb-1 block text-xs font-medium">COMPANY SEAL</Label>
        <Textarea placeholder="" {...register("declaration.seal")} />
        {errors.declaration?.seal && (
          <p className="mt-1 text-xs text-red-600">
            {errors.declaration?.seal?.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Declaration;
