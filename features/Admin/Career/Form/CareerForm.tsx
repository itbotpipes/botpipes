"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import DescriptionEditor from "../../DescriptionEditor";
import { Button } from "@/components/ui/button";
import { useCareerForm } from "./useCareerForm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { CareerRecord } from "@/lib/firebase/firestore/careers";
import FieldInput from "../../FieldInput";

interface CareerFormProps {
  className?: string;
  submitHandler: (data: CareerRecord) => void;
  defaultValues?: CareerRecord;
}

const CareerForm: React.FC<CareerFormProps> = ({
  className,
  submitHandler,
  defaultValues,
}) => {
  const { loading } = useSelector((state: RootState) => state.career);
  const { form, setDescription, handleSubmit } = useCareerForm(
    submitHandler,
    defaultValues,
  );

  return (
    <div className={clsx("", className)}>
      <FormProvider {...form}>
        <form
          className={clsx("space-y-10", className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-6">
            <FieldInput
              label="Role"
              placeholder="enter role"
              control={form.control}
              name={"role"}
            />

            <DescriptionEditor
              name="description"
              onValueChange={setDescription}
              control={form.control}
              className="mt-4"
            />
          </div>
          <Button disabled={loading} className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CareerForm;
