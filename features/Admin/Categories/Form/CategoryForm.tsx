"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCategoryForm } from "./useCategoryForm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import FieldInput from "../../FieldInput";
import { CategoryRecord } from "@/lib/firebase/firestore/categories";

interface CareerFormProps {
  className?: string;
  submitHandler: (data: CategoryRecord | Omit<CategoryRecord, "id">) => void;
  defaultValues?: CategoryRecord;
}

const CareerForm: React.FC<CareerFormProps> = ({
  className,
  submitHandler,
  defaultValues,
}) => {
  const { loading } = useSelector((state: RootState) => state.career);
  const { form, handleSubmit } = useCategoryForm(submitHandler, defaultValues);

  return (
    <div className={clsx("", className)}>
      <FormProvider {...form}>
        <form
          className={clsx("space-y-10", className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-6">
            <FieldInput
              label="Name"
              placeholder="enter name"
              control={form.control}
              name={"name"}
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
