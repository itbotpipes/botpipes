"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import DescriptionEditor from "../../DescriptionEditor";
import { Button } from "@/components/ui/button";
import { useTestimonialForm } from "./useTestimonialForm";
import {
  InitialTestimonialRecord,
  TestimonialRecord,
} from "@/lib/firebase/firestore/testimonials";
import FieldInput from "../../FieldInput";

interface TestimonialFormProps {
  className?: string;
  submitHandler: (data: InitialTestimonialRecord) => void;
  initialData?: TestimonialRecord;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  className,
  submitHandler,
  initialData,
}) => {
  const { form, setDescription, handleSubmit, sending } = useTestimonialForm(
    submitHandler,
    initialData,
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
              label="Username"
              placeholder="enter username"
              control={form.control}
              name={"username"}
            />

            <FieldInput
              label="Role"
              placeholder="enter role"
              control={form.control}
              name={"role"}
            />

            <FieldInput
              type="number"
              label="Ratings"
              placeholder="enter ratings"
              control={form.control}
              name={"ratings"}
            />

            <DescriptionEditor
              onValueChange={setDescription}
              control={form.control}
              name="description"
              className="mt-4"
            />
          </div>
          <Button disabled={sending} className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TestimonialForm;
